# 📱 Guia Visual - Configurar seu Número no Meta for Developers

## 🎯 Objetivo
Configurar seu número de telefone real para testar o bot WhatsApp.

## 🚀 Passo a Passo Detalhado

### **PASSO 1: Acessar Meta for Developers**

1. **Abra seu navegador**
2. **Digite:** https://developers.facebook.com
3. **Clique em "Entrar"** (canto superior direito)
4. **Faça login** com sua conta Facebook

### **PASSO 2: Criar ou Acessar Aplicação**

#### **Se você NÃO tem aplicação:**
1. **Clique em "Meus Apps"** (canto superior direito)
2. **Clique em "Criar App"**
3. **Selecione "Business"**
4. **Preencha:**
   - **Nome do App:** `SAAE WhatsApp Bot`
   - **Email de contato:** Seu email
5. **Clique em "Criar App"**

#### **Se você JÁ tem aplicação:**
1. **Clique em "Meus Apps"**
2. **Selecione sua aplicação** existente

### **PASSO 3: Adicionar WhatsApp**

1. **No painel da aplicação, procure por "WhatsApp"**
2. **Clique em "Configurar"** ou "Adicionar Produto"
3. **Aguarde a configuração** ser criada

### **PASSO 4: Configurar Número de Telefone**

1. **No menu lateral, clique em "WhatsApp"**
2. **Clique em "API Setup"**
3. **Na seção "From", clique em "Add phone number"**

#### **Preencher Formulário:**
- **Phone number:** Digite SEU número (exemplo: +5511999999999)
- **Display name:** `SAAE Palmital` (ou nome que preferir)
- **Business category:** `Utilities` ou `Public Services`

#### **Verificação:**
- **Escolha método:** SMS ou Chamada
- **Clique em "Send Code"**
- **Digite o código** recebido no seu celular
- **Clique em "Verify"**

### **PASSO 5: Anotar Informações Importantes**

Após verificar seu número, você verá:

#### **Phone Number ID:**
- **Copie este número** (exemplo: 123456789012345)
- **Esta é a ID do seu número**

#### **Access Token:**
- **Clique em "Temporary access token"**
- **Copie o token** (começa com EAAG...)
- **⚠️ IMPORTANTE:** Este token expira em 24 horas

#### **Business Account ID:**
- **Na seção "WhatsApp Business Account ID"**
- **Copie este ID** (exemplo: 987654321098765)

### **PASSO 6: Configurar Webhook**

1. **Na seção "Webhook", clique em "Configure"**
2. **Callback URL:** Digite: `https://saae-whatsapp-bot.loca.lt/webhook`
3. **Verify Token:** Digite: `demo_verify_token_123`
4. **Clique em "Verify and Save"**

#### **Configurar Webhook Fields:**
- Marque: ✅ `messages`
- Marque: ✅ `message_status`
- Clique em "Save"

### **PASSO 7: Atualizar Arquivo .env**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

**Substitua estas linhas:**
```env
# ANTES (demo):
WHATSAPP_ACCESS_TOKEN=demo_token_for_testing
WHATSAPP_PHONE_NUMBER_ID=demo_phone_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify_token_123
WHATSAPP_BUSINESS_ACCOUNT_ID=demo_business_account

# DEPOIS (seus dados reais):
WHATSAPP_ACCESS_TOKEN=EAAG1234567890abcdef...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify_token_123
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765
```

### **PASSO 8: Reiniciar Servidor**

```bash
# Parar servidor atual
pkill -f node

# Reiniciar com credenciais reais
npm start
```

## 🧪 Testando com seu WhatsApp

### **Teste 1: Enviar Mensagem**
1. **Abra seu WhatsApp**
2. **Envie mensagem** para o número que você configurou
3. **Digite:** `menu`
4. **Aguarde resposta** do bot

### **Teste 2: Comandos para Testar**
- `menu` - Menu principal
- `conta` - Consulta de conta
- `ajuda` - Lista de comandos
- `atendente` - Falar com atendente
- `vazamento` - Relatar vazamento

### **Teste 3: Verificar no Dashboard**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`

## 🔍 Verificações

### **Verificar Webhook:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```
**✅ Resultado esperado:** `test123`

### **Verificar Status:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/api/status"
```

## 🆘 Problemas Comuns

### **❌ "Webhook verification failed"**
- ✅ Verificar se URL está correta: `https://saae-whatsapp-bot.loca.lt/webhook`
- ✅ Verificar se verify token é: `demo_verify_token_123`
- ✅ Verificar se localtunnel está ativo

### **❌ "Invalid token"**
- ✅ Verificar se access token está correto
- ✅ Verificar se token não expirou (24h)
- ✅ Verificar se copiou token completo

### **❌ "Phone number not verified"**
- ✅ Verificar se número foi verificado com código
- ✅ Verificar se número está no formato correto (+5511999999999)
- ✅ Verificar se tem acesso ao número para receber SMS/chamada

## 📋 Checklist Final

- [ ] ✅ Acesso ao Meta for Developers
- [ ] ✅ Aplicação criada/acessada
- [ ] ✅ WhatsApp adicionado
- [ ] ✅ Número de telefone verificado
- [ ] ✅ Informações copiadas (Token, Phone ID, Business ID)
- [ ] ✅ Webhook configurado
- [ ] ✅ Arquivo .env atualizado
- [ ] ✅ Servidor reiniciado
- [ ] ✅ Mensagem de teste enviada
- [ ] ✅ Bot respondendo

## 🎉 Resultado Esperado

Após completar todos os passos:

1. **✅ Número verificado** no Meta
2. **✅ Webhook funcionando**
3. **✅ Credenciais configuradas**
4. **✅ Servidor rodando** com dados reais
5. **✅ WhatsApp respondendo** comandos
6. **✅ Dashboard mostrando** conversas

---

## 🚀 URLs Importantes

- **Meta for Developers:** https://developers.facebook.com
- **Seu Webhook:** https://saae-whatsapp-bot.loca.lt/webhook
- **Dashboard:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha do túnel:** `177.8.50.250`

**🎯 Siga estes passos e seu bot estará funcionando com seu WhatsApp real!**
