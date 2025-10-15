# 🔍 Onde Encontrar Cada Credencial no Meta

Guia visual de onde encontrar cada informação necessária.

---

## 🌐 **LINKS IMPORTANTES**

### **Portal Principal:**
- **Meta for Developers:** https://developers.facebook.com
- **Business Manager:** https://business.facebook.com
- **WhatsApp Manager:** https://business.facebook.com/wa/manage/home

---

## 🔑 **CREDENCIAL 1: Phone Number ID**

### **Onde encontrar:**

1. Acesse: https://developers.facebook.com
2. Clique em **"Meus Apps"** (canto superior direito)
3. Selecione sua app: **SAAE WhatsApp Bot**
4. Menu lateral esquerdo → **"WhatsApp"** → **"API Setup"**
5. Procure pela seção **"Número de telefone"**

```
┌─────────────────────────────────────────────────┐
│  📱 Número de telefone                          │
│  ───────────────────────────────────────────    │
│  From: +1 555 025 3483                          │
│  ▼ (clique para expandir)                       │
│                                                  │
│  Phone number ID: 123456789012345  📋           │
│                   ^^^^^^^^^^^^^^^^               │
│                   COPIE ESTE NÚMERO!             │
└─────────────────────────────────────────────────┘
```

**Cole no .env como:**
```env
WHATSAPP_PHONE_NUMBER_ID=123456789012345
```

---

## 🔑 **CREDENCIAL 2: Access Token (Temporário)**

### **Onde encontrar:**

**Mesma página do Phone Number ID:**

1. Role a página para baixo
2. Procure por **"Temporary access token"** ou **"Access token temporário"**

```
┌─────────────────────────────────────────────────┐
│  🔐 Temporary access token                      │
│  ───────────────────────────────────────────    │
│  Este token expira em 23 horas                  │
│                                                  │
│  EAABwzLixnjYBACd8ZB4vZABC...  📋              │
│  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^              │
│  COPIE TODO O TOKEN (pode ter 200+ caracteres)  │
│                                                  │
│  [ Gerar novo token ]                           │
└─────────────────────────────────────────────────┘
```

⚠️ **IMPORTANTE:** Token temporário expira em 24h!

**Cole no .env como:**
```env
WHATSAPP_ACCESS_TOKEN=EAABwzLixnjYBACd8ZB4vZABC...
```

---

## 🔑 **CREDENCIAL 2B: Access Token (PERMANENTE) - RECOMENDADO**

### **Opção 1: Via App Settings**

1. Sua app → **"Configurações"** → **"Básico"**
2. Role até encontrar **"Token de acesso"** ou **"Access Tokens"**
3. Clique em **"Gerar token"**

```
┌─────────────────────────────────────────────────┐
│  🔐 Token de acesso                             │
│  ───────────────────────────────────────────    │
│  [ Gerar token ]                                │
│                                                  │
│  Selecione as permissões:                       │
│  ☑ whatsapp_business_management                 │
│  ☑ whatsapp_business_messaging                  │
│                                                  │
│  [ Gerar ]                                      │
└─────────────────────────────────────────────────┘
```

### **Opção 2: Via Business Manager (Mais Confiável)**

1. Acesse: https://business.facebook.com
2. Menu superior → **"Configurações de negócios"**
3. Menu lateral → **"Usuários"** → **"Ativos de sistema"**
4. Clique em **"Adicionar"** → **"Gerar novo token"**
5. Selecione sua app: **SAAE WhatsApp Bot**
6. Marque permissões:
   - ☑ `whatsapp_business_management`
   - ☑ `whatsapp_business_messaging`
7. Clique em **"Gerar token"**

```
┌─────────────────────────────────────────────────┐
│  Seu token de acesso de sistema                 │
│  ───────────────────────────────────────────    │
│  ⚠️ Copie agora! Não será exibido novamente     │
│                                                  │
│  EAABwzLixnjYBACd8ZB4vZABC...  📋              │
│                                                  │
│  Permissões:                                    │
│  • whatsapp_business_management                 │
│  • whatsapp_business_messaging                  │
│                                                  │
│  [ Concluído ]                                  │
└─────────────────────────────────────────────────┘
```

**Cole no .env como:**
```env
WHATSAPP_ACCESS_TOKEN=EAABwzLixnjYBACd8ZB4vZABC...
```

---

## 🔑 **CREDENCIAL 3: Business Account ID**

### **Onde encontrar:**

**Opção 1: Na página da API Setup**

1. Mesma página onde encontrou o Phone Number ID
2. Procure por **"WhatsApp Business Account ID"**

```
┌─────────────────────────────────────────────────┐
│  🏢 WhatsApp Business Account                   │
│  ───────────────────────────────────────────    │
│  ID: 123456789012345  📋                        │
│       ^^^^^^^^^^^^^^^^                           │
│       COPIE ESTE NÚMERO!                         │
└─────────────────────────────────────────────────┘
```

**Opção 2: No Business Manager**

1. Acesse: https://business.facebook.com
2. Menu superior → **"Configurações de negócios"**
3. Menu lateral → **"Contas"** → **"Contas do WhatsApp"**
4. Você verá o ID da conta

