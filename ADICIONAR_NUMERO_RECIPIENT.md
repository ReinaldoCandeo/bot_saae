# 📱 ADICIONAR SEU NÚMERO COMO RECIPIENT

## ❌ PROBLEMA ATUAL

```
Erro 130497: Business account is restricted from messaging 
users in this country.
```

**Solução:** Adicionar seu número como recipient aprovado.

---

## ✅ PASSO A PASSO VISUAL

### 1️⃣ Acessar Meta for Developers

URL: https://developers.facebook.com/apps

### 2️⃣ Selecionar seu App

Clique no nome do seu aplicativo

### 3️⃣ Ir para WhatsApp

Menu lateral esquerdo → **WhatsApp** → **"Getting Started"**

### 4️⃣ Encontrar seção "Send and receive messages"

Role a página até encontrar:

```
┌─────────────────────────────────────────┐
│ Step 2: Send messages with the API      │
│                                          │
│ From:                                    │
│ Phone number ID: 843537608838560         │
│ Display number: +1 (555) 175-2831        │
│                                          │
│ To:                                      │
│ ┌───────────────────────────────────┐   │
│ │ [Phone number field]              │   │
│ └───────────────────────────────────┘   │
│ [Manage phone number list]               │
└─────────────────────────────────────────┘
```

### 5️⃣ Adicionar seu número

**OPÇÃO A: Campo "To"**
- Digite: `5518996871823`
- Clique em algum botão de adicionar/enviar

**OPÇÃO B: "Manage phone number list"**
- Clique em "Manage phone number list"
- Clique em "Add phone number"
- Digite: `5518996871823`
- Clique em "Next" ou "Add"

### 6️⃣ Verificar número

1. Você vai receber um **SMS** com código de 6 dígitos
2. Digite o código no campo que apareceu
3. Clique em "Verify" ou "Confirmar"
4. Aguarde mensagem: ✅ "Phone number verified"

---

## 📱 FORMATO DO NÚMERO

Tente diferentes formatos se um não funcionar:

- `5518996871823` (sem +, sem espaços)
- `+5518996871823` (com +)
- `55 18 99687-1823` (com espaços)

---

## 🧪 TESTAR DEPOIS

Depois de verificar o número:

1. **Envie** do seu WhatsApp (`+55 18 99687-1823`)
2. **Para** o bot (`+1 555 175-2831`)
3. **Mensagem:** `menu`
4. **Aguarde 2-3 segundos**
5. **Você deve receber:** Menu com 5 botões! 🎉

---

## 🐛 SE NÃO ENCONTRAR A OPÇÃO

### Alternativa 1: API Setup

Menu lateral → WhatsApp → **"API Setup"**

Procure por:
- "Add recipient phone number"
- "Phone numbers"
- "Recipients"

### Alternativa 2: Configuration

Menu lateral → WhatsApp → **"Configuration"**

Procure seção de "Test numbers" ou "Recipients"

### Alternativa 3: Usar API diretamente

```bash
# Adicionar número via API (não implementado ainda)
```

---

## ⚠️ LIMITAÇÕES DA CONTA DE TESTE

### Conta de Teste permite:

- ✅ Enviar para até **5 números** verificados
- ✅ **1.000 mensagens grátis** por mês
- ✅ Testar todas as funcionalidades

### Conta de Teste NÃO permite:

- ❌ Enviar para qualquer número
- ❌ Enviar para números não verificados
- ❌ Uso em produção real

---

## 🚀 PARA USAR EM PRODUÇÃO

Se você precisa enviar para qualquer número:

### 1. Business Verification

- Verificar sua empresa no Meta
- Fornecer documentos
- Aguardar aprovação (2-5 dias)

### 2. Request Production Access

- Solicitar acesso de produção
- WhatsApp vai revisar seu caso de uso
- Aguardar aprovação

### 3. Adicionar método de pagamento

- Depois de 1.000 mensagens grátis
- Meta cobra por conversação (~$0.03 por conversa)

---

## 📊 VERIFICAR STATUS

### No servidor:

```bash
tail -f /Users/reinaldocandeo/Desktop/Postman/bot_whatsapp.log
```

Quando funcionar, você verá:
```
📨 Webhook recebido
🤖 Processando mensagem
📤 Enviando mensagem interactive
✅ Mensagem enviada com sucesso ← Este é o objetivo!
```

---

## 💡 DICA

Adicione seu número agora e em 2 minutos você terá o bot funcionando!

É rápido e fácil! 🚀

---

## 📞 SEUS DADOS

- **Seu número:** +55 18 99687-1823
- **Número do bot:** +1 (555) 175-2831
- **Phone ID:** 843537608838560
- **Status:** ⏳ Aguardando adicionar recipient

---

**Boa sorte!** 🍀

Depois que adicionar, teste enviando "menu"! 📱

