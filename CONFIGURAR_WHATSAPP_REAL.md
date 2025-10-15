# 📱 Configurar seu WhatsApp Real - Passo a Passo

## 🎯 Informações do seu Sistema

### **URLs do seu Bot:**
- **Webhook:** `https://saae-whatsapp-bot.loca.lt/webhook`
- **Senha do túnel:** `177.8.50.250`
- **Verify Token:** `demo_verify_token_123`

## 🚀 Passo a Passo para Configurar

### **PASSO 1: Acessar Meta for Developers**

1. **Abra seu navegador**
2. **Vá para:** https://developers.facebook.com
3. **Faça login** com sua conta Facebook
4. **Selecione sua aplicação** (ou crie uma nova)

### **PASSO 2: Configurar Webhook**

1. **No painel da aplicação:**
   - Clique em **"WhatsApp"** (menu lateral esquerdo)
   - Clique em **"API Setup"**

2. **Na seção "Webhook":**
   - **Callback URL:** Cole exatamente: `https://saae-whatsapp-bot.loca.lt/webhook`
   - **Verify Token:** Digite: `demo_verify_token_123`
   - Clique em **"Verify and Save"**

3. **✅ Sucesso esperado:** "Webhook verified successfully"

### **PASSO 3: Configurar Webhook Fields**

Após verificar o webhook:
- Marque: ✅ `messages`
- Marque: ✅ `message_status`
- Clique em **"Save"**

### **PASSO 4: Configurar Número de Telefone**

1. **Na seção "From":**
   - Clique em **"Add phone number"**
   - **Digite seu número** (exemplo: +5511999999999)
   - **Escolha:** SMS ou Chamada
   - **Digite o código** que receber

2. **Anote as informações:**
   - **Phone Number ID:** (número como: 123456789012345)
   - **Access Token:** (token como: EAAG1234...)

### **PASSO 5: Atualizar Arquivo .env**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

**Substitua estas linhas:**
```env
WHATSAPP_ACCESS_TOKEN=SEU_TOKEN_REAL_AQUI
WHATSAPP_PHONE_NUMBER_ID=SEU_PHONE_ID_REAL_AQUI
WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify_token_123
WHATSAPP_BUSINESS_ACCOUNT_ID=SEU_BUSINESS_ID_AQUI
```

### **PASSO 6: Reiniciar Servidor**

```bash
# Parar servidor atual
pkill -f node

# Reiniciar com credenciais reais
npm start
```

## 🧪 Testando com seu WhatsApp

### **Teste 1: Enviar Mensagem**

1. **Abra seu WhatsApp**
2. **Envie mensagem** para o número configurado
3. **Digite:** `menu`
4. **Aguarde resposta** do bot

### **Teste 2: Comandos para Testar**

#### **Comandos Básicos:**
- `menu` - Menu principal com botões
- `ajuda` - Lista de comandos
- `conta` - Consulta de conta
- `atendente` - Falar com atendente
- `vazamento` - Relatar vazamento
- `horario` - Horário de funcionamento
- `endereco` - Endereço do SAAE

#### **Sequência de Teste Recomendada:**
1. **Envie:** `menu`
2. **Envie:** `conta`
3. **Digite:** CPF (ex: 12345678901)
4. **Envie:** `atendente`
5. **Envie:** `vazamento`

### **Teste 3: Verificar no Dashboard**

- **Acesse:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`
- **Verifique:** Conversas ativas, mensagens recebidas

## 🔍 Verificações Importantes

### **Verificar se Webhook está Funcionando:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```
**✅ Resultado esperado:** `test123`

### **Verificar Status:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/api/status"
```

### **Verificar Conversas:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard"
```

## 📊 Monitoramento em Tempo Real

### **Dashboard:**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`

### **O que você verá:**
- 📊 **Estatísticas** em tempo real
- 💬 **Conversas ativas**
- 📱 **Status do WhatsApp API**
- 🔄 **Atualizações automáticas**

## 🆘 Problemas Comuns

### **❌ "Webhook verification failed"**
**Soluções:**
- ✅ Verificar se URL está exatamente: `https://saae-whatsapp-bot.loca.lt/webhook`
- ✅ Verificar se verify token é: `demo_verify_token_123`
- ✅ Verificar se localtunnel está ativo

### **❌ "Messages not received"**
**Soluções:**
- ✅ Verificar se webhook fields estão marcados (messages, message_status)
- ✅ Verificar se número foi verificado
- ✅ Verificar logs do servidor

### **❌ "Invalid token"**
**Soluções:**
- ✅ Verificar se access token está correto
- ✅ Verificar se token não expirou
- ✅ Verificar permissões da aplicação

## 🎉 Resultado Esperado

Após configurar tudo:

1. **✅ Webhook verificado** no Meta
2. **✅ Número configurado** e verificado
3. **✅ Credenciais atualizadas** no .env
4. **✅ Servidor reiniciado** com credenciais reais
5. **✅ Mensagens chegando** do WhatsApp
6. **✅ Bot respondendo** automaticamente
7. **✅ Dashboard mostrando** conversas em tempo real

## 🚀 Comandos Rápidos para Testar

```bash
# Verificar webhook
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"

# Verificar status
curl "https://saae-whatsapp-bot.loca.lt/api/status"

# Verificar conversas
curl "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard"
```

---

## 🎯 RESUMO DOS PASSOS

1. **🌐 Acessar:** https://developers.facebook.com
2. **🔧 Configurar webhook:** `https://saae-whatsapp-bot.loca.lt/webhook`
3. **📱 Configurar número** de telefone
4. **📝 Atualizar** arquivo .env
5. **🔄 Reiniciar** servidor
6. **💬 Testar** comandos no WhatsApp
7. **📊 Monitorar** via dashboard

**🎉 Com essas configurações, seu bot estará funcionando com WhatsApp real!**
