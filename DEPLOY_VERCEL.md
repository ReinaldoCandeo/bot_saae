# 🚀 Deploy no Vercel - SAAE WhatsApp Bot

## 📋 Visão Geral

Este documento detalha como fazer o deploy do sistema SAAE WhatsApp Bot na plataforma Vercel, mantendo todas as funcionalidades e integrações.

## ⚠️ Considerações Importantes

### **Limitações do Vercel**
- **Serverless Functions:** Limite de 10 segundos de execução
- **Banco de Dados:** SQLite não é recomendado (sem persistência)
- **Webhooks:** Funciona, mas com limitações de tempo
- **Arquivos:** Sistema de arquivos é somente leitura

### **Soluções Recomendadas**
1. **Banco de Dados:** Migrar para PostgreSQL (Vercel Postgres)
2. **Armazenamento:** Usar Vercel KV ou externo
3. **Webhooks:** Otimizar processamento para < 10s

## 🛠️ Configuração para Vercel

### **1. Estrutura de Arquivos Necessária**

```
saae-whatsapp-bot/
├── vercel.json              # Configuração do Vercel
├── api/                     # Serverless Functions
│   ├── webhook.js          # Webhook do WhatsApp
│   ├── admin.js            # Painel administrativo
│   └── index.js            # API principal
├── public/                  # Arquivos estáticos
│   ├── admin/              # Interface admin
│   └── index.html          # Página inicial
├── lib/                     # Bibliotecas compartilhadas
│   ├── database.js         # Conexão com banco
│   ├── whatsapp.js         # WhatsApp API
│   └── chatbot.js          # Lógica do bot
└── package.json            # Dependências
```

### **2. Configurar vercel.json**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/admin/(.*)",
      "dest": "/api/admin"
    },
    {
      "src": "/webhook",
      "dest": "/api/webhook"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

### **3. Adaptar para Serverless Functions**

#### **API Principal (api/index.js)**
```javascript
const { initializeDatabase } = require('../lib/database');
const { setupWhatsAppAPI } = require('../lib/whatsapp');

let isInitialized = false;

async function initialize() {
  if (!isInitialized) {
    await initializeDatabase();
    await setupWhatsAppAPI();
    isInitialized = true;
  }
}

module.exports = async (req, res) => {
  await initialize();
  
  res.json({
    message: 'SAAE WhatsApp Bot - Sistema Online',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    platform: 'vercel'
  });
};
```

#### **Webhook (api/webhook.js)**
```javascript
const { processMessage } = require('../lib/webhook');

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      // Verificação do webhook
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
        res.status(200).send(challenge);
      } else {
        res.status(403).json({ error: 'Token inválido' });
      }
    } else if (req.method === 'POST') {
      // Processar mensagem
      const body = req.body;
      
      if (body.entry && body.entry.length > 0) {
        for (const entry of body.entry) {
          if (entry.changes && entry.changes.length > 0) {
            for (const change of entry.changes) {
              if (change.field === 'messages' && change.value.messages) {
                for (const message of change.value.messages) {
                  await processMessage(message, change.value);
                }
              }
            }
          }
        }
      }
      
      res.status(200).json({ status: 'success' });
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
};
```

### **4. Migrar para PostgreSQL (Vercel Postgres)**

#### **Instalar Dependências**
```bash
npm install @vercel/postgres
```

#### **Adaptar Conexão (lib/database.js)**
```javascript
const { sql } = require('@vercel/postgres');

async function initializeDatabase() {
  try {
    // Criar tabelas
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) NOT NULL,
        message_id VARCHAR(100) UNIQUE,
        type VARCHAR(20) NOT NULL CHECK (type IN ('received', 'sent')),
        message_type VARCHAR(20) NOT NULL,
        content TEXT,
        data JSONB,
        timestamp TIMESTAMP NOT NULL,
        context JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        phone_number VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100),
        profile_picture TEXT,
        last_seen TIMESTAMP,
        conversation_state VARCHAR(50) DEFAULT 'menu',
        conversation_data JSONB,
        is_blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Outras tabelas...
    
    console.log('✅ Banco PostgreSQL inicializado');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
    throw error;
  }
}

async function saveConversation(conversationData) {
  const result = await sql`
    INSERT INTO conversations (
      phone_number, message_id, type, message_type, 
      content, data, timestamp, context
    ) VALUES (
      ${conversationData.phoneNumber},
      ${conversationData.messageId},
      ${conversationData.type},
      ${conversationData.messageType},
      ${conversationData.content},
      ${JSON.stringify(conversationData.data)},
      ${conversationData.timestamp.toISOString()},
      ${JSON.stringify(conversationData.context)}
    ) RETURNING id
  `;
  
  return result.rows[0];
}

module.exports = {
  initializeDatabase,
  saveConversation,
  sql
};
```

## 🔧 Configuração no Vercel

### **1. Criar Projeto**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

### **2. Configurar Variáveis de Ambiente**

No painel do Vercel, adicionar as seguintes variáveis:

```env
WHATSAPP_ACCESS_TOKEN=your_token_here
WHATSAPP_PHONE_NUMBER_ID=your_id_here
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token_here
WHATSAPP_BUSINESS_ACCOUNT_ID=your_account_id_here
SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
POSTGRES_URL=your_postgres_url_here
POSTGRES_PRISMA_URL=your_postgres_prisma_url_here
POSTGRES_URL_NON_POOLING=your_postgres_url_non_pooling_here
POSTGRES_USER=your_postgres_user_here
POSTGRES_HOST=your_postgres_host_here
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_DATABASE=your_postgres_database_here
```

### **3. Configurar Vercel Postgres**

1. No painel do Vercel, vá em "Storage"
2. Crie um banco PostgreSQL
3. Copie as variáveis de ambiente geradas
4. Adicione ao projeto

### **4. Configurar Domínio Personalizado**

1. No painel do Vercel, vá em "Domains"
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções
4. Atualize variáveis de ambiente com novo domínio

## 📱 Configurar Webhook no Meta

### **URL do Webhook**
```
https://seu-dominio.vercel.app/api/webhook
```

### **Configuração no Meta Business Manager**
1. Acesse sua aplicação no Meta for Developers
2. Vá em "WhatsApp" → "Configuration"
3. Configure Webhook:
   - **Callback URL:** `https://seu-dominio.vercel.app/api/webhook`
   - **Verify Token:** Use o valor da variável `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
   - **Webhook Fields:** Marque `messages` e `message_status`

## 🚀 Deploy e Teste

### **1. Deploy**
```bash
# Deploy para produção
vercel --prod

# Ou use o GitHub integration
git push origin main
```

### **2. Testar Webhook**
```bash
# Teste de verificação
curl "https://seu-dominio.vercel.app/api/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"

# Teste de mensagem
curl -X POST https://seu-dominio.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"object":"whatsapp_business_account","entry":[{"changes":[{"value":{"messages":[{"from":"5511999999999","id":"test123","timestamp":"1640995200","text":{"body":"Teste"},"type":"text"}]},"field":"messages"}]}]}'
```

### **3. Testar Painel Admin**
```
https://seu-dominio.vercel.app/admin
```

## 📊 Monitoramento

### **Vercel Analytics**
- Acesse o painel do Vercel
- Vá em "Analytics" para ver métricas
- Monitore performance e erros

### **Logs**
```bash
# Ver logs em tempo real
vercel logs

# Ver logs de uma função específica
vercel logs --follow api/webhook
```

### **Health Check**
```bash
curl https://seu-dominio.vercel.app/api/health
```

## ⚡ Otimizações para Vercel

### **1. Cold Start Optimization**
```javascript
// Manter conexões ativas
let dbConnection = null;

async function getConnection() {
  if (!dbConnection) {
    dbConnection = await createConnection();
  }
  return dbConnection;
}
```

### **2. Timeout Optimization**
```javascript
// Processar mensagens de forma assíncrona
async function processMessageAsync(message) {
  // Processar em background
  setTimeout(async () => {
    await processMessage(message);
  }, 0);
  
  return { status: 'processing' };
}
```

### **3. Caching**
```javascript
// Usar Vercel KV para cache
import { kv } from '@vercel/kv';

async function getCachedData(key) {
  return await kv.get(key);
}

async function setCachedData(key, value, ttl = 3600) {
  await kv.set(key, value, { ex: ttl });
}
```

## 🔒 Segurança no Vercel

### **1. Headers de Segurança**
```javascript
// Em cada API route
export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // ... resto do código
}
```

### **2. Rate Limiting**
```javascript
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
});

