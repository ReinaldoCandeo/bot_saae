# 📱 Como Testar com seu WhatsApp Real

## 🎯 Configuração para WhatsApp Real

### **URLs Importantes:**
- **Webhook:** `https://saae-whatsapp-bot.loca.lt/webhook`
- **Senha do túnel:** `177.8.50.250`

## 🚀 Passo a Passo

### **Passo 1: Acessar Meta for Developers**

1. **Vá para:** https://developers.facebook.com
2. **Faça login** com sua conta Facebook
3. **Selecione sua aplicação** (ou crie uma nova se não tiver)

### **Passo 2: Configurar Webhook**

1. **No painel da aplicação:**
   - Clique em **"WhatsApp"** (menu lateral)
   - Vá para **"API Setup"**

2. **Na seção "Webhook":**
   - **Callback URL:** `https://saae-whatsapp-bot.loca.lt/webhook`
   - **Verify Token:** `demo_verify_token_123`
   - Clique em **"Verify and Save"**

3. **Configurar Webhook Fields:**
   - Marque: ✅ `messages`
   - Marque: ✅ `message_status`
   - Clique em **"Save"**

### **Passo 3: Configurar Número de Telefone**

1. **Na seção "From":**
   - Clique em **"Add phone number"**
   - **Digite seu número** (formato: +5511999999999)
   - **Escolha método:** SMS ou Chamada
   - **Digite o código** recebido

2. **Anotar informações:**
   - **Phone Number ID:** (copie este número)
   - **Access Token:** (copie este token)

### **Passo 4: Atualizar Arquivo .env**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

**Substitua os valores:**
```env
WHATSAPP_ACCESS_TOKEN=SEU_TOKEN_REAL_AQUI
WHATSAPP_PHONE_NUMBER_ID=SEU_PHONE_ID_REAL_AQUI
WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify_token_123
WHATSAPP_BUSINESS_ACCOUNT_ID=SEU_BUSINESS_ID_AQUI
```

### **Passo 5: Reiniciar Servidor**

```bash
# Parar servidor atual
pkill -f node

# Reiniciar com credenciais reais
npm start
```

## 🧪 Testando com WhatsApp Real

### **Teste 1: Enviar Mensagem para seu Bot**

1. **Abra seu WhatsApp**
2. **Envie mensagem** para o número configurado
3. **Digite:** `menu`
4. **Aguarde resposta** do bot

### **Teste 2: Verificar no Dashboard**

- **Acesse:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`
- **Verifique:** Conversas ativas, mensagens recebidas

### **Teste 3: Monitorar Logs**

No terminal onde o servidor está rodando, você verá:
```
📱 Processando mensagem: {
  from: '5511999999999',
  text: { body: 'menu' },
  type: 'text'
}
🤖 Processando mensagem do usuário 5511999999999: menu
📝 Conteúdo: [RESPOSTA DO BOT]
✅ Mensagem processada com sucesso
```

## 🎯 Comandos para Testar

### **Comandos Básicos:**
- `menu` - Menu principal com botões
- `ajuda` - Lista de comandos
- `conta` - Consulta de conta
- `atendente` - Falar com humano
- `vazamento` - Relatar vazamento

### **Sequência de Teste:**
1. **Envie:** `menu`
2. **Envie:** `conta`
3. **Digite:** CPF (ex: 12345678901)
4. **Envie:** `atendente`
5. **Envie:** `vazamento`

## 🔍 Verificações

### **Verificar se Webhook está Funcionando:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```

**✅ Resultado esperado:** `test123`

### **Verificar Status da API:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/api/status"
```

### **Verificar Conversas:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard"
```

## 🆘 Problemas Comuns

### **❌ "Webhook verification failed"**
- ✅ Verificar se URL está correta
- ✅ Verificar se verify token está correto
- ✅ Verificar se localtunnel está ativo

### **❌ "Messages not received"**
- ✅ Verificar se webhook fields estão marcados
- ✅ Verificar se número foi verificado
- ✅ Verificar logs do servidor

### **❌ "Invalid token"**
- ✅ Verificar se access token está correto
- ✅ Verificar se token não expirou
- ✅ Verificar permissões da aplicação

## 📊 Monitoramento

### **Dashboard em Tempo Real:**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`

### **APIs de Status:**
- **Status:** https://saae-whatsapp-bot.loca.lt/api/status
- **Health:** https://saae-whatsapp-bot.loca.lt/health
- **Dashboard:** https://saae-whatsapp-bot.loca.lt/admin/api/dashboard

## 🎉 Resultado Esperado

Após configurar tudo corretamente:

1. **✅ Webhook verificado** no Meta
2. **✅ Número de telefone** configurado
3. **✅ Credenciais atualizadas** no .env
4. **✅ Servidor reiniciado** com credenciais reais
5. **✅ Mensagens WhatsApp** chegando ao bot
6. **✅ Bot respondendo** automaticamente
7. **✅ Dashboard mostrando** conversas em tempo real

---

## 🚀 Comandos Rápidos

```bash
# Verificar webhook
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"

# Verificar status
curl "https://saae-whatsapp-bot.loca.lt/api/status"

# Verificar conversas
curl "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard"
```

**🎯 Com essas configurações, seu bot estará funcionando com WhatsApp real!**
