# 🤖 Bot de Triagem WhatsApp com Botões Interativos

Bot inteligente de atendimento automático para WhatsApp com interface de **botões interativos**, validação de CPF, sistema de agendamento e muito mais!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Business%20API-25D366.svg)](https://developers.facebook.com/docs/whatsapp)

## 🌟 Funcionalidades

- ✅ **Menu Interativo** com 5 botões clicáveis
- ✅ **Sistema de Agendamento** (Água, Esgoto, Manutenção, Vistoria)
- ✅ **Validação Completa de CPF** com dígitos verificadores
- ✅ **Confirmação com Botões** (Sim/Não)
- ✅ **Controle de Horário Comercial** (Seg-Sex 8h-17h)
- ✅ **Estados de Conversa** persistentes
- ✅ **Banco de Dados SQLite** completo
- ✅ **Geração de Protocolo** único
- ✅ **2 Versões:** API Oficial e QR Code

## 🚀 Início Rápido

### Opção 1: WhatsApp Web (QR Code) - Mais Fácil! 

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar bot
node bot-qrcode.js

# 3. Escanear QR Code com WhatsApp
# 4. Enviar "menu" e pronto! 🎉
```

### Opção 2: WhatsApp Business API (Oficial)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar credenciais
cp demo.env .env
nano .env  # Adicione suas credenciais

# 3. Iniciar bot
npm start

# 4. Configurar webhook no Meta
```

## 📋 Pré-requisitos

- Node.js v18 ou superior
- Conta WhatsApp
- (Opcional) Conta Meta for Developers

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/ReinaldoCandeo/bot_saae.git
cd bot_saae

# Instalar dependências
npm install

# Configurar ambiente
cp demo.env .env
```

## 🎯 Uso

### Versão QR Code (Recomendado para Testes)

```bash
node bot-qrcode.js
```

**Vantagens:**
- ✅ Sem configuração complexa
- ✅ Funciona em qualquer país
- ✅ Sem limitações de destinatários
- ✅ Só escanear e usar!

### Versão API Oficial (Recomendado para Produção)

```bash
npm start
```

**Vantagens:**
- ✅ Oficial e estável
- ✅ Suporte comercial
- ✅ Escalável
- ✅ SLA garantido

## 📱 Funcionalidades do Bot

### Menu Principal
```
🏛️ SAAE Palmital
Escolha uma opção:

[📋 Consulta de Conta]
[📄 Segunda Via]
[📅 Agendamento]
[📞 Fale Conosco]
[🚨 Emergências]
```

### Agendamento de Serviços
- 💧 Ligação de Água
- 🚽 Ligação de Esgoto
- 🔧 Manutenção
- 🔍 Vistoria

**Fluxo completo:**
Escolha serviço → Informa dados → Validação CPF → Confirmação → Protocolo gerado

## 📚 Documentação

- 📖 [Guia Completo](./GUIA_BOT_TRIAGEM.md) - Documentação técnica
- 🚀 [Início Rápido](./INICIO_RAPIDO.md) - 3 passos para começar
- 📱 [Exemplos de Botões](./EXEMPLOS_BOTOES.md) - Como aparecem no WhatsApp
- 🧪 [Testar Localmente](./TESTAR_BOT_LOCAL.md) - Testes sem WhatsApp real
- 🔗 [Integração WhatsApp Business](./INTEGRAR_WHATSAPP_BUSINESS.md) - API oficial
- 📱 [Bot QR Code](./USO_BOT_QRCODE.md) - Versão com QR Code
- 🚀 [Deploy](./DEPLOY_VERCEL.md) - Deploy na Vercel

## 🗂️ Estrutura do Projeto

```
bot_saae/
├── bot/
│   └── chatbot.js          # Lógica principal do bot
├── services/
│   ├── whatsapp.js         # API do WhatsApp
│   └── webhook.js          # Processamento de webhooks
├── database/
│   ├── init.js             # Estrutura do banco
│   ├── conversations.js    # Histórico de conversas
│   └── logs.js             # Logs do sistema
├── routes/
│   ├── webhook.js          # Rotas do webhook
│   ├── api.js              # API REST
│   └── admin.js            # Painel admin
├── public/
│   └── admin/              # Dashboard web
├── bot-qrcode.js           # Versão com QR Code
├── server.js               # Servidor principal
└── package.json            # Dependências
```

## 💾 Banco de Dados

O bot cria automaticamente as seguintes tabelas:

- **users** - Dados dos usuários
- **conversations** - Histórico de mensagens
- **appointments** - Agendamentos
- **webhook_logs** - Logs do webhook
- **bot_config** - Configurações
- **statistics** - Estatísticas de uso

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id
WHATSAPP_ACCESS_TOKEN=seu_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=sua_senha
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_account_id

# Servidor
PORT=3000
WEBHOOK_URL=https://sua-url.ngrok.io
NODE_ENV=production

# Banco de Dados
DB_PATH=./database/saae_bot.db
```

## 🧪 Testes

### Modo Demonstração

```bash
NODE_ENV=demo node server.js
```

### Simular Mensagem

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "object": "whatsapp_business_account",
    "entry": [{
      "changes": [{
        "field": "messages",
        "value": {
          "messages": [{
            "from": "5518999999999",
            "type": "text",
            "id": "msg_123",
            "timestamp": "'$(date +%s)'",
            "text": {"body": "menu"}
          }]
        }
      }]
    }]
  }'
```

## 🚀 Deploy

### Vercel (Gratuito)

```bash
vercel
```

### VPS com PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 📊 Dashboard Web

Acesse: `http://localhost:3000/admin`

Funcionalidades:
- 📈 Estatísticas em tempo real
- 💬 Conversas ativas
- 📅 Agendamentos pendentes
- 📊 Gráficos de uso

## 🔐 Segurança

- ✅ Validação de CPF com dígitos verificadores
- ✅ Prepared statements (SQL injection protection)
- ✅ Token de verificação do webhook
- ✅ .env não é commitado (.gitignore)

## 🐛 Troubleshooting

### Bot não responde
- Verificar se servidor está rodando
- Ver logs: `tail -f bot_whatsapp.log`
- Verificar webhook configurado no Meta

### Botões não aparecem
- Verificar formato da mensagem interativa
- Máximo de 3 botões por mensagem
- Versão QR Code usa listas numeradas

### Erro de porta em uso
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

## 📞 Suporte

- 📖 Documentação completa em português
- 📧 Issues: [GitHub Issues](https://github.com/ReinaldoCandeo/bot_saae/issues)
- 📚 Guias detalhados na pasta do projeto

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🎯 Roadmap

- [x] Menu com botões interativos
- [x] Sistema de agendamento
- [x] Validação de CPF
- [x] Confirmação com botões
- [x] Versão QR Code
- [ ] Listas interativas
- [ ] Pagamentos via Pix
- [ ] Notificações agendadas
- [ ] IA para respostas
- [ ] Multi-atendente

## ⭐ Star o Projeto

Se este projeto foi útil, considere dar uma estrela! ⭐

## 🙏 Agradecimentos

- WhatsApp Business API
- whatsapp-web.js
- Node.js Community
- SQLite

---

**Desenvolvido com ❤️ para automatizar atendimentos no WhatsApp**

[🔗 Ver Repositório](https://github.com/ReinaldoCandeo/bot_saae)
