# 🚀 INÍCIO RÁPIDO - INTEGRAÇÃO WHATSAPP

## 🎯 2 FORMAS DE INTEGRAR

---

## ⚡ OPÇÃO 1: Script Automático (RECOMENDADO!)

### Passo Único:
```bash
cd /Users/reinaldocandeo/Desktop/Postman
./configurar-whatsapp.sh
```

O script vai:
- ✅ Verificar ngrok
- ✅ Configurar credenciais
- ✅ Iniciar ngrok
- ✅ Iniciar servidor
- ✅ Te guiar no resto

**Você só precisa:**
1. Ter as credenciais do Meta
2. Seguir as instruções na tela

---

## 📖 OPÇÃO 2: Manual (Passo a Passo)

### ANTES DE COMEÇAR

Obtenha estas 3 informações do Meta:

1. **PHONE_NUMBER_ID**
   - Meta for Developers → Seu App → WhatsApp → API Setup
   - Exemplo: `123456789012345`

2. **ACCESS_TOKEN** (Permanente)
   - Meta Business → System Users → Gerar Token
   - Exemplo: `EAAG1x2y3z...`

3. **WEBHOOK_VERIFY_TOKEN** (você inventa)
   - Qualquer senha
   - Exemplo: `saae2024webhook`

---

### PASSO 1: Configurar .env

```bash
cd /Users/reinaldocandeo/Desktop/Postman
cp demo.env .env
nano .env
```

Cole:
```env
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id_aqui
WHATSAPP_ACCESS_TOKEN=seu_token_aqui
WHATSAPP_WEBHOOK_VERIFY_TOKEN=sua_senha_aqui
NODE_ENV=production
PORT=3000
DB_PATH=./database/saae_bot.db
WEBHOOK_URL=http://localhost:3000
```

Salvar: `Ctrl+O`, `Enter`, `Ctrl+X`

---

### PASSO 2: Iniciar ngrok

**Terminal 1:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

Você verá:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

**COPIE essa URL!**

---

### PASSO 3: Atualizar .env com URL do ngrok

```bash
nano .env
```

Mude:
```env
WEBHOOK_URL=https://abc123.ngrok.io
```

(Use a URL que o ngrok mostrou)

Salvar: `Ctrl+O`, `Enter`, `Ctrl+X`

---

### PASSO 4: Iniciar servidor

**Terminal 2:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman

# Parar servidor demo se estiver rodando
lsof -ti:3000 | xargs kill -9

# Iniciar em produção
npm start
```

---

### PASSO 5: Configurar webhook no Meta

1. Acesse: https://developers.facebook.com
2. Seu App → WhatsApp → Configuração → Webhook
3. Clique em **"Editar"**

Configure:

**Callback URL:**
```
https://abc123.ngrok.io/webhook
```
(Sua URL do ngrok + /webhook)

**Verify Token:**
```
saae2024webhook
```
(O mesmo do .env)

4. Clique em **"Verificar e salvar"**
5. Marque o campo **"messages"**
6. Clique em **"Salvar"**

---

### PASSO 6: TESTAR!

Do seu WhatsApp, envie para o número do bot:

```
menu
```

Você deve receber um menu com 5 botões! 🎉

---

## 🎯 GUIAS DETALHADOS

- 📖 **INTEGRAR_WHATSAPP_BUSINESS.md** - Guia completo passo a passo
- 🔧 **configurar-whatsapp.sh** - Script automático
- 📚 **COMO_OBTER_CREDENCIAIS.md** - Como pegar as credenciais

---

## ⚠️ IMPORTANTE

### Manter Funcionando

Você precisa manter **2 terminais abertos**:

**Terminal 1 - Ngrok:**
```bash
./ngrok http 3000
```
→ Não feche! Se fechar, a URL muda

**Terminal 2 - Servidor:**
```bash
npm start
```
→ Seu bot está aqui

---

## 🐛 Problemas Comuns

### "Webhook verification failed"
→ Token do .env diferente do Meta  
→ Verifique se são EXATAMENTE iguais

### "Invalid access token"
→ Token expirou ou está errado  
→ Gere um novo token PERMANENTE no Meta

### Bot não recebe mensagens
→ Campo "messages" não está marcado  
→ Vá no Meta → Webhook → Marque "messages"

### Ngrok não funciona
→ Execute: `chmod +x ngrok`  
→ Ou baixe de: https://ngrok.com/download

---

## 📊 Verificar Status

### Servidor está rodando?
```bash
curl http://localhost:3000/health
```

### Ver logs em tempo real:
```bash
tail -f startup.log
```

### Ver conversas no banco:
```bash
sqlite3 database/saae_bot.db "SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 5;"
```

---

## 🎉 PRONTO!

Se seguiu todos os passos, seu bot está integrado com WhatsApp!

**Teste enviando "menu" do seu WhatsApp!** 📱

---

## 💡 Dica

Use o **script automático** para facilitar:
```bash
./configurar-whatsapp.sh
```

Ele faz quase tudo automaticamente! 🚀

