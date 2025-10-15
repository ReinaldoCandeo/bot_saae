# 🚀 Início Rápido - Bot de Triagem WhatsApp

## ⚡ 3 Passos para Começar

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Testar em Modo Demo

```bash
NODE_ENV=demo node server.js
```

Você verá:
```
✅ Banco de dados inicializado
✅ Servidor rodando na porta 3000
🎭 Modo Demonstração Ativado
```

### 3️⃣ Simular Mensagem

Em outro terminal:

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "5518999999999",
            "type": "text",
            "id": "msg_123",
            "timestamp": "'$(date +%s)'",
            "text": { "body": "menu" }
          }]
        }
      }]
    }]
  }'
```

Você verá no terminal do servidor:
```
🤖 Processando mensagem do usuário 5518999999999: menu
📤 Enviando mensagem interactive para 5518999999999
🎭 DEMO: Simulando envio de mensagem
✅ Mensagem processada com sucesso
```

## ✅ Pronto!

Seu bot está funcionando! 🎉

### Próximos Passos:

1. **Testar outros comandos:**
   - "consulta"
   - "segunda via"
   - "agendamento"
   - "emergencia"

2. **Ver dados salvos:**
   ```bash
   sqlite3 database/saae_bot_demo.db "SELECT * FROM users;"
   ```

3. **Ver logs:**
   ```bash
   tail -f startup.log
   ```

4. **Ler documentação:**
   - 📖 `GUIA_BOT_TRIAGEM.md` - Guia completo
   - 🧪 `TESTAR_BOT_LOCAL.md` - Testes locais
   - 📱 `EXEMPLOS_BOTOES.md` - Exemplos visuais
   - 📋 `RESUMO_BOT_TRIAGEM.md` - Resumo executivo

## 🎯 Para Usar com WhatsApp Real

1. Configurar `.env`:
   ```env
   WHATSAPP_PHONE_NUMBER_ID=seu_id
   WHATSAPP_ACCESS_TOKEN=seu_token
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_verify_token
   ```

2. Iniciar ngrok:
   ```bash
   ./ngrok http 3000
   ```

3. Configurar webhook no Meta Business Manager

4. Iniciar servidor:
   ```bash
   npm start
   ```

## 💡 Comandos Úteis

```bash
# Iniciar modo demo
NODE_ENV=demo node server.js

# Iniciar produção
npm start

# Ver logs
tail -f startup.log

# Limpar banco demo
rm database/saae_bot_demo.db

# Testar health
curl http://localhost:3000/health
```

## 📱 Dashboard Web

Acesse: http://localhost:3000/admin

## 🆘 Problemas?

Veja: `RESUMO_BOT_TRIAGEM.md` seção "Precisa de Ajuda?"

---

**🎉 Bom uso do seu bot de triagem!**

