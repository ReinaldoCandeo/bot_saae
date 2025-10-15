const { sendWhatsAppMessage } = require('./whatsapp');
const { saveConversation, getConversation, updateConversation } = require('../database/conversations');
const { processBotLogic } = require('../bot/chatbot');
const { logWebhookEvent } = require('../database/logs');

/**
 * Verifica o webhook do WhatsApp
 */
function verifyWebhook(mode, token, challenge) {
  return mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
}

/**
 * Processa mensagens recebidas do WhatsApp
 */
async function processMessage(message, context) {
  try {
    console.log('📱 Processando mensagem:', message);

    const phoneNumber = message.from;
    const messageType = message.type;
    const messageId = message.id;
    const timestamp = message.timestamp;

    // Extrair conteúdo da mensagem baseado no tipo
    let messageContent = '';
    let messageData = null;

    switch (messageType) {
      case 'text':
        messageContent = message.text.body;
        break;
      case 'interactive':
        // Processar resposta de botão ou lista
        if (message.interactive.type === 'button_reply') {
          messageContent = message.interactive.button_reply.title;
          messageData = {
            button_reply: message.interactive.button_reply
          };
        } else if (message.interactive.type === 'list_reply') {
          messageContent = message.interactive.list_reply.title;
          messageData = {
            list_reply: message.interactive.list_reply
          };
        }
        break;
      case 'image':
        messageContent = '[IMAGEM]';
        messageData = {
          imageId: message.image.id,
          caption: message.image.caption || ''
        };
        break;
      case 'document':
        messageContent = '[DOCUMENTO]';
        messageData = {
          documentId: message.document.id,
          filename: message.document.filename || 'documento'
        };
        break;
      case 'audio':
        messageContent = '[ÁUDIO]';
        messageData = {
          audioId: message.audio.id
        };
        break;
      case 'video':
        messageContent = '[VÍDEO]';
        messageData = {
          videoId: message.video.id,
          caption: message.video.caption || ''
        };
        break;
      case 'location':
        messageContent = '[LOCALIZAÇÃO]';
        messageData = {
          latitude: message.location.latitude,
          longitude: message.location.longitude,
          address: message.location.address || ''
        };
        break;
      case 'contacts':
        messageContent = '[CONTATOS]';
        messageData = message.contacts;
        break;
      default:
        messageContent = '[MENSAGEM NÃO SUPORTADA]';
        break;
    }

    // Salvar mensagem recebida
    await saveConversation({
      phoneNumber,
      messageId,
      type: 'received',
      messageType,
      content: messageContent,
      data: messageData,
      timestamp: new Date(parseInt(timestamp) * 1000),
      context
    });

    // Processar com a lógica do bot
    const botResponse = await processBotLogic({
      phoneNumber,
      messageContent,
      messageType,
      messageData,
      context
    });

    // Enviar resposta se houver
    if (botResponse && botResponse.shouldReply) {
      await sendWhatsAppMessage(phoneNumber, botResponse.message, botResponse.type || 'text');
      
      // Salvar mensagem enviada
      await saveConversation({
        phoneNumber,
        messageId: `bot_${Date.now()}`,
        type: 'sent',
        messageType: botResponse.type || 'text',
        content: botResponse.message,
        data: botResponse.data || null,
        timestamp: new Date()
      });
    }

    console.log('✅ Mensagem processada com sucesso');
    
  } catch (error) {
    console.error('❌ Erro ao processar mensagem:', error);
    
    // Tentar enviar mensagem de erro genérica
    try {
      await sendWhatsAppMessage(
        message.from,
        'Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes.',
        'text'
      );
    } catch (sendError) {
      console.error('❌ Erro ao enviar mensagem de erro:', sendError);
    }
  }
}

/**
 * Valida se a mensagem é válida
 */
function isValidMessage(message) {
  return message && 
         message.from && 
         message.type && 
         message.id && 
         message.timestamp;
}

/**
 * Extrai informações do usuário da mensagem
 */
function extractUserInfo(context) {
  const profile = context.profile || {};
  const contacts = context.contacts || [];
  
  let userInfo = {
    phoneNumber: '',
    name: '',
    profilePicture: null
  };

  if (contacts.length > 0) {
    const contact = contacts[0];
    userInfo.phoneNumber = contact.wa_id;
    userInfo.name = contact.profile?.name || '';
  }

  if (profile.name) {
    userInfo.name = profile.name;
  }

  return userInfo;
}

module.exports = {
  verifyWebhook,
  processMessage,
  isValidMessage,
  extractUserInfo
};