export default async function handler(req, res) {
  const { success } = await ratelimit.limit(req.ip);
  
  if (!success) {
    return res.status(429).json({ error: 'Rate limit exceeded' });
  }
  
  // ... resto do código
}
```

## 🆘 Troubleshooting

### **Problemas Comuns**

#### **Timeout de 10 segundos**
- Otimize processamento de mensagens
- Use processamento assíncrono
- Implemente cache para dados frequentes

#### **Banco de dados não conecta**
- Verificar variáveis de ambiente do PostgreSQL
- Confirmar conexão com Vercel Postgres
- Verificar logs de erro

#### **Webhook não funciona**
- Verificar URL do webhook
- Confirmar certificado SSL
- Verificar logs do Vercel

### **Logs e Debugging**
```bash
# Ver logs detalhados
vercel logs --follow

# Debug local
vercel dev

# Verificar status
vercel ls
```

## 📈 Escalabilidade

### **Vercel Pro Features**
- **Function Execution Time:** 60 segundos
- **Bandwidth:** 1TB/mês
- **Build Time:** 45 minutos
- **Concurrent Functions:** 1000

### **Para Alto Volume**
1. **Vercel Enterprise** para limites maiores
2. **Database Sharding** para PostgreSQL
3. **CDN** para arquivos estáticos
4. **Edge Functions** para processamento rápido

## 🎉 Conclusão

O deploy no Vercel oferece:

✅ **Escalabilidade automática**  
✅ **SSL gratuito** e global  
✅ **Deploy contínuo** via GitHub  
✅ **Monitoramento integrado**  
✅ **Custo-benefício** excelente  

**O sistema estará online e funcionando perfeitamente na Vercel!** 🚀

---

Para dúvidas sobre o deploy, consulte a [documentação oficial da Vercel](https://vercel.com/docs) ou entre em contato com a equipe de desenvolvimento.