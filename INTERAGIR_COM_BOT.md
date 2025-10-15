# 🤖 Como Interagir com seu Bot WhatsApp - SAAE

## ✅ Status Atual do Sistema

- ✅ **Servidor rodando** na porta 3000
- ✅ **URL pública:** https://saae-whatsapp-bot.loca.lt
- ✅ **Webhook funcionando:** https://saae-whatsapp-bot.loca.lt/webhook
- ✅ **Conversas ativas:** 2 usuários testando
- ✅ **Bot respondendo** automaticamente

## 🎯 Formas de Interagir com seu Bot

### **1. Via Interface Web (Dashboard)**

#### **Dashboard Simplificado:**
```
https://saae-whatsapp-bot.loca.lt/dashboard-simple
```
**Senha:** `177.8.50.250`

**Funcionalidades:**
- 📊 Ver estatísticas em tempo real
- 💬 Monitorar conversas ativas
- 📱 Ver status do WhatsApp API
- 🔄 Atualizar dados automaticamente

### **2. Via API (Simulação de Mensagens)**

#### **Enviar Mensagem de Teste:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"SEU_COMANDO_AQUI"}'
```

#### **Exemplos de Comandos para Testar:**

##### **Menu Principal:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"menu"}'
```

##### **Ajuda:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"ajuda"}'
```

##### **Consultar Conta:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"conta"}'
```

##### **Falar com Atendente:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"atendente"}'
```

##### **Relatar Vazamento:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"vazamento"}'
```

### **3. Via WhatsApp Real (Após Configurar Meta)**

#### **Para configurar WhatsApp real:**

1. **Acesse:** https://developers.facebook.com
2. **Configure webhook:**
   - **URL:** `https://saae-whatsapp-bot.loca.lt/webhook`
   - **Token:** `demo_verify_token_123`
3. **Envie mensagens** para seu número WhatsApp Business

## 📱 Comandos Disponíveis no Bot

### **Comandos Principais:**
- `menu` - Mostra menu principal
- `ajuda` - Lista comandos disponíveis
- `conta` - Consulta dados da conta
- `atendente` - Fala com atendente humano
- `vazamento` - Relata vazamento de água
- `horario` - Horário de funcionamento
- `endereco` - Endereço do SAAE
- `telefone` - Telefone de contato

### **Estados de Conversa:**
- `menu` - Menu principal
- `waiting_cpf` - Aguardando CPF
- `waiting_address` - Aguardando endereço
- `waiting_contact` - Aguardando contato

## 🧪 Teste Rápido - Sequência Completa

### **1. Teste do Menu:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"menu"}'
```

### **2. Teste de Ajuda:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"ajuda"}'
```

### **3. Teste de Conta:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"conta"}'
```

### **4. Verificar Respostas:**
```bash
curl -s "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print('📊 ESTATÍSTICAS:')
print(f'Total de mensagens: {data[\"data\"][\"stats\"][\"total_messages\"]}')
print(f'Usuários únicos: {data[\"data\"][\"stats\"][\"unique_users\"]}')
print(f'Conversas ativas: {len(data[\"data\"][\"activeConversations\"])}')
print()
print('💬 CONVERSAS ATIVAS:')
for conv in data['data']['activeConversations']:
    print(f'- {conv[\"phone_number\"]}: {conv[\"message_count\"]} msgs, estado: {conv[\"conversation_state\"]}')
"
```

## 📊 Monitoramento em Tempo Real

### **Dashboard:**
- **URL:** https://saae-whatsapp-bot.loca.lt/dashboard-simple
- **Senha:** `177.8.50.250`

### **APIs de Monitoramento:**
- **Status:** https://saae-whatsapp-bot.loca.lt/api/status
- **Health:** https://saae-whatsapp-bot.loca.lt/health
- **Dashboard:** https://saae-whatsapp-bot.loca.lt/admin/api/dashboard

## 🔍 Verificar Logs do Servidor

### **Logs em Tempo Real:**
Os logs aparecem no terminal onde você rodou `npm start`:

```
📱 Processando mensagem: {
  from: '5511999999999',
  id: 'test_1760447354902',
  timestamp: '1760447354',
  text: { body: 'menu' },
  type: 'text'
}
🤖 Processando mensagem do usuário 5511999999999: menu
🎭 DEMO: Simulando envio de mensagem text para 5511999999999
📝 Conteúdo: [RESPOSTA DO BOT]
✅ Conversa salva: [ID]
✅ Mensagem processada com sucesso
```

## 🎯 Exemplo de Interação Completa

### **Simulando uma conversa:**

1. **Usuário envia "menu":**
   ```bash
   curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber":"5511999999999","message":"menu"}'
   ```

2. **Usuário envia "conta":**
   ```bash
   curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber":"5511999999999","message":"conta"}'
   ```

3. **Usuário envia "ajuda":**
   ```bash
   curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
     -H "Content-Type: application/json" \
     -d '{"phoneNumber":"5511999999999","message":"ajuda"}'
   ```

4. **Verificar resultado:**
   ```bash
   curl -s "https://saae-whatsapp-bot.loca.lt/admin/api/dashboard" | python3 -c "
   import sys, json
   data = json.load(sys.stdin)
   print('Conversas:', len(data['data']['activeConversations']))
   for conv in data['data']['activeConversations']:
       print(f'- {conv[\"phone_number\"]}: {conv[\"message_count\"]} mensagens')
   "
   ```

## 🚀 Próximos Passos

1. **✅ Testar comandos** via API
2. **📊 Monitorar** via dashboard
3. **🔧 Configurar** webhook real no Meta
4. **💬 Testar** com WhatsApp real
5. **📱 Personalizar** respostas do bot

---

## 🎉 Seu Bot está Pronto!

**🤖 Sistema funcionando perfeitamente:**
- ✅ Bot respondendo comandos
- ✅ Dashboard funcionando
- ✅ APIs ativas
- ✅ Conversas sendo salvas
- ✅ Logs em tempo real

**🎯 Comece testando agora:**
```bash
curl -X POST https://saae-whatsapp-bot.loca.lt/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"menu"}'
```
