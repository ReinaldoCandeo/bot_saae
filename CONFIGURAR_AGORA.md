# 🚀 SEU BOT ESTÁ QUASE PRONTO!

## ✅ O QUE JÁ ESTÁ CONFIGURADO

- ✅ Credenciais do WhatsApp no arquivo `.env`
- ✅ API do WhatsApp funcionando (você recebeu "Hello World")
- ✅ Bot com botões interativos pronto
- ✅ Validação de CPF
- ✅ Sistema de agendamento

## 🎯 FALTAM APENAS 3 PASSOS!

---

## PASSO 1: Iniciar NGROK

**Abra um NOVO terminal** (⌘ + T) e execute:

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

Você verá algo assim:
```
Forwarding    https://abc123def456.ngrok.io -> http://localhost:3000
```

**✏️ COPIE essa URL** (https://abc123def456.ngrok.io)

⚠️ **NÃO FECHE ESTE TERMINAL!**

---

## PASSO 2: Atualizar .env com URL do ngrok

**Abra outro terminal** e execute:

```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

Encontre a linha:
```
WEBHOOK_URL=http://localhost:3000
```

Mude para (cole SUA URL do ngrok):
```
WEBHOOK_URL=https://abc123def456.ngrok.io
```

**Salvar:**
- Pressione `Ctrl+O`
- Pressione `Enter`
- Pressione `Ctrl+X`

---

## PASSO 3: Iniciar servidor em PRODUÇÃO

No mesmo terminal, execute:

```bash
npm start
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
✅ WhatsApp API configurada
```

⚠️ **NÃO FECHE ESTE TERMINAL!**

---

## PASSO 4: Configurar WEBHOOK no Meta

### 4.1. Acessar o painel

1. Acesse: https://developers.facebook.com
2. Vá em **"Meus Aplicativos"**
3. Selecione seu app
4. No menu lateral, clique em **"WhatsApp"** → **"Configuração"**
5. Role até **"Webhooks"**
6. Clique em **"Configurar"** ou **"Editar"**

### 4.2. Configurar

Preencha:

**Callback URL:**
```
https://abc123def456.ngrok.io/webhook
```
*(Use SUA URL do ngrok + /webhook)*

**Verify Token:**
```
saae_bot_2024_webhook_secret
```
*(Exatamente como está aqui)*

### 4.3. Verificar

1. Clique em **"Verificar e salvar"**
2. Deve aparecer ✅ **"Verificado"**
3. Se der erro:
   - Verifique se ngrok está rodando
   - Verifique se servidor está rodando
   - Verifique se o token está EXATAMENTE igual

### 4.4. Assinar campos

Depois de verificar:

1. Clique em **"Gerenciar"** (ao lado do webhook configurado)
2. Marque estes campos:
   - [x] **messages**
   - [x] **message_status**
3. Clique em **"Salvar"**

---

## 🎉 PASSO 5: TESTAR!

### Do seu WhatsApp (5518996871823), envie para o número do bot:

```
menu
```

### Você deve receber:

```
┌─────────────────────────────────┐
│  🏛️ SAAE Palmital               │
│  Escolha uma opção:             │
│                                 │
│  [📋 Consulta de Conta]         │
│  [📄 Segunda Via]               │
│  [📅 Agendamento]               │
│  [📞 Fale Conosco]              │
│  [🚨 Emergências]               │
└─────────────────────────────────┘
```

**5 BOTÕES CLICÁVEIS!** 🎊

---

## 📊 VERIFICAR STATUS

### Ver logs do servidor:
```bash
tail -f startup.log
```

### Ver conversas no banco:
```bash
sqlite3 database/saae_bot.db "SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 3;"
```

### Testar health:
```bash
curl http://localhost:3000/health
```

---

## 🐛 PROBLEMAS?

### "Webhook verification failed"
→ Token não confere  
→ Verifique se é exatamente: `saae_bot_2024_webhook_secret`

### "Invalid URL"
→ ngrok não está rodando  
→ Execute: `./ngrok http 3000`

### Bot não responde
→ Verifique se campo "messages" está marcado no Meta  
→ Veja os logs: `tail -f startup.log`

### Porta 3000 em uso
→ Mate o processo: `lsof -ti:3000 | xargs kill -9`  
→ Inicie novamente: `npm start`

---

## 💡 RESUMO RÁPIDO

Você precisa de **3 terminais abertos**:

**Terminal 1 - Ngrok:**
```bash
./ngrok http 3000
```

**Terminal 2 - Servidor:**
```bash
npm start
```

**Terminal 3 - Você (para testar):**
```bash
tail -f startup.log  # Ver logs
```

---

## ✅ CHECKLIST

Antes de testar, verifique:

- [ ] Arquivo .env criado com credenciais
- [ ] Ngrok rodando (Terminal 1)
- [ ] .env atualizado com URL do ngrok
- [ ] Servidor rodando (Terminal 2)
- [ ] Webhook configurado no Meta
- [ ] Campo "messages" marcado no Meta
- [ ] Pronto para testar!

---

## 🎯 COMEÇAR AGORA

### Terminal 1 (Ngrok):
```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

### Terminal 2 (depois de atualizar .env):
```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```

### WhatsApp:
```
Envie: menu
```

---

## 🎉 PRONTO!

Se seguiu todos os passos, seu bot está funcionando no WhatsApp!

**Teste enviando "menu" agora!** 📱

---

## 📞 SEUS DADOS

- **Phone Number ID:** 843537608838560
- **Seu número:** 5518996871823
- **Token configurado:** ✅
- **Webhook Token:** saae_bot_2024_webhook_secret

---

**BOA SORTE! 🚀**

Seu bot vai responder com botões interativos! 🎊

