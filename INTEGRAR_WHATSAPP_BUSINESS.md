# 🔗 COMO INTEGRAR COM WHATSAPP BUSINESS

## 📋 PRÉ-REQUISITOS

- [ ] Conta Facebook/Meta
- [ ] Número de telefone (fixo ou celular)
- [ ] Cartão de crédito (para verificação, não cobra nada)
- [ ] Ngrok instalado (já está na pasta)

---

## PASSO 1: CRIAR APP NO META FOR DEVELOPERS

### 1.1. Acessar o Portal
1. Acesse: https://developers.facebook.com
2. Clique em **"Meus Aplicativos"** no canto superior direito
3. Clique em **"Criar Aplicativo"**

### 1.2. Configurar o App
1. Escolha: **"Outro"**
2. Tipo: **"Empresa"**
3. Informações:
   - **Nome do App:** SAAE Bot (ou qualquer nome)
   - **Email de contato:** seu@email.com
   - Aceite os termos
4. Clique em **"Criar App"**

### 1.3. Adicionar WhatsApp ao App
1. Na lista de produtos, procure **"WhatsApp"**
2. Clique em **"Configurar"**
3. Você será redirecionado para o painel do WhatsApp

---

## PASSO 2: CONFIGURAR NÚMERO DE TELEFONE

### 2.1. Adicionar Número
1. No painel do WhatsApp, clique em **"Começar"**
2. Você verá um número de teste fornecido pelo Meta
3. Para usar seu próprio número:
   - Clique em **"Adicionar número de telefone"**
   - Escolha **"Usar seu próprio número"**
   - Digite seu número no formato: +55 18 99999-9999
   - Clique em **"Próximo"**

### 2.2. Verificar Número
1. Você receberá um código via SMS ou ligação
2. Digite o código recebido
3. Aguarde a confirmação

### 2.3. Copiar Credenciais
Agora você precisa de 3 informações importantes:

**A) Phone Number ID:**
- No painel, vá em **"API Setup"**
- Copie o **"Phone number ID"** (começa com números)
- Exemplo: `123456789012345`

**B) Access Token (Temporário):**
- No mesmo painel, vá em **"API Setup"**
- Copie o **"Temporary access token"**
- ⚠️ Este token expira em 24h! Depois precisará gerar um permanente

**C) App ID e App Secret:**
- Vá em **"Configurações"** → **"Básico"**
- Copie o **"ID do aplicativo"**
- Copie o **"Chave secreta do aplicativo"** (clique em "Mostrar")

---

## PASSO 3: GERAR TOKEN PERMANENTE

### 3.1. Criar System User
1. Acesse: https://business.facebook.com/settings/system-users
2. Clique em **"Adicionar"**
3. Nome: "Bot WhatsApp"
4. Função: **"Administrador"**
5. Clique em **"Criar usuário do sistema"**

### 3.2. Gerar Token
1. Clique no usuário criado
2. Clique em **"Gerar novo token"**
3. Selecione seu aplicativo
4. Permissões necessárias:
   - `whatsapp_business_management`
   - `whatsapp_business_messaging`
5. Clique em **"Gerar token"**
6. **COPIE E GUARDE ESTE TOKEN!** Não será mostrado novamente

---

## PASSO 4: CONFIGURAR SEU BOT

### 4.1. Criar arquivo .env

No terminal, execute:

```bash
cd /Users/reinaldocandeo/Desktop/Postman
cp demo.env .env
nano .env
```

### 4.2. Editar as credenciais

Cole estas informações no arquivo `.env`:

```env
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id_aqui
WHATSAPP_ACCESS_TOKEN=seu_access_token_permanente_aqui
WHATSAPP_WEBHOOK_VERIFY_TOKEN=meu_token_secreto_123

# Servidor
PORT=3000
WEBHOOK_URL=https://sua-url-ngrok.ngrok.io

# Banco de Dados
DB_PATH=./database/saae_bot.db

# Ambiente (IMPORTANTE: mudar para production)
NODE_ENV=production
```

