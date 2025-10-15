# 🎯 PASSO A PASSO - Obtendo Credenciais WhatsApp

## 📋 O que você precisa obter:

```env
WHATSAPP_ACCESS_TOKEN=EAAG1234567890abcdef...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_webhook_2024_secure
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765
```

---

## 🚀 PASSO 1: Acessar Meta for Developers

### **1.1 Abrir o site**
- Vá para: https://developers.facebook.com
- Faça login com sua conta Facebook

### **1.2 Criar Nova App**
- Clique em **"Meus Apps"** (canto superior direito)
- Clique em **"Criar App"**

---

## 🚀 PASSO 2: Configurar a Aplicação

### **2.1 Tipo de App**
- Selecione **"Business"**
- Clique em **"Próximo"**

### **2.2 Detalhes da App**
- **Nome do App:** `SAAE WhatsApp Bot`
- **Email de contato:** Seu email
- **Propósito:** Selecione **"Gerenciar e promover seus negócios"**
- Clique em **"Criar App"**

### **2.3 Adicionar WhatsApp**
- No painel da app, procure por **"WhatsApp"**
- Clique em **"Configurar"**

---

## 🚀 PASSO 3: Configurar Número de Telefone

### **3.1 Adicionar Número**
- Vá para **"API Setup"**
- Na seção **"From"**, clique em **"Add phone number"**

### **3.2 Verificar Número**
- **Número:** Use um número que você tem acesso (celular)
- **Método:** Escolha **SMS** ou **Chamada**
- Digite o código recebido

---

## 🚀 PASSO 4: Obter as Credenciais

### **🔑 CREDENCIAL 1: WHATSAPP_ACCESS_TOKEN**

**📍 Onde encontrar:**
- **API Setup** → **Temporary access token**
- **Copie o token** (começa com `EAAG...`)

**📝 Exemplo:**
```
EAAG1234567890abcdefghijklmnopqrstuvwxyz1234567890
```

---

### **📱 CREDENCIAL 2: WHATSAPP_PHONE_NUMBER_ID**

**📍 Onde encontrar:**
- **API Setup** → **From** → **Phone number ID**
- **Copie o ID** (só números)

**📝 Exemplo:**
```
123456789012345
```

---

### **🔐 CREDENCIAL 3: WHATSAPP_WEBHOOK_VERIFY_TOKEN**

**📍 Onde criar:**
- **Este você cria!** Pode ser qualquer string segura
- **Sugestão:** `saae_webhook_2024_secure`

**📝 Exemplo:**
```
saae_webhook_2024_secure
```

---

### **🏢 CREDENCIAL 4: WHATSAPP_BUSINESS_ACCOUNT_ID**

**📍 Onde encontrar:**
- **API Setup** → **WhatsApp Business Account ID**
- **Copie o ID** (só números)

**📝 Exemplo:**
```
987654321098765
```

---

## 🚀 PASSO 5: Configurar Arquivo .env

### **5.1 Abrir arquivo para edição**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

### **5.2 Substituir os valores**
Substitua as linhas que começam com `WHATSAPP_`:

```env
# Credenciais WhatsApp (SUBSTITUIR ESTES VALORES)
WHATSAPP_ACCESS_TOKEN=EAAG1234567890abcdef...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_webhook_2024_secure
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765
```

### **5.3 Salvar arquivo**
- Pressione **Ctrl + X**
- Pressione **Y** para confirmar
- Pressione **Enter** para salvar

---

## 🚀 PASSO 6: Testar Configuração

### **6.1 Iniciar servidor**
```bash
npm start
```

### **6.2 Resultado esperado**
```
🤖 SAAE WhatsApp Bot - Inicializando...
🔍 Verificando configurações...
✅ Todas as credenciais configuradas
✅ Banco de dados inicializado
✅ WhatsApp API configurada
🚀 Servidor rodando na porta 3000
```

---

## 🆘 Problemas Comuns

### **❌ "Token inválido"**
**Soluções:**
- ✅ Verificar se copiou o token completo
- ✅ Verificar se não tem espaços extras
- ✅ Token expira em 24h (para desenvolvimento)

### **❌ "Phone Number ID inválido"**
**Soluções:**
- ✅ Verificar se número foi verificado
- ✅ Verificar se copiou só o ID (números)
- ✅ Não confundir com o número de telefone

### **❌ "Business Account ID inválido"**
**Soluções:**
- ✅ Verificar se está na seção correta
- ✅ Verificar se conta foi criada
- ✅ Verificar se ID foi copiado corretamente

---

## 📱 Próximos Passos

Após configurar as credenciais:

1. **✅ Servidor funcionando**
2. **🔧 Configurar ngrok** para webhook
3. **📱 Configurar webhook** no Meta
4. **💬 Testar mensagens** WhatsApp

---

## 🎯 Resumo Rápido

| Credencial | Onde | Exemplo |
|------------|------|---------|
| `ACCESS_TOKEN` | API Setup → Token | `EAAG1234...` |
| `PHONE_NUMBER_ID` | API Setup → From | `123456789012345` |
| `WEBHOOK_VERIFY_TOKEN` | Você cria | `saae_webhook_2024` |
| `BUSINESS_ACCOUNT_ID` | API Setup → Account ID | `987654321098765` |

**🎉 Com essas 4 credenciais, seu sistema estará pronto!**
