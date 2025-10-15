# 🤖 SAAE WhatsApp Bot - Sistema Completo

## 📋 Visão Geral

Sistema completo de chatbot WhatsApp para o SAAE de Palmital, desenvolvido seguindo as diretrizes do documento oficial. O sistema utiliza a **Meta Cloud API** (WhatsApp Business API) para manter total controle sobre o bot, sem dependência de plataformas terceirizadas.

## 🎯 Características Principais

### ✅ **Funcionalidades Implementadas**
- 🤖 **Chatbot inteligente** com fluxos de conversação completos
- 📱 **Integração oficial** com WhatsApp Business API
- 🗄️ **Banco de dados SQLite** para armazenar conversas e usuários
- 👨‍💼 **Painel administrativo** completo e responsivo
- 📊 **Sistema de estatísticas** e relatórios
- 🔒 **Webhook seguro** para recebimento de mensagens
- ⚙️ **Configurações dinâmicas** via painel admin
- 📝 **Sistema de logs** completo
- 🚀 **Deploy pronto** para produção

### 🏛️ **Serviços do SAAE Integrados**
1. **Consulta de Conta** - Verificação de débitos e consumo
2. **Segunda Via** - Geração de boletos
3. **Agendamento** - Ligação de água, esgoto, manutenção e vistoria
4. **Fale Conosco** - Informações de contato
5. **Emergências** - Suporte 24h para problemas urgentes

## 🏗️ Arquitetura do Sistema

```
Cidadão → WhatsApp → Meta Cloud API → Servidor SAAE → Banco de Dados
                                    ↓
                            Painel Administrativo
```

### **Componentes Técnicos**
- **Backend:** Node.js + Express
- **Banco de Dados:** SQLite
- **API:** WhatsApp Business API (Meta)
- **Frontend:** HTML5 + CSS3 + JavaScript
- **Segurança:** Helmet, CORS, Rate Limiting

## 📁 Estrutura do Projeto

```
saae-whatsapp-bot/
├── 📄 server.js                 # Servidor principal
├── 📄 package.json              # Dependências e scripts
├── 📄 env.example               # Variáveis de ambiente (exemplo)
├── 📁 routes/                   # Rotas da API
│   ├── webhook.js              # Webhook do WhatsApp
│   ├── admin.js                # Painel administrativo
│   └── api.js                  # API REST
├── 📁 services/                 # Serviços principais
│   ├── whatsapp.js             # Integração WhatsApp API
│   └── webhook.js              # Processamento de mensagens
├── 📁 bot/                      # Lógica do chatbot
│   └── chatbot.js              # Fluxos de conversação
├── 📁 database/                 # Banco de dados
│   ├── init.js                 # Inicialização e tabelas
│   ├── conversations.js        # Gerenciamento de conversas
│   └── logs.js                 # Sistema de logs
├── 📁 public/admin/             # Interface administrativa
│   ├── index.html              # Painel principal
│   └── admin.js                # JavaScript do painel
└── 📁 database/                 # Arquivos do banco SQLite
```

## 🚀 Instalação e Configuração

### **1. Pré-requisitos**
- Node.js 16+ 
- NPM ou Yarn
- Conta Meta for Developers
- Certificado SSL (HTTPS obrigatório)

### **2. Instalação**

```bash
# Clonar o repositório
git clone https://github.com/saae-palmital/whatsapp-bot.git
cd whatsapp-bot

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp env.example .env
```

### **3. Configuração das Variáveis de Ambiente**

Edite o arquivo `.env` com suas configurações:

```env
# Configurações do WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=your_access_token_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id_here

# Configurações do Servidor
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# URLs (substitua por seu domínio)
WEBHOOK_URL=https://seu-dominio.com/webhook
ADMIN_PANEL_URL=https://seu-dominio.com/admin

# Configurações do SAAE
SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
SAAE_ADDRESS=Rua Principal, 123 - Centro - Palmital/SP
```

### **4. Configuração do Meta for Developers**

