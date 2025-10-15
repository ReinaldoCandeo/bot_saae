const { runQuery, getQuery } = require('./init');

/**
 * Registra um evento do webhook
 */
async function logWebhookEvent(eventType, payload, status = 'success', errorMessage = null) {
  try {
    const query = `
      INSERT INTO webhook_logs (event_type, payload, status, error_message)
      VALUES (?, ?, ?, ?)
    `;
    
    const params = [
      eventType,
      JSON.stringify(payload),
      status,
      errorMessage
    ];

    const result = await runQuery(query, params);
    console.log(`📝 Log registrado: ${eventType} - ${status}`);
    return result;
  } catch (error) {
    console.error('❌ Erro ao registrar log:', error);
    throw error;
  }
}

/**
 * Busca logs do webhook
 */
async function getWebhookLogs(limit = 100, eventType = null, status = null) {
  try {
    let query = `
      SELECT * FROM webhook_logs 
      WHERE 1=1
    `;
    
    const params = [];
    
    if (eventType) {
      query += ' AND event_type = ?';
      params.push(eventType);
    }
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(limit);

    const logs = await getQuery(query, params);
    return logs.map(log => ({
      ...log,
      payload: log.payload ? JSON.parse(log.payload) : null
    }));
  } catch (error) {
    console.error('❌ Erro ao buscar logs:', error);
    throw error;
  }
}

/**
 * Busca estatísticas de logs
 */
async function getLogStats(startDate = null, endDate = null) {
  try {
    let query = `
      SELECT 
        event_type,
        status,
        COUNT(*) as count
      FROM webhook_logs
      WHERE 1=1
    `;
    
    const params = [];
    
    if (startDate) {
      query += ' AND timestamp >= ?';
      params.push(startDate);
    }
    
    if (endDate) {
      query += ' AND timestamp <= ?';
      params.push(endDate);
    }
    
    query += ' GROUP BY event_type, status ORDER BY count DESC';

    const stats = await getQuery(query, params);
    return stats;
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas de logs:', error);
    throw error;
  }
}

/**
 * Limpa logs antigos
 */
async function cleanOldLogs(daysOld = 30) {
  try {
    const query = `
      DELETE FROM webhook_logs 
      WHERE timestamp < datetime('now', '-${daysOld} days')
    `;
    
    const result = await runQuery(query);
    console.log(`🧹 ${result.changes} logs antigos removidos`);
    return result;
  } catch (error) {
    console.error('❌ Erro ao limpar logs antigos:', error);
    throw error;
  }
}

module.exports = {
  logWebhookEvent,
  getWebhookLogs,
  getLogStats,
  cleanOldLogs
};
