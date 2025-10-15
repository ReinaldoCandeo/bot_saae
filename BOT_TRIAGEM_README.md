# 🤖 Bot de Triagem WhatsApp com Botões Interativos

Bot inteligente de atendimento automático para WhatsApp Business com interface de botões interativos.

## 🎯 O Que Este Bot Faz?

✅ **Atendimento 24/7** com triagem automática  
✅ **Botões interativos** para navegação fácil  
✅ **Validação de CPF** integrada  
✅ **Agendamento de serviços** completo  
✅ **Sistema de confirmação** com botões  
✅ **Controle de horário comercial**  
✅ **Banco de dados SQLite** integrado  

## 📱 Funcionalidades

### Menu Principal (5 Opções)
- 📋 **Consulta de Conta** - Verifica saldo e consumo
- 📄 **Segunda Via** - Gera boleto de pagamento
- 📅 **Agendamento** - Agenda serviços (água, esgoto, manutenção)
- 📞 **Fale Conosco** - Informações de contato
- 🚨 **Emergências** - Atendimento urgente 24h

### Sistema de Agendamento
- 💧 Ligação de Água
- 🚽 Ligação de Esgoto
- 🔧 Manutenção
- 🔍 Vistoria

**Fluxo:**
1. Usuário escolhe serviço (botão)
2. Informa dados (nome, CPF, endereço, telefone)
3. Sistema valida CPF
4. Apresenta resumo com botões de confirmação
5. Gera protocolo único
6. Salva no banco de dados

## 🚀 Instalação Rápida

```bash
# 1. Clonar repositório
git clone <seu-repositorio>
cd Postman

# 2. Instalar dependências
npm install

# 3. Configurar ambiente
cp demo.env .env

# 4. Editar .env com suas credenciais
nano .env

# 5. Iniciar servidor
npm start
```

## ⚙️ Configuração

### Variáveis de Ambiente (.env)

```env
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id
WHATSAPP_ACCESS_TOKEN=seu_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_verify_token

# Servidor
PORT=3000
WEBHOOK_URL=https://seu-dominio.com

# Banco de Dados
DB_PATH=./database/saae_bot.db

# Ambiente (production ou demo)
NODE_ENV=production
```

### Modo Demonstração

Para testar sem WhatsApp real:

```bash
NODE_ENV=demo node server.js
```

## 📊 Estrutura do Projeto

```
Postman/
├── bot/
│   └── chatbot.js          # Lógica do bot + botões
├── services/
│   ├── whatsapp.js         # API do WhatsApp
│   └── webhook.js          # Processamento de mensagens
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
├── server.js               # Servidor principal
└── package.json            # Dependências
```

## 💾 Banco de Dados

### Tabelas Criadas Automaticamente

- **users** - Dados dos usuários
- **conversations** - Histórico de mensagens
- **appointments** - Agendamentos
- **webhook_logs** - Logs do webhook
- **bot_config** - Configurações
- **statistics** - Estatísticas de uso

### Consultar Dados

```bash
sqlite3 database/saae_bot.db

# Ver agendamentos
SELECT * FROM appointments ORDER BY created_at DESC;

# Ver usuários ativos
SELECT * FROM users WHERE last_seen > datetime('now', '-1 day');

# Ver conversas
SELECT * FROM conversations ORDER BY timestamp DESC LIMIT 20;
```

## 🔧 Personalização

### Adicionar Novo Botão no Menu

Edite `bot/chatbot.js`:

```javascript
async function showMainMenu() {
  return {
    shouldReply: true,
    message: {
      type: 'button',
      header: { type: 'text', text: '🏛️ SAAE Palmital' },
      body: { text: 'Escolha uma opção:' },
      footer: { text: 'Atendimento: Seg-Sex 8h às 17h' },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'btn_novo',
              title: '🆕 Nova Opção'
            }
          }
          // ... outros botões
        ]
      }
    },
    type: 'interactive'
  };
}
```

### Processar Novo Botão

```javascript
async function handleMainMenuButton(buttonId, isBusinessHours) {
  switch (buttonId) {
    case 'btn_novo':
      return await minhaNovaFuncao();
    // ... outros casos
  }
}
```

## 🧪 Testes

### Teste Manual

```bash
# Iniciar em modo demo
NODE_ENV=demo node server.js

# Em outro terminal, simular mensagem
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
            "text": { "body": "menu" }
          }]
        }
      }]
    }]
  }'
```

### Script de Teste

```bash
# Executar testes automatizados
chmod +x test-whatsapp.sh
./test-whatsapp.sh
```

## 📱 Como os Usuários Veem

