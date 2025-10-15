# 🧪 Testar Bot de Triagem Localmente

## 📋 Pré-requisitos

- Node.js instalado
- Dependências instaladas (`npm install`)
- Arquivo `.env` configurado

## 🎭 Modo Demonstração (Sem WhatsApp Real)

### 1. Configurar Modo Demo

Edite o arquivo `.env` ou use `demo.env`:

```bash
NODE_ENV=demo
WHATSAPP_PHONE_NUMBER_ID=demo_phone_id
WHATSAPP_ACCESS_TOKEN=demo_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify
WEBHOOK_URL=http://localhost:3000
PORT=3000
DB_PATH=./database/saae_bot_demo.db
```

### 2. Iniciar o Servidor

```bash
# Usando demo.env
node demo.js

# Ou manualmente
NODE_ENV=demo node server.js
```

Você verá:
```
🎭 Modo Demonstração Ativado
✅ Banco de dados inicializado
✅ Servidor rodando na porta 3000
```

### 3. Testar Endpoints

#### Verificar Saúde do Servidor
```bash
curl http://localhost:3000/health
```

Resposta:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "mode": "demo"
}
```

#### Simular Webhook (Receber Mensagem)

**Mensagem de Texto:**
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
            "text": {
              "body": "menu"
            }
          }]
        }
      }]
    }]
  }'
```

**Clique em Botão:**
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
            "type": "interactive",
            "id": "msg_124",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "btn_1",
                "title": "📋 Consulta de Conta"
              }
            }
          }]
        }
      }]
    }]
  }'
```

## 🔍 Testar Funcionalidades Específicas

### Teste 1: Menu Principal

```bash
# Enviar "menu"
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
            "text": { "body": "menu" }
          }]
        }
      }]
    }]
  }'
```

**Resultado Esperado:**
```
🤖 Processando mensagem do usuário 5518999999999: menu
👤 Estado do usuário 5518999999999 atualizado para: menu
📤 Enviando mensagem interactive para 5518999999999
🎭 DEMO: Simulando envio de mensagem interactive para 5518999999999
✅ Mensagem processada com sucesso
```

### Teste 2: Consulta de Conta com CPF

**Passo 1 - Clicar em "Consulta de Conta":**
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
            "type": "interactive",
            "id": "msg_'$(date +%s)'",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "btn_1",
                "title": "📋 Consulta de Conta"
              }
            }
          }]
        }
      }]
    }]
  }'
```

**Passo 2 - Enviar CPF válido:**
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
            "text": { "body": "12345678909" }
          }]
        }
      }]
    }]
  }'
```

**Passo 3 - Testar CPF inválido:**
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
            "text": { "body": "11111111111" }
          }]
        }
      }]
    }]
  }'
```

### Teste 3: Agendamento Completo

**Passo 1 - Menu de Agendamento:**
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
            "type": "interactive",
            "id": "msg_'$(date +%s)'",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "btn_3",
                "title": "📅 Agendamento"
              }
            }
          }]
        }
      }]
    }]
  }'
```

**Passo 2 - Escolher "Ligação de Água":**
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
            "type": "interactive",
            "id": "msg_'$(date +%s)'",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "sched_1",
                "title": "💧 Ligação de Água"
              }
            }
          }]
        }
      }]
    }]
  }'
```

**Passo 3 - Enviar Dados:**
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
            "text": { 
              "body": "João Silva, 12345678909, Rua das Flores 123, 18999999999, Ligação nova" 
            }
          }]
        }
      }]
    }]
  }'
```

**Passo 4 - Confirmar:**
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
            "type": "interactive",
            "id": "msg_'$(date +%s)'",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "confirm_yes",
                "title": "✅ Confirmar"
              }
            }
          }]
        }
      }]
    }]
  }'
```

## 📊 Verificar Banco de Dados

### Instalar SQLite CLI
```bash
# macOS
brew install sqlite3

# Ubuntu/Debian
sudo apt-get install sqlite3

# Windows
# Baixar de https://www.sqlite.org/download.html
```

### Consultar Dados

```bash
# Abrir banco de dados
sqlite3 database/saae_bot_demo.db

# Ver todas as tabelas
.tables

# Ver usuários
SELECT * FROM users;

# Ver conversas
SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 10;

# Ver agendamentos
SELECT * FROM appointments ORDER BY created_at DESC;

# Ver logs do webhook
SELECT * FROM webhook_logs ORDER BY timestamp DESC LIMIT 10;

# Sair
.quit
```

### Queries Úteis

