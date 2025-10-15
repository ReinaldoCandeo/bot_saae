const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { processBotLogic } = require('./bot/chatbot');
const { saveConversation } = require('./database/conversations');

console.log('🤖 Bot WhatsApp - Versão QR Code');
console.log('================================\n');

// Criar cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'saae-bot'
    }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// Exibir QR Code
client.on('qr', (qr) => {
    console.log('\n📱 ESCANEIE O QR CODE ABAIXO COM SEU WHATSAPP:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    qrcode.generate(qr, { small: true });
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📲 Como escanear:');
    console.log('1. Abra o WhatsApp no seu celular');
    console.log('2. Toque em ⋮ (menu) > Aparelhos conectados');
    console.log('3. Toque em "Conectar um aparelho"');
    console.log('4. Aponte a câmera para o QR Code acima\n');
});

// WhatsApp pronto
client.on('ready', async () => {
    console.log('\n✅ WhatsApp conectado com sucesso!');
    console.log('🤖 Bot está pronto para receber mensagens!\n');
    
    const info = client.info;
    console.log('📱 Informações da conta:');
    console.log(`   Nome: ${info.pushname || 'N/A'}`);
    console.log(`   Número: ${info.wid.user}`);
    console.log(`   Plataforma: ${info.platform}\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✨ Teste agora: Envie "menu" para o bot!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// Processar mensagens recebidas
client.on('message', async (message) => {
    try {
        // Ignorar mensagens de grupos e mensagens do próprio bot
        if (message.from.includes('@g.us') || message.fromMe) {
            return;
        }

        const phoneNumber = message.from.replace('@c.us', '');
        const messageContent = message.body;

        console.log(`\n📨 Mensagem recebida de ${phoneNumber}: "${messageContent}"`);

        // Salvar mensagem recebida no banco
        await saveConversation({
            phoneNumber,
            messageId: message.id.id,
            type: 'received',
            messageType: 'text',
            content: messageContent,
            timestamp: new Date(message.timestamp * 1000)
        });

        // Processar com a lógica do bot
        const botResponse = await processBotLogic({
            phoneNumber,
            messageContent,
            messageType: 'text',
            messageData: null
        });

        // Enviar resposta
        if (botResponse && botResponse.shouldReply) {
            if (botResponse.type === 'interactive' && botResponse.message.type === 'button') {
                // WhatsApp Web não suporta botões nativos, então enviamos como lista de texto
                const interactive = botResponse.message;
                let textMessage = `*${interactive.header.text}*\n\n`;
                textMessage += `${interactive.body.text}\n\n`;
                
                // Adicionar opções como lista numerada
                interactive.action.buttons.forEach((btn, index) => {
                    textMessage += `${index + 1}. ${btn.reply.title}\n`;
                });
                
                textMessage += `\n_${interactive.footer.text}_`;
                textMessage += `\n\n💡 *Digite o número da opção desejada*`;

                await client.sendMessage(message.from, textMessage);
                console.log(`✅ Resposta enviada (menu com ${interactive.action.buttons.length} opções)`);
            } else {
                // Mensagem de texto simples
                const textToSend = typeof botResponse.message === 'string' 
                    ? botResponse.message 
                    : JSON.stringify(botResponse.message);
                
                await client.sendMessage(message.from, textToSend);
                console.log(`✅ Resposta enviada`);
            }

            // Salvar mensagem enviada no banco
            await saveConversation({
                phoneNumber,
                messageId: `bot_${Date.now()}`,
                type: 'sent',
                messageType: botResponse.type || 'text',
                content: typeof botResponse.message === 'string' ? botResponse.message : 'Interactive message',
                timestamp: new Date()
            });
        }

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
        
        // Tentar enviar mensagem de erro
        try {
            await client.sendMessage(
                message.from,
                '😔 Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente ou digite "menu".'
            );
        } catch (sendError) {
            console.error('❌ Erro ao enviar mensagem de erro:', sendError);
        }
    }
});

// Eventos de conexão
client.on('authenticated', () => {
    console.log('✅ Autenticado com sucesso!');
});

client.on('auth_failure', (message) => {
    console.error('❌ Falha na autenticação:', message);
    console.log('\n💡 Dica: Delete a pasta .wwebjs_auth e tente novamente');
});

client.on('disconnected', (reason) => {
    console.log('⚠️  WhatsApp desconectado:', reason);
    console.log('🔄 Tentando reconectar...');
});

client.on('loading_screen', (percent, message) => {
    console.log(`⏳ Carregando: ${percent}% - ${message}`);
});

// Iniciar cliente
console.log('🔄 Iniciando WhatsApp Web...\n');
client.initialize();

// Tratamento de erros não capturados
process.on('unhandledRejection', (error) => {
    console.error('❌ Erro não capturado:', error);
});

process.on('SIGINT', async () => {
    console.log('\n\n🛑 Encerrando bot...');
    await client.destroy();
    process.exit(0);
});

