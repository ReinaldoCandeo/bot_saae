# 🚀 Guia Completo: Conectar Meta Business API

## 📋 **PASSO 1: Criar Conta Meta for Developers**

### **1.1 Acessar o Portal**
1. Abra seu navegador
2. Acesse: **https://developers.facebook.com**
3. Clique em **"Fazer login"** (canto superior direito)
4. Use sua conta Facebook/Meta

### **1.2 Criar Conta de Negócios (se não tiver)**
1. Após login, acesse: **https://business.facebook.com**
2. Clique em **"Criar conta"**
3. Preencha:
   - Nome da empresa: **SAAE de Palmital**
   - Seu nome
   - Email comercial

---

## 📱 **PASSO 2: Criar Aplicativo Meta**

### **2.1 Criar Nova App**
1. Volte para: **https://developers.facebook.com**
2. Clique em **"Meus Apps"** (menu superior)
3. Clique em **"Criar App"**

### **2.2 Escolher Tipo de App**
1. Selecione: **"Business"**
2. Clique em **"Próximo"**

### **2.3 Configurar Detalhes da App**
Preencha o formulário:
- **Nome de exibição:** `SAAE WhatsApp Bot`
- **Email de contato:** seu_email@saae-palmital.com.br
- **Conta comercial:** (selecione a conta criada no passo 1.2)

4. Clique em **"Criar app"**
5. **IMPORTANTE:** Anote o **ID do app** que aparecerá

---

## 💬 **PASSO 3: Adicionar WhatsApp Business**

### **3.1 Adicionar Produto**
1. Na página da sua app
2. Encontre **"WhatsApp"** na lista de produtos
3. Clique em **"Configurar"**

### **3.2 Começar a Usar**
1. Clique em **"Começar"**
2. Siga o assistente de configuração

---

## 📞 **PASSO 4: Configurar Número de Telefone**

### **4.1 Adicionar Número de Teste (Desenvolvimento)**

**Opção A: Usar Número de Teste do Meta (RECOMENDADO PARA TESTES)**
1. Na página WhatsApp → **"API Setup"**
2. Você verá um número de teste já fornecido pelo Meta
3. **Anote este número:** Ex: `+1 555 025 3483`
4. Role até **"Para"** e adicione seu número pessoal
5. Clique em **"Gerenciar números de telefone"**
6. Adicione seu WhatsApp pessoal (para receber mensagens de teste)

**Opção B: Usar Número Real (PRODUÇÃO)**
1. Clique em **"Adicionar número de telefone"**
2. Escolha **"Adicionar um número de telefone"**
3. Digite o número comercial da SAAE
4. Escolha país: **Brasil (+55)**
5. Clique em **"Próximo"**
6. Receberá um SMS com código de 6 dígitos
7. Digite o código
8. Aguarde aprovação (pode levar algumas horas)

---

## 🔑 **PASSO 5: Obter Credenciais (MAIS IMPORTANTE!)**

### **5.1 Acessar API Setup**
1. No menu lateral, clique em **"WhatsApp"**
2. Clique em **"API Setup"**

### **5.2 Copiar Phone Number ID**
1. Procure por **"Número de telefone"**
2. Você verá algo como: `From: +1 555 025 3483`
3. Logo abaixo, clique para expandir
4. **COPIE o Phone Number ID:**
   ```
   Exemplo: 123456789012345
   ```

### **5.3 Gerar Access Token Temporário**
1. Role a página até **"Access token temporário"**
2. **COPIE o token:** 
   ```
   Exemplo: EAABwzLixnjYBACd8ZB4v...
   ```
3. ⚠️ **ATENÇÃO:** Este token expira em 24h

### **5.4 Gerar Access Token Permanente (IMPORTANTE PARA PRODUÇÃO)**

#### **Opção 1: Via Configurações do Sistema (Mais Fácil)**
1. No menu lateral, clique em **"Configurações"** → **"Básico"**
2. Role até **"Tokens de acesso"**
3. Clique em **"Gerar token"**
4. Escolha a página/conta
5. Selecione permissões:
   - ✅ `whatsapp_business_management`
   - ✅ `whatsapp_business_messaging`
