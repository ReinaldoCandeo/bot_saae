# 🔧 Como Instalar e Configurar o ngrok

## 📥 Instalação do ngrok

### **Opção 1: Download Direto (Recomendado)**

1. **Acesse o site oficial:**
   - Vá para: https://ngrok.com/download

2. **Baixe para macOS:**
   - Clique em **"Download for macOS"**
   - O arquivo será baixado como `ngrok-v3-stable-darwin-amd64.zip`

3. **Extrair e instalar:**
   ```bash
   # Navegar para a pasta de Downloads
   cd ~/Downloads
   
   # Extrair o arquivo
   unzip ngrok-v3-stable-darwin-amd64.zip
   
   # Mover para o diretório de binários
   sudo mv ngrok /usr/local/bin/
   
   # Dar permissão de execução
   sudo chmod +x /usr/local/bin/ngrok
   ```

4. **Verificar instalação:**
   ```bash
   ngrok version
   ```

### **Opção 2: Via Homebrew (se tiver instalado)**

```bash
# Instalar Homebrew (se não tiver)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar ngrok
brew install ngrok
```

## 🔑 Configuração Inicial (Opcional)

### **Criar conta gratuita:**
1. Acesse: https://ngrok.com/signup
2. Crie uma conta gratuita
3. Copie seu authtoken

### **Autenticar (opcional):**
```bash
ngrok config add-authtoken SEU_TOKEN_AQUI
```

## 🚀 Como Usar o ngrok

### **Passo 1: Verificar se servidor está rodando**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```

**Resultado esperado:**
```
🚀 Servidor rodando na porta 3000
```

### **Passo 2: Iniciar ngrok (Terminal Separado)**
```bash
ngrok http 3000
```

### **Passo 3: Copiar URL Gerada**
Você verá algo como:
```
Session Status                online
Account                       [sua conta]
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

**📍 IMPORTANTE:** Copie a URL `https://abc123.ngrok-free.app`

### **Passo 4: URL Completa do Webhook**
```
https://abc123.ngrok-free.app/webhook
```

## 📱 Configuração no Meta for Developers

### **1. Acessar painel Meta:**
- Vá para: https://developers.facebook.com
- Selecione sua aplicação

### **2. Configurar Webhook:**
- **WhatsApp** → **API Setup** → **Webhook**
- **Callback URL:** `https://abc123.ngrok-free.app/webhook`
- **Verify Token:** `demo_verify_token_123`
- **Webhook Fields:** Marcar `messages` e `message_status`

### **3. Verificar:**
- Clique em **"Verify and Save"**
- **✅ Sucesso:** "Webhook verified successfully"

## 🧪 Testando o Sistema

### **Teste 1: Verificação do Webhook**
```bash
curl "https://abc123.ngrok-free.app/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```

### **Teste 2: Status da API**
```bash
curl "https://abc123.ngrok-free.app/api/status"
```

### **Teste 3: Painel Admin**
- Acesse: `https://abc123.ngrok-free.app/admin`

## 🔍 Monitoramento

### **Interface do ngrok:**
- **URL:** http://127.0.0.1:4040
- **Informações:** Requisições HTTP, logs, tempo de resposta

### **Logs do servidor:**
- **Terminal principal:** Onde você rodou `npm start`
- **Informações:** Mensagens recebidas, erros, status

## 🆘 Problemas Comuns

### **❌ "ngrok not found"**
- ✅ Verificar se foi instalado corretamente
- ✅ Verificar se está no PATH
- ✅ Tentar usar caminho completo: `/usr/local/bin/ngrok`

### **❌ "Port already in use"**
- ✅ Verificar se servidor está rodando na porta 3000
- ✅ Tentar porta diferente: `ngrok http 3001`

### **❌ "Webhook verification failed"**
- ✅ Verificar se URL do ngrok está correta
- ✅ Verificar se verify token está correto
- ✅ Verificar se ngrok está rodando

## 📱 URLs Importantes

### **Desenvolvimento Local:**
- **Servidor:** http://localhost:3000
- **Webhook:** http://localhost:3000/webhook

### **Via ngrok (Público):**
- **Webhook:** `https://abc123.ngrok-free.app/webhook`
- **Admin Panel:** `https://abc123.ngrok-free.app/admin`
- **Dashboard:** `https://abc123.ngrok-free.app/dashboard`

---

## 🎯 Resumo dos Passos

1. **📥 Instalar ngrok** (download direto)
2. **🚀 Iniciar servidor** (`npm start`)
3. **🔧 Iniciar ngrok** (`ngrok http 3000`)
4. **📋 Copiar URL** do ngrok
5. **📱 Configurar webhook** no Meta
6. **✅ Testar sistema**

**🎉 Com o ngrok configurado, seu sistema estará acessível publicamente!**
