#!/bin/bash

# Script para configurar WhatsApp Business API
# Facilita a configuração do bot

clear
echo "🔗 ==========================================="
echo "   CONFIGURAÇÃO WHATSAPP BUSINESS"
echo "==========================================="
echo ""
echo "Este script vai te ajudar a configurar seu bot"
echo "para funcionar com WhatsApp Business real."
echo ""
echo "Antes de começar, você precisa:"
echo "  1. Conta no Meta for Developers"
echo "  2. Número de telefone"
echo "  3. As credenciais do WhatsApp API"
echo ""
read -p "Pressione Enter para continuar..."

clear
echo "📋 PASSO 1: Verificar ngrok"
echo "==========================================="
echo ""

if [ -f "./ngrok" ]; then
    echo "✅ Ngrok encontrado!"
    echo ""
    ./ngrok version
else
    echo "❌ Ngrok não encontrado nesta pasta!"
    echo ""
    echo "Você precisa baixar o ngrok:"
    echo "1. Acesse: https://ngrok.com/download"
    echo "2. Baixe para Mac"
    echo "3. Coloque o arquivo 'ngrok' nesta pasta"
    echo ""
    read -p "Pressione Enter quando tiver o ngrok..."
fi

echo ""
read -p "Pressione Enter para continuar..."

clear
echo "🔑 PASSO 2: Configurar credenciais"
echo "==========================================="
echo ""
echo "Você precisa obter estas informações do Meta:"
echo ""
echo "1. PHONE_NUMBER_ID"
echo "   - Onde: Meta for Developers → Seu App → WhatsApp → API Setup"
echo "   - Exemplo: 123456789012345"
echo ""
echo "2. ACCESS_TOKEN (Permanente)"
echo "   - Onde: Meta Business → System Users → Gerar Token"
echo "   - Exemplo: EAAG1x2y3z..."
echo ""
echo "3. WEBHOOK_VERIFY_TOKEN (você inventa)"
echo "   - Pode ser qualquer senha"
echo "   - Exemplo: saae2024webhook"
echo ""

read -p "Você já tem essas informações? (s/n): " tem_credenciais

if [ "$tem_credenciais" != "s" ]; then
    echo ""
    echo "❌ Por favor, obtenha as credenciais primeiro."
    echo ""
    echo "Guia completo em: INTEGRAR_WHATSAPP_BUSINESS.md"
    echo ""
    echo "Comandos rápidos:"
    echo "  cat INTEGRAR_WHATSAPP_BUSINESS.md | less"
    echo "  open INTEGRAR_WHATSAPP_BUSINESS.md"
    echo ""
    exit 1
fi

echo ""
echo "Vamos configurar o arquivo .env"
echo ""

read -p "PHONE_NUMBER_ID: " phone_id
read -p "ACCESS_TOKEN: " access_token
read -p "WEBHOOK_VERIFY_TOKEN: " verify_token

# Criar arquivo .env
cat > .env << EOF
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=$phone_id
WHATSAPP_ACCESS_TOKEN=$access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=$verify_token

# Servidor
PORT=3000
WEBHOOK_URL=http://localhost:3000

# Banco de Dados
DB_PATH=./database/saae_bot.db

# Ambiente
NODE_ENV=production
EOF

echo ""
echo "✅ Arquivo .env criado!"
echo ""
read -p "Pressione Enter para continuar..."

clear
echo "🌐 PASSO 3: Iniciar ngrok"
echo "==========================================="
echo ""
echo "Vou iniciar o ngrok para você."
echo "Ele vai criar uma URL pública para seu bot."
echo ""
echo "⚠️  IMPORTANTE:"
echo "   - Não feche a janela do ngrok!"
echo "   - Copie a URL que aparecer"
echo "   - Use essa URL no Meta Business Manager"
echo ""
read -p "Pressione Enter para iniciar ngrok..."

