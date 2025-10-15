# 📱 BOT WHATSAPP VIA QR CODE

## 🎉 MUITO MAIS FÁCIL QUE A API OFICIAL!

### ✅ Vantagens

- ✅ **Não precisa** do Meta Business
- ✅ **Não precisa** adicionar recipients
- ✅ **Funciona** em qualquer país
- ✅ **Envia** para qualquer número
- ✅ **Só escanear** o QR Code!

### ⚠️ Desvantagens

- ⚠️ Não oficial (Meta pode bloquear)
- ⚠️ Precisa manter computador ligado
- ⚠️ Não tem suporte comercial

---

## 🚀 COMO USAR (3 PASSOS)

### 1️⃣ Iniciar o Bot

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./iniciar-bot-qrcode.sh
```

**Ou manualmente:**
```bash
node bot-qrcode.js
```

### 2️⃣ Escanear QR Code

Você verá um QR Code no terminal. 

**No seu celular:**
1. Abra o **WhatsApp**
2. Toque em **⋮** (menu) → **Aparelhos conectados**
3. Toque em **"Conectar um aparelho"**
4. **Escaneie** o QR Code na tela

### 3️⃣ PRONTO!

Depois de escanear:
- ✅ Bot conecta automaticamente
- ✅ Funciona para **QUALQUER** número
- ✅ **Sem restrições** de país!

---

## 📱 TESTE

### Do seu celular ou qualquer WhatsApp:

Envie para o **número que você conectou**:

```
menu
```

### Você vai receber:

```
🏛️ SAAE Palmital

Escolha uma opção:

1. 📋 Consulta de Conta
2. 📄 Segunda Via
3. 📅 Agendamento
4. 📞 Fale Conosco
5. 🚨 Emergências

Atendimento: Seg-Sex 8h às 17h

💡 Digite o número da opção desejada
```

**Funciona para QUALQUER número!** Sem restrições! 🎉

---

## 🎯 DIFERENÇAS

### Botões

**WhatsApp Business API (oficial):**
- Botões clicáveis nativos ✅

**WhatsApp Web (QR Code):**
- Lista numerada (digite 1, 2, 3...) 📝

**Funcionalidade é a mesma!** Só muda a interface.

---

## 🔧 RECURSOS FUNCIONANDO

Tudo funciona igualmente:

- ✅ Menu interativo
- ✅ Agendamentos
- ✅ Validação de CPF
- ✅ Consulta de conta
- ✅ Segunda via
- ✅ Sistema de estados
- ✅ Banco de dados

**A ÚNICA diferença:** Botões viram listas numeradas.

---

## 📊 LOGS

O bot mostra no terminal:

```
📨 Mensagem recebida de 5518996871823: "menu"
🤖 Processando mensagem
✅ Resposta enviada (menu com 5 opções)
```

---

## 🔄 RECONEXÃO

O bot salva a sessão em `.wwebjs_auth/`.

**Próxima vez que iniciar:**
- Não precisa escanear QR Code novamente
- Conecta automaticamente
- Continua de onde parou

---

## 🛑 PARAR O BOT

Pressione `Ctrl+C` no terminal.

---

## 🐛 PROBLEMAS?

### "Falha na autenticação"

Solução:
```bash
rm -rf .wwebjs_auth
node bot-qrcode.js
```

Escaneie o QR Code novamente.

### "QR Code não aparece"

- Aguarde alguns segundos
- Se não aparecer, pressione `Ctrl+C` e tente novamente

### "Erro ao processar mensagem"

- Verifique se o banco de dados está funcionando
- Veja os logs para mais detalhes

---

## 💡 DICAS

### Manter Rodando

Use PM2:
```bash
npm install -g pm2
pm2 start bot-qrcode.js --name "bot-whatsapp"
pm2 save
pm2 startup
```

### Ver Logs
```bash
pm2 logs bot-whatsapp
```

### Parar
```bash
pm2 stop bot-whatsapp
```

### Reiniciar
```bash
pm2 restart bot-whatsapp
```

---

## 🎉 PRONTO!

Agora você tem um bot que:

- ✅ Funciona via QR Code
- ✅ Sem limitações de país
- ✅ Envia para qualquer número
- ✅ Não precisa do Meta Business
- ✅ Super fácil de usar!

---

## 🔄 VOLTAR PARA API OFICIAL?

Se quiser voltar para a versão com WhatsApp Business API:

```bash
# Parar bot QR Code
Ctrl+C

# Iniciar versão API
npm start
```

---

**Aproveite seu bot! 🚀**

**Qualquer dúvida, veja os logs no terminal!**

