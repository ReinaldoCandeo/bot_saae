# 📱 PASSO A PASSO - Configurar seu WhatsApp Real

## 🎯 Informações do seu Sistema
- **Webhook URL:** `https://saae-whatsapp-bot.loca.lt/webhook`
- **Verify Token:** `demo_verify_token_123`
- **Dashboard:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha do túnel:** `177.8.50.250`

---

## 📋 PASSO 1: Acessar Meta for Developers

### **O que fazer:**
1. **Abra seu navegador**
2. **Digite:** https://developers.facebook.com
3. **Clique em "Entrar"**
4. **Faça login** com sua conta Facebook

### **✅ Resultado esperado:**
- Você estará logado no Meta for Developers

---

## 📋 PASSO 2: Criar/Acessar Aplicação

### **Se você NÃO tem aplicação:**
1. **Clique em "Meus Apps"** (canto superior direito)
2. **Clique em "Criar App"**
3. **Selecione "Business"**
4. **Preencha:**
   - **Nome:** `SAAE WhatsApp Bot`
   - **Email:** Seu email
5. **Clique em "Criar App"**

### **Se você JÁ tem aplicação:**
1. **Clique em "Meus Apps"**
2. **Selecione sua aplicação**

### **✅ Resultado esperado:**
- Você estará no painel da aplicação

---

## 📋 PASSO 3: Adicionar WhatsApp

### **O que fazer:**
1. **Procure por "WhatsApp"** no painel
2. **Clique em "Configurar"** ou "Adicionar Produto"
3. **Aguarde** a configuração ser criada

### **✅ Resultado esperado:**
- WhatsApp será adicionado à sua aplicação

---

## 📋 PASSO 4: Configurar Número de Telefone

### **O que fazer:**
1. **Clique em "WhatsApp"** (menu lateral)
2. **Clique em "API Setup"**
3. **Na seção "From", clique em "Add phone number"**
4. **Preencha:**
   - **Phone number:** SEU número (ex: +5511999999999)
   - **Display name:** `SAAE Palmital`
5. **Escolha método:** SMS ou Chamada
6. **Clique em "Send Code"**
7. **Digite o código** recebido
8. **Clique em "Verify"**

### **✅ Resultado esperado:**
- Seu número será verificado e aparecerá na lista

---

## 📋 PASSO 5: Anotar Informações

### **O que copiar:**
1. **Phone Number ID:** (números como: 123456789012345)
2. **Access Token:** (clique em "Temporary access token")
3. **Business Account ID:** (na seção "WhatsApp Business Account ID")

### **✅ Resultado esperado:**
- Você terá as 3 informações necessárias

---

## 📋 PASSO 6: Configurar Webhook

### **O que fazer:**
1. **Na seção "Webhook", clique em "Configure"**
2. **Callback URL:** `https://saae-whatsapp-bot.loca.lt/webhook`
3. **Verify Token:** `demo_verify_token_123`
4. **Clique em "Verify and Save"**
5. **Marque:** ✅ `messages` e ✅ `message_status`
6. **Clique em "Save"**

### **✅ Resultado esperado:**
- Webhook verificado com sucesso

---

## 📋 PASSO 7: Atualizar Arquivo .env

### **O que fazer:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

### **Substituir estas linhas:**
```env
# ANTES:
WHATSAPP_ACCESS_TOKEN=demo_token_for_testing
WHATSAPP_PHONE_NUMBER_ID=demo_phone_id
WHATSAPP_BUSINESS_ACCOUNT_ID=demo_business_account

# DEPOIS (seus dados):
WHATSAPP_ACCESS_TOKEN=SEU_TOKEN_AQUI
WHATSAPP_PHONE_NUMBER_ID=SEU_PHONE_ID_AQUI
WHATSAPP_BUSINESS_ACCOUNT_ID=SEU_BUSINESS_ID_AQUI
```

### **✅ Resultado esperado:**
- Arquivo .env atualizado com suas credenciais

---

## 📋 PASSO 8: Reiniciar Servidor

### **O que fazer:**
```bash
# Parar servidor
pkill -f node

# Reiniciar
npm start
```

### **✅ Resultado esperado:**
- Servidor iniciará com suas credenciais reais

---

## 📋 PASSO 9: Testar no WhatsApp

### **O que fazer:**
1. **Abra seu WhatsApp**
2. **Envie mensagem** para o número configurado
3. **Digite:** `menu`
4. **Aguarde resposta** do bot

### **Comandos para testar:**
- `menu` - Menu principal
- `conta` - Consulta de conta
- `ajuda` - Lista de comandos
- `atendente` - Falar com atendente
- `vazamento` - Relatar vazamento

### **✅ Resultado esperado:**
- Bot responderá automaticamente

---

## 📋 PASSO 10: Monitorar

### **Dashboard:**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`

### **✅ Resultado esperado:**
- Dashboard mostrando conversas em tempo real

---

## 🎉 CHECKLIST FINAL

- [ ] ✅ Acesso ao Meta for Developers
- [ ] ✅ Aplicação criada/acessada
- [ ] ✅ WhatsApp adicionado
- [ ] ✅ Número verificado
- [ ] ✅ Informações copiadas
- [ ] ✅ Webhook configurado
- [ ] ✅ Arquivo .env atualizado
- [ ] ✅ Servidor reiniciado
- [ ] ✅ Mensagem de teste enviada
- [ ] ✅ Bot respondendo
- [ ] ✅ Dashboard funcionando

---

## 🆘 Se Algo Der Errado

### **Webhook não funciona:**
- Verificar se URL está exata: `https://saae-whatsapp-bot.loca.lt/webhook`
- Verificar se verify token é: `demo_verify_token_123`

### **Token inválido:**
- Verificar se copiou token completo
- Verificar se token não expirou (24h)

### **Número não verificado:**
- Verificar se recebeu o código
- Verificar se tem acesso ao número

**🎯 Siga estes passos e seu bot funcionará perfeitamente!**
