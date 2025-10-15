# 📱 Guia Visual - Bot de Triagem WhatsApp

## 🎯 Visão Geral em 30 Segundos

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  👤 USUÁRIO    →    🤖 BOT    →    💾 BANCO DE DADOS     │
│                                                          │
│  Envia "Oi"   →  Menu com   →   Salva conversa          │
│                  5 Botões                                │
│                                                          │
│  Clica botão  →  Processa   →   Atualiza estado         │
│                  e responde                              │
│                                                          │
│  Informa CPF  →  Valida     →   Salva dados             │
│                  CPF                                     │
│                                                          │
│  Confirma     →  Gera       →   Salva agendamento       │
│                  protocolo                               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo Completo de Agendamento

### 📍 Passo 1: Início
```
┌─────────────────────────────────────┐
│ Usuário                             │
│                                     │
│ "Oi" ou "Menu"                      │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│ Bot                                 │
│                                     │
│ 🏛️ SAAE Palmital                   │
│ Escolha uma opção:                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📋 Consulta de Conta            │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📄 Segunda Via                  │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📅 Agendamento                  │ │ ← Clica aqui
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 📞 Fale Conosco                 │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🚨 Emergências                  │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 📍 Passo 2: Escolha do Serviço
```
┌─────────────────────────────────────┐
│ Bot                                 │
│                                     │
│ 📅 Agendamento de Serviços          │
│ Escolha o tipo de serviço:          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💧 Ligação de Água              │ │ ← Clica aqui
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🚽 Ligação de Esgoto            │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🔧 Manutenção                   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ 🔍 Vistoria                     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 📍 Passo 3: Coleta de Dados
```
┌─────────────────────────────────────┐
│ Bot                                 │
│                                     │
│ 💧 Agendamento - Ligação de Água   │
│                                     │
│ Para agendar, preciso:              │
│                                     │
│ 1️⃣ Nome completo                    │
│ 2️⃣ CPF                              │
│ 3️⃣ Endereço completo                │
│ 4️⃣ Telefone de contato              │
│                                     │
│ Digite separado por vírgula:        │
└─────────────────────────────────────┘
                ↓
┌─────────────────────────────────────┐
│ Usuário                             │
│                                     │
│ "João Silva, 12345678909,           │
│  Rua das Flores 123,                │
│  18999999999"                       │
└─────────────────────────────────────┘
```

### 📍 Passo 4: Validação
```
┌─────────────────────────────────────┐
│ Sistema                             │
│                                     │
│ ✅ Validando CPF...                 │
│ ✅ CPF válido: 123.456.789-09       │
│ ✅ Todos os dados recebidos         │
│ ✅ Calculando próximo dia útil...   │
└─────────────────────────────────────┘
```

### 📍 Passo 5: Confirmação
```
┌─────────────────────────────────────┐
│ Bot                                 │
│                                     │
│ ✅ Confirmar Agendamento            │
│                                     │
│ Por favor, confirme os dados:       │
│                                     │
│ 🏛️ Serviço: Ligação de Água 💧     │
│ 👤 Cliente: João Silva              │
│ 📋 CPF: 123.456.789-09              │
│ 📍 Endereço: Rua das Flores, 123    │
│ 📱 Telefone: (18) 99999-9999        │
│ 📅 Data: 16/01/2024 às 14h          │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ ✅ Confirmar                    │ │ ← Clica aqui
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ ❌ Cancelar                     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 📍 Passo 6: Sucesso
```
┌─────────────────────────────────────┐
│ Bot                                 │
│                                     │
│ ✅ Agendamento Confirmado!          │
│                                     │
│ 🏛️ Serviço: Ligação de Água 💧     │
│ 👤 Cliente: João Silva              │
│ 📅 Data: 16/01/2024 às 14h          │
│                                     │
│ 📋 Protocolo: SAAE1705420123        │
│                                     │
│ ✅ Seu agendamento foi registrado.  │
│ Entraremos em contato em breve      │
│ para confirmar o horário.           │
│                                     │
│ 📞 Dúvidas? Ligue: (18) 99999-9999  │
│                                     │
│ Digite "menu" para voltar           │
└─────────────────────────────────────┘
```

---

## 🔧 Arquitetura do Sistema

```
┌──────────────────────────────────────────────────────────────┐
│                         WHATSAPP                             │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                    WEBHOOK (routes/webhook.js)               │
│  • Recebe mensagens                                          │
│  • Verifica token                                            │
│  • Processa eventos                                          │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                PROCESSADOR (services/webhook.js)             │
│  • Extrai tipo de mensagem                                   │
│  • Processa botões                                           │
│  • Salva conversa                                            │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                    BOT (bot/chatbot.js)                      │
│  • Lógica de negócio                                         │
│  • Validações                                                │
│  • Estados de conversa                                       │
│  • Gera respostas                                            │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                 WHATSAPP API (services/whatsapp.js)          │
│  • Envia mensagens                                           │
│  • Envia botões                                              │
│  • Marca como lido                                           │
└──────────────────────────────────────────────────────────────┘
                            ↕
