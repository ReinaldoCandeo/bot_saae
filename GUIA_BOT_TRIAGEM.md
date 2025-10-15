# 🤖 Guia do Bot de Triagem WhatsApp

## 📋 Visão Geral

Este bot de triagem foi desenvolvido para automatizar o atendimento no WhatsApp usando **botões interativos** para facilitar a navegação dos usuários.

## ✨ Funcionalidades Principais

### 1. **Menu Principal com Botões**
O bot apresenta um menu interativo com 5 opções principais:

- 📋 **Consulta de Conta** - Consultar saldo e informações da conta
- 📄 **Segunda Via** - Gerar segunda via de boleto
- 📅 **Agendamento** - Agendar serviços (água, esgoto, manutenção, vistoria)
- 📞 **Fale Conosco** - Informações de contato
- 🚨 **Emergências** - Contatos de emergência 24h

### 2. **Sistema de Triagem Inteligente**

#### **Validação de CPF**
- Validação completa de CPF (dígitos verificadores)
- Rejeita CPFs inválidos ou com todos os dígitos iguais
- Feedback claro para o usuário

#### **Horário Comercial**
- Verifica se está dentro do horário de atendimento (Seg-Sex, 8h-17h)
- Mensagens específicas fora do horário
- Acesso direto a emergências 24h

#### **Estados de Conversa**
O bot mantém o contexto da conversa através de estados:
- `menu` - Menu principal
- `waiting_cpf` - Aguardando CPF do usuário
- `waiting_scheduling` - Aguardando escolha de serviço
- `waiting_contact` - Aguardando dados de contato
- `waiting_confirmation` - Aguardando confirmação

### 3. **Agendamento de Serviços**

#### Tipos de Serviços:
1. 💧 **Ligação de Água**
2. 🚽 **Ligação de Esgoto**
3. 🔧 **Manutenção**
4. 🔍 **Vistoria**

#### Fluxo de Agendamento:
1. Usuário escolhe o serviço (via botão)
2. Sistema solicita dados:
   - Nome completo
   - CPF
   - Endereço completo
   - Telefone de contato
   - Descrição do problema (para manutenção)
3. Sistema valida os dados
4. Apresenta resumo com botões de confirmação
5. Gera protocolo único
6. Salva no banco de dados
7. Envia confirmação ao usuário

### 4. **Confirmação com Botões**
Após o preenchimento dos dados, o bot apresenta:
- ✅ **Confirmar** - Finaliza o agendamento
- ❌ **Cancelar** - Cancela e volta ao menu

### 5. **Consulta de Conta e Segunda Via**
- Solicita CPF do usuário
- Valida o CPF
- Retorna informações simuladas (integre com seu sistema real)
- Para segunda via, gera link de pagamento

## 🔧 Estrutura Técnica

### Arquivos Principais

#### **`bot/chatbot.js`**
Contém toda a lógica do bot:
- `processBotLogic()` - Processa todas as mensagens
- `handleInteractiveResponse()` - Processa cliques em botões
- `validateCPF()` - Valida CPF
- `handleMainMenuButton()` - Processa botões do menu
- `handleSchedulingButton()` - Processa botões de agendamento
- `handleConfirmationButton()` - Processa confirmações
- `finalizeScheduling()` - Finaliza agendamentos

#### **`services/webhook.js`**
Processa mensagens recebidas:
- Extrai tipo de mensagem (texto, interativo, imagem, etc.)
- Processa respostas de botões
- Salva conversas no banco

#### **`services/whatsapp.js`**
Integração com WhatsApp Business API:
- `sendWhatsAppMessage()` - Envia mensagens
- `sendInteractiveMessage()` - Envia mensagens com botões
- `sendListMessage()` - Envia listas interativas

#### **`database/init.js`**
Estrutura do banco de dados:
- Tabela `users` - Dados dos usuários
- Tabela `conversations` - Histórico de mensagens
- Tabela `appointments` - Agendamentos
- Tabela `bot_config` - Configurações
- Tabela `webhook_logs` - Logs do webhook

## 📱 Tipos de Botões Suportados

### 1. **Reply Buttons** (Botões de Resposta)
Máximo de 3 botões por mensagem
```javascript
{
  type: 'button',
  header: { type: 'text', text: 'Título' },
  body: { text: 'Mensagem' },
  footer: { text: 'Rodapé' },
  action: {
    buttons: [
      { type: 'reply', reply: { id: 'btn_1', title: 'Opção 1' }},
      { type: 'reply', reply: { id: 'btn_2', title: 'Opção 2' }}
    ]
  }
}
```

### 2. **List Messages** (Listas)
Para mais de 3 opções
```javascript
{
  type: 'list',
  header: { type: 'text', text: 'Título' },
  body: { text: 'Mensagem' },
  footer: { text: 'Rodapé' },
  action: {
    button: 'Ver opções',
    sections: [
      {
        title: 'Seção 1',
        rows: [
          { id: 'opt_1', title: 'Opção 1', description: 'Descrição' }
        ]
      }
    ]
  }
}
```

## 🎯 Fluxo de Conversa

