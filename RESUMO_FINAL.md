# 📱 RESUMO: Como Conectar WhatsApp ao Bot

## 🎯 **O QUE VOCÊ PRECISA FAZER (Resumo Ultra Rápido)**

```
1. Entrar no Meta → Criar App → Adicionar WhatsApp
2. Copiar 4 credenciais
3. Colar no arquivo .env
4. Rodar sistema + ngrok
5. Configurar webhook no Meta
6. Testar no WhatsApp ✅
```

---

## 📚 **DOCUMENTAÇÃO COMPLETA CRIADA**

### **🚀 Comece por aqui:**
- **[COMECE_AQUI.md](COMECE_AQUI.md)** - Início rápido e visão geral

### **📖 Guias passo a passo:**
1. **[GUIA_META_PASSO_A_PASSO.md](GUIA_META_PASSO_A_PASSO.md)** - 9 passos detalhados
2. **[CHECKLIST_META.md](CHECKLIST_META.md)** - Lista de verificação
3. **[ONDE_ENCONTRAR_CREDENCIAIS.md](ONDE_ENCONTRAR_CREDENCIAIS.md)** - Guia visual

### **⚙️ Configuração técnica:**
- **[CONFIGURAR_WHATSAPP.md](CONFIGURAR_WHATSAPP.md)** - Setup completo

### **🛠️ Scripts auxiliares:**
- **`validar-credenciais.sh`** - Valida suas credenciais
- **`test-whatsapp.sh`** - Teste automático com ngrok
- **`production.env`** - Template de configuração

---

## 🔑 **AS 4 CREDENCIAIS QUE VOCÊ PRECISA**

| # | Credencial | Onde Encontrar | Tamanho |
|---|------------|----------------|---------|
| 1 | **Phone Number ID** | developers.facebook.com → App → WhatsApp → API Setup | ~15 dígitos |
| 2 | **Access Token** | business.facebook.com → Ativos de sistema → Gerar token | ~200 chars |
| 3 | **Business Account ID** | developers.facebook.com → App → WhatsApp → API Setup | ~15 dígitos |
| 4 | **Verify Token** | VOCÊ CRIA (qualquer texto seguro) | 10+ chars |

---

## 🎬 **PASSO A PASSO RESUMIDO**

### **1. Criar App no Meta** (20 min)
```
1. Ir para: https://developers.facebook.com
2. "Meus Apps" → "Criar App" → "Business"
3. Nome: SAAE WhatsApp Bot
4. Adicionar produto: WhatsApp
5. Copiar as 4 credenciais
```

### **2. Configurar Sistema** (5 min)
```bash
# Copiar template
cp production.env .env

# Editar com suas credenciais
nano .env

# Colar as 4 credenciais
# Salvar: Ctrl+O, Enter, Ctrl+X

# Validar credenciais
./validar-credenciais.sh
```

### **3. Testar Localmente** (10 min)
```bash
# Terminal 1: Instalar ngrok
brew install ngrok

# Terminal 1: Iniciar servidor
npm start

# Terminal 2: Expor publicamente
ngrok http 3000

# Copiar URL do ngrok (https://abc123.ngrok.io)
```

### **4. Configurar Webhook no Meta** (5 min)
```
1. developers.facebook.com → Sua App → WhatsApp → Configuração
2. Webhook → Editar
3. Callback URL: https://abc123.ngrok.io/webhook
4. Verify Token: (mesmo que você colocou no .env)
5. Marcar: messages, message_status
6. Verificar e salvar → ✅ deve aparecer checkmark verde
```

### **5. Testar no WhatsApp** (2 min)
```
1. Adicionar seu número em "Para" no Meta
2. Abrir WhatsApp no celular
3. Enviar mensagem para o número de teste
4. Digite: menu
5. Bot responde! 🎉
```

---

## ⏱️ **TEMPO TOTAL: ~50 minutos**

---

## 🧪 **COMANDOS ÚTEIS**

### **Validar credenciais:**
```bash
./validar-credenciais.sh
```

### **Testar com ngrok (automático):**
```bash
./test-whatsapp.sh
```

### **Testar manualmente:**
```bash
# Terminal 1
npm start

# Terminal 2
ngrok http 3000

# Terminal 3
curl http://localhost:3000/api/status
```

