# 🇧🇷 Guia Completo - SAAE WhatsApp Bot

## 📋 Visão Geral do Sistema

Este é um sistema completo de chatbot WhatsApp para o SAAE (Serviço Autônomo de Água e Esgoto) de Palmital, que inclui:

- 🤖 **Chatbot WhatsApp** com integração Meta Cloud API
- 💧 **Dashboard de Monitoramento** de tanques de água em tempo real
- 👨‍💼 **Painel Administrativo** para gerenciar conversas
- 📊 **Sistema de Logs** e relatórios
- 🔧 **API REST** para integrações

## 🚀 Configuração Rápida (5 minutos)

### **Passo 1: Verificar Pré-requisitos**
```bash
# Verificar se Node.js está instalado
node --version  # Deve ser 16 ou superior

# Verificar se npm está funcionando
npm --version
```

### **Passo 2: Instalar Dependências**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm install
```

### **Passo 3: Configurar Ambiente**
```bash
# O arquivo .env já foi criado automaticamente
# Verificar se existe:
ls -la .env
```

### **Passo 4: Iniciar Servidor**
```bash
npm start
```

**✅ Resultado esperado:**
```
🤖 SAAE WhatsApp Bot - Inicializando...
✅ Banco de dados inicializado
✅ WhatsApp API configurada
🚀 Servidor rodando na porta 3000
📱 Webhook: http://localhost:3000/webhook
👨‍💼 Admin Panel: http://localhost:3000/admin
```

## 🔧 Configuração do Webhook com ngrok

### **Por que usar ngrok?**
Como você está desenvolvendo localmente, seu servidor roda em `localhost` e não tem um endereço HTTPS público. O ngrok cria um "túnel" seguro da internet para seu computador.

### **Instalação do ngrok**

#### **Opção A: Homebrew (Recomendado)**
```bash
brew install ngrok
```

#### **Opção B: Download Direto**
1. Acesse: https://ngrok.com/download
2. Baixe para macOS
3. Extraia e mova para `/usr/local/bin/`

### **Configuração do ngrok**

#### **1. Iniciar ngrok (Terminal Separado)**
```bash
# Criar túnel para porta 3000
ngrok http 3000
```

#### **2. Copiar URL Gerada**
Você verá algo como:
```
Session Status                online
Account                       [sua conta]
Version                       3.x.x
Region                        United States (us)
Forwarding                    https://abc123.ngrok-free.app -> http://localhost:3000
```

**Copie a URL:** `https://abc123.ngrok-free.app`

#### **3. URL Completa do Webhook**
```
https://abc123.ngrok-free.app/webhook
```

## 📱 Configuração no Meta for Developers

### **Passo 1: Acessar Painel Meta**
1. Vá para: https://developers.facebook.com
2. Faça login com sua conta
3. Selecione sua aplicação "SAAE WhatsApp Bot"

### **Passo 2: Configurar Webhook**
1. **WhatsApp** → **API Setup** → **Webhook**
2. **Callback URL:** Cole a URL do ngrok + `/webhook`
   ```
   https://abc123.ngrok-free.app/webhook
   ```
3. **Verify Token:** Use o valor do seu arquivo `.env`
   ```
   WHATSAPP_WEBHOOK_VERIFY_TOKEN=demo_verify_token_123
   ```
4. **Webhook Fields:** Marque as opções:
   - ✅ `messages` (mensagens recebidas)
   - ✅ `message_status` (status de entrega)

### **Passo 3: Verificar Webhook**
1. Clique em **"Verify and Save"**
2. **✅ Sucesso:** "Webhook verified successfully"

## 🧪 Testando o Sistema

### **Teste 1: Verificação do Webhook**
```bash
curl "http://localhost:3000/webhook?hub.mode=subscribe&hub.challenge=test123&hub.verify_token=demo_verify_token_123"
```
**Resultado esperado:** `test123`

### **Teste 2: Status da API**
```bash
curl "http://localhost:3000/api/status"
```

### **Teste 3: Health Check**
```bash
curl "http://localhost:3000/health"
```

### **Teste 4: Painel Admin**
- Acesse: `https://abc123.ngrok-free.app/admin`
- Verifique se carrega corretamente

### **Teste 5: Dashboard de Água**
- Acesse: `https://abc123.ngrok-free.app/dashboard`
- Veja o monitoramento dos tanques

## 💬 Testando Mensagens WhatsApp

### **Via cURL (Teste Programático)**
```bash
curl -X POST https://abc123.ngrok-free.app/api/test-webhook \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"5511999999999","message":"Olá, teste do sistema SAAE"}'
```

### **Via WhatsApp Real**
1. Envie uma mensagem para o número do WhatsApp Business configurado
2. Verifique os logs no terminal do servidor
3. Confirme se recebeu resposta automática

## 📊 Monitoramento e Logs

### **Logs do Servidor**
- **Terminal principal:** Onde você rodou `npm start`
- **Informações:** Mensagens recebidas, erros, status

### **Logs do ngrok**
- **Interface web:** http://127.0.0.1:4040
- **Informações:** Requisições HTTP, tempo de resposta