┌──────────────────────────────────────────────────────────────┐
│                    BANCO DE DADOS (SQLite)                   │
│  • Usuários                                                  │
│  • Conversas                                                 │
│  • Agendamentos                                              │
│  • Logs                                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📊 Estados de Conversa

```
┌─────────────┐
│   INÍCIO    │
└─────────────┘
       ↓
┌─────────────┐
│    MENU     │ ← Estado inicial
└─────────────┘
   │   │   │
   │   │   └─────────────┐
   │   │                 ↓
   │   │         ┌──────────────────┐
   │   │         │ WAITING_SCHEDULING│
   │   │         └──────────────────┘
   │   │                 ↓
   │   │         ┌──────────────────┐
   │   │         │ WAITING_CONTACT  │
   │   │         └──────────────────┘
   │   │                 ↓
   │   │         ┌──────────────────┐
   │   │         │WAITING_CONFIRMATION│
   │   │         └──────────────────┘
   │   │                 ↓
   │   └──────── ┌─────────────┐
   │             │ WAITING_CPF │
   │             └─────────────┘
   │                     ↓
   └───────────────> ┌────────┐
                     │  FIM   │
                     └────────┘
```

---

## 🎨 Tipos de Mensagens

### 1. Mensagem de Texto Simples
```
┌─────────────────────────────────────┐
│ Olá! Como posso ajudar?             │
└─────────────────────────────────────┘
```

### 2. Mensagem com Botões (até 3)
```
┌─────────────────────────────────────┐
│ HEADER (Título)                     │
├─────────────────────────────────────┤
│ BODY (Mensagem principal)           │
├─────────────────────────────────────┤
│ FOOTER (Informação adicional)       │
├─────────────────────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │ Botão 1                         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Botão 2                         │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ Botão 3                         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### 3. Lista Interativa (mais de 3 opções)
```
┌─────────────────────────────────────┐
│ Escolha uma opção:                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📋 Ver Opções ▼                 │ │ ← Clica para abrir
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
           ↓ Abre lista
┌─────────────────────────────────────┐
│ CATEGORIA 1                         │
│ • Opção 1.1                         │
│ • Opção 1.2                         │
│                                     │
│ CATEGORIA 2                         │
│ • Opção 2.1                         │
│ • Opção 2.2                         │
└─────────────────────────────────────┘
```

---

## 💾 Estrutura do Banco de Dados

```
DATABASE: saae_bot.db
│
├── users (Usuários)
│   ├── id
│   ├── phone_number
│   ├── name
│   ├── conversation_state ← Estado atual
│   ├── conversation_data  ← Dados temporários
│   └── last_seen
│
├── conversations (Histórico)
│   ├── id
│   ├── phone_number
│   ├── type (received/sent)
│   ├── message_type
│   ├── content
│   └── timestamp
│
├── appointments (Agendamentos)
│   ├── id
│   ├── phone_number
│   ├── service_type
│   ├── customer_name
│   ├── cpf
│   ├── address
│   ├── phone
│   ├── scheduled_date
│   ├── protocol ← Único
│   └── status
│
└── webhook_logs (Logs)
    ├── id
    ├── event_type
    ├── payload
    └── timestamp
