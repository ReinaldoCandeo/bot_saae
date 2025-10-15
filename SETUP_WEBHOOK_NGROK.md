# 🔧 Configuração do Webhook com ngrok - SAAE WhatsApp Bot

## 🎯 Objetivo
Configurar o webhook do WhatsApp para desenvolvimento local usando ngrok, seguindo as instruções da documentação do Meta.

## ✅ Status Atual
- ✅ Servidor rodando na porta 3000
- ✅ Webhook endpoint funcionando: `/webhook`
- ✅ Verificação de token configurada
- ✅ Banco de dados inicializado

## 🚀 Passo a Passo

### 1. **Instalar ngrok**
```bash
# macOS (com Homebrew)
brew install ngrok

# Ou baixar de: https://ngrok.com/download
```

### 2. **Iniciar o Servidor Local**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```
**Resultado esperado:**
```
🚀 Servidor rodando na porta 3000
📱 Webhook: http://localhost:3000/webhook
👨‍💼 Admin Panel: http://localhost:3000/admin
```

### 3. **Configurar ngrok (Terminal Separado)**
```bash
# Criar túnel para porta 3000
ngrok http 3000
```

**Resultado esperado:**
```
Session Status                online
Account                       [sua conta]
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

### 4. **Copiar URL do ngrok**
- Copie a URL `https://abc123.ngrok-free.app` (exemplo)
- **URL completa do webhook:** `https://abc123.ngrok-free.app/webhook`

### 5. **Configurar no Meta for Developers**

#### A. Acessar a Aplicação
1. Vá para [developers.facebook.com](https://developers.facebook.com)
2. Selecione sua aplicação SAAE WhatsApp Bot

#### B. Configurar Webhook
1. **WhatsApp** → **API Setup** → **Webhook**
2. **Callback URL:** `https://abc123.ngrok-free.app/webhook`
3. **Verify Token:** `demo_verify_token_123` (do arquivo demo.env)
4. **Webhook Fields:** Marcar:
   - ✅ `messages`
   - ✅ `message_status`

#### C. Verificar Webhook
1. Clique em **"Verify and Save"**
2. **Resultado esperado:** ✅ "Webhook verified successfully"

### 6. **Testar Configuração**

#### Teste 1: Verificação do Webhook
```bash
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```
**Resultado esperado:** `test123`

#### Teste 2: Status da API
```bash
curl "http://localhost:3000/api/status"
```

#### Teste 3: Painel Admin
- Acesse: `https://abc123.ngrok-free.app/admin`
- Verifique se carrega corretamente

### 7. **Enviar Mensagem Teste**

#### Via cURL:
```bash
curl -X POST https://abc123.ngrok-free.app/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Teste do webhook"}'
```

#### Via WhatsApp:
1. Envie uma mensagem para o número do WhatsApp Business
2. Verifique os logs do servidor
3. Confirme resposta automática

## 🔍 Verificações Importantes

### ✅ Checklist de Configuração
- [ ] Servidor rodando na porta 3000
- [ ] ngrok criando túnel HTTPS
- [ ] Webhook URL configurada no Meta
- [ ] Verify token correto
- [ ] Webhook fields marcados (messages, message_status)
- [ ] Teste de verificação passando
- [ ] Mensagem de teste funcionando

### 📊 Monitoramento
- **Logs do Servidor:** Console onde rodou `npm start`
- **Logs do ngrok:** Interface web em `http://127.0.0.1:4040`
- **Logs do Meta:** WhatsApp → API Setup → Webhook

## 🆘 Problemas Comuns

### ❌ "Webhook verification failed"
- ✅ Verificar se `WHATSAPP_WEBHOOK_VERIFY_TOKEN` está correto
- ✅ Verificar se ngrok está rodando
- ✅ Verificar se URL está acessível

### ❌ "Invalid token"
- ✅ Verificar `WHATSAPP_ACCESS_TOKEN` no .env
- ✅ Verificar se token não expirou
- ✅ Verificar permissões da aplicação

### ❌ "Messages not received"
- ✅ Verificar se webhook fields estão marcados
- ✅ Verificar logs do servidor
- ✅ Testar com mensagem simples

## 🎉 Próximos Passos

1. **Configurar Produção:** Deploy no Vercel ou VPS
2. **Personalizar Respostas:** Editar templates de mensagem
3. **Integrar Sistema SAAE:** Conectar com dados reais
4. **Treinar Equipe:** Usar painel admin
5. **Monitorar Uso:** Acompanhar estatísticas

## 📱 URLs Importantes

- **Webhook:** `https://abc123.ngrok-free.app/webhook`
- **Admin Panel:** `https://abc123.ngrok-free.app/admin`
- **API Status:** `https://abc123.ngrok-free.app/api/status`
- **Dashboard:** `https://abc123.ngrok-free.app/dashboard`

---

**🎯 Sistema pronto para receber mensagens do WhatsApp!**
