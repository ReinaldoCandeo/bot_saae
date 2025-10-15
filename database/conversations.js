const { runQuery, getQuery, getOneQuery } = require('./init');

/**
 * Salva uma conversa no banco de dados
 */
async function saveConversation(conversationData) {
  try {
    const query = `
      INSERT INTO conversations (
        phone_number, message_id, type, message_type, 
        content, data, timestamp, context
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [
      conversationData.phoneNumber,
      conversationData.messageId,
      conversationData.type,
      conversationData.messageType,
      conversationData.content,
      JSON.stringify(conversationData.data),
      conversationData.timestamp.toISOString(),
      JSON.stringify(conversationData.context)
    ];

    const result = await runQuery(query, params);
    console.log('✅ Conversa salva:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Erro ao salvar conversa:', error);
    throw error;
  }
}

/**
 * Busca conversas por número de telefone
 */
async function getConversationsByPhone(phoneNumber, limit = 50) {
  try {
    const query = `
      SELECT * FROM conversations 
      WHERE phone_number = ? 
      ORDER BY timestamp DESC 
      LIMIT ?
    `;
    
    const conversations = await getQuery(query, [phoneNumber, limit]);
    return conversations.map(conv => ({
      ...conv,
      data: conv.data ? JSON.parse(conv.data) : null,
      context: conv.context ? JSON.parse(conv.context) : null
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar conversas:', error);
    throw error;
  }
}

/**
 * Busca uma conversa específica
 */
async function getConversation(phoneNumber, messageId) {
  try {
    const query = `
      SELECT * FROM conversations 
      WHERE phone_number = ? AND message_id = ?
    `;
    
    const conversation = await getOneQuery(query, [phoneNumber, messageId]);
    if (conversation) {
      conversation.data = conversation.data ? JSON.parse(conversation.data) : null;
      conversation.context = conversation.context ? JSON.parse(conversation.context) : null;
    }
    return conversation;
  } catch (error) {
    console.error('❌ Erro ao buscar conversa:', error);
    throw error;
  }
}

/**
 * Atualiza uma conversa existente
 */
async function updateConversation(phoneNumber, messageId, updateData) {
  try {
    const query = `
      UPDATE conversations 
      SET content = ?, data = ?, context = ?, updated_at = CURRENT_TIMESTAMP
      WHERE phone_number = ? AND message_id = ?
    `;
    
    const params = [
      updateData.content,
      JSON.stringify(updateData.data),
      JSON.stringify(updateData.context),
      phoneNumber,
      messageId
    ];

    const result = await runQuery(query, params);
    console.log('✅ Conversa atualizada:', result.changes);
    return result;
  } catch (error) {
    console.error('❌ Erro ao atualizar conversa:', error);
    throw error;
  }
}

/**
 * Busca estatísticas de conversas
 */
async function getConversationStats(phoneNumber = null, startDate = null, endDate = null) {
  try {
    let query = `
      SELECT 
        COUNT(*) as total_messages,
        SUM(CASE WHEN type = 'received' THEN 1 ELSE 0 END) as received_messages,
        SUM(CASE WHEN type = 'sent' THEN 1 ELSE 0 END) as sent_messages,
        COUNT(DISTINCT phone_number) as unique_users
      FROM conversations
      WHERE 1=1
    `;
    
    const params = [];
    
    if (phoneNumber) {
      query += ' AND phone_number = ?';
      params.push(phoneNumber);
    }
    
    if (startDate) {
      query += ' AND timestamp >= ?';
      params.push(startDate);
    }
    
    if (endDate) {
      query += ' AND timestamp <= ?';
      params.push(endDate);
    }

    const stats = await getOneQuery(query, params);
    return stats;
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    throw error;
  }
}

/**
 * Busca conversas por período
 */
async function getConversationsByPeriod(startDate, endDate, limit = 100) {
  try {
    const query = `
      SELECT 
        c.id,
        c.phone_number,
        c.message_id,
        c.type,
        c.message_type,
        c.content,
        c.data,
        c.timestamp,
        c.context,
        c.created_at,
        u.name as user_name
      FROM conversations c
      LEFT JOIN users u ON c.phone_number = u.phone_number
      WHERE c.timestamp BETWEEN ? AND ?
      ORDER BY c.timestamp DESC
      LIMIT ?
    `;
    
    const conversations = await getQuery(query, [startDate, endDate, limit]);
    return conversations.map(conv => ({
      ...conv,
      data: conv.data ? JSON.parse(conv.data) : null,
      context: conv.context ? JSON.parse(conv.context) : null
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar conversas por período:', error);
    throw error;
  }
}

/**
 * Busca últimas conversas ativas
 */
async function getActiveConversations(limit = 20) {
  try {
    const query = `
      SELECT 
        c.phone_number,
        MAX(c.timestamp) as last_message,
        COUNT(*) as message_count,
        u.name as user_name,
        u.conversation_state
      FROM conversations c
      LEFT JOIN users u ON c.phone_number = u.phone_number
      WHERE c.timestamp >= datetime('now', '-24 hours')
      GROUP BY c.phone_number
      ORDER BY last_message DESC
      LIMIT ?
    `;
    
    const conversations = await getQuery(query, [limit]);
    return conversations;
  } catch (error) {
    console.error('❌ Erro ao buscar conversas ativas:', error);
    throw error;
  }
}

/**
 * Deleta conversas antigas (limpeza)
 */
async function deleteOldConversations(daysOld = 90) {
  try {
    const query = `
      DELETE FROM conversations 
      WHERE timestamp < datetime('now', '-${daysOld} days')
    `;
    
    const result = await runQuery(query);
    console.log(`✅ ${result.changes} conversas antigas removidas`);
    return result;
  } catch (error) {
    console.error('❌ Erro ao deletar conversas antigas:', error);
    throw error;
  }
}

module.exports = {
  saveConversation,
  getConversationsByPhone,
  getConversation,
  updateConversation,
  getConversationStats,
  getConversationsByPeriod,
  getActiveConversations,
  deleteOldConversations
};
