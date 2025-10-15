# 🚀 COMO INICIAR SEU CHATBOT

## ✅ SEU BOT JÁ ESTÁ RODANDO!

Se você vê isso no terminal:
```
🚀 Servidor rodando na porta 3000
```

**Parabéns! Seu bot já está funcionando!** 🎉

---

## 🎮 3 FORMAS DE USAR

### 1️⃣ Script Interativo (Mais Fácil!)

No terminal, digite:

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./testar-bot-agora.sh
```

Você verá um menu assim:

```
🤖 ==================================
   TESTE DO BOT DE TRIAGEM
==================================

Escolha o que fazer:

1) Enviar 'menu' e ver menu principal
2) Clicar em 'Agendamento'
3) Clicar em 'Consulta de Conta'
4) Enviar mensagem personalizada
5) Ver últimas conversas no banco
6) Ver logs do servidor
7) Verificar se servidor está rodando
0) Sair

Digite sua opção:
```

**É SÓ DIGITAR O NÚMERO E APERTAR ENTER!** 🎯

---

### 2️⃣ Dashboard Web (Visual)

Abra no navegador:

```
http://localhost:3000/admin
```

Ou cole este comando no terminal:
```bash
open http://localhost:3000/admin
```

---

### 3️⃣ Comandos Manuais (Avançado)

#### Testar menu:
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
            "id": "msg_'$(date +%s)'",
            "timestamp": "'$(date +%s)'",
            "text": {"body": "menu"}
          }]
        }
      }]
    }]
  }'
```

#### Ver logs:
```bash
tail -f server_output.log
```

#### Ver banco de dados:
```bash
sqlite3 database/saae_bot_demo.db "SELECT * FROM users;"
```

---

## 🔄 SE O BOT NÃO ESTIVER RODANDO

### Para INICIAR o bot pela primeira vez:

```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```

### Para REINICIAR o bot:

```bash
# 1. Parar o servidor atual
lsof -ti:3000 | xargs kill -9

# 2. Iniciar novamente
npm start
```

---

## 📊 Status do Bot

Para ver se está funcionando:

```bash
curl http://localhost:3000/health
```

Se retornar `{"status":"healthy",...}` = **Tudo OK!** ✅

---

## ❓ Problemas Comuns

### "Porta 3000 já está em uso"
**Solução:** Você já tem um bot rodando! Não precisa iniciar outro.

Para parar:
```bash
lsof -ti:3000 | xargs kill -9
```

### "Servidor não responde"
**Solução:** Inicie o servidor:
```bash
npm start
```

### "Erro de banco de dados"
**Solução:** O banco será criado automaticamente no primeiro start.

---

## 🎯 COMECE AGORA!

**Recomendo começar pelo script interativo:**

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./testar-bot-agora.sh
```

**É o jeito mais fácil de testar tudo!** 🚀

---

## 📚 Mais Documentação

- `RESUMO_BOT_TRIAGEM.md` - O que foi implementado
- `GUIA_BOT_TRIAGEM.md` - Guia técnico completo
- `TESTAR_BOT_LOCAL.md` - Testes avançados
- `EXEMPLOS_BOTOES.md` - Como os botões aparecem

---

**Qualquer dúvida, veja os arquivos de documentação acima!** 📖