```

---

## 🔐 Validação de CPF - Visual

```
┌──────────────────────────────────────┐
│ CPF: 123.456.789-09                  │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 1. Remover formatação                │
│    12345678909                       │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 2. Verificar tamanho                 │
│    ✅ 11 dígitos                     │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 3. Verificar sequência               │
│    ❌ 11111111111 (inválido)         │
│    ✅ 12345678909 (OK)               │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 4. Validar 1º dígito verificador     │
│    Cálculo: soma × peso              │
│    ✅ Dígito correto                 │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 5. Validar 2º dígito verificador     │
│    Cálculo: soma × peso              │
│    ✅ Dígito correto                 │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ ✅ CPF VÁLIDO                        │
└──────────────────────────────────────┘
```

---

## ⏰ Verificação de Horário

```
┌──────────────────────────────────────┐
│ Hora atual: 14:30                    │
│ Dia: Terça-feira                     │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ É dia útil? (Seg-Sex)                │
│ ✅ SIM                               │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ É horário comercial? (8h-17h)        │
│ ✅ SIM                               │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 🟢 HORÁRIO COMERCIAL                 │
│ Menu completo disponível             │
└──────────────────────────────────────┘


┌──────────────────────────────────────┐
│ Hora atual: 20:30                    │
│ Dia: Sábado                          │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ É dia útil? (Seg-Sex)                │
│ ❌ NÃO (fim de semana)               │
└──────────────────────────────────────┘
            ↓
┌──────────────────────────────────────┐
│ 🔴 FORA DO HORÁRIO                   │
│ Apenas emergências disponíveis       │
└──────────────────────────────────────┘
```

---

## 🎯 Mapa Mental do Bot

```
                    🤖 BOT DE TRIAGEM
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    📋 CONSULTAS      📅 AGENDAMENTOS    🚨 EMERGÊNCIAS
        │                  │                  │
    ┌───┴───┐         ┌────┴────┐        24h por dia
    │       │         │         │
Conta   Segunda   Água  Esgoto  Manutenção  Vistoria
         Via       │     │           │         │
                   │     │           │         │
                   └─────┴───────────┴─────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
              📝 COLETA DADOS    ✅ VALIDAÇÕES
                    │                   │
              Nome, CPF,          CPF Válido?
              Endereço,           Dados OK?
              Telefone            Horário OK?
                    │                   │
                    └─────────┬─────────┘
                              │
                        🔘 CONFIRMAÇÃO
                              │
                    ┌─────────┴─────────┐
                    │                   │
                ✅ SIM              ❌ NÃO
                    │                   │
              📋 PROTOCOLO        ↩️ CANCELAR
              💾 SALVAR           Volta ao Menu
```

---

## 🚀 Fluxo de Deploy

```
┌─────────────────┐
│ DESENVOLVIMENTO │
│   (localhost)   │
└─────────────────┘
        ↓
┌─────────────────┐
│     TESTES      │
│   (modo demo)   │
└─────────────────┘
        ↓
┌─────────────────┐
│     NGROK       │
│  (túnel local)  │
└─────────────────┘
        ↓
┌─────────────────┐
│ WHATSAPP TESTE  │
│  (número teste) │
└─────────────────┘
        ↓
┌─────────────────┐
│   PRODUÇÃO      │
│  (Vercel/VM)    │
└─────────────────┘
        ↓
┌─────────────────┐
│ WHATSAPP REAL   │
│ (número oficial)│
└─────────────────┘
```

---

## 📱 Interface Mobile (Como Aparece)

### iPhone
```
╔═══════════════════════════════════╗
║  ← SAAE Palmital      🔍 ︙       ║
╠═══════════════════════════════════╣
║                                   ║
║  ┌─────────────────────────────┐ ║
║  │ 🏛️ SAAE Palmital            │ ║
║  │                             │ ║
║  │ Escolha uma opção:          │ ║
║  │                             │ ║
║  │ Seg-Sex 8h às 17h           │ ║
║  ├─────────────────────────────┤ ║
║  │                             │ ║
║  │ ┏━━━━━━━━━━━━━━━━━━━━━━━┓ │ ║
║  │ ┃ 📋 Consulta de Conta  ┃ │ ║
║  │ ┗━━━━━━━━━━━━━━━━━━━━━━━┛ │ ║
║  │                             │ ║
║  │ ┏━━━━━━━━━━━━━━━━━━━━━━━┓ │ ║
║  │ ┃ 📄 Segunda Via        ┃ │ ║
║  │ ┗━━━━━━━━━━━━━━━━━━━━━━━┛ │ ║
║  │                             │ ║
║  │ ┏━━━━━━━━━━━━━━━━━━━━━━━┓ │ ║
║  │ ┃ 📅 Agendamento        ┃ │ ║
║  │ ┗━━━━━━━━━━━━━━━━━━━━━━━┛ │ ║
║  │                             │ ║
║  └─────────────────────────────┘ ║
║                                   ║
╠═══════════════════════════════════╣
║  📷  📄  💬 Digite uma mensagem   ║
╚═══════════════════════════════════╝
```

### Android
```
┌───────────────────────────────────┐
│  ☰ SAAE Palmital    📞 ⋮          │
├───────────────────────────────────┤
│                                   │
│  ╔═════════════════════════════╗ │
│  ║ 🏛️ SAAE Palmital            ║ │
│  ║                             ║ │
│  ║ Escolha uma opção:          ║ │
│  ║                             ║ │
│  ║ Seg-Sex 8h às 17h           ║ │
│  ╠═════════════════════════════╣ │
│  ║                             ║ │
│  ║ ┌─────────────────────────┐ ║ │
│  ║ │ 📋 Consulta de Conta    │ ║ │
│  ║ └─────────────────────────┘ ║ │
│  ║                             ║ │
│  ║ ┌─────────────────────────┐ ║ │
│  ║ │ 📄 Segunda Via          │ ║ │
│  ║ └─────────────────────────┘ ║ │
│  ║                             ║ │
│  ║ ┌─────────────────────────┐ ║ │
│  ║ │ 📅 Agendamento          │ ║ │
│  ║ └─────────────────────────┘ ║ │
│  ║                             ║ │
│  ╚═════════════════════════════╝ │
│                                   │
├───────────────────────────────────┤
│  😀  📷  🎤  Digite...        ➤   │
└───────────────────────────────────┘
```

---

## 🎉 Resumo Visual

### ✅ O Que Funciona

```
✅ Menu interativo com 5 botões
✅ Submenu de agendamento com 4 botões
✅ Validação completa de CPF
✅ Confirmação com botões (Sim/Não)
✅ Controle de horário comercial
✅ Estados de conversa persistentes
✅ Banco de dados SQLite
✅ Geração de protocolo único
✅ Logs detalhados
✅ Modo demonstração
```

### 🎯 Próximos Recursos

```
📋 Listas interativas (mais opções)
💳 Pagamento via Pix
📊 Dashboard admin avançado
🔔 Notificações agendadas
🤖 IA para respostas
👥 Multi-atendente
📈 Analytics detalhado
```

---

## 💡 Comandos Rápidos

```bash
# Testar agora
NODE_ENV=demo node server.js

# Ver este guia
cat GUIA_VISUAL_BOT.md

# Ver resumo
cat RESUMO_BOT_TRIAGEM.md

# Início rápido
cat INICIO_RAPIDO.md
```

---

**🎨 Design pensado para facilitar o uso!**

**📱 Interface intuitiva para todos os usuários!**

**🚀 Pronto para implementar melhorias!**