#### **Passo 1: Criar Aplicação**
1. Acesse [Meta for Developers](https://developers.facebook.com/)
2. Crie uma nova aplicação do tipo "Business"
3. Adicione o produto "WhatsApp"

#### **Passo 2: Configurar WhatsApp Business API**
1. Vá para "API Setup"
2. Anote o **Phone Number ID** e **Access Token**
3. Configure o webhook:
   - **URL:** `https://seu-dominio.com/webhook`
   - **Verify Token:** Use o mesmo valor do `.env`
   - **Campos:** `messages`, `message_status`

#### **Passo 3: Verificar Número de Telefone**
1. Adicione um número de telefone comercial
2. Verifique via SMS/código
3. Configure o número no painel

### **5. Executar o Sistema**

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

## 📱 Configuração do Webhook

### **1. Configurar no Meta Business Manager**
1. Acesse o painel da sua aplicação
2. Vá em "WhatsApp" → "Configuration"
3. Configure o Webhook:
   - **Callback URL:** `https://seu-dominio.com/webhook`
   - **Verify Token:** Use o valor do `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
   - **Webhook Fields:** Marque `messages` e `message_status`

### **2. Testar o Webhook**
```bash
# Testar verificação (GET)
curl "https://seu-dominio.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"

# Testar envio de mensagem (POST)
curl -X POST https://seu-dominio.com/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Teste"}'
```

## 👨‍💼 Painel Administrativo

### **Acesso**
- **URL:** `https://seu-dominio.com/admin`
- **Funcionalidades:**
  - 📊 Dashboard com estatísticas em tempo real
  - 💬 Visualização de conversas
  - 👥 Gerenciamento de usuários
  - 📝 Edição de templates de mensagens
  - ⚙️ Configurações do sistema
  - 📋 Logs de atividades
  - 📤 Envio manual de mensagens

### **Principais Recursos**
- **Monitoramento em tempo real** das conversas
- **Estatísticas detalhadas** de uso
- **Edição de templates** sem reiniciar o sistema
- **Configuração dinâmica** de horários e mensagens
- **Sistema de logs** para debugging
- **Interface responsiva** para mobile e desktop

## 🔧 API Endpoints

### **Webhook (WhatsApp)**
- `GET /webhook` - Verificação do webhook
- `POST /webhook` - Recebimento de mensagens

### **API Geral**
- `GET /api/status` - Status da API
- `GET /api/stats` - Estatísticas gerais
- `GET /api/conversations/:phone` - Conversas de um usuário
- `GET /api/logs` - Logs do sistema
- `POST /api/test-webhook` - Teste do webhook
- `GET /api/validate-config` - Validar configurações

### **Painel Admin**
- `GET /admin` - Interface administrativa
- `GET /admin/api/dashboard` - Dados do dashboard
- `GET /admin/api/conversations` - Listar conversas
- `GET /admin/api/users` - Listar usuários
- `GET /admin/api/templates` - Templates de mensagens
- `POST /admin/api/send-message` - Enviar mensagem manual

## 💬 Fluxos de Conversação

### **Menu Principal**
```
🏛️ SAAE Palmital
Escolha uma opção:

1️⃣ Consulta de Conta
2️⃣ Segunda Via  
3️⃣ Agendamento
4️⃣ Fale Conosco
5️⃣ Emergências
```

### **Consulta de Conta**
1. Usuário seleciona "Consulta de Conta"
2. Bot solicita CPF ou matrícula
3. Sistema consulta dados
4. Retorna informações da conta

### **Segunda Via**
1. Usuário seleciona "Segunda Via"
2. Bot solicita CPF ou matrícula
3. Sistema gera segunda via
4. Envia link para pagamento

### **Agendamento**
1. Usuário seleciona "Agendamento"
2. Escolhe tipo de serviço:
   - Ligação de Água
   - Ligação de Esgoto
   - Manutenção
   - Vistoria
3. Bot coleta dados do usuário
4. Confirma agendamento

## 🔒 Segurança

### **Implementações de Segurança**
- ✅ **Rate Limiting** - Limite de requisições por IP
- ✅ **Helmet.js** - Headers de segurança
- ✅ **CORS** - Controle de origem
- ✅ **Validação de entrada** - Sanitização de dados
- ✅ **Logs de auditoria** - Rastreamento de atividades
- ✅ **HTTPS obrigatório** - Comunicação criptografada

### **Boas Práticas**
- Use tokens de acesso seguros
- Configure firewall adequadamente
- Mantenha dependências atualizadas
- Faça backup regular do banco de dados
- Monitore logs de segurança

## 📊 Monitoramento e Logs

### **Sistema de Logs**
- **Webhook Events** - Todas as interações com WhatsApp
- **Conversations** - Histórico completo de mensagens
- **Errors** - Registro de erros e exceções
- **Performance** - Métricas de tempo de resposta

### **Estatísticas Disponíveis**
- Total de mensagens (enviadas/recebidas)
- Usuários únicos
- Conversas ativas
- Horários de pico
- Tipos de mensagens mais comuns

## 🚀 Deploy em Produção

### **1. Servidor VPS/Dedicado**
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 para gerenciamento de processos
npm install -g pm2

# Configurar SSL com Let's Encrypt
sudo apt install certbot
sudo certbot certonly --standalone -d seu-dominio.com
```

### **2. Configurar PM2**
```bash
# Iniciar aplicação
pm2 start server.js --name "saae-whatsapp-bot"

# Configurar auto-restart
pm2 startup
pm2 save

# Monitorar
pm2 monit
```

### **3. Nginx (Proxy Reverso)**
```nginx
server {
    listen 443 ssl;
    server_name seu-dominio.com;
    
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **4. Deploy com Docker (Opcional)**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 💰 Custos Estimados

### **Meta Cloud API**
- **Gratuito:** Até 1.000 conversas/mês
- **Pago:** ~$0.02 - $0.08 por conversa adicional
- **Previsão:** ~$50-200/mês para uso médio

### **Infraestrutura**
- **VPS:** $20-50/mês
- **SSL:** Gratuito (Let's Encrypt)
- **Domínio:** $10-15/ano

### **Desenvolvimento**
- **Implementação:** Equipe interna
- **Manutenção:** Equipe interna

## 🔧 Manutenção

### **Backup Regular**
```bash
# Backup do banco de dados
cp database/saae_bot.db backups/saae_bot_$(date +%Y%m%d).db

# Backup de logs
tar -czf logs_backup_$(date +%Y%m%d).tar.gz logs/
```

### **Limpeza de Dados**
- **Conversas antigas:** Removidas após 90 dias
- **Logs antigos:** Removidos após 30 dias
- **Estatísticas:** Mantidas por 1 ano

### **Monitoramento**
- Verificar logs de erro diariamente
- Monitorar uso de API
- Verificar performance do servidor
- Backup automático semanal

## 🆘 Suporte e Troubleshooting

### **Problemas Comuns**

#### **Webhook não recebe mensagens**
1. Verificar URL do webhook no Meta Business Manager
2. Confirmar certificado SSL válido
3. Verificar logs do servidor
4. Testar conectividade com WhatsApp API

#### **Erro de autenticação**
1. Verificar Access Token
2. Confirmar Phone Number ID
3. Verificar permissões da aplicação
4. Renovar token se expirado

#### **Banco de dados não conecta**
1. Verificar permissões de escrita
2. Confirmar caminho do arquivo DB
3. Verificar espaço em disco
4. Verificar logs de erro

### **Logs Importantes**
```bash
# Ver logs em tempo real
pm2 logs saae-whatsapp-bot

# Ver logs específicos
tail -f logs/webhook.log
tail -f logs/error.log
```

## 📞 Contato e Suporte

- **Email:** contato@saae-palmital.com.br
- **Telefone:** (18) 99999-9999
- **Desenvolvimento:** Equipe de TI do SAAE

## 📄 Licença

Este projeto é desenvolvido para o SAAE de Palmital. Todos os direitos reservados.

---

## 🎉 Conclusão

O sistema está **100% implementado** e pronto para uso em produção. Seguindo este guia, o SAAE de Palmital terá:

✅ **Controle total** sobre o chatbot WhatsApp  
✅ **Integração oficial** com Meta Cloud API  
✅ **Interface administrativa** completa  
✅ **Sistema de monitoramento** robusto  
✅ **Segurança** e compliance com diretrizes do Meta  
✅ **Custos reduzidos** comparado a plataformas terceirizadas  

**O sistema está pronto para atender os cidadãos de Palmital com excelência!** 🏛️🤖