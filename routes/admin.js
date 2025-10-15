const express = require('express');
const router = express.Router();
const path = require('path');

// Servir arquivos estáticos do painel admin
router.use(express.static(path.join(__dirname, '../public/admin')));

// Rota principal do painel admin
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin/index.html'));
});

// API routes para o painel admin
router.get('/api/dashboard', async (req, res) => {
  try {
    const { getConversationStats, getActiveConversations } = require('../database/conversations');
    const { getLogStats } = require('../database/logs');
    
    // Buscar estatísticas do dia
    const today = new Date().toISOString().split('T')[0];
    const stats = await getConversationStats(null, today, today);
    const activeConversations = await getActiveConversations(10);
    const logStats = await getLogStats(today, today);
    
    res.json({
      success: true,
      data: {
        stats,
        activeConversations,
        logStats
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar conversas
router.get('/api/conversations', async (req, res) => {
  try {
    const { getConversationsByPeriod } = require('../database/conversations');
    const { phoneNumber, startDate, endDate, limit } = req.query;
    
    let conversations;
    
    if (phoneNumber) {
      const { getConversationsByPhone } = require('../database/conversations');
      conversations = await getConversationsByPhone(phoneNumber, parseInt(limit) || 50);
    } else {
      conversations = await getConversationsByPeriod(
        startDate || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate || new Date().toISOString(),
        parseInt(limit) || 100
      );
    }
    
    res.json({
      success: true,
      data: conversations
    });
  } catch (error) {
    console.error('❌ Erro ao buscar conversas:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar usuários
router.get('/api/users', async (req, res) => {
  try {
    const { getQuery } = require('../database/init');
    const users = await getQuery(
      'SELECT * FROM users ORDER BY last_seen DESC LIMIT ?',
      [parseInt(req.query.limit) || 100]
    );
    
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar logs
router.get('/api/logs', async (req, res) => {
  try {
    const { getWebhookLogs } = require('../database/logs');
    const logs = await getWebhookLogs(
      parseInt(req.query.limit) || 100,
      req.query.eventType,
      req.query.status
    );
    
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('❌ Erro ao buscar logs:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar configurações
router.get('/api/config', async (req, res) => {
  try {
    const { getQuery } = require('../database/init');
    const configs = await getQuery('SELECT * FROM bot_config ORDER BY key');
    
    const configObject = {};
    configs.forEach(config => {
      configObject[config.key] = {
        value: config.value,
        description: config.description
      };
    });
    
    res.json({
      success: true,
      data: configObject
    });
  } catch (error) {
    console.error('❌ Erro ao buscar configurações:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Atualizar configurações
router.post('/api/config', async (req, res) => {
  try {
    const { runQuery } = require('../database/init');
    const { key, value } = req.body;
    
    if (!key || value === undefined) {
      return res.status(400).json({ success: false, error: 'Chave e valor são obrigatórios' });
    }
    
    await runQuery(
      'UPDATE bot_config SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?',
      [value, key]
    );
    
    res.json({
      success: true,
      message: 'Configuração atualizada com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar configuração:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar templates de mensagens
router.get('/api/templates', async (req, res) => {
  try {
    const { getQuery } = require('../database/init');
    const templates = await getQuery('SELECT * FROM message_templates ORDER BY name');
    
    res.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('❌ Erro ao buscar templates:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Atualizar template
router.post('/api/templates', async (req, res) => {
  try {
    const { runQuery } = require('../database/init');
    const { id, content, is_active } = req.body;
    
    if (!id) {
      return res.status(400).json({ success: false, error: 'ID do template é obrigatório' });
    }
    
    await runQuery(
      'UPDATE message_templates SET content = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [content, is_active, id]
    );
    
    res.json({
      success: true,
      message: 'Template atualizado com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar template:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enviar mensagem manual
router.post('/api/send-message', async (req, res) => {
  try {
    const { sendTextMessage } = require('../services/whatsapp');
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return res.status(400).json({ success: false, error: 'Número de telefone e mensagem são obrigatórios' });
    }
    
    await sendTextMessage(phoneNumber, message);
    
    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso'
    });
  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Limpar dados antigos
router.post('/api/cleanup', async (req, res) => {
  try {
    const { deleteOldConversations } = require('../database/conversations');
    const { cleanOldLogs } = require('../database/logs');
    
    const daysOld = parseInt(req.body.daysOld) || 90;
    
    await deleteOldConversations(daysOld);
    await cleanOldLogs(30);
    
    res.json({
      success: true,
      message: `Dados antigos removidos (${daysOld} dias)`
    });
  } catch (error) {
    console.error('❌ Erro na limpeza:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
