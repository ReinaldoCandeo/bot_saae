# ✅ CHECKLIST: Configuração Meta Business API

Use este checklist para não se perder durante a configuração!

---

## 📋 **FASE 1: CRIAR CONTAS**

- [ ] **1.1** Acessei https://developers.facebook.com
- [ ] **1.2** Fiz login com minha conta Facebook/Meta
- [ ] **1.3** Criei conta de negócios em https://business.facebook.com
- [ ] **1.4** Nome da empresa configurado: SAAE de Palmital

---

## 📱 **FASE 2: CRIAR APP**

- [ ] **2.1** Cliquei em "Meus Apps"
- [ ] **2.2** Cliquei em "Criar App"
- [ ] **2.3** Selecionei tipo: "Business"
- [ ] **2.4** Nome da app: SAAE WhatsApp Bot
- [ ] **2.5** App criada com sucesso
- [ ] **2.6** ✏️ Anotei o ID da app: `________________`

---

## 💬 **FASE 3: ADICIONAR WHATSAPP**

- [ ] **3.1** Encontrei "WhatsApp" na lista de produtos
- [ ] **3.2** Cliquei em "Configurar"
- [ ] **3.3** Segui o assistente de configuração

---

## 📞 **FASE 4: NÚMERO DE TELEFONE**

**Escolha uma opção:**

### **Opção A: Número de Teste (Recomendado)**
- [ ] **4.A1** Vi o número de teste fornecido pelo Meta
- [ ] **4.A2** ✏️ Anotei: `________________`
- [ ] **4.A3** Adicionei meu WhatsApp pessoal em "Para"
- [ ] **4.A4** Recebi código de verificação
- [ ] **4.A5** Confirmei meu número

### **Opção B: Número Real (Produção)**
- [ ] **4.B1** Cliquei em "Adicionar número de telefone"
- [ ] **4.B2** Digitei o número da SAAE
- [ ] **4.B3** Recebi SMS com código
- [ ] **4.B4** Confirmei o código
- [ ] **4.B5** Aguardando aprovação

---

## 🔑 **FASE 5: CREDENCIAIS (MAIS IMPORTANTE!)**

- [ ] **5.1** Acessei WhatsApp → API Setup

### **Phone Number ID:**
- [ ] **5.2** Encontrei "Número de telefone"
- [ ] **5.3** ✏️ Copiei Phone Number ID: `________________`

### **Access Token:**
- [ ] **5.4** Encontrei "Access token temporário"
- [ ] **5.5** ✏️ Copiei o token:
```
________________
________________
________________
```

### **Token Permanente (IMPORTANTE!):**
- [ ] **5.6** Fui em Configurações → Básico
- [ ] **5.7** Gerei token permanente
- [ ] **5.8** Selecionei permissões:
  - [ ] whatsapp_business_management
  - [ ] whatsapp_business_messaging
- [ ] **5.9** ✏️ Copiei e guardei token permanente:
```
________________
________________
________________
```

### **Business Account ID:**
- [ ] **5.10** Encontrei "ID da conta do WhatsApp Business"
- [ ] **5.11** ✏️ Copiei: `________________`

---

## 🔧 **FASE 6: PREPARAR WEBHOOK**

- [ ] **6.1** Criei um Verify Token único
- [ ] **6.2** ✏️ Meu Verify Token: `________________`
- [ ] **6.3** Acessei WhatsApp → Configuração → Webhook
- [ ] **6.4** Marquei campos:
  - [ ] messages
  - [ ] message_status

---

## 💾 **FASE 7: CONFIGURAR SISTEMA**

- [ ] **7.1** Parei servidor demo: `pkill -f "node.*demo.js"`
- [ ] **7.2** Copiei arquivo: `cp production.env .env`
- [ ] **7.3** Abri editor: `nano .env`
- [ ] **7.4** Colei minhas credenciais:
  - [ ] WHATSAPP_ACCESS_TOKEN
  - [ ] WHATSAPP_PHONE_NUMBER_ID
  - [ ] WHATSAPP_WEBHOOK_VERIFY_TOKEN
  - [ ] WHATSAPP_BUSINESS_ACCOUNT_ID
- [ ] **7.5** Salvei o arquivo (Ctrl+O, Enter, Ctrl+X)

---

## 🌐 **FASE 8: TESTAR COM NGROK**

### **Instalar ngrok:**
- [ ] **8.1** Instalei ngrok: `brew install ngrok`

### **Terminal 1 - Servidor:**
- [ ] **8.2** Executei: `npm start`
- [ ] **8.3** Vi mensagem: "Servidor rodando na porta 3000"

### **Terminal 2 - ngrok:**
- [ ] **8.4** Abri nova aba do terminal
- [ ] **8.5** Executei: `ngrok http 3000`
- [ ] **8.6** ✏️ Copiei URL HTTPS: `________________`

### **Configurar Webhook:**
- [ ] **8.7** Voltei ao Meta → WhatsApp → Configuração
- [ ] **8.8** Editei Webhook
- [ ] **8.9** Callback URL: `minha_url_ngrok/webhook`
- [ ] **8.10** Verify Token: (mesmo do .env)
- [ ] **8.11** Cliquei em "Verificar e salvar"
- [ ] **8.12** ✅ Vi checkmark verde = SUCESSO!

---

## 📱 **FASE 9: TESTAR NO WHATSAPP**

- [ ] **9.1** Meu número está na lista "Para" do Meta
- [ ] **9.2** Abri WhatsApp no celular
- [ ] **9.3** Enviei mensagem para o número de teste
- [ ] **9.4** Digitei: `menu`
- [ ] **9.5** ✅ Bot respondeu!
- [ ] **9.6** ✅ Vi logs no terminal
- [ ] **9.7** ✅ Vi conversa no dashboard

---

## 🎯 **VALIDAÇÃO FINAL**

Teste estes comandos no WhatsApp:
- [ ] `menu` - Exibe menu principal
- [ ] `consulta` - Inicia fluxo de consulta
- [ ] `agendamento` - Inicia agendamento
- [ ] `emergencia` - Mensagem de emergência

---

## 📊 **MONITORAMENTO**

Abra estas URLs no navegador:
- [ ] http://localhost:3000/api/status - Status da API
- [ ] http://localhost:3000/dashboard - Dashboard administrativo
- [ ] http://localhost:4040 - Dashboard do ngrok

---

## ⚠️ **EM CASO DE ERRO**

### **Token inválido:**
- [ ] Verifiquei se copiei token completo
- [ ] Gerei token permanente
- [ ] Removi espaços do .env

### **Webhook não verificou:**
- [ ] Verify Token do .env = Verify Token do Meta
- [ ] ngrok está rodando
- [ ] URL tem `/webhook` no final

### **Mensagens não chegam:**
- [ ] Meu número está na lista de teste
- [ ] Webhook configurado
- [ ] Campos messages e message_status marcados

---

## 🎉 **SUCESSO!**

Quando tudo estiver ✅:
- [ ] Sistema funcionando localmente
- [ ] Bot responde no WhatsApp
- [ ] Dashboard mostra conversas
- [ ] Pronto para deploy na VM!

---

## 📝 **ANOTAÇÕES**

Use este espaço para anotações:

```
_________________________________________________

_________________________________________________

_________________________________________________

_________________________________________________

_________________________________________________
```

---

**Data de configuração:** `________________`

**Configurado por:** `________________`