6. Clique em **"Gerar token"**
7. **COPIE E GUARDE COM SEGURANÇA**

#### **Opção 2: Via Business Manager**
1. Acesse: **https://business.facebook.com**
2. Vá em **"Configurações de negócios"**
3. Menu lateral: **"Usuários"** → **"Ativos de sistema"**
4. Clique em **"Adicionar"** → **"Gerar novo token"**
5. Escolha sua app
6. Selecione permissões (mesmas acima)
7. **COPIE E GUARDE COM SEGURANÇA**

### **5.5 Obter Business Account ID**
1. No menu lateral, clique em **"WhatsApp"** → **"Começar"**
2. Procure por **"ID da conta do WhatsApp Business"**
3. **COPIE o número:**
   ```
   Exemplo: 987654321098765
   ```

---

## 🔧 **PASSO 6: Configurar Webhook**

### **6.1 O que é Webhook?**
- É a URL onde o Meta enviará as mensagens recebidas
- Precisa ser **HTTPS** (não HTTP)
- Para testes locais, usaremos **ngrok**

### **6.2 Instalar ngrok**
```bash
# No Mac
brew install ngrok

# Ou baixe de: https://ngrok.com/download
```

### **6.3 Criar Verify Token**
1. Abra um editor de texto
2. Crie um token seguro (pode ser qualquer texto)
3. Exemplo: `saae_palmital_verify_2025_XYZ123`
4. **Guarde este token**

### **6.4 Configurar no Meta**
1. Na página **"WhatsApp"** → **"Configuração"**
2. Role até **"Webhook"**
3. Clique em **"Configurar webhook"**
4. Preencha:
   - **Callback URL:** Deixe em branco por enquanto (vamos preencher no Passo 7)
   - **Verify Token:** Cole o token que você criou
   - **Webhook Fields:** Marque:
     - ✅ `messages`
     - ✅ `message_status`

---

## 💾 **PASSO 7: Configurar Sistema Local**

### **7.1 Parar Servidor Demo**
```bash
# Pare o servidor de demonstração
pkill -f "node.*demo.js"
```

### **7.2 Criar Arquivo .env**
```bash
# Copiar template
cp production.env .env
```

### **7.3 Editar .env com suas Credenciais**
```bash
# Abrir editor
nano .env
```

**Cole estas informações (SUBSTITUINDO pelos seus valores reais):**

```env
# ========================================
# CREDENCIAIS DO META - COPIE DO PASSO 5
# ========================================

# Access Token (do passo 5.3 ou 5.4)
WHATSAPP_ACCESS_TOKEN=EAABwzLixnjYBACd8ZB4v...COLE_SEU_TOKEN_AQUI

# Phone Number ID (do passo 5.2)
WHATSAPP_PHONE_NUMBER_ID=123456789012345

# Verify Token (que você criou no passo 6.3)
WHATSAPP_WEBHOOK_VERIFY_TOKEN=saae_palmital_verify_2025_XYZ123

# Business Account ID (do passo 5.5)
WHATSAPP_BUSINESS_ACCOUNT_ID=987654321098765

# ========================================
# CONFIGURAÇÕES DO SERVIDOR
# ========================================

PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# ========================================
# BANCO DE DADOS
# ========================================

DB_PATH=./database/saae_bot.db

# ========================================
# CONFIGURAÇÕES DO SAAE
# ========================================

SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
SAAE_ADDRESS=Rua Principal, 123 - Centro - Palmital/SP

# ========================================
# HORÁRIO DE FUNCIONAMENTO
# ========================================

BUSINESS_HOURS_START=08:00
BUSINESS_HOURS_END=17:00
BUSINESS_DAYS=1,2,3,4,5
```

**Para salvar:**
- Pressione `Ctrl + O` (salvar)
- Pressione `Enter`
- Pressione `Ctrl + X` (sair)

---

## 🌐 **PASSO 8: Testar Localmente com ngrok**

### **8.1 Iniciar o Sistema**

**Terminal 1 - Iniciar Servidor:**
```bash
npm start
```

Aguarde ver:
```
✅ WhatsApp API configurada
🚀 Servidor rodando na porta 3000
```

