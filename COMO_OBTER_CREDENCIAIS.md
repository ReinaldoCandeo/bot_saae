# 🔑 Como Obter as Credenciais do WhatsApp - Meta for Developers

## 📋 Credenciais Necessárias

Você precisa configurar essas 4 variáveis no arquivo `.env`:

```env
WHATSAPP_ACCESS_TOKEN=seu_token_aqui
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id_aqui  
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_verify_token_aqui
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_business_account_id_aqui
```

## 🚀 Passo a Passo para Obter as Credenciais

### **Passo 1: Acessar Meta for Developers**
1. Vá para: https://developers.facebook.com
2. Faça login com sua conta Facebook
3. Clique em **"Meus Apps"** → **"Criar App"**

### **Passo 2: Criar Nova Aplicação**
1. **Tipo de App:** Selecione **"Business"**
2. **Nome:** `SAAE WhatsApp Bot` (ou nome de sua escolha)
3. **Email de contato:** Seu email
4. **Propósito:** Selecione **"Gerenciar e promover seus negócios"**
5. Clique em **"Criar App"**

### **Passo 3: Adicionar Produto WhatsApp**
1. No painel da aplicação, clique em **"Adicionar Produto"**
2. Procure por **"WhatsApp"** e clique em **"Configurar"**

### **Passo 4: Configurar Número de Telefone**

#### **A. Adicionar Número de Teste (Desenvolvimento)**
1. Em **"API Setup"**, vá para **"From"**
2. Clique em **"Add phone number"**
3. **Número:** Use um número que você tem acesso
4. **Método de verificação:** SMS ou Chamada
5. Digite o código recebido

#### **B. Configurar Número de Produção (Opcional)**
1. Para número real, vá em **"Business Manager"**
2. **Adicionar** → **"WhatsApp Business Account"**
3. Siga as instruções para verificação

### **Passo 5: Obter as Credenciais**

#### **🔑 WHATSAPP_ACCESS_TOKEN**
1. Em **"API Setup"** → **"Temporary access token"**
2. **Copie o token** (começa com algo como `EAAG...`)
3. ⚠️ **IMPORTANTE:** Este token expira em 24 horas para desenvolvimento
4. Para produção, você precisará de um token permanente

#### **📱 WHATSAPP_PHONE_NUMBER_ID**
1. Em **"API Setup"** → **"From"**
2. **Phone number ID:** Copie o ID (números como `123456789012345`)
3. Este ID identifica seu número de telefone

#### **🔐 WHATSAPP_WEBHOOK_VERIFY_TOKEN**
1. **Este você cria!** Pode ser qualquer string segura
2. **Sugestão:** `saae_webhook_2024_secure_token`
3. **IMPORTANTE:** Use o mesmo token no Meta e no seu `.env`

#### **🏢 WHATSAPP_BUSINESS_ACCOUNT_ID**
1. Em **"API Setup"** → **"WhatsApp Business Account ID"**
2. **Copie o ID** (números como `987654321098765`)
3. Este ID identifica sua conta de negócios

## 📝 Configurando o Arquivo .env

### **Editar o arquivo:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
nano .env
```

### **Exemplo de configuração:**
```env
# Credenciais WhatsApp (OBRIGATÓRIAS)
WHATSAPP_ACCESS_TOKEN=EAAG1234567890abcdef...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_webhook_2024_secure_token
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765

# Configurações do servidor
PORT=3000
NODE_ENV=development
HOST=localhost
DB_PATH=./database/saae_bot_demo.db

# URLs (configure após deploy)
WEBHOOK_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:3000/admin

# Informações do SAAE
SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
SAAE_ADDRESS=Rua Principal, 123 - Centro - Palmital/SP
BUSINESS_HOURS_START=08:00
BUSINESS_HOURS_END=17:00
BUSINESS_DAYS=1,2,3,4,5
```

## 🔍 Verificando as Credenciais

### **Teste 1: Verificar se arquivo foi salvo**
```bash
cat .env | grep WHATSAPP_ACCESS_TOKEN
```

### **Teste 2: Iniciar servidor**
```bash
npm start
```

**✅ Sucesso esperado:**
```
🤖 SAAE WhatsApp Bot - Inicializando...
🔍 Verificando configurações...
✅ Todas as credenciais configuradas
✅ Banco de dados inicializado
✅ WhatsApp API configurada
🚀 Servidor rodando na porta 3000
```

## 🆘 Problemas Comuns

### **❌ "Token inválido"**
- ✅ Verificar se copiou o token completo
- ✅ Verificar se token não expirou (24h para desenvolvimento)
- ✅ Verificar se não tem espaços extras

### **❌ "Phone Number ID inválido"**
- ✅ Verificar se número foi verificado
- ✅ Verificar se copiou o ID correto
- ✅ Verificar se não confundiu com o número de telefone

### **❌ "Business Account ID inválido"**
- ✅ Verificar se está na seção correta
- ✅ Verificar se conta de negócios foi criada
- ✅ Verificar se ID foi copiado corretamente

## 📱 Configuração do Webhook (Próximo Passo)

Após configurar as credenciais, você precisará:

1. **Instalar ngrok:**
   ```bash
   brew install ngrok
   ```

2. **Criar túnel:**
   ```bash
   ngrok http 3000
   ```

3. **Configurar webhook no Meta:**
   - **Callback URL:** `https://abc123.ngrok-free.app/webhook`
   - **Verify Token:** O mesmo do `.env`

## 🎯 Resumo das Credenciais

| Credencial | Onde Encontrar | Exemplo |
|------------|----------------|---------|
| `WHATSAPP_ACCESS_TOKEN` | API Setup → Temporary access token | `EAAG1234...` |
| `WHATSAPP_PHONE_NUMBER_ID` | API Setup → From → Phone number ID | `123456789012345` |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | Você cria (qualquer string) | `saae_webhook_2024` |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | API Setup → Business Account ID | `987654321098765` |

---

## 🚀 Próximo Passo

Após obter e configurar essas credenciais:

1. **Salvar no `.env`**
2. **Testar servidor:** `npm start`
3. **Configurar ngrok** para webhook
4. **Testar mensagens** WhatsApp

**Precisa de ajuda com algum passo específico?**
