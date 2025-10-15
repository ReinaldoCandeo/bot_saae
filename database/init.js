const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || './database/saae_bot.db';

/**
 * Inicializa o banco de dados SQLite
 */
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    try {
      // Criar diretório do banco se não existir
      const dbDir = path.dirname(DB_PATH);
      if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
      }

      const db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          console.error('❌ Erro ao conectar com o banco de dados:', err);
          reject(err);
        } else {
          console.log('✅ Conectado ao banco de dados SQLite');
          createTables(db).then(resolve).catch(reject);
        }
      });

    } catch (error) {
      console.error('❌ Erro na inicialização do banco:', error);
      reject(error);
    }
  });
}

/**
 * Cria as tabelas necessárias
 */
async function createTables(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabela de conversas
      db.run(`
        CREATE TABLE IF NOT EXISTS conversations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT NOT NULL,
          message_id TEXT UNIQUE,
          type TEXT NOT NULL CHECK (type IN ('received', 'sent')),
          message_type TEXT NOT NULL,
          content TEXT,
          data TEXT,
          timestamp DATETIME NOT NULL,
          context TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de usuários
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          phone_number TEXT UNIQUE NOT NULL,
          name TEXT,
          profile_picture TEXT,
          last_seen DATETIME,
          conversation_state TEXT DEFAULT 'menu',
          conversation_data TEXT,
          is_blocked BOOLEAN DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de logs do webhook
      db.run(`
        CREATE TABLE IF NOT EXISTS webhook_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_type TEXT NOT NULL,
          payload TEXT,
          status TEXT,
          error_message TEXT,
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de configurações do bot
      db.run(`
        CREATE TABLE IF NOT EXISTS bot_config (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT,
          description TEXT,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de templates de mensagens
      db.run(`
        CREATE TABLE IF NOT EXISTS message_templates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          content TEXT NOT NULL,
          type TEXT DEFAULT 'text',
          category TEXT,
          is_active BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de estatísticas
      db.run(`
        CREATE TABLE IF NOT EXISTS statistics (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date DATE NOT NULL,
          total_messages INTEGER DEFAULT 0,
          received_messages INTEGER DEFAULT 0,
          sent_messages INTEGER DEFAULT 0,
          unique_users INTEGER DEFAULT 0,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de agendamentos
      db.run(`
        CREATE TABLE IF NOT EXISTS appointments (
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
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Criar índices para melhor performance
      db.run(`CREATE INDEX IF NOT EXISTS idx_conversations_phone ON conversations(phone_number)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_conversations_timestamp ON conversations(timestamp)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_webhook_logs_timestamp ON webhook_logs(timestamp)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_statistics_date ON statistics(date)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(phone_number)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_appointments_protocol ON appointments(protocol)`);
      db.run(`CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status)`);

      // Inserir configurações padrão
      db.run(`
        INSERT OR IGNORE INTO bot_config (key, value, description) VALUES
        ('welcome_message', 'Olá! Bem-vindo ao atendimento do SAAE de Palmital. Como posso ajudá-lo hoje?', 'Mensagem de boas-vindas'),
        ('business_hours_start', '08:00', 'Horário de início do atendimento'),
        ('business_hours_end', '17:00', 'Horário de fim do atendimento'),
        ('business_days', '1,2,3,4,5', 'Dias da semana de atendimento (1=segunda, 7=domingo)'),
        ('out_of_hours_message', 'Nosso atendimento funciona de segunda a sexta, das 8h às 17h. Em caso de emergência, ligue para (18) 99999-9999', 'Mensagem fora do horário'),
        ('max_conversation_time', '30', 'Tempo máximo de conversa em minutos'),
        ('enable_analytics', '1', 'Habilitar coleta de estatísticas')
      `);

      // Inserir templates padrão
      db.run(`
        INSERT OR IGNORE INTO message_templates (name, content, type, category) VALUES
        ('menu_principal', '🏛️ *SAAE Palmital*\\n\\nEscolha uma opção:\\n\\n1️⃣ *Consulta de Conta*\\n2️⃣ *Segunda Via*\\n3️⃣ *Agendamento*\\n4️⃣ *Fale Conosco*\\n5️⃣ *Emergências*\\n0️⃣ *Falar com Atendente*', 'interactive', 'menu'),
        ('consulta_conta', 'Para consultar sua conta, preciso do seu CPF ou número da matrícula. Digite apenas os números:', 'text', 'service'),
        ('segunda_via', 'Para gerar a segunda via, preciso do seu CPF ou número da matrícula. Digite apenas os números:', 'text', 'service'),
        ('agendamento', '📅 *Agendamento de Serviços*\\n\\n1️⃣ *Ligação de Água*\\n2️⃣ *Ligação de Esgoto*\\n3️⃣ *Manutenção*\\n4️⃣ *Vistoria*\\n0️⃣ *Voltar*', 'interactive', 'service'),
        ('fale_conosco', '📞 *Fale Conosco*\\n\\n📍 Endereço: Rua Principal, 123 - Centro\\n📱 Telefone: (18) 99999-9999\\n📧 Email: contato@saae-palmital.com.br\\n🕒 Horário: Seg-Sex 8h às 17h', 'text', 'info'),
        ('emergencias', '🚨 *Emergências*\\n\\nPara vazamentos ou problemas urgentes:\\n\\n📱 *Ligue: (18) 99999-9999*\\n🕒 *24 horas por dia*\\n\\n⚠️ *ATENÇÃO:* Este número é apenas para emergências!', 'text', 'emergency')
      `);

      console.log('✅ Tabelas do banco de dados criadas com sucesso');
      resolve();
    });

    db.close((err) => {
      if (err) {
        console.error('❌ Erro ao fechar conexão com banco:', err);
      }
    });
  });
}

/**
 * Obtém uma conexão com o banco de dados
 */
function getDatabase() {
  return new sqlite3.Database(DB_PATH);
}

/**
 * Executa uma query no banco de dados
 */
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.run(query, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
      db.close();
    });
  });
}

/**
 * Busca registros no banco de dados
 */
function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
      db.close();
    });
  });
}

/**
 * Busca um único registro no banco de dados
 */
function getOneQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.get(query, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
      db.close();
    });
  });
}

module.exports = {
  initializeDatabase,
  getDatabase,
  runQuery,
  getQuery,
  getOneQuery
};
