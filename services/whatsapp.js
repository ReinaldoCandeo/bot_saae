const axios = require('axios');

const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

/**
 * Envia uma mensagem via WhatsApp Business API
 */
async function sendWhatsAppMessage(phoneNumber, message, type = 'text', options = {}) {
  try {
    // Modo demonstração
    if (process.env.NODE_ENV === 'demo') {
      console.log(`🎭 DEMO: Simulando envio de mensagem ${type} para ${phoneNumber}`);
      console.log(`📝 Conteúdo: ${typeof message === 'object' ? JSON.stringify(message) : message}`);
      return { 
        messaging_product: 'whatsapp',
        contacts: [{ input: phoneNumber, wa_id: phoneNumber }],
        messages: [{ id: `demo_${Date.now()}` }]
      };
    }

    console.log(`📤 Enviando mensagem ${type} para ${phoneNumber}`);

    const payload = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: type
    };

    // Configurar payload baseado no tipo de mensagem
    switch (type) {
      case 'text':
        payload.text = { body: message };
        break;
      
      case 'template':
        payload.template = message;
        break;
      
      case 'interactive':
        payload.interactive = message;
        break;
      
      case 'image':
        payload.image = {
          link: message,
          caption: options.caption || ''
        };
        break;
      
      case 'document':
        payload.document = {
          link: message,
          filename: options.filename || 'documento.pdf'
        };
        break;
      
      case 'audio':
        payload.audio = {
          link: message
        };
        break;
      
      case 'video':
        payload.video = {
          link: message,
          caption: options.caption || ''
        };
        break;
      
      case 'location':
        payload.location = message;
        break;
      
      case 'contacts':
        payload.contacts = message;
        break;
      
      default:
        throw new Error(`Tipo de mensagem não suportado: ${type}`);
    }

    const response = await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Mensagem enviada com sucesso:', response.data);
    return response.data;

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem WhatsApp:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Envia mensagem de texto simples
 */
async function sendTextMessage(phoneNumber, text) {
  return await sendWhatsAppMessage(phoneNumber, text, 'text');
}

/**
 * Envia mensagem interativa com botões
 */
async function sendInteractiveMessage(phoneNumber, header, body, footer, buttons) {
  const interactiveMessage = {
    type: 'button',
    header: {
      type: 'text',
      text: header
    },
    body: {
      text: body
    },
    footer: {
      text: footer
    },
    action: {
      buttons: buttons.map((button, index) => ({
        type: 'reply',
        reply: {
          id: `btn_${index}`,
          title: button
        }
      }))
    }
  };

  return await sendWhatsAppMessage(phoneNumber, interactiveMessage, 'interactive');
}

/**
 * Envia lista interativa
 */
async function sendListMessage(phoneNumber, header, body, footer, buttonText, sections) {
  const listMessage = {
    type: 'list',
    header: {
      type: 'text',
      text: header
    },
    body: {
      text: body
    },
    footer: {
      text: footer
    },
    action: {
      button: buttonText,
      sections: sections
    }
  };

  return await sendWhatsAppMessage(phoneNumber, listMessage, 'interactive');
}

/**
 * Envia template message
 */
async function sendTemplateMessage(phoneNumber, templateName, language = 'pt_BR', components = []) {
  const templateMessage = {
    name: templateName,
    language: {
      code: language
    },
    components: components
  };

  return await sendWhatsAppMessage(phoneNumber, templateMessage, 'template');
}

/**
 * Marca mensagem como lida
 */
async function markMessageAsRead(messageId) {
  try {
    const payload = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId
    };

    await axios.post(WHATSAPP_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Mensagem marcada como lida:', messageId);
  } catch (error) {
    console.error('❌ Erro ao marcar mensagem como lida:', error.response?.data || error.message);
  }
}

/**
 * Configura o webhook no Meta
 */
async function setupWebhook() {
  try {
    const webhookUrl = `${process.env.WEBHOOK_URL}/webhook`;
    const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
    
    console.log('🔧 Configurando webhook:', webhookUrl);
    console.log('🔑 Token de verificação:', verifyToken ? '***' : 'undefined');
    
    // Nota: A configuração do webhook é feita manualmente no Meta Business Manager
    // Este método apenas valida as configurações
    if (!verifyToken) {
      throw new Error('Token de verificação do webhook não configurado');
    }
    
    if (!webhookUrl || webhookUrl.includes('yourdomain.com')) {
      throw new Error('URL do webhook não configurada corretamente');
    }
    
    console.log('✅ Configurações do webhook validadas');
    return true;
    
  } catch (error) {
    console.error('❌ Erro na configuração do webhook:', error.message);
    throw error;
  }
}

/**
 * Valida as configurações da API
 */
async function validateAPIConfig() {
  try {
    // Modo demonstração
    if (process.env.NODE_ENV === 'demo') {
      console.log('🎭 Modo demonstração: Validação da API simulada');
      return true;
    }
    
    if (!ACCESS_TOKEN) {
      throw new Error('Token de acesso não configurado');
    }
    
    if (!process.env.WHATSAPP_PHONE_NUMBER_ID) {
      throw new Error('ID do número de telefone não configurado');
    }
    
    // Testar a API fazendo uma requisição simples
    const testUrl = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}`;
    const response = await axios.get(testUrl, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      }
    });
    
    console.log('✅ Configuração da API validada:', response.data);
    return true;
    
  } catch (error) {
    console.error('❌ Erro na validação da API:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Inicializa a configuração da API
 */
async function setupWhatsAppAPI() {
  try {
    await validateAPIConfig();
    await setupWebhook();
    console.log('✅ WhatsApp API configurada com sucesso');
    return true;
  } catch (error) {
    console.error('❌ Erro na configuração da WhatsApp API:', error.message);
    throw error;
  }
}

module.exports = {
  sendWhatsAppMessage,
  sendTextMessage,
  sendInteractiveMessage,
  sendListMessage,
  sendTemplateMessage,
  markMessageAsRead,
  setupWebhook,
  validateAPIConfig,
  setupWhatsAppAPI
};
