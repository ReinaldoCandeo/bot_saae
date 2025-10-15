# 📱 Como Configurar WhatsApp Real - Guia Completo

## 🎯 **Passo a Passo para Conectar com WhatsApp**

### **1. Criar Conta Meta for Developers**

#### **A. Acessar o Portal**
1. Vá para: [developers.facebook.com](https://developers.facebook.com)
2. Clique em **"Meus Apps"**
3. Clique em **"Criar App"**

#### **B. Configurar Aplicação**
1. **Tipo de App:** Selecione **"Business"**
2. **Nome da App:** `SAAE WhatsApp Bot`
3. **Email:** Seu email
4. **Conta Comercial:** Sua conta comercial do Meta
5. Clique em **"Criar App"**

### **2. Adicionar WhatsApp Business API**

#### **A. Adicionar Produto**
1. No painel da sua app
2. Clique em **"Adicionar Produto"**
3. Encontre **"WhatsApp"**
4. Clique em **"Configurar"**

#### **B. Configurar Número de Telefone**
1. **Adicionar Número:**
   - Clique em **"Adicionar número de telefone"**
   - Digite seu número comercial
   - Escolha o país (Brasil)
   
2. **Verificar Número:**
   - Receberá um SMS com código
   - Digite o código de verificação
   - Aguarde aprovação

### **3. Obter Credenciais**

#### **A. Acessar API Setup**
1. No painel WhatsApp
2. Vá em **"API Setup"**
3. **Anote as seguintes informações:**

#### **B. Credenciais Obrigatórias**
```
✅ Phone Number ID: 123456789012345
✅ Access Token: EAABwzLixnjYBAC...
✅ Business Account ID: 123456789012345
```

### **4. Configurar Webhook**

#### **A. Configurar no Meta**
1. Em **"API Setup"** → **"Webhook"**
2. **Callback URL:** `https://seu-dominio.com/webhook`
3. **Verify Token:** `seu_token_verificacao_seguro`
4. **Webhook Fields:** Marque:
   - ✅ `messages`
   - ✅ `message_status`

#### **B. Testar Webhook**
```bash
# Teste de verificação
curl "https://seu-dominio.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=seu_token"

# Deve retornar: test
```

### **5. Configurar Sistema Local**

#### **A. Copiar Credenciais**
```bash
# Copiar arquivo de configuração
cp production.env .env

# Editar com suas credenciais
nano .env
```

#### **B. Configurar .env**
```env
# Substitua pelos valores reais:
WHATSAPP_ACCESS_TOKEN=EAABwzLixnjYBAC...
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_verificacao_seguro
WHATSAPP_BUSINESS_ACCOUNT_ID=123456789012345

# Configure sua URL (se tiver domínio)
WEBHOOK_URL=https://seu-dominio.com
ADMIN_PANEL_URL=https://seu-dominio.com/admin
```

### **6. Testar Conexão**

#### **A. Iniciar em Modo Produção**
```bash
# Parar demo atual
pkill -f "node.*demo.js"

# Iniciar com credenciais reais
npm start
```

#### **B. Verificar Status**
```bash
# Verificar API
curl http://localhost:3000/api/status

# Verificar webhook
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=seu_token"
```

### **7. Testar com WhatsApp Real**

#### **A. Enviar Mensagem de Teste**
```bash
# Via API
curl -X POST http://localhost:3000/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Teste real"}'
```

#### **B. Verificar Recebimento**
- A mensagem deve aparecer no WhatsApp
- O bot deve responder automaticamente
- Verificar logs do sistema

## 🔧 **Configuração para Teste Local**

### **Opção 1: Usar ngrok (Recomendado)**

#### **A. Instalar ngrok**
```bash
# macOS
brew install ngrok

# Ou baixar de: https://ngrok.com/download
```

#### **B. Expor Servidor Local**
```bash
# Expor porta 3000
ngrok http 3000

# Anote a URL gerada:
# https://abc123.ngrok.io
```

#### **C. Configurar Webhook**
1. No Meta Business Manager
2. **Callback URL:** `https://abc123.ngrok.io/webhook`
3. **Verify Token:** Mesmo do .env
4. Salvar configurações

### **Opção 2: Deploy na VM**

#### **A. Fazer Deploy**
```bash
# Usar script automático
./deploy-to-vm.sh

# Ou manual seguindo INSTRUCOES_VM.md
```

#### **B. Configurar Webhook**
1. **Callback URL:** `https://SEU_IP_VM:3000/webhook`
2. **Verify Token:** Mesmo do .env
3. Testar conectividade

## 📱 **Testando o Sistema**

### **1. Enviar Primeira Mensagem**
- Abra WhatsApp no celular
- Envie mensagem para o número configurado
- Bot deve responder com menu principal

### **2. Testar Fluxos**
- Digite "menu" para ver opções
- Teste "consulta" para fluxo de CPF
- Teste "agendamento" para agendamentos
- Teste "emergência" para emergências

### **3. Verificar Logs**
```bash
# Ver logs em tempo real
tail -f logs/combined.log

# Ou via dashboard
http://localhost:3000/dashboard
```

## 🆘 **Problemas Comuns**

### **"Token inválido"**
- ✅ Verificar `WHATSAPP_ACCESS_TOKEN`
- ✅ Token não expirado
- ✅ Permissões corretas na app

### **"Webhook não funciona"**
- ✅ URL com HTTPS (ngrok ou domínio)
- ✅ `WHATSAPP_WEBHOOK_VERIFY_TOKEN` correto
- ✅ Servidor acessível publicamente

### **"Número não verificado"**
- ✅ Número adicionado na Meta Business
- ✅ SMS de verificação confirmado
- ✅ Número ativo e funcional

### **"Mensagens não chegam"**
- ✅ Webhook configurado no Meta
- ✅ Número de telefone verificado
- ✅ App em modo produção
- ✅ Teste com ngrok funcionando

## 🎯 **Checklist Final**

- [ ] Conta Meta for Developers criada
- [ ] App Business configurada
- [ ] WhatsApp Business API adicionada
- [ ] Número de telefone verificado
- [ ] Credenciais anotadas (Phone ID, Access Token, Business ID)
- [ ] Webhook configurado (ngrok ou domínio)
- [ ] Arquivo .env configurado
- [ ] Sistema iniciado em modo produção
- [ ] Teste de webhook OK
- [ ] Mensagem enviada via WhatsApp
- [ ] Bot respondendo corretamente

## 📞 **Suporte**

Se precisar de ajuda:
1. **Verificar logs:** `tail -f logs/combined.log`
2. **Testar webhook:** Usar curl ou dashboard
3. **Verificar credenciais:** Comparar com Meta Business Manager
4. **Usar ngrok:** Para testes locais

---

## 🎉 **WhatsApp Conectado!**

Após seguir este guia, seu SAAE WhatsApp Bot estará conectado ao WhatsApp real e pronto para atender os cidadãos de Palmital! 🏛️🤖

**Próximo passo:** Fazer deploy na VM para produção.
