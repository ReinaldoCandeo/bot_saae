const express = require('express');
const router = express.Router();
const { getConversationStats, getConversationsByPhone } = require('../database/conversations');
const { getWebhookLogs } = require('../database/logs');

// Rota para verificar status da API
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'connected',
      whatsapp_api: 'configured',
      webhook: 'active'
    }
  });
});

// Rota para obter estatísticas gerais
router.get('/stats', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const stats = await getConversationStats(
      null, // phoneNumber
      startDate,
      endDate
    );
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para obter conversas de um usuário específico
router.get('/conversations/:phoneNumber', async (req, res) => {
  try {
    const { phoneNumber } = req.params;
    const { limit = 50 } = req.query;
    
    const conversations = await getConversationsByPhone(phoneNumber, parseInt(limit));
    
    res.json({
      success: true,
      data: conversations
    });
  } catch (error) {
    console.error('❌ Erro ao buscar conversas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para obter logs do sistema
router.get('/logs', async (req, res) => {
  try {
    const { limit = 100, eventType, status } = req.query;
    
    const logs = await getWebhookLogs(
      parseInt(limit),
      eventType,
      status
    );
    
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('❌ Erro ao buscar logs:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para testar webhook (desenvolvimento)
router.post('/test-webhook', async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        error: 'phoneNumber e message são obrigatórios'
      });
    }
    
    // Simular webhook recebido
    const mockWebhookData = {
      object: 'whatsapp_business_account',
      entry: [{
        changes: [{
          value: {
            messages: [{
              from: phoneNumber,
              id: `test_${Date.now()}`,
              timestamp: Math.floor(Date.now() / 1000).toString(),
              text: {
                body: message
              },
              type: 'text'
            }],
            profile: {
              name: 'Usuário Teste'
            }
          },
          field: 'messages'
        }]
      }]
    };
    
    // Processar mensagem de teste
    const { processMessage } = require('../services/webhook');
    await processMessage(mockWebhookData.entry[0].changes[0].value.messages[0], mockWebhookData.entry[0].changes[0].value);
    
    res.json({
      success: true,
      message: 'Webhook de teste processado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro no teste do webhook:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Rota para validar configurações
router.get('/validate-config', async (req, res) => {
  try {
    const { validateAPIConfig } = require('../services/whatsapp');
    
    const isValid = await validateAPIConfig();
    
    res.json({
      success: true,
      data: {
        whatsapp_api: isValid,
        webhook_configured: !!process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
        database_configured: !!process.env.DB_PATH
      }
    });
  } catch (error) {
    console.error('❌ Erro na validação:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      data: {
        whatsapp_api: false,
        webhook_configured: !!process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN,
        database_configured: !!process.env.DB_PATH
      }
    });
  }
});

// Rota para obter informações do sistema
router.get('/system-info', (req, res) => {
  const info = {
    node_version: process.version,
    platform: process.platform,
    arch: process.arch,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: info
  });
});

// Rota para health check
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