```sql
-- Ver estatísticas de uso
SELECT 
  date,
  total_messages,
  unique_users
FROM statistics
ORDER BY date DESC;

-- Ver agendamentos por status
SELECT 
  status,
  COUNT(*) as total
FROM appointments
GROUP BY status;

-- Ver últimas interações de um usuário
SELECT 
  type,
  message_type,
  content,
  timestamp
FROM conversations
WHERE phone_number = '5518999999999'
ORDER BY timestamp DESC
LIMIT 20;
```

## 🐛 Debug e Troubleshooting

### Ver Logs em Tempo Real

```bash
# Terminal 1 - Servidor
NODE_ENV=demo node server.js

# Terminal 2 - Logs
tail -f startup.log
```

### Logs Detalhados

Edite `server.js` e adicione:
```javascript
// Ativar logs detalhados
process.env.DEBUG = 'whatsapp:*';
```

### Limpar Banco de Dados de Teste

```bash
# Remover banco de dados demo
rm database/saae_bot_demo.db

# Reiniciar servidor (vai recriar o banco)
NODE_ENV=demo node server.js
```

### Resetar Estado de um Usuário

```bash
sqlite3 database/saae_bot_demo.db "UPDATE users SET conversation_state='menu', conversation_data=NULL WHERE phone_number='5518999999999';"
```

## 🔄 Scripts de Teste Automatizado

Crie um arquivo `test-bot.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:3000"
PHONE="5518999999999"

echo "🧪 Testando Bot de Triagem..."

# Teste 1: Menu
echo "📋 Teste 1: Menu Principal"
curl -s -X POST $BASE_URL/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "'$PHONE'",
            "type": "text",
            "id": "msg_test_1",
            "timestamp": "'$(date +%s)'",
            "text": { "body": "menu" }
          }]
        }
      }]
    }]
  }' > /dev/null

echo "✅ Menu enviado"
sleep 2

# Teste 2: Consulta de Conta
echo "📋 Teste 2: Consulta de Conta"
curl -s -X POST $BASE_URL/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "'$PHONE'",
            "type": "interactive",
            "id": "msg_test_2",
            "timestamp": "'$(date +%s)'",
            "interactive": {
              "type": "button_reply",
              "button_reply": {
                "id": "btn_1",
                "title": "Consulta de Conta"
              }
            }
          }]
        }
      }]
    }]
  }' > /dev/null

echo "✅ Consulta solicitada"
sleep 2

# Teste 3: CPF Válido
echo "📋 Teste 3: CPF Válido"
curl -s -X POST $BASE_URL/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "'$PHONE'",
            "type": "text",
            "id": "msg_test_3",
            "timestamp": "'$(date +%s)'",
            "text": { "body": "12345678909" }
          }]
        }
      }]
    }]
  }' > /dev/null

echo "✅ CPF enviado"

echo ""
echo "🎉 Testes concluídos! Verifique os logs."
```

Tornar executável e rodar:
```bash
chmod +x test-bot.sh
./test-bot.sh
```

## 📱 Testar Interface Web

Acesse o dashboard:
```bash
# Abrir no navegador
open http://localhost:3000
```

Funcionalidades do dashboard:
- Ver conversas em tempo real
- Consultar agendamentos
- Ver estatísticas
- Logs do sistema

## ✅ Checklist de Testes

Antes de usar em produção, teste:

- [ ] Menu principal carrega
- [ ] Botões são clicáveis
- [ ] CPF válido é aceito
- [ ] CPF inválido é rejeitado
- [ ] Agendamento completo funciona
- [ ] Confirmação com botões funciona
- [ ] Dados são salvos no banco
- [ ] Horário comercial é verificado
- [ ] Mensagens fora do horário aparecem
- [ ] Emergências funcionam 24h
- [ ] Estado da conversa é mantido
- [ ] Voltar ao menu funciona
- [ ] Segunda via funciona
- [ ] Contatos são exibidos
- [ ] Logs são gravados
- [ ] Webhook responde corretamente

## 🎯 Próximos Passos

Depois de testar localmente:

1. Configure webhook real no ngrok
2. Configure credenciais do Meta
3. Teste com número real do WhatsApp
4. Deploy em produção
5. Monitore os logs

## 📚 Recursos Adicionais

- [Documentação WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Guia Bot de Triagem](./GUIA_BOT_TRIAGEM.md)
- [Configuração Rápida](./CONFIGURACAO_RAPIDA.md)
- [Deploy Vercel](./DEPLOY_VERCEL.md)

---

**Dica:** Use o modo demo para desenvolver novas funcionalidades sem gastar créditos da API do WhatsApp!

