const express = require('express');
const router = express.Router();
const { getConversationStats, getConversationsByPhone } = require('../database/conversations');
const { getWebhookLogs } = require('../database/logs');
const { getQuery } = require('../database/init');

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

// Rota para analytics e estatísticas de demanda
router.get('/analytics', async (req, res) => {
  try {
    const { filter = 'today' } = req.query;
    
    // Calcular datas baseado no filtro
    let dateFilter = '';
    const now = new Date();
    
    switch(filter) {
      case 'today':
        dateFilter = `AND DATE(timestamp) = DATE('now')`;
        break;
      case 'week':
        dateFilter = `AND timestamp >= datetime('now', '-7 days')`;
        break;
      case 'month':
        dateFilter = `AND timestamp >= datetime('now', '-30 days')`;
        break;
      case 'all':
      default:
        dateFilter = '';
    }
    
    // Estatísticas gerais
    const totalMessages = await getQuery(
      `SELECT COUNT(*) as count FROM conversations WHERE 1=1 ${dateFilter}`
    );
    
    const uniqueUsers = await getQuery(
      `SELECT COUNT(DISTINCT phone_number) as count FROM conversations WHERE 1=1 ${dateFilter}`
    );
    
    const totalAppointments = await getQuery(
      `SELECT COUNT(*) as count FROM appointments WHERE 1=1 ${dateFilter.replace('timestamp', 'created_at')}`
    );
    
    // Demanda por serviço (baseado em mensagens contendo palavras-chave)
    const serviceKeywords = {
      'Consulta de Conta': ['consulta', 'conta', 'btn_1'],
      'Segunda Via': ['segunda via', 'boleto', 'btn_2'],
      'Agendamento': ['agendamento', 'agendar', 'btn_3', 'sched_'],
      'Fale Conosco': ['fale conosco', 'contato', 'btn_4'],
      'Emergências': ['emergência', 'emergencia', 'urgente', 'btn_5']
    };
    
    const serviceData = {
      labels: [],
      values: []
    };
    
    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      const query = keywords.map(() => 'content LIKE ?').join(' OR ');
      const params = keywords.map(k => `%${k}%`);
      
      const result = await getQuery(
        `SELECT COUNT(*) as count FROM conversations 
         WHERE type = 'received' AND (${query}) ${dateFilter}`,
        params
      );
      
      if (result[0].count > 0) {
        serviceData.labels.push(service);
        serviceData.values.push(result[0].count);
      }
    }
    
    // Agendamentos por tipo
    const appointmentsByType = await getQuery(
      `SELECT 
        CASE service_type
          WHEN 'water_connection' THEN '💧 Água'
          WHEN 'sewage_connection' THEN '🚽 Esgoto'
          WHEN 'maintenance' THEN '🔧 Manutenção'
          WHEN 'inspection' THEN '🔍 Vistoria'
          ELSE service_type
        END as type_label,
        COUNT(*) as count
       FROM appointments 
       WHERE 1=1 ${dateFilter.replace('timestamp', 'created_at')}
       GROUP BY service_type`
    );
    
    const appointmentData = {
      labels: appointmentsByType.map(a => a.type_label),
      values: appointmentsByType.map(a => a.count)
    };
    
    // Mensagens por hora
    const hourlyMessages = await getQuery(
      `SELECT 
        strftime('%H', timestamp) as hour,
        COUNT(*) as count
       FROM conversations 
       WHERE type = 'received' ${dateFilter}
       GROUP BY hour
       ORDER BY hour`
    );
    
    const hourlyData = {
      labels: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}h`),
      values: Array.from({length: 24}, () => 0)
    };
    
    hourlyMessages.forEach(h => {
      hourlyData.values[parseInt(h.hour)] = h.count;
    });
    
    // Mensagens por dia da semana
    const weekdayMessages = await getQuery(
      `SELECT 
        CASE CAST(strftime('%w', timestamp) AS INTEGER)
          WHEN 0 THEN 'Domingo'
          WHEN 1 THEN 'Segunda'
          WHEN 2 THEN 'Terça'
          WHEN 3 THEN 'Quarta'
          WHEN 4 THEN 'Quinta'
          WHEN 5 THEN 'Sexta'
          WHEN 6 THEN 'Sábado'
        END as weekday,
        strftime('%w', timestamp) as day_num,
        COUNT(*) as count
       FROM conversations 
       WHERE type = 'received' ${dateFilter}
       GROUP BY day_num
       ORDER BY day_num`
    );
    
    const weekdayData = {
      labels: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      values: [0, 0, 0, 0, 0, 0, 0]
    };
    
    weekdayMessages.forEach(w => {
      weekdayData.values[parseInt(w.day_num)] = w.count;
    });
    
    // Agendamentos recentes
    const recentAppointments = await getQuery(
      `SELECT 
        protocol,
        service_type,
        CASE service_type
          WHEN 'water_connection' THEN '💧 Ligação de Água'
          WHEN 'sewage_connection' THEN '🚽 Ligação de Esgoto'
          WHEN 'maintenance' THEN '🔧 Manutenção'
          WHEN 'inspection' THEN '🔍 Vistoria'
          ELSE service_type
        END as service_type_label,
        customer_name,
        scheduled_date,
        status,
        created_at
       FROM appointments 
       ORDER BY created_at DESC 
       LIMIT 10`
    );
    
    // Top serviços mais acessados
    const topServices = [];
    for (const [service, keywords] of Object.entries(serviceKeywords)) {
      const query = keywords.map(() => 'content LIKE ?').join(' OR ');
      const params = keywords.map(k => `%${k}%`);
      
      const result = await getQuery(
        `SELECT COUNT(*) as count FROM conversations 
         WHERE type = 'received' AND (${query}) ${dateFilter}`,
        params
      );
      
      if (result[0].count > 0) {
        topServices.push({
          service: service,
          count: result[0].count
        });
      }
    }
    
    topServices.sort((a, b) => b.count - a.count);
    
    // Serviço mais usado
    const topService = topServices.length > 0 
      ? topServices[0].service 
      : 'Nenhum';
    
    res.json({
      success: true,
      filter: filter,
      stats: {
        totalMessages: totalMessages[0].count,
        uniqueUsers: uniqueUsers[0].count,
        totalAppointments: totalAppointments[0].count,
        topService: topService
      },
      serviceData,
      appointmentData,
      hourlyData,
      weekdayData,
      recentAppointments,
      topServices: topServices.slice(0, 10)
    });
    
  } catch (error) {
    console.error('❌ Erro ao gerar analytics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