**Terminal 2 - Iniciar ngrok:**
```bash
# Abra uma nova aba do terminal
ngrok http 3000
```

### **8.2 Copiar URL do ngrok**
Você verá algo assim:
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

**COPIE a URL HTTPS:** `https://abc123.ngrok.io`

### **8.3 Configurar Webhook no Meta**
1. Volte para: **developers.facebook.com** → Sua App → **WhatsApp** → **Configuração**
2. Em **"Webhook"**, clique em **"Editar"**
3. **Callback URL:** `https://abc123.ngrok.io/webhook`
4. **Verify Token:** (mesmo que você colocou no .env)
5. Clique em **"Verificar e salvar"**

✅ **Se aparecer um ✓ verde = SUCESSO!**

---

## 📱 **PASSO 9: TESTAR COM WHATSAPP**

### **9.1 Adicionar Seu Número para Testes**
1. No Meta: **WhatsApp** → **API Setup**
2. Role até **"Para"**
3. Clique em **"Gerenciar números de telefone"**
4. Clique em **"Adicionar número de telefone"**
5. Digite seu WhatsApp pessoal
6. Clique em **"Enviar código"**
7. Você receberá um código no WhatsApp
8. Digite o código

### **9.2 Enviar Primeira Mensagem**
1. Abra WhatsApp no seu celular
2. Envie mensagem para o **número de teste do Meta**
   - Exemplo: `+1 555 025 3483`
3. Digite: `menu`

### **9.3 O que deve acontecer:**
✅ Bot responde com menu de opções
✅ Você vê logs no terminal do servidor
✅ Você vê a conversa no dashboard (http://localhost:3000/dashboard)

---

## 🎯 **RESUMO DAS CREDENCIAIS**

Você precisou copiar:
1. ✅ **Phone Number ID** (do passo 5.2)
2. ✅ **Access Token** (do passo 5.3 ou 5.4)
3. ✅ **Business Account ID** (do passo 5.5)
4. ✅ **Verify Token** (que você criou no passo 6.3)
5. ✅ **URL do ngrok** (do passo 8.2)

---

## ❓ **PROBLEMAS COMUNS**

### **Erro: "Token inválido"**
- ✅ Verifique se copiou o token completo (geralmente tem 200+ caracteres)
- ✅ Token temporário expira em 24h - gere um permanente (passo 5.4)
- ✅ Verifique se não tem espaços antes/depois do token no .env

### **Erro: "Webhook não verificou"**
- ✅ Verifique se o `WHATSAPP_WEBHOOK_VERIFY_TOKEN` no .env é EXATAMENTE igual ao configurado no Meta
- ✅ Verifique se o ngrok está rodando
- ✅ Verifique se a URL tem `/webhook` no final
- ✅ Teste manualmente: `curl "SUA_URL_NGROK/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"`

### **Erro: "Mensagens não chegam"**
- ✅ Verifique se seu número está na lista de teste (passo 9.1)
- ✅ Verifique se o webhook está configurado (passo 8.3)
- ✅ Verifique se selecionou os campos `messages` e `message_status`
- ✅ Olhe os logs do terminal do servidor

### **Erro: "Não consigo enviar mensagens"**
- ✅ Verifique o `WHATSAPP_PHONE_NUMBER_ID` no .env
- ✅ Verifique permissões do token (`whatsapp_business_messaging`)
- ✅ Verifique se o número de destino está na lista de teste

---

## 🚀 **PRÓXIMO PASSO: PRODUÇÃO**

Depois que testar localmente com sucesso:

1. **Deploy na VM** (use: `./deploy-to-vm.sh`)
2. **Configurar domínio** com SSL (Let's Encrypt)
3. **Gerar token permanente** (se ainda não gerou)
4. **Adicionar números reais** (não apenas teste)
5. **Configurar webhook** com URL da VM

---

## 📞 **PRECISA DE AJUDA?**

Se tiver qualquer dúvida em qualquer passo:
1. Tire print da tela
2. Copie a mensagem de erro
3. Me avise em qual passo está com dificuldade

**Boa sorte! 🍀**
