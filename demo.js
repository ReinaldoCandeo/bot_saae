#!/usr/bin/env node

/**
 * Script de Demonstração do SAAE WhatsApp Bot
 * Inicia o sistema em modo demo sem necessidade de credenciais reais
 */

const fs = require('fs');
const path = require('path');

console.log('🎭 SAAE WhatsApp Bot - Modo Demonstração\n');

// Configurar variáveis de ambiente para demo
process.env.NODE_ENV = 'demo';
process.env.PORT = '3000';
process.env.HOST = 'localhost';
process.env.DB_PATH = './database/saae_bot_demo.db';
process.env.WEBHOOK_URL = 'http://localhost:3000';
process.env.ADMIN_PANEL_URL = 'http://localhost:3000/admin';
process.env.SAAE_NAME = 'SAAE de Palmital';
process.env.SAAE_PHONE = '+5518999999999';
process.env.SAAE_EMAIL = 'contato@saae-palmital.com.br';
process.env.SAAE_ADDRESS = 'Rua Principal, 123 - Centro - Palmital/SP';
process.env.BUSINESS_HOURS_START = '08:00';
process.env.BUSINESS_HOURS_END = '17:00';
process.env.BUSINESS_DAYS = '1,2,3,4,5';

// Configurações de demo para WhatsApp (não funcionais, apenas para demo)
process.env.WHATSAPP_ACCESS_TOKEN = 'demo_token_for_testing';
process.env.WHATSAPP_PHONE_NUMBER_ID = 'demo_phone_id';
process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN = 'demo_verify_token_123';
process.env.WHATSAPP_BUSINESS_ACCOUNT_ID = 'demo_business_account';

console.log('🔍 Verificando sistema...');

// Verificar Node.js
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));

if (majorVersion < 16) {
  console.log(`❌ Node.js versão ${nodeVersion} não suportada!`);
  console.log('📦 Requer Node.js 16 ou superior');
  process.exit(1);
}

// Verificar dependências
if (!fs.existsSync('node_modules')) {
  console.log('❌ Dependências não instaladas!');
  console.log('📦 Execute: npm install\n');
  process.exit(1);
}

// Criar diretório do banco se não existir
const dbDir = path.dirname(process.env.DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log(`📁 Diretório do banco criado: ${dbDir}`);
}

// Informações do sistema
console.log('✅ Sistema verificado com sucesso!\n');

console.log('📊 Informações da Demonstração:');
console.log(`   Node.js: ${nodeVersion}`);
console.log(`   Ambiente: ${process.env.NODE_ENV}`);
console.log(`   Porta: ${process.env.PORT}`);
console.log(`   Banco: ${process.env.DB_PATH}`);
console.log(`   Webhook: ${process.env.WEBHOOK_URL}/webhook`);
console.log(`   Admin Panel: http://localhost:${process.env.PORT}/admin\n`);

console.log('🎭 MODO DEMONSTRAÇÃO ATIVADO');
console.log('   ⚠️  WhatsApp API não funcionará (credenciais de demo)');
console.log('   ✅ Painel administrativo funcionará normalmente');
console.log('   ✅ Banco de dados funcionará normalmente');
console.log('   ✅ Todas as funcionalidades internas ativas\n');

// Iniciar servidor
console.log('🚀 Iniciando servidor de demonstração...\n');

try {
  // Importar e iniciar servidor
  require('./server.js');
} catch (error) {
  console.error('❌ Erro ao iniciar servidor:', error.message);
  console.log('\n🔧 Verifique os logs acima para mais detalhes');
  process.exit(1);
}

// Tratamento de sinais para shutdown graceful
process.on('SIGINT', () => {
  console.log('\n🛑 Recebido SIGINT, encerrando demonstração...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Recebido SIGTERM, encerrando demonstração...');
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
