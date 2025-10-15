# 📚 Índice - Bot de Triagem WhatsApp com Botões

## 🎯 Início Rápido

👉 **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - 3 passos para começar  
⏱️ Tempo: 5 minutos

---

## 📖 Documentação Principal

### Para Iniciantes
1. 📋 **[RESUMO_BOT_TRIAGEM.md](./RESUMO_BOT_TRIAGEM.md)**  
   Resumo executivo - O que foi implementado  
   ⏱️ Leitura: 10 minutos

2. 🚀 **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)**  
   Comandos rápidos para começar  
   ⏱️ Leitura: 5 minutos

### Guias Completos
3. 📖 **[GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md)**  
   Documentação técnica completa  
   ⏱️ Leitura: 30 minutos

4. 📚 **[BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md)**  
   README do projeto completo  
   ⏱️ Leitura: 20 minutos

### Testes e Exemplos
5. 🧪 **[TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md)**  
   Como testar sem WhatsApp real  
   ⏱️ Leitura: 15 minutos

6. 📱 **[EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md)**  
   Exemplos visuais de botões  
   ⏱️ Leitura: 15 minutos

---

## 🗂️ Estrutura por Tópico

### 🎨 Interface e UX
- [EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md) - Como os botões aparecem
- [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Seção "Como os Usuários Veem"

### 🔧 Configuração
- [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) - Setup inicial
- [CONFIGURACAO_RAPIDA.md](./CONFIGURACAO_RAPIDA.md) - Configuração detalhada
- [COMO_OBTER_CREDENCIAIS.md](./COMO_OBTER_CREDENCIAIS.md) - Credenciais Meta

### 🧪 Testes
- [TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md) - Testes locais
- [TESTAR_BOT.md](./TESTAR_BOT.md) - Testes gerais
- [DEMONSTRACAO.md](./DEMONSTRACAO.md) - Modo demo

### 🚀 Deploy
- [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) - Deploy na Vercel
- [DEPLOY_PROXMOX.md](./DEPLOY_PROXMOX.md) - Deploy em VM
- [INSTRUCOES_VM.md](./INSTRUCOES_VM.md) - Instruções para VM

### 📊 Funcionalidades
- [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Todas as funcionalidades
- [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Recursos implementados

---

## 🎯 Guia por Objetivo

### "Quero testar rapidamente"
1. [INICIO_RAPIDO.md](./INICIO_RAPIDO.md)
2. [TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md)

### "Quero entender como funciona"
1. [RESUMO_BOT_TRIAGEM.md](./RESUMO_BOT_TRIAGEM.md)
2. [EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md)
3. [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md)

### "Quero colocar em produção"
1. [COMO_OBTER_CREDENCIAIS.md](./COMO_OBTER_CREDENCIAIS.md)
2. [CONFIGURACAO_RAPIDA.md](./CONFIGURACAO_RAPIDA.md)
3. [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)
4. [SETUP_WEBHOOK_NGROK.md](./SETUP_WEBHOOK_NGROK.md)

### "Quero personalizar"
1. [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Personalização"
2. [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Seção "Customização"

---

## 📁 Arquivos do Código

### Lógica do Bot
- `bot/chatbot.js` - **Principal** - Toda a lógica do bot
- `services/webhook.js` - Processamento de mensagens
- `services/whatsapp.js` - API do WhatsApp

### Banco de Dados
- `database/init.js` - Estrutura e tabelas
- `database/conversations.js` - Histórico
- `database/logs.js` - Sistema de logs

### Rotas
- `routes/webhook.js` - Rotas do webhook
- `routes/api.js` - API REST
- `routes/admin.js` - Painel admin

### Servidor
- `server.js` - Servidor Express
- `start.js` - Script de inicialização

---

## 🔍 Busca Rápida

### Validação de CPF
📄 Arquivo: `bot/chatbot.js` (linha ~268)  
📖 Doc: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Validações"

### Criar Botões
📄 Arquivo: `bot/chatbot.js` (linha ~188)  
📖 Doc: [EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md) - Seção "Anatomia"

### Processar Botões
📄 Arquivo: `bot/chatbot.js` (linha ~143)  
📖 Doc: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Estrutura Técnica"

### Agendamento
📄 Arquivo: `bot/chatbot.js` (linha ~700)  
📖 Doc: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Agendamento"

### Banco de Dados
📄 Arquivo: `database/init.js` (linha ~39)  
📖 Doc: [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Seção "Banco de Dados"

---

## ❓ FAQ - Perguntas Frequentes

### Como adicionar novo botão?
📖 Ver: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Personalização"

### Como validar CPF?
📖 Ver: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) - Seção "Validações"

### Como testar sem WhatsApp?
📖 Ver: [TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md)

### Botões não aparecem?
📖 Ver: [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Seção "Troubleshooting"

### Como fazer deploy?
📖 Ver: [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

---

## 🎓 Tutoriais Passo a Passo

### Tutorial 1: Primeiro Teste
1. Instalar dependências: `npm install`
2. Iniciar modo demo: `NODE_ENV=demo node server.js`
3. Simular mensagem (ver [INICIO_RAPIDO.md](./INICIO_RAPIDO.md))
4. Ver logs: `tail -f startup.log`

### Tutorial 2: Adicionar Novo Serviço
1. Editar `bot/chatbot.js`
2. Adicionar botão no menu de agendamento
3. Criar função de processamento
4. Adicionar case em `handleSchedulingButton()`
5. Testar

### Tutorial 3: Deploy Completo
1. Obter credenciais Meta
2. Configurar `.env`
3. Iniciar ngrok
4. Configurar webhook
5. Deploy na Vercel
6. Testar com WhatsApp real

---

## 🛠️ Ferramentas e Scripts

### Scripts Disponíveis
- `npm start` - Iniciar em produção
- `npm run demo` - Iniciar em modo demo
- `./test-whatsapp.sh` - Testar bot
- `./validar-credenciais.sh` - Validar credenciais
- `./deploy-to-vm.sh` - Deploy em VM

### Comandos Úteis
```bash
# Ver logs
tail -f startup.log

# Consultar banco
sqlite3 database/saae_bot.db "SELECT * FROM appointments;"

# Limpar banco demo
rm database/saae_bot_demo.db

# Testar health
curl http://localhost:3000/health
```

---

## 📊 Métricas e Monitoramento

### Dashboard Web
URL: http://localhost:3000/admin

### Banco de Dados
```bash
sqlite3 database/saae_bot.db
```

Queries úteis:
```sql
-- Agendamentos por status
SELECT status, COUNT(*) FROM appointments GROUP BY status;

-- Usuários ativos
SELECT COUNT(*) FROM users WHERE last_seen > datetime('now', '-1 day');

-- Mensagens por dia
SELECT DATE(timestamp), COUNT(*) FROM conversations GROUP BY DATE(timestamp);
```

---

## 🔗 Links Externos

### Documentação Oficial
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp)
- [Meta Business Manager](https://business.facebook.com/)
- [Node.js](https://nodejs.org/)
- [SQLite](https://www.sqlite.org/)

### Ferramentas
- [ngrok](https://ngrok.com/) - Túnel para testes
- [Postman](https://www.postman.com/) - Testar APIs
- [SQLite Browser](https://sqlitebrowser.org/) - Visualizar banco

---

## 📞 Suporte

### Dúvidas sobre Funcionalidades
📖 Consulte: [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md)

### Problemas Técnicos
📖 Consulte: [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) - Seção "Troubleshooting"

### Testes e Validação
📖 Consulte: [TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md)

---

## ✅ Checklist de Implementação

### Básico
- [x] Bot de triagem implementado
- [x] Botões interativos funcionando
- [x] Validação de CPF
- [x] Sistema de agendamento
- [x] Banco de dados configurado
- [x] Documentação completa

### Teste
- [ ] Testar em modo demo
- [ ] Testar com WhatsApp real
- [ ] Validar todas as funcionalidades
- [ ] Testar erros e edge cases

### Produção
- [ ] Configurar credenciais reais
- [ ] Deploy em servidor
- [ ] Configurar webhook
- [ ] Monitorar logs
- [ ] Backup do banco

---

## 🎯 Roadmap

### Fase 1 (Atual) ✅
- [x] Menu com botões
- [x] Sistema de triagem
- [x] Agendamentos
- [x] Validações

### Fase 2 (Próximo)
- [ ] Listas interativas
- [ ] Notificações agendadas
- [ ] Pagamentos via Pix
- [ ] Dashboard admin melhorado

### Fase 3 (Futuro)
- [ ] IA para respostas
- [ ] Multi-atendente
- [ ] CRM integrado
- [ ] Analytics avançado

---

## 🌟 Recursos Principais

| Recurso | Status | Documentação |
|---------|--------|--------------|
| Botões Interativos | ✅ | [EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md) |
| Validação CPF | ✅ | [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) |
| Agendamento | ✅ | [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) |
| Confirmação | ✅ | [EXEMPLOS_BOTOES.md](./EXEMPLOS_BOTOES.md) |
| Horário Comercial | ✅ | [GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md) |
| Banco de Dados | ✅ | [BOT_TRIAGEM_README.md](./BOT_TRIAGEM_README.md) |
| Modo Demo | ✅ | [TESTAR_BOT_LOCAL.md](./TESTAR_BOT_LOCAL.md) |
| Dashboard | ✅ | [DASHBOARD_WEB.md](./DASHBOARD_WEB.md) |

---

## 💡 Dica

Comece por: **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** 

Depois leia: **[RESUMO_BOT_TRIAGEM.md](./RESUMO_BOT_TRIAGEM.md)**

Para entender tudo: **[GUIA_BOT_TRIAGEM.md](./GUIA_BOT_TRIAGEM.md)**

---

**🎉 Sucesso com seu bot de triagem!**