```
Usuário envia "Oi"
  ↓
Bot apresenta Menu Principal (5 botões)
  ↓
Usuário clica em "📅 Agendamento"
  ↓
Bot apresenta Tipos de Serviço (4 botões)
  ↓
Usuário clica em "💧 Ligação de Água"
  ↓
Bot solicita dados (Nome, CPF, Endereço, Telefone)
  ↓
Usuário digita: "João Silva, 12345678901, Rua A 123, 18999999999"
  ↓
Bot valida CPF e apresenta confirmação (2 botões)
  ↓
Usuário clica em "✅ Confirmar"
  ↓
Bot salva no banco e envia protocolo
  ↓
Fim (volta ao menu)
```

## 🔐 Validações Implementadas

### Validação de CPF
```javascript
function validateCPF(cpf) {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, '');
  
  // Verifica tamanho
  if (cpf.length !== 11) return false;
  
  // Verifica sequências iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  
  // Valida dígitos verificadores
  // ... (algoritmo completo no código)
  
  return true;
}
```

### Validação de Horário
```javascript
// Verifica dia da semana (0=domingo, 6=sábado)
if (currentDay === 0 || currentDay === 6) return false;

// Verifica horário (8h às 17h)
return currentTime >= '08:00' && currentTime <= '17:00';
```

### Validação de Dados de Contato
```javascript
// Verifica mínimo de 4 campos
if (data.length < 4) {
  // Solicita novamente
}

// Valida CPF
if (!validateCPF(cpf)) {
  // Solicita novamente
}
```

## 💾 Banco de Dados

### Tabela `appointments`
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  phone_number TEXT NOT NULL,
  service_type TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  cpf TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  description TEXT,
  scheduled_date TEXT NOT NULL,
  protocol TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Status de Agendamento
- `pending` - Aguardando confirmação
- `confirmed` - Confirmado pela equipe
- `cancelled` - Cancelado
- `completed` - Concluído

## 🚀 Como Usar

### 1. Configurar Ambiente
```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp demo.env .env

# Editar .env com suas credenciais
WHATSAPP_PHONE_NUMBER_ID=seu_id
WHATSAPP_ACCESS_TOKEN=seu_token
```

### 2. Iniciar o Bot
```bash
# Modo produção
npm start

# Modo demonstração
npm run demo
```

### 3. Testar no WhatsApp
1. Envie "Oi" ou "Menu" para o número
2. Clique nos botões para navegar
3. Siga as instruções do bot

## 📊 Monitoramento

### Logs do Sistema
```bash
# Ver logs em tempo real
tail -f startup.log
```

### Consultar Agendamentos
```sql
-- Ver todos os agendamentos
SELECT * FROM appointments ORDER BY created_at DESC;

-- Ver agendamentos pendentes
SELECT * FROM appointments WHERE status = 'pending';

-- Ver por protocolo
SELECT * FROM appointments WHERE protocol = 'SAAE1234567890';
```

## 🎨 Personalização

### Alterar Mensagens
Edite o arquivo `bot/chatbot.js`:

```javascript
// Menu principal
async function showMainMenu() {
  return {
    shouldReply: true,
    message: {
      type: 'button',
      header: { type: 'text', text: '🏛️ Seu Título' },
      body: { text: 'Sua mensagem' },
      footer: { text: 'Seu rodapé' },
      action: {
        buttons: [
          // Seus botões (máximo 3)
        ]
      }
    },
    type: 'interactive'
  };
}
```

### Adicionar Novo Serviço
1. Adicione botão no menu de agendamento
2. Crie função de processamento
3. Adicione no `handleSchedulingButton()`

### Integrar com Sistema Real
Substitua os dados mockados em:
- `processAccountConsultation()` - Consulta de conta
- `processSecondCopy()` - Segunda via
- `finalizeScheduling()` - Salvar agendamento

## ⚠️ Limitações da WhatsApp Business API

### Reply Buttons
- Máximo de **3 botões** por mensagem
- Título do botão: máximo 20 caracteres
- Não suporta emojis complexos

### List Messages
- Máximo de **10 seções**
- Máximo de **10 itens** por seção
- Título da lista: máximo 24 caracteres

### Mensagens
- Mensagens fora do horário de 24h requerem templates aprovados
- Templates precisam ser aprovados pelo Meta

## 🔄 Próximos Passos

### Melhorias Sugeridas
1. ✅ Implementar listas para mais opções
2. ✅ Adicionar confirmação de leitura
3. ✅ Implementar sistema de filas
4. ✅ Adicionar notificações de agendamento
5. ✅ Implementar relatórios e analytics
6. ✅ Adicionar mídia (imagens, PDFs)
7. ✅ Implementar pagamentos via Pix

### Integrações
- [ ] Sistema de gerenciamento SAAE
- [ ] API de pagamentos
- [ ] Sistema de tickets
- [ ] CRM
- [ ] Google Calendar
- [ ] Email notifications

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique os logs em `startup.log`
- Consulte a documentação da Meta: https://developers.facebook.com/docs/whatsapp
- Verifique o status da API

## 📝 Notas Importantes

1. **Modo Demo**: Use `NODE_ENV=demo` para testar sem enviar mensagens reais
2. **Webhook**: Configure o webhook no Meta Business Manager
3. **Tokens**: Nunca exponha seus tokens de acesso
4. **Backup**: Faça backup regular do banco de dados
5. **Testes**: Teste todas as funcionalidades antes de usar em produção

## 🎉 Pronto!

Seu bot de triagem com botões está configurado e pronto para uso!

Digite "menu" no WhatsApp para começar a usar.

