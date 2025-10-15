# 🔗 Como Obter a URL do ngrok

## ⚠️ Problema Identificado

O ngrok precisa de autenticação para funcionar. Vamos resolver isso:

## 🚀 Passo a Passo para Obter a URL

### **Passo 1: Criar Conta Gratuita no ngrok**

1. **Acesse:** https://dashboard.ngrok.com/signup
2. **Crie uma conta** gratuita (não precisa de cartão)
3. **Confirme seu email**

### **Passo 2: Obter seu Authtoken**

1. **Após criar a conta, acesse:** https://dashboard.ngrok.com/get-started/your-authtoken
2. **Copie seu authtoken** (algo como: `2abc123def456ghi789jkl012mno345pqr678stu`)

### **Passo 3: Configurar o ngrok**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok config add-authtoken SEU_TOKEN_AQUI
```

**Substitua `SEU_TOKEN_AQUI` pelo token que você copiou**

### **Passo 4: Iniciar o ngrok**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

### **Passo 5: Copiar a URL Gerada**

Você verá algo como:
```
Session Status                online
Account                       sua-conta (Plan: Free)
Version                       3.30.0
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

**📍 IMPORTANTE:** Copie a URL `https://abc123.ngrok-free.app`

## 📱 URL Completa do Webhook

```
https://abc123.ngrok-free.app/webhook
```

## 🔧 Configuração no Meta for Developers

### **1. Acessar painel Meta:**
- Vá para: https://developers.facebook.com
- Selecione sua aplicação

### **2. Configurar Webhook:**
- **WhatsApp** → **API Setup** → **Webhook**
- **Callback URL:** `https://abc123.ngrok-free.app/webhook`
- **Verify Token:** `demo_verify_token_123`
- **Webhook Fields:** Marcar:
  - ✅ `messages`
  - ✅ `message_status`

### **3. Verificar:**
- Clique em **"Verify and Save"**
- **✅ Sucesso:** "Webhook verified successfully"

## 🧪 Testando o Sistema

### **Teste 1: Verificação do Webhook**
```bash
curl "https://abc123.ngrok-free.app/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```

### **Teste 2: Status da API**
```bash
curl "https://abc123.ngrok-free.app/api/status"
```

### **Teste 3: Painel Admin**
- Acesse: `https://abc123.ngrok-free.app/admin`

## 📊 Monitoramento

### **Interface do ngrok:**
- **URL:** http://127.0.0.1:4040
- **Informações:** Requisições HTTP, logs, tempo de resposta

### **Logs do servidor:**
- **Terminal principal:** Onde você rodou `npm start`
- **Informações:** Mensagens recebidas, erros, status

## 🎯 Resumo dos Comandos

```bash
# 1. Configurar authtoken (uma vez só)
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok config add-authtoken SEU_TOKEN_AQUI

# 2. Iniciar ngrok
./ngrok http 3000

# 3. Copiar URL gerada
# https://abc123.ngrok-free.app

# 4. URL completa do webhook
# https://abc123.ngrok-free.app/webhook
```

## 🆘 Alternativas se não quiser criar conta

### **Opção 1: Usar localtunnel (gratuito, sem conta)**
```bash
# Instalar
npm install -g localtunnel

# Usar
lt --port 3000 --subdomain saae-whatsapp-bot
```

### **Opção 2: Usar serveo (gratuito, sem conta)**
```bash
# Usar diretamente
ssh -R 80:localhost:3000 serveo.net
```

## 📱 URLs Importantes

### **Desenvolvimento Local:**
- **Servidor:** http://localhost:3000
- **Webhook:** http://localhost:3000/webhook

### **Via ngrok (Público):**
- **Webhook:** `https://abc123.ngrok-free.app/webhook`
- **Admin Panel:** `https://abc123.ngrok-free.app/admin`
- **Dashboard:** `https://abc123.ngrok-free.app/dashboard`

---

## 🎉 Próximo Passo

Após obter a URL do ngrok:

1. **✅ Configurar webhook** no Meta for Developers
2. **✅ Testar verificação** do webhook
3. **✅ Enviar mensagem** de teste
4. **✅ Verificar resposta** automática

**🎯 Com a URL do ngrok, seu sistema estará acessível publicamente!**