# Verificar se porta 3000 está livre
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo ""
    echo "⚠️  Porta 3000 está em uso!"
    read -p "Deseja parar o processo e continuar? (s/n): " parar
    if [ "$parar" = "s" ]; then
        lsof -ti:3000 | xargs kill -9
        echo "✅ Processo encerrado"
    else
        echo "❌ Configure a porta manualmente"
        exit 1
    fi
fi

echo ""
echo "Iniciando ngrok..."
echo ""
echo "================================================================"
echo "  COPIE A URL QUE APARECER (https://xxxx.ngrok.io)"
echo "================================================================"
echo ""

# Iniciar ngrok em background
./ngrok http 3000 > /dev/null 2>&1 &
NGROK_PID=$!

# Aguardar ngrok iniciar
sleep 3

# Pegar URL do ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o "https://[a-zA-Z0-9.-]*\.ngrok\.io" | head -1)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Erro ao obter URL do ngrok"
    echo "Execute manualmente: ./ngrok http 3000"
    exit 1
fi

echo ""
echo "✅ Ngrok iniciado!"
echo ""
echo "================================================================"
echo "  SUA URL PÚBLICA:"
echo "  $NGROK_URL"
echo "================================================================"
echo ""
echo "Esta é a URL que você vai usar no Meta!"
echo "Webhook URL: $NGROK_URL/webhook"
echo ""

# Atualizar .env com URL do ngrok
sed -i '' "s|WEBHOOK_URL=.*|WEBHOOK_URL=$NGROK_URL|" .env

echo "✅ Arquivo .env atualizado com a URL do ngrok"
echo ""
read -p "Pressione Enter para continuar..."

clear
echo "🚀 PASSO 4: Iniciar servidor"
echo "==========================================="
echo ""
echo "Vou iniciar o servidor do bot agora."
echo ""
read -p "Pressione Enter para iniciar..."

echo ""
echo "Iniciando servidor..."
npm start &
SERVER_PID=$!

echo ""
echo "✅ Servidor iniciado!"
echo ""

sleep 3

clear
echo "🎯 PASSO 5: Configurar no Meta"
echo "==========================================="
echo ""
echo "Agora você precisa configurar o webhook no Meta:"
echo ""
echo "1. Acesse: https://developers.facebook.com"
echo "2. Vá em: Seu App → WhatsApp → Configuração → Webhook"
echo "3. Clique em 'Editar'"
echo ""
echo "4. Configure:"
echo "   Callback URL:"
echo "   ┌────────────────────────────────────────────┐"
echo "   │ $NGROK_URL/webhook"
echo "   └────────────────────────────────────────────┘"
echo ""
echo "   Verify Token:"
echo "   ┌────────────────────────────────────────────┐"
echo "   │ $verify_token"
echo "   └────────────────────────────────────────────┘"
echo ""
echo "5. Clique em 'Verificar e salvar'"
echo "6. Depois marque o campo 'messages' e salve"
echo ""
read -p "Pressione Enter quando terminar..."

clear
echo "🎉 CONFIGURAÇÃO CONCLUÍDA!"
echo "==========================================="
echo ""
echo "✅ Ngrok rodando"
echo "✅ Servidor rodando"
echo "✅ Credenciais configuradas"
echo ""
echo "📊 STATUS:"
echo "  Ngrok URL: $NGROK_URL"
echo "  Servidor: http://localhost:3000"
echo "  Dashboard: http://localhost:3000/admin"
echo ""
echo "🧪 PARA TESTAR:"
echo "  1. Envie 'menu' para seu número no WhatsApp"
echo "  2. Você deve receber um menu com 5 botões"
echo ""
echo "📝 LOGS:"
echo "  Ver logs: tail -f startup.log"
echo "  Ver status: curl http://localhost:3000/health"
echo ""
echo "⚠️  IMPORTANTE:"
echo "  - Não feche este terminal"
echo "  - Não feche o ngrok"
echo "  - Para parar: Ctrl+C"
echo ""
echo "==========================================="
echo ""
read -p "Pressione Enter para sair..."

echo ""
echo "Bot configurado e rodando!"
echo ""
echo "Se precisar parar:"
echo "  kill $NGROK_PID $SERVER_PID"
echo ""