**Cole no .env como:**
```env
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345
```

---

## 🔑 **CREDENCIAL 4: Webhook Verify Token**

### **Onde configurar:**

**VOCÊ cria este token!** Pode ser qualquer texto seguro.

**Sugestões de token:**
- `saae_palmital_webhook_2025_xyz`
- `verify_saae_bot_secure_123`
- `whatsapp_saae_token_abc456`

**⚠️ IMPORTANTE:** Use o MESMO token em dois lugares:

1. **No arquivo .env:**
```env
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_palmital_webhook_2025_xyz
```

2. **No Meta Developers:**
   - Vá em: WhatsApp → Configuração → Webhook
   - Campo **"Verify token":** `saae_palmital_webhook_2025_xyz`

```
┌─────────────────────────────────────────────────┐
│  Configurar webhook                             │
│  ───────────────────────────────────────────    │
│  Callback URL:                                  │
│  https://seu-dominio.com/webhook                │
│                                                  │
│  Verify token:                                  │
│  saae_palmital_webhook_2025_xyz                 │
│  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^             │
│  EXATAMENTE O MESMO DO .env!                    │
│                                                  │
│  Webhook fields:                                │
│  ☑ messages                                     │
│  ☑ message_status                               │
│                                                  │
│  [ Verificar e salvar ]                         │
└─────────────────────────────────────────────────┘
```

---

## 📋 **RESUMO: ARQUIVO .env COMPLETO**

```env
# ==========================================
# CREDENCIAIS DO META BUSINESS API
# ==========================================

# ✅ CREDENCIAL 1: Phone Number ID
# Encontrado em: developers.facebook.com → Sua App → WhatsApp → API Setup
WHATSAPP_PHONE_NUMBER_ID=123456789012345

# ✅ CREDENCIAL 2: Access Token (Permanente)
# Encontrado em: business.facebook.com → Configurações → Ativos de sistema
WHATSAPP_ACCESS_TOKEN=EAABwzLixnjYBACd8ZB4vZABC...

# ✅ CREDENCIAL 3: Business Account ID
# Encontrado em: developers.facebook.com → Sua App → WhatsApp → API Setup
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765

# ✅ CREDENCIAL 4: Verify Token (você cria)
# Configure o MESMO valor em: developers.facebook.com → WhatsApp → Webhook
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_palmital_webhook_2025_xyz

# ==========================================
# OUTRAS CONFIGURAÇÕES
# ==========================================

PORT=3000
NODE_ENV=production
HOST=0.0.0.0
DB_PATH=./database/saae_bot.db

SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
SAAE_ADDRESS=Rua Principal, 123 - Centro - Palmital/SP

BUSINESS_HOURS_START=08:00
BUSINESS_HOURS_END=17:00
BUSINESS_DAYS=1,2,3,4,5
```

---

## 🧪 **TESTAR SE CREDENCIAIS ESTÃO CORRETAS**

### **Teste 1: Verificar formato**
```bash
# Ver suas credenciais (sem expor valores)
cat .env | grep WHATSAPP_
```

**O que verificar:**
- ✅ `PHONE_NUMBER_ID` deve ter ~15 dígitos
- ✅ `ACCESS_TOKEN` deve ter ~200 caracteres começando com `EAA`
- ✅ `BUSINESS_ACCOUNT_ID` deve ter ~15 dígitos
- ✅ `WEBHOOK_VERIFY_TOKEN` pode ser qualquer texto

### **Teste 2: Iniciar sistema**
```bash
npm start
```

**Se der erro:**
- ❌ **"Token inválido"** → Verificar ACCESS_TOKEN
- ❌ **"Phone number not found"** → Verificar PHONE_NUMBER_ID
- ✅ **"WhatsApp API configurada"** → SUCESSO!

---

## 🆘 **PROBLEMAS COMUNS**

### **"Não encontro o Phone Number ID"**
1. Certifique-se de ter ADICIONADO o produto WhatsApp na app
2. Vá em WhatsApp → **API Setup** (não "Começar")
3. Se não aparecer, adicione um número de telefone primeiro

### **"Token muito curto"**
- Token temporário tem ~100 caracteres
- Token permanente tem ~200 caracteres
- Se seu token tem menos de 50 caracteres, você copiou errado

### **"Token expira rapidamente"**
- Use token PERMANENTE (via Business Manager)
- Tokens temporários expiram em 24h

### **"Webhook não verifica"**
- Verify token do .env ≠ Verify token do Meta
- Corrija e reinicie o servidor

---

## 📞 **LINKS RÁPIDOS**

| O que preciso | URL direta |
|---------------|-----------|
| Meus Apps | https://developers.facebook.com/apps |
| API Setup | https://developers.facebook.com/apps/SEU_APP_ID/whatsapp-business/wa-settings/ |
| Business Manager | https://business.facebook.com/settings |
| Ativos de Sistema | https://business.facebook.com/settings/system-users |
| WhatsApp Manager | https://business.facebook.com/wa/manage/home |

---

**💡 Dica:** Imprima ou salve este guia. Você vai consultar várias vezes! 📝