**Substitua:**
- `seu_phone_number_id_aqui` → Phone Number ID copiado
- `seu_access_token_permanente_aqui` → Token permanente gerado
- `meu_token_secreto_123` → Invente uma senha (ex: saae2024webhook)
- `sua-url-ngrok.ngrok.io` → Vamos pegar isso no próximo passo

Para salvar: `Ctrl+O`, `Enter`, `Ctrl+X`

---

## PASSO 5: EXPOR SEU SERVIDOR NA INTERNET (NGROK)

### 5.1. Parar o servidor atual

```bash
lsof -ti:3000 | xargs kill -9
```

### 5.2. Iniciar ngrok

```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

Você verá algo assim:
```
Forwarding    https://abc123def456.ngrok.io -> http://localhost:3000
```

**COPIE essa URL!** (a parte https://abc123def456.ngrok.io)

### 5.3. Atualizar .env com a URL

Abra outro terminal e edite o .env:

```bash
nano .env
```

Atualize a linha:
```env
WEBHOOK_URL=https://abc123def456.ngrok.io
```

Salve: `Ctrl+O`, `Enter`, `Ctrl+X`

---

## PASSO 6: INICIAR SERVIDOR EM PRODUÇÃO

### 6.1. Iniciar o bot

Em um novo terminal (deixe o ngrok rodando):

```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```

Você deve ver:
```
🚀 Servidor rodando na porta 3000
✅ WhatsApp API configurada
```

Se der erro "porta em uso", primeiro mate o processo:
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

---

## PASSO 7: CONFIGURAR WEBHOOK NO META

### 7.1. Acessar Configuração de Webhook
1. Volte ao painel do WhatsApp no Meta for Developers
2. Vá em **"Configuração"** → **"Webhook"**
3. Clique em **"Editar"**

### 7.2. Configurar URL e Token
Preencha:

**Callback URL:**
```
https://sua-url-ngrok.ngrok.io/webhook
```
(Use a URL do ngrok + /webhook)

**Verify Token:**
```
meu_token_secreto_123
```
(O mesmo que você colocou no .env como WHATSAPP_WEBHOOK_VERIFY_TOKEN)

### 7.3. Verificar
1. Clique em **"Verificar e salvar"**
2. Se aparecer ✅ "Verificado" = Sucesso!
3. Se der erro, verifique:
   - URL está correta?
   - Ngrok está rodando?
   - Servidor está rodando?
   - Token está igual no .env e no Meta?

### 7.4. Assinar Campos
Depois de verificar, na mesma página:

1. Clique em **"Gerenciar"**
2. Marque estes campos:
   - [x] `messages`
   - [x] `message_status`
3. Clique em **"Salvar"**

---

## PASSO 8: TESTAR INTEGRAÇÃO

### 8.1. Enviar mensagem de teste

No painel do Meta:
1. Vá em **"API Setup"**
2. Role até **"Enviar e receber mensagens"**
3. Você verá um número de teste
4. Envie mensagem para esse número do seu WhatsApp

OU

Use seu próprio número que você registrou!

### 8.2. Enviar "menu" no WhatsApp

Do seu celular, envie para o número do bot:
```
menu
```

Você deve receber de volta um menu com 5 botões! 🎉

### 8.3. Verificar logs

No terminal onde o bot está rodando, você verá:
```
📨 Webhook recebido
🤖 Processando mensagem
📤 Enviando mensagem
✅ Mensagem processada
```

---

## 🎉 PRONTO! SEU BOT ESTÁ INTEGRADO!

Agora você pode:
- ✅ Receber mensagens do WhatsApp real
- ✅ Enviar botões interativos
- ✅ Fazer agendamentos
- ✅ Validar CPF
- ✅ Tudo funciona de verdade!

---

## ⚠️ IMPORTANTE - MANTER FUNCIONANDO

### Manter ngrok e servidor rodando

Você precisa de 2 terminais abertos:

**Terminal 1 - Ngrok:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
./ngrok http 3000
```

