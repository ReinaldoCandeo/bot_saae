# 🤖 Como Testar seu Bot WhatsApp - SAAE

## ✅ Status Atual do Sistema

- ✅ **Servidor rodando** na porta 3000
- ✅ **URL pública:** https://saae-whatsapp-bot.loca.lt
- ✅ **Webhook funcionando:** https://saae-whatsapp-bot.loca.lt/webhook
- ✅ **Senha do túnel:** `177.8.50.250`

## 🧪 Testes Disponíveis

### **1. Teste de Conectividade Básica**

#### **Teste Local:**
```bash
curl http://localhost:3000/health
```

#### **Teste Público:**
```bash
curl https://saae-whatsapp-bot.loca.lt/health
```

### **2. Teste do Webhook**

#### **Verificação do Webhook:**
```bash
curl "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```

**✅ Resultado esperado:** `test123`

### **3. Teste da API**

#### **Status da API:**
```bash
curl https://saae-whatsapp-bot.loca.lt/api/status
```

#### **Informações do Sistema:**
```bash
curl https://saae-whatsapp-bot.loca.lt/
```

### **4. Teste das Interfaces Web**

#### **Dashboard de Monitoramento:**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard
- **Funcionalidade:** Visualizar tanques de água em tempo real

#### **Painel Administrativo:**
- **URL:** https://saae-whatsapp-bot.loca.lt/admin
- **Funcionalidade:** Gerenciar conversas e configurações

### **5. Teste de Envio de Mensagem (Simulado)**

#### **Enviar Mensagem Teste:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Olá, teste do sistema SAAE"}'
```

## 📱 Configuração no Meta for Developers

### **Para testar com WhatsApp real:**

1. **Acesse:** https://developers.facebook.com
2. **Selecione sua aplicação**
3. **WhatsApp** → **API Setup** → **Webhook**
4. **Callback URL:** `https://saae-whatsapp-bot.loca.lt/webhook`
5. **Verify Token:** `demo_verify_token_123`
6. **Webhook Fields:** Marcar `messages` e `message_status`
7. **Clique:** "Verify and Save"

### **Senha do Túnel (se solicitada):**
```
177.8.50.250
```

## 🎯 Cenários de Teste

### **Cenário 1: Teste Básico**
1. ✅ Verificar se servidor está rodando
2. ✅ Testar endpoints básicos
3. ✅ Verificar interfaces web

### **Cenário 2: Teste do Webhook**
1. ✅ Configurar webhook no Meta
2. ✅ Verificar webhook no Meta
3. ✅ Testar verificação manual

### **Cenário 3: Teste de Mensagens**
1. ✅ Enviar mensagem de teste via API
2. ✅ Enviar mensagem real via WhatsApp
3. ✅ Verificar resposta automática

### **Cenário 4: Teste do Dashboard**
1. ✅ Acessar dashboard de tanques
2. ✅ Verificar dados simulados
3. ✅ Testar atualizações em tempo real

## 🔍 Monitoramento

### **Logs do Servidor:**
- **Terminal principal:** Onde você rodou `npm start`
- **Informações:** Mensagens recebidas, erros, status

### **Logs do Localtunnel:**
- **Interface:** http://127.0.0.1:4040 (se disponível)
- **Informações:** Requisições HTTP, tempo de resposta

## 🆘 Problemas Comuns

### **❌ "Connection refused"**
- ✅ Verificar se servidor está rodando
- ✅ Verificar se porta 3000 está livre
- ✅ Reiniciar servidor

### **❌ "Webhook verification failed"**
- ✅ Verificar URL do webhook
- ✅ Verificar verify token
- ✅ Verificar se localtunnel está ativo

### **❌ "Tunnel password required"**
- ✅ Usar senha: `177.8.50.250`
- ✅ Verificar se IP público está correto

## 📊 URLs de Teste

### **Funcionalidades Principais:**
- **Health Check:** https://saae-whatsapp-bot.loca.lt/health
- **API Status:** https://saae-whatsapp-bot.loca.lt/api/status
- **Webhook:** https://saae-whatsapp-bot.loca.lt/webhook

### **Interfaces Web:**
- **Dashboard:** https://saae-whatsapp-bot.loca.lt/dashboard
- **Admin Panel:** https://saae-whatsapp-bot.loca.lt/admin

### **APIs de Teste:**
- **Test Webhook:** POST https://saae-whatsapp-bot.loca.lt/api/test-webhook
- **System Info:** https://saae-whatsapp-bot.loca.lt/

## 🎉 Próximos Passos

1. **✅ Executar testes básicos**
2. **🔧 Configurar webhook no Meta**
3. **💬 Testar mensagens WhatsApp**
4. **📊 Verificar dashboard**
5. **👨‍💼 Testar painel admin**

---

## 🚀 Comando Rápido para Testar Tudo

```bash
# Teste completo em sequência
curl -s https://saae-whatsapp-bot.loca.lt/health && echo "✅ Health OK"
curl -s https://saae-whatsapp-bot.loca.lt/api/status && echo "✅ API OK"
curl -s "https://saae-whatsapp-bot.loca.lt/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123" && echo "✅ Webhook OK"
```

**🎯 Seu bot está pronto para interação!**
