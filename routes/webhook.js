const express = require('express');
const router = express.Router();
const { verifyWebhook, processMessage } = require('../services/webhook');
const { logWebhookEvent } = require('../database/logs');

// Verificação do webhook (GET)
router.get('/', async (req, res) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('🔍 Verificação do webhook:', { mode, token: token ? '***' : 'undefined', challenge });

    if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
      console.log('✅ Webhook verificado com sucesso');
      res.status(200).send(challenge);
    } else {
      console.log('❌ Falha na verificação do webhook');
      res.status(403).json({ error: 'Token de verificação inválido' });
    }
  } catch (error) {
    console.error('❌ Erro na verificação do webhook:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Recebimento de mensagens (POST)
router.post('/', async (req, res) => {
  try {
    const body = req.body;
    
    console.log('📨 Webhook recebido:', JSON.stringify(body, null, 2));

    // Log do evento
    await logWebhookEvent('received', body);

    // Verificar se é uma mensagem do WhatsApp
    if (body.object === 'whatsapp_business_account') {
      // Processar entradas (messages, statuses, etc.)
      if (body.entry && body.entry.length > 0) {
        for (const entry of body.entry) {
          if (entry.changes && entry.changes.length > 0) {
            for (const change of entry.changes) {
              if (change.field === 'messages') {
                const messages = change.value.messages;
                const statuses = change.value.statuses;

                // Processar mensagens recebidas
                if (messages && messages.length > 0) {
                  for (const message of messages) {
                    await processMessage(message, change.value);
                  }
                }

                // Processar status de mensagens enviadas
                if (statuses && statuses.length > 0) {
                  for (const status of statuses) {
                    await processMessageStatus(status);
                  }
                }
              }
            }
          }
        }
      }
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('❌ Erro no processamento do webhook:', error);
    await logWebhookEvent('error', { error: error.message, body: req.body });
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Função para processar status de mensagens
async function processMessageStatus(status) {
  try {
    console.log('📊 Status da mensagem:', status);
    
    // Aqui você pode implementar lógica para rastrear status de mensagens
    // Por exemplo, marcar mensagens como entregues, lidas, etc.
    
    // Log do status
    await logWebhookEvent('message_status', status);
    
  } catch (error) {
    console.error('❌ Erro ao processar status da mensagem:', error);
  }
}

module.exports = router;
