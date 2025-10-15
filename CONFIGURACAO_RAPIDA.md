# ⚡ Configuração Rápida - SAAE WhatsApp Bot

## 🚀 Setup em 5 Minutos

### **1. Pré-requisitos**
- ✅ Node.js 16+ instalado
- ✅ Conta Meta for Developers
- ✅ Domínio com HTTPS (para webhook)

### **2. Instalação**
```bash
# Clone ou baixe o projeto
cd saae-whatsapp-bot

# Instale dependências
npm install

# Configure variáveis de ambiente
cp env.example .env
```

### **3. Configuração do .env**
Edite o arquivo `.env` com suas credenciais:

```env
# OBRIGATÓRIO: Token de acesso do WhatsApp
WHATSAPP_ACCESS_TOKEN=seu_token_aqui

# OBRIGATÓRIO: ID do número de telefone
WHATSAPP_PHONE_NUMBER_ID=seu_id_aqui

# OBRIGATÓRIO: Token de verificação do webhook
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_verificacao

# OBRIGATÓRIO: ID da conta de negócios
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_account_id

# OPCIONAL: URLs (configure após deploy)
WEBHOOK_URL=https://seu-dominio.com
ADMIN_PANEL_URL=https://seu-dominio.com/admin
```

### **4. Obter Credenciais do Meta**

#### **A. Criar Aplicação**
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Clique em "Meus Apps" → "Criar App"
3. Escolha "Business" → "Próximo"
4. Preencha nome e email → "Criar App"

#### **B. Configurar WhatsApp**
1. No painel da app → "Adicionar Produto" → "WhatsApp"
2. Vá em "API Setup"
3. **Anote:**
   - `Phone Number ID`
   - `Access Token`
   - `Business Account ID`

#### **C. Configurar Webhook**
1. Em "API Setup" → "Webhook"
2. **Callback URL:** `https://seu-dominio.com/webhook`
3. **Verify Token:** Use o mesmo valor do `.env`
4. **Webhook Fields:** Marque `messages` e `message_status`

### **5. Testar Localmente**
```bash
# Iniciar servidor
npm start

# Testar webhook (terminal 2)
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"
```

### **6. Deploy**

#### **Opção A: Vercel (Recomendado)**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis no painel Vercel
# Atualizar webhook no Meta com nova URL
```

#### **Opção B: VPS/Servidor**
```bash
# Upload dos arquivos
# Instalar Node.js
# npm install
# pm2 start server.js
# Configurar Nginx + SSL
```

### **7. Verificar Funcionamento**

#### **Teste Completo**
1. **Webhook:** `GET /webhook` deve retornar challenge
2. **Admin Panel:** `https://seu-dominio.com/admin`
3. **API Status:** `GET /api/status`
4. **Enviar mensagem teste** via WhatsApp

#### **Enviar Mensagem Teste**
```bash
curl -X POST https://seu-dominio.com/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Teste"}'
```

## 🔧 Comandos Úteis

```bash
# Verificar configuração
npm run check

# Modo desenvolvimento
npm run dev

# Verificar logs
pm2 logs saae-whatsapp-bot

# Backup banco
cp database/saae_bot.db backups/backup_$(date +%Y%m%d).db
```

## 🆘 Problemas Comuns

### **"Token inválido"**
- ✅ Verificar `WHATSAPP_ACCESS_TOKEN`
- ✅ Token não expirado
- ✅ Permissões corretas na app

### **"Webhook não funciona"**
- ✅ URL com HTTPS
- ✅ `WHATSAPP_WEBHOOK_VERIFY_TOKEN` correto
- ✅ Servidor acessível publicamente

### **"Banco não conecta"**
- ✅ Permissões de escrita na pasta `database/`
- ✅ Espaço em disco disponível

### **"Mensagens não chegam"**
- ✅ Webhook configurado no Meta
- ✅ Número de telefone verificado
- ✅ App em modo produção

## 📱 URLs Importantes

- **Webhook:** `https://seu-dominio.com/webhook`
- **Admin Panel:** `https://seu-dominio.com/admin`
- **API Status:** `https://seu-dominio.com/api/status`
- **Health Check:** `https://seu-dominio.com/health`

## 🎯 Próximos Passos

1. **Testar todos os fluxos** do chatbot
2. **Configurar templates** personalizados
3. **Integrar com sistema** do SAAE
4. **Treinar equipe** no painel admin
5. **Monitorar uso** e estatísticas

---

## 📞 Suporte

- **Documentação completa:** README.md
- **Deploy Vercel:** DEPLOY_VERCEL.md
- **Email:** contato@saae-palmital.com.br

**Sistema pronto para uso! 🎉**