### **Logs do Meta**
- **Painel Meta:** WhatsApp → API Setup → Webhook
- **Informações:** Status de entrega, erros de API

## 🔍 Resolução de Problemas

### **❌ "Webhook verification failed"**
**Soluções:**
- ✅ Verificar se `WHATSAPP_WEBHOOK_VERIFY_TOKEN` está correto no `.env`
- ✅ Verificar se ngrok está rodando
- ✅ Verificar se a URL está acessível publicamente

### **❌ "Invalid token"**
**Soluções:**
- ✅ Verificar `WHATSAPP_ACCESS_TOKEN` no arquivo `.env`
- ✅ Verificar se o token não expirou
- ✅ Verificar permissões da aplicação no Meta

### **❌ "Messages not received"**
**Soluções:**
- ✅ Verificar se webhook fields estão marcados (messages, message_status)
- ✅ Verificar logs do servidor para erros
- ✅ Testar com mensagem simples primeiro

### **❌ "Server not starting"**
**Soluções:**
- ✅ Verificar se arquivo `.env` existe
- ✅ Verificar se todas as dependências foram instaladas (`npm install`)
- ✅ Verificar se a porta 3000 não está sendo usada por outro processo

## 🎯 Funcionalidades do Sistema

### **1. Chatbot WhatsApp**
- ✅ Recebe mensagens automaticamente
- ✅ Responde com informações do SAAE
- ✅ Processa consultas sobre contas, vazamentos, etc.
- ✅ Agenda serviços e atendimento

### **2. Dashboard de Monitoramento**
- ✅ Visualização em tempo real dos tanques
- ✅ Alertas de nível crítico
- ✅ Gráficos históricos de consumo
- ✅ Status dos sensores ESP32

### **3. Painel Administrativo**
- ✅ Visualizar conversas
- ✅ Estatísticas de uso
- ✅ Configurar respostas automáticas
- ✅ Gerenciar usuários

### **4. API REST**
- ✅ Endpoints para integração
- ✅ Documentação automática
- ✅ Rate limiting e segurança
- ✅ Logs detalhados

## 📱 URLs Importantes do Sistema

### **Desenvolvimento Local:**
- **Servidor:** http://localhost:3000
- **Webhook:** http://localhost:3000/webhook
- **Admin Panel:** http://localhost:3000/admin
- **Dashboard:** http://localhost:3000/dashboard
- **API Status:** http://localhost:3000/api/status
- **Health Check:** http://localhost:3000/health

### **Via ngrok (Público):**
- **Webhook:** `https://abc123.ngrok-free.app/webhook`
- **Admin Panel:** `https://abc123.ngrok-free.app/admin`
- **Dashboard:** `https://abc123.ngrok-free.app/dashboard`
- **API Status:** `https://abc123.ngrok-free.app/api/status`

## 🚀 Próximos Passos

### **Desenvolvimento:**
1. ✅ **Sistema funcionando** com ngrok
2. 🔄 **Testar fluxos** de conversação
3. 🔄 **Personalizar respostas** do bot
4. 🔄 **Integrar dados reais** do SAAE

### **Produção:**
1. **Deploy no Vercel** (recomendado)
2. **Configurar domínio** personalizado
3. **SSL automático** (HTTPS)
4. **Monitoramento** 24/7

### **Integração:**
1. **Conectar sistema** de cobrança
2. **Integrar banco de dados** do SAAE
3. **Sincronizar** dados de clientes
4. **Automatizar** processos

## 📞 Suporte e Contato

### **Documentação:**
- **README.md** - Visão geral do projeto
- **CONFIGURACAO_RAPIDA.md** - Setup rápido
- **DEPLOY_VERCEL.md** - Deploy em produção
- **IMPLEMENTACAO_COMPLETA.md** - Guia detalhado

### **Comandos Úteis:**
```bash
# Verificar status do sistema
npm run check

# Modo desenvolvimento (auto-reload)
npm run dev

# Executar demonstração
npm run demo

# Verificar logs
pm2 logs saae-whatsapp-bot
```

### **Estrutura do Projeto:**
```
/Users/reinaldocandeo/Desktop/Postman/
├── bot/                    # Código do chatbot
├── routes/                 # Rotas da API
├── services/              # Serviços (WhatsApp, webhook)
├── database/              # Banco de dados SQLite
├── public/                # Arquivos estáticos
├── server.js              # Servidor principal
├── package.json           # Dependências
└── .env                   # Configurações
```

---

## 🎉 Sistema Pronto!

**✅ Seu chatbot WhatsApp do SAAE está funcionando!**

- 🤖 **Bot ativo** e respondendo mensagens
- 💧 **Dashboard** monitorando tanques
- 👨‍💼 **Admin panel** para gerenciamento
- 📊 **Logs** de todas as atividades
- 🔧 **API** pronta para integrações

**Próximo passo:** Teste enviando uma mensagem para o número do WhatsApp Business configurado!

---

*Desenvolvido para SAAE de Palmital - Sistema de Atendimento Automatizado*