### 1. Menu Principal
```
🏛️ SAAE Palmital
Escolha uma opção:

[📋 Consulta de Conta]
[📄 Segunda Via]
[📅 Agendamento]
```

### 2. Agendamento
```
📅 Agendamento de Serviços
Escolha o tipo de serviço:

[💧 Ligação de Água]
[🚽 Ligação de Esgoto]
[🔧 Manutenção]
```

### 3. Confirmação
```
✅ Confirmar Agendamento

Serviço: Ligação de Água
Cliente: João Silva
CPF: 123.456.789-09
Data: 16/01/2024 às 14h

[✅ Confirmar]
[❌ Cancelar]
```

## 🔐 Segurança

### Validações Implementadas

- ✅ **CPF:** Validação completa com dígitos verificadores
- ✅ **Horário:** Controle de horário comercial
- ✅ **Dados:** Verificação de campos obrigatórios
- ✅ **Webhook:** Token de verificação
- ✅ **SQL Injection:** Prepared statements

### Dados Sensíveis

```bash
# NUNCA commitar o arquivo .env
echo ".env" >> .gitignore

# NUNCA expor tokens
# Sempre use variáveis de ambiente
```

## 📊 Monitoramento

### Logs do Sistema

```bash
# Ver logs em tempo real
tail -f startup.log

# Ver últimas 100 linhas
tail -100 startup.log

# Buscar erros
grep "❌" startup.log
```

### Dashboard Web

Acesse: `http://localhost:3000/admin`

Funcionalidades:
- 📊 Estatísticas em tempo real
- 💬 Conversas ativas
- 📅 Agendamentos pendentes
- 📈 Gráficos de uso

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no dashboard
```

### VPS/VM

```bash
# Usar PM2 para gerenciar o processo
npm install -g pm2

# Iniciar
pm2 start ecosystem.config.js

# Ver status
pm2 status

# Ver logs
pm2 logs
```

### Docker

```bash
# Build
docker build -t bot-whatsapp .

# Run
docker run -p 3000:3000 --env-file .env bot-whatsapp
```

## 🆘 Troubleshooting

### Bot não responde
1. Verificar se servidor está rodando
2. Verificar logs: `tail -f startup.log`
3. Verificar webhook configurado no Meta
4. Testar em modo demo

### Botões não aparecem
1. Verificar formato da mensagem interativa
2. Máximo de 3 botões por mensagem
3. Título do botão máximo 20 caracteres
4. Verificar se tipo é 'interactive'

### CPF sempre inválido
1. Verificar função `validateCPF()`
2. Testar com CPF válido: 12345678909
3. Verificar logs do processamento

### Erro no banco de dados
1. Verificar se arquivo .db existe
2. Permissões de escrita no diretório
3. Reiniciar servidor (recria tabelas)

## 📚 Documentação Completa

- 📖 [Guia Bot de Triagem](./GUIA_BOT_TRIAGEM.md)
- 🧪 [Testar Bot Local](./TESTAR_BOT_LOCAL.md)
- 📱 [Exemplos de Botões](./EXEMPLOS_BOTOES.md)
- 🚀 [Deploy Vercel](./DEPLOY_VERCEL.md)
- 🔧 [Configuração Rápida](./CONFIGURACAO_RAPIDA.md)

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT.

## 🎯 Roadmap

### Próximas Funcionalidades

- [ ] Lista interativa para mais opções
- [ ] Integração com sistema de pagamentos (Pix)
- [ ] Notificações agendadas
- [ ] Relatórios em PDF
- [ ] Integração com Google Calendar
- [ ] Sistema de tickets
- [ ] Chatbot com IA (GPT)
- [ ] Reconhecimento de voz
- [ ] Envio de fotos/documentos
- [ ] Multi-atendente

## 💡 Dicas

### Performance
- Use banco SQLite para até 10k mensagens/dia
- Para mais, migre para PostgreSQL/MySQL
- Configure cache Redis para sessões

### UX
- Sempre use emojis nos botões
- Mantenha títulos curtos e claros
- Máximo 3 botões por vez
- Use listas para mais de 3 opções

### Manutenção
- Backup diário do banco de dados
- Monitore logs regularmente
- Atualize dependências mensalmente
- Teste antes de atualizar em produção

## 📞 Suporte

- 📧 Email: suporte@exemplo.com
- 💬 Discord: [Link do servidor]
- 📱 WhatsApp: +55 18 99999-9999
- 🐛 Issues: [GitHub Issues](https://github.com/seu-repo/issues)

## ⭐ Agradecimentos

- WhatsApp Business API
- Node.js Community
- SQLite
- Todos os contribuidores

---

**Feito com ❤️ para automatizar atendimentos no WhatsApp**

⭐ Se este projeto foi útil, considere dar uma estrela!

