#!/usr/bin/env node

/**
 * Script de inicialização do SAAE WhatsApp Bot
 * Verifica configurações e inicia o servidor
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config();

console.log('🤖 SAAE WhatsApp Bot - Inicializando...\n');

// Verificar se arquivo .env existe
if (!fs.existsSync('.env')) {
  console.log('❌ Arquivo .env não encontrado!');
  console.log('📝 Copie o arquivo env.example para .env e configure as variáveis:');
  console.log('   cp env.example .env');
  console.log('   nano .env\n');
  process.exit(1);
}

// Verificar variáveis essenciais
const requiredVars = [
  'WHATSAPP_ACCESS_TOKEN',
  'WHATSAPP_PHONE_NUMBER_ID',
  'WHATSAPP_WEBHOOK_VERIFY_TOKEN',
  'WHATSAPP_BUSINESS_ACCOUNT_ID'
];

console.log('🔍 Verificando configurações...');

let missingVars = [];
requiredVars.forEach(varName => {
  if (!process.env[varName] || process.env[varName].includes('your_')) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.log('❌ Variáveis de ambiente não configuradas:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
  console.log('\n📝 Configure essas variáveis no arquivo .env');
  console.log('📖 Consulte o README.md para instruções detalhadas\n');
  process.exit(1);
}

// Verificar se Node.js versão é adequada
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

if (majorVersion < 16) {
  console.log(`❌ Node.js versão ${nodeVersion} não suportada!`);
  console.log('📦 Requer Node.js 16 ou superior');
  console.log('🔗 Baixe em: https://nodejs.org/\n');
  process.exit(1);
}

// Verificar dependências
console.log('📦 Verificando dependências...');
if (!fs.existsSync('node_modules')) {
  console.log('❌ Dependências não instaladas!');
  console.log('📦 Execute: npm install\n');
  process.exit(1);
}

// Verificar estrutura de diretórios
const requiredDirs = ['routes', 'services', 'bot', 'database', 'public/admin'];
console.log('📁 Verificando estrutura de diretórios...');

let missingDirs = [];
requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    missingDirs.push(dir);
  }
});

if (missingDirs.length > 0) {
  console.log('❌ Diretórios não encontrados:');
  missingDirs.forEach(dir => {
    console.log(`   - ${dir}`);
  });
  console.log('\n📁 Verifique se todos os arquivos foram copiados corretamente\n');
  process.exit(1);
}

// Verificar arquivos essenciais
const requiredFiles = [
  'server.js',
  'routes/webhook.js',
  'routes/admin.js',
  'services/whatsapp.js',
  'bot/chatbot.js',
  'database/init.js'
];

console.log('📄 Verificando arquivos essenciais...');
let missingFiles = [];
requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Arquivos não encontrados:');
  missingFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
  console.log('\n📁 Verifique se todos os arquivos foram copiados corretamente\n');
  process.exit(1);
}

// Criar diretório do banco se não existir
const dbDir = path.dirname(process.env.DB_PATH || './database/saae_bot.db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Diretório do banco criado: ${dbDir}`);
}

// Informações do sistema
console.log('✅ Configurações verificadas com sucesso!\n');

console.log('📊 Informações do Sistema:');
console.log(`   Node.js: ${nodeVersion}`);
console.log(`   Ambiente: ${process.env.NODE_ENV || 'development'}`);
console.log(`   Porta: ${process.env.PORT || 3000}`);
console.log(`   Banco: ${process.env.DB_PATH || './database/saae_bot.db'}`);

if (process.env.WEBHOOK_URL) {
  console.log(`   Webhook: ${process.env.WEBHOOK_URL}/webhook`);
}

console.log(`   Admin Panel: http://localhost:${process.env.PORT || 3000}/admin\n`);

// Verificar conectividade com WhatsApp API
console.log('🔗 Testando conectividade com WhatsApp API...');

const axios = require('axios');
const testUrl = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}`;

axios.get(testUrl, {
  headers: {
    'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`
  }
})
.then(response => {
  console.log('✅ Conectividade com WhatsApp API: OK');
  console.log(`   Número: ${response.data.display_phone_number || 'N/A'}`);
  console.log(`   Status: ${response.data.status || 'N/A'}\n`);
  
  // Iniciar servidor
  startServer();
})
.catch(error => {
  console.log('⚠️  Aviso: Não foi possível verificar conectividade com WhatsApp API');
  console.log(`   Erro: ${error.response?.data?.error?.message || error.message}`);
  console.log('   Verifique suas credenciais no arquivo .env\n');
  
  // Iniciar servidor mesmo assim (para desenvolvimento)
  startServer();
});

function startServer() {
  console.log('🚀 Iniciando servidor...\n');
  
  // Importar e iniciar servidor
  try {
    require('./server.js');
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error.message);
    console.log('\n🔧 Verifique os logs acima para mais detalhes');
    process.exit(1);
  }
}

// Tratamento de sinais para shutdown graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Recebido SIGINT, encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Recebido SIGTERM, encerrando servidor...');
  process.exit(0);
});

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('\n❌ Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('\n❌ Promise rejeitada:', reason);
  process.exit(1);
});