**Terminal 2 - Servidor:**
```bash
cd /Users/reinaldocandeo/Desktop/Postman
npm start
```

### Se ngrok reiniciar

Se você fechar o ngrok, a URL vai mudar! Você precisa:
1. Pegar a nova URL do ngrok
2. Atualizar no .env
3. Atualizar no Meta (Webhook)
4. Reiniciar o servidor

---

## 🐛 TROUBLESHOOTING

### Erro: "Webhook verification failed"
**Problema:** Token não confere
**Solução:**
1. Verifique se o token no .env é EXATAMENTE igual ao do Meta
2. Reinicie o servidor

### Erro: "Invalid access token"
**Problema:** Token expirou ou está errado
**Solução:**
1. Gere um novo token permanente
2. Atualize no .env
3. Reinicie o servidor

### Bot não recebe mensagens
**Problema:** Webhook não configurado ou campos não assinados
**Solução:**
1. Verifique se webhook foi verificado com sucesso
2. Verifique se campos `messages` está marcado
3. Teste novamente

### Ngrok expira
**Problema:** Ngrok gratuito tem sessões de 2h
**Solução:**
1. Reinicie o ngrok
2. Atualize URL no .env e no Meta
3. OU crie conta gratuita no ngrok para sessões mais longas

---

## 📱 TESTANDO TODAS AS FUNCIONALIDADES

### Menu Principal
Envie: `menu`
Você recebe: 5 botões

### Agendamento Completo
1. Clique em "Agendamento"
2. Escolha tipo de serviço
3. Informe dados: Nome, CPF, Endereço, Telefone
4. Confirme
5. Receba protocolo!

### Consulta de Conta
1. Clique em "Consulta de Conta"
2. Informe CPF
3. Receba informações

---

## 🚀 PRÓXIMOS PASSOS (OPCIONAL)

### Deploy em Servidor Real (sem ngrok)

Para produção real, você precisa de:
1. Servidor na nuvem (Vercel, Railway, AWS, etc)
2. Domínio próprio
3. HTTPS configurado

Guias disponíveis:
- `DEPLOY_VERCEL.md` - Deploy na Vercel (gratuito)
- `DEPLOY_PROXMOX.md` - Deploy em servidor próprio

---

## 📞 CUSTOS

### WhatsApp Business API (Meta)
- **Teste:** 1.000 mensagens grátis por mês
- **Depois:** ~R$ 0,03 por mensagem
- Pagamento via cartão de crédito no Meta Business

### Ngrok
- **Gratuito:** Funciona, mas URL muda ao reiniciar
- **Pago:** $8/mês para URL fixa

### Servidor
- **Local (seu Mac):** Grátis (mas precisa ficar ligado)
- **Vercel:** Grátis
- **Outros:** Varia

---

## ✅ CHECKLIST FINAL

Antes de considerar concluído, verifique:

- [ ] Conta Meta criada
- [ ] App WhatsApp criado
- [ ] Número verificado
- [ ] Token permanente gerado
- [ ] Arquivo .env configurado
- [ ] Ngrok rodando
- [ ] Servidor rodando
- [ ] Webhook verificado no Meta
- [ ] Campos assinados (messages)
- [ ] Teste enviado do WhatsApp
- [ ] Bot respondeu com botões

**Se todos ✅ = FUNCIONANDO!** 🎉

---

## 💡 DICAS

1. **Mantenha o terminal aberto:** Você precisa ver os logs
2. **Não feche o ngrok:** Senão o bot para de funcionar
3. **Token seguro:** Nunca compartilhe seu access token
4. **Backup:** Faça backup do arquivo .env
5. **Logs:** Sempre verifique os logs quando algo não funcionar

---

**Boa sorte com a integração!** 🚀

Se precisar de ajuda, os logs do servidor vão te dizer o que está errado!