### **Ver logs:**
```bash
tail -f logs/combined.log
```

### **Dashboard:**
```
http://localhost:3000/dashboard
```

---

## 🆘 **PROBLEMAS COMUNS & SOLUÇÕES**

### **❌ "Token inválido"**
```bash
# Verificar se token está correto
cat .env | grep WHATSAPP_ACCESS_TOKEN

# Deve começar com "EAA" e ter ~200 caracteres
# Se não, regenerar token permanente no Meta
```

### **❌ "Webhook não verificou"**
```bash
# Verificar se verify token é igual
cat .env | grep WHATSAPP_WEBHOOK_VERIFY_TOKEN

# Deve ser EXATAMENTE igual ao configurado no Meta
# Testar manualmente:
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"
```

### **❌ "Mensagens não chegam"**
```
1. Verificar se webhook está configurado no Meta
2. Verificar se seu número está na lista "Para"
3. Verificar se ngrok está rodando
4. Ver logs do servidor: tail -f logs/combined.log
```

### **❌ "Bot não responde"**
```bash
# Verificar se servidor está rodando
ps aux | grep node

# Verificar logs
tail -f logs/combined.log

# Reiniciar servidor
pkill -f "node.*demo.js"
npm start
```

---

## ✅ **CHECKLIST RÁPIDO**

Antes de começar:
- [ ] Conta Facebook/Meta
- [ ] Node.js instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] WhatsApp no celular

Configuração Meta:
- [ ] App Business criada
- [ ] WhatsApp adicionado
- [ ] Phone Number ID copiado
- [ ] Access Token permanente gerado
- [ ] Business Account ID copiado
- [ ] Verify Token criado

Configuração Local:
- [ ] Arquivo .env criado
- [ ] 4 credenciais coladas
- [ ] `./validar-credenciais.sh` passou ✅
- [ ] `npm start` funcionando
- [ ] ngrok instalado e rodando

Configuração Webhook:
- [ ] URL do ngrok copiada
- [ ] Webhook configurado no Meta
- [ ] Checkmark verde apareceu ✅
- [ ] Campos messages e message_status marcados

Teste Final:
- [ ] Número adicionado em "Para"
- [ ] Mensagem enviada via WhatsApp
- [ ] Bot respondeu ✅
- [ ] Dashboard mostra conversa

---

## 📞 **PRECISA DE AJUDA?**

**Me avise em qual passo você está e qual o problema:**

Exemplos:
- "Não encontro o Phone Number ID"
- "Webhook dá erro de verificação"
- "Bot não responde no WhatsApp"
- "Token expira rapidamente"

**Eu te ajudo especificamente nesse ponto!**

---

## 🎉 **APÓS CONECTAR COM SUCESSO**

Você terá:
- ✅ Bot funcionando no WhatsApp real
- ✅ Dashboard administrativo ativo
- ✅ Logs de todas as conversas
- ✅ Sistema pronto para produção

**Próximo passo:**
Deploy na VM Proxmox usando:
```bash
./deploy-to-vm.sh
```

Ou consulte: **[INSTRUCOES_VM.md](INSTRUCOES_VM.md)**

---

## 📊 **MONITORAMENTO**

Após sistema ativo:

### **URLs úteis:**
```
http://localhost:3000/api/status       # Status da API
http://localhost:3000/health           # Health check
http://localhost:3000/dashboard        # Dashboard admin
http://localhost:4040                  # ngrok dashboard
```

### **Logs:**
```bash
# Ver logs em tempo real
tail -f logs/combined.log

# Últimas 50 linhas
tail -50 logs/combined.log

# Buscar erros
grep ERROR logs/combined.log
```

### **Estatísticas:**
```bash
# Status do servidor
curl http://localhost:3000/api/status | jq .

# Dashboard
curl http://localhost:3000/admin/api/dashboard | jq .
```

---

## 🚀 **BOA SORTE!**

Siga os guias passo a passo e você vai conseguir! 💪

**Comece por:** [COMECE_AQUI.md](COMECE_AQUI.md)

---

**Criado em:** $(date +"%Y-%m-%d %H:%M:%S")
**Sistema:** SAAE WhatsApp Bot v1.0
