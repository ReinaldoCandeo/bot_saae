const { getOneQuery, runQuery } = require('../database/init');
const { sendInteractiveMessage, sendTextMessage } = require('../services/whatsapp');
const moment = require('moment');

/**
 * Processa a lógica principal do chatbot
 */
async function processBotLogic(messageData) {
  try {
    const { phoneNumber, messageContent, messageType, messageData: data } = messageData;
    
    console.log(`🤖 Processando mensagem do usuário ${phoneNumber}: ${messageContent}`);

    // Verificar se é horário comercial
    const isBusinessHours = await checkBusinessHours();
    
    // Buscar ou criar usuário
    const user = await getUserOrCreate(phoneNumber);
    
    // Processar resposta de botão interativo
    if (messageType === 'interactive') {
      return await handleInteractiveResponse(data, user, isBusinessHours);
    }
    
    // Processar baseado no estado da conversa
    let response;
    
    if (user.conversation_state === 'menu') {
      response = await handleMainMenu(messageContent, isBusinessHours);
    } else if (user.conversation_state === 'waiting_cpf') {
      response = await handleCPFInput(messageContent, user);
    } else if (user.conversation_state === 'waiting_scheduling') {
      response = await handleSchedulingInput(messageContent, user);
    } else if (user.conversation_state === 'waiting_contact') {
      response = await handleContactInput(messageContent, user);
    } else if (user.conversation_state === 'waiting_confirmation') {
      response = await handleConfirmation(messageContent, user);
    } else {
      response = await handleMainMenu(messageContent, isBusinessHours);
    }
    
    // Atualizar estado do usuário se necessário
    if (response.newState) {
      await updateUserState(phoneNumber, response.newState, response.stateData);
    }
    
    return response;
    
  } catch (error) {
    console.error('❌ Erro no processamento do bot:', error);
    return {
      shouldReply: true,
      message: 'Desculpe, ocorreu um erro. Tente novamente ou digite "menu" para voltar ao menu principal.',
      type: 'text'
    };
  }
}

/**
 * Verifica se está no horário comercial
 */
async function checkBusinessHours() {
  try {
    const config = await getOneQuery(
      'SELECT value FROM bot_config WHERE key = ?', 
      ['business_hours_start']
    );
    
    const startTime = config?.value || '08:00';
    const endTime = '17:00'; // Configurar no banco se necessário
    const currentTime = moment().format('HH:mm');
    const currentDay = moment().day(); // 0 = domingo, 1 = segunda, etc.
    
    // Verificar se é dia útil (segunda a sexta)
    if (currentDay === 0 || currentDay === 6) {
      return false;
    }
    
    // Verificar horário
    return currentTime >= startTime && currentTime <= endTime;
  } catch (error) {
    console.error('❌ Erro ao verificar horário comercial:', error);
    return false;
  }
}

/**
 * Busca usuário ou cria novo
 */
async function getUserOrCreate(phoneNumber) {
  try {
    let user = await getOneQuery(
      'SELECT * FROM users WHERE phone_number = ?',
      [phoneNumber]
    );
    
    if (!user) {
      // Criar novo usuário
      const result = await runQuery(
        'INSERT INTO users (phone_number, conversation_state, last_seen) VALUES (?, ?, ?)',
        [phoneNumber, 'menu', new Date().toISOString()]
      );
      
      user = {
        id: result.id,
        phone_number: phoneNumber,
        conversation_state: 'menu',
        last_seen: new Date().toISOString()
      };
    } else {
      // Atualizar último acesso
      await runQuery(
        'UPDATE users SET last_seen = ? WHERE phone_number = ?',
        [new Date().toISOString(), phoneNumber]
      );
    }
    
    return user;
  } catch (error) {
    console.error('❌ Erro ao buscar/criar usuário:', error);
    throw error;
  }
}

/**
 * Atualiza estado do usuário
 */
async function updateUserState(phoneNumber, newState, stateData = null) {
  try {
    await runQuery(
      'UPDATE users SET conversation_state = ?, conversation_data = ?, updated_at = CURRENT_TIMESTAMP WHERE phone_number = ?',
      [newState, JSON.stringify(stateData), phoneNumber]
    );
    console.log(`👤 Estado do usuário ${phoneNumber} atualizado para: ${newState}`);
  } catch (error) {
    console.error('❌ Erro ao atualizar estado do usuário:', error);
  }
}

/**
 * Processa respostas de botões interativos
 */
async function handleInteractiveResponse(data, user, isBusinessHours) {
  try {
    let buttonId = '';
    let buttonTitle = '';
    
    // Extrair dados do botão clicado
    if (data.button_reply) {
      buttonId = data.button_reply.id;
      buttonTitle = data.button_reply.title;
    } else if (data.list_reply) {
      buttonId = data.list_reply.id;
      buttonTitle = data.list_reply.title;
    }
    
    console.log(`🔘 Botão clicado: ${buttonId} - ${buttonTitle}`);
    
    // Processar baseado no ID do botão
    if (buttonId.startsWith('btn_')) {
      return await handleMainMenuButton(buttonId, isBusinessHours);
    } else if (buttonId.startsWith('sched_')) {
      return await handleSchedulingButton(buttonId, user);
    } else if (buttonId.startsWith('confirm_')) {
      return await handleConfirmationButton(buttonId, user);
    } else if (buttonId.startsWith('service_')) {
      return await handleServiceButton(buttonId, user);
    }
    
    return await showMainMenu();
    
  } catch (error) {
    console.error('❌ Erro ao processar resposta interativa:', error);
    return {
      shouldReply: true,
      message: 'Desculpe, ocorreu um erro. Digite "menu" para voltar ao menu principal.',
      type: 'text'
    };
  }
}

/**
 * Processa cliques nos botões do menu principal
 */
async function handleMainMenuButton(buttonId, isBusinessHours) {
  switch (buttonId) {
    case 'btn_1':
      return await showAccountConsultation();
    case 'btn_2':
      return await showSecondCopy();
    case 'btn_3':
      return await showSchedulingMenu();
    case 'btn_4':
      return await showContactInfo();
    case 'btn_5':
      return await showEmergencyInfo();
    case 'btn_6':
      return await showHumanSupport(isBusinessHours);
    default:
      return await showMainMenu();
  }
}

/**
 * Processa cliques nos botões de agendamento
 */
async function handleSchedulingButton(buttonId, user) {
  switch (buttonId) {
    case 'sched_1':
      return await processWaterConnectionScheduling(user);
    case 'sched_2':
      return await processSewageConnectionScheduling(user);
    case 'sched_3':
      return await processMaintenanceScheduling(user);
    case 'sched_4':
      return await processInspectionScheduling(user);
    default:
      return await showMainMenu();
  }
}

/**
 * Processa botões de confirmação
 */
async function handleConfirmationButton(buttonId, user) {
  const confirmationData = user.conversation_data;
  
  if (buttonId === 'confirm_yes') {
    // Confirmar agendamento
    return await finalizeScheduling(confirmationData, user);
  } else if (buttonId === 'confirm_no') {
    // Cancelar e voltar ao menu
    return {
      shouldReply: true,
      message: '❌ Agendamento cancelado. Digite "menu" para voltar ao menu principal.',
      type: 'text',
      newState: 'menu'
    };
  }
  
  return await showMainMenu();
}

/**
 * Processa botões de serviços
 */
async function handleServiceButton(buttonId, user) {
  const services = {
    'service_1': 'Consulta de Conta',
    'service_2': 'Segunda Via',
    'service_3': 'Agendamento',
    'service_4': 'Fale Conosco',
    'service_5': 'Emergências'
  };
  
  const serviceName = services[buttonId];
  
  return {
    shouldReply: true,
    message: `Você selecionou: ${serviceName}`,
    type: 'text'
  };
}

/**
 * Valida CPF
 */
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11) {
    return false;
  }
  
  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }
  
  // Validar dígitos verificadores
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }
  
  return true;
}

/**
 * Manipula o menu principal
 */
async function handleMainMenu(messageContent, isBusinessHours) {
  const normalizedMessage = messageContent.toLowerCase().trim();
  
  // Verificar se está fora do horário comercial
  if (!isBusinessHours && !normalizedMessage.includes('emergência')) {
    return {
      shouldReply: true,
      message: '🕒 *Fora do Horário Comercial*\n\nNosso atendimento funciona de segunda a sexta, das 8h às 17h.\n\nPara *emergências* (vazamentos, falta de água), digite "emergência".\n\n📞 *Emergências:* (18) 99999-9999',
      type: 'text'
    };
  }
  
  // Processar opções do menu
  if (normalizedMessage === 'menu' || normalizedMessage === 'voltar' || normalizedMessage === '0') {
    return await showMainMenu();
  }
  
  if (normalizedMessage === '1' || normalizedMessage.includes('consulta') || normalizedMessage.includes('conta')) {
    return await showAccountConsultation();
  }
  
  if (normalizedMessage === '2' || normalizedMessage.includes('segunda via') || normalizedMessage.includes('boleto')) {
    return await showSecondCopy();
  }
  
  if (normalizedMessage === '3' || normalizedMessage.includes('agendamento') || normalizedMessage.includes('agendar')) {
    return await showSchedulingMenu();
  }
  
  if (normalizedMessage === '4' || normalizedMessage.includes('fale conosco') || normalizedMessage.includes('contato')) {
    return await showContactInfo();
  }
  
  if (normalizedMessage === '5' || normalizedMessage.includes('emergência') || normalizedMessage.includes('urgente')) {
    return await showEmergencyInfo();
  }
  
  if (normalizedMessage === '6' || normalizedMessage.includes('atendente') || normalizedMessage.includes('humano')) {
    return await showHumanSupport(isBusinessHours);
  }
  
  // Mensagem não reconhecida
  return {
    shouldReply: true,
    message: '❓ Não entendi sua mensagem. Digite "menu" para ver as opções disponíveis.',
    type: 'text'
  };
}

/**
 * Mostra o menu principal
 */
async function showMainMenu() {
  return {
    shouldReply: true,
    message: {
      type: 'button',
      header: {
        type: 'text',
        text: '🏛️ SAAE Palmital'
      },
      body: {
        text: 'Escolha uma opção:'
      },
      footer: {
        text: 'Atendimento: Seg-Sex 8h às 17h'
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'btn_1',
              title: '📋 Consulta de Conta'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_2',
              title: '📄 Segunda Via'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_3',
              title: '📅 Agendamento'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_4',
              title: '📞 Fale Conosco'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'btn_5',
              title: '🚨 Emergências'
            }
          }
        ]
      }
    },
    type: 'interactive'
  };
}

/**
 * Mostra opções de consulta de conta
 */
async function showAccountConsultation() {
  return {
    shouldReply: true,
    message: '📋 *Consulta de Conta*\n\nPara consultar sua conta, preciso do seu CPF ou número da matrícula.\n\nDigite apenas os números (sem pontos, traços ou espaços):',
    type: 'text',
    newState: 'waiting_cpf',
    stateData: { service: 'account_consultation' }
  };
}

/**
 * Mostra opções de segunda via
 */
async function showSecondCopy() {
  return {
    shouldReply: true,
    message: '📄 *Segunda Via de Boleto*\n\nPara gerar a segunda via, preciso do seu CPF ou número da matrícula.\n\nDigite apenas os números (sem pontos, traços ou espaços):',
    type: 'text',
    newState: 'waiting_cpf',
    stateData: { service: 'second_copy' }
  };
}

/**
 * Mostra menu de agendamento
 */
async function showSchedulingMenu() {
  return {
    shouldReply: true,
    message: {
      type: 'button',
      header: {
        type: 'text',
        text: '📅 Agendamento de Serviços'
      },
      body: {
        text: 'Escolha o tipo de serviço:'
      },
      footer: {
        text: 'SAAE Palmital'
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'sched_1',
              title: '💧 Ligação de Água'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'sched_2',
              title: '🚽 Ligação de Esgoto'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'sched_3',
              title: '🔧 Manutenção'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'sched_4',
              title: '🔍 Vistoria'
            }
          }
        ]
      }
    },
    type: 'interactive',
    newState: 'waiting_scheduling'
  };
}

/**
 * Mostra informações de contato
 */
async function showContactInfo() {
  return {
    shouldReply: true,
    message: '📞 *Fale Conosco*\n\n📍 *Endereço:* Rua Principal, 123 - Centro - Palmital/SP\n📱 *Telefone:* (18) 99999-9999\n📧 *Email:* contato@saae-palmital.com.br\n🕒 *Horário:* Segunda a Sexta, 8h às 17h\n\nPara voltar ao menu, digite "menu".',
    type: 'text'
  };
}

/**
 * Mostra informações de emergência
 */
async function showEmergencyInfo() {
  return {
    shouldReply: true,
    message: '🚨 *Emergências*\n\nPara vazamentos, falta de água ou outros problemas urgentes:\n\n📱 *Ligue: (18) 99999-9999*\n🕒 *24 horas por dia*\n\n⚠️ *ATENÇÃO:* Este número é apenas para emergências!\n\nPara outros serviços, digite "menu".',
    type: 'text'
  };
}

/**
 * Mostra opções de atendimento humano
 */
async function showHumanSupport(isBusinessHours) {
  if (!isBusinessHours) {
    return {
      shouldReply: true,
      message: '👨‍💼 *Atendimento Humano*\n\nNosso atendimento humano funciona de segunda a sexta, das 8h às 17h.\n\n📞 *Telefone:* (18) 99999-9999\n📧 *Email:* contato@saae-palmital.com.br\n\nPara voltar ao menu, digite "menu".',
      type: 'text'
    };
  }
  
  return {
    shouldReply: true,
    message: '👨‍💼 *Atendimento Humano*\n\nVocê será transferido para um de nossos atendentes.\n\n⏳ Aguarde alguns instantes...\n\n📞 *Telefone:* (18) 99999-9999\n\nPara voltar ao menu, digite "menu".',
    type: 'text'
  };
}

/**
 * Manipula entrada de CPF
 */
async function handleCPFInput(messageContent, user) {
  const cpf = messageContent.replace(/\D/g, ''); // Remove caracteres não numéricos
  
  // Validar CPF
  if (!validateCPF(cpf)) {
    return {
      shouldReply: true,
      message: '❌ CPF inválido. Por favor, digite um CPF válido (apenas números):\n\nExemplo: 12345678901',
      type: 'text'
    };
  }
  
  // Simular consulta (aqui você integraria com o sistema real do SAAE)
  let conversationData = {};
  try {
    conversationData = JSON.parse(user.conversation_data || '{}');
  } catch (e) {
    conversationData = {};
  }
  
  const service = conversationData.service;
  
  if (service === 'account_consultation') {
    return await processAccountConsultation(cpf, user);
  } else if (service === 'second_copy') {
    return await processSecondCopy(cpf, user);
  }
  
  return {
    shouldReply: true,
    message: '✅ CPF recebido. Processando sua solicitação...',
    type: 'text',
    newState: 'menu'
  };
}

/**
 * Processa consulta de conta
 */
async function processAccountConsultation(cpf, user) {
  // Simular dados da conta (aqui você integraria com o sistema real)
  const mockAccountData = {
    customerName: 'João Silva',
    address: 'Rua das Flores, 123',
    currentBill: 'R$ 45,80',
    dueDate: '15/01/2024',
    consumption: '12 m³',
    status: 'Em dia'
  };
  
  return {
    shouldReply: true,
    message: `📋 *Consulta de Conta*\n\n👤 *Cliente:* ${mockAccountData.customerName}\n📍 *Endereço:* ${mockAccountData.address}\n💰 *Valor atual:* ${mockAccountData.currentBill}\n📅 *Vencimento:* ${mockAccountData.dueDate}\n💧 *Consumo:* ${mockAccountData.consumption}\n✅ *Status:* ${mockAccountData.status}\n\nPara nova consulta, digite "menu".`,
    type: 'text',
    newState: 'menu'
  };
}

/**
 * Processa segunda via
 */
async function processSecondCopy(cpf, user) {
  return {
    shouldReply: true,
    message: `📄 *Segunda Via Gerada*\n\n✅ Sua segunda via foi gerada com sucesso!\n\n💰 *Valor:* R$ 45,80\n📅 *Vencimento:* 15/01/2024\n\n📱 *Link para pagamento:*\nhttps://saae-palmital.com.br/pagamento/${cpf}\n\nPara nova consulta, digite "menu".`,
    type: 'text',
    newState: 'menu'
  };
}

/**
 * Manipula entrada de agendamento
 */
async function handleSchedulingInput(messageContent, user) {
  const normalizedMessage = messageContent.toLowerCase().trim();
  
  if (normalizedMessage === 'menu' || normalizedMessage === 'voltar') {
    return await showMainMenu();
  }
  
  // Processar opções de agendamento
  if (normalizedMessage === '1' || normalizedMessage.includes('água') || normalizedMessage.includes('agua')) {
    return await processWaterConnectionScheduling(user);
  }
  
  if (normalizedMessage === '2' || normalizedMessage.includes('esgoto')) {
    return await processSewageConnectionScheduling(user);
  }
  
  if (normalizedMessage === '3' || normalizedMessage.includes('manutenção') || normalizedMessage.includes('manutencao')) {
    return await processMaintenanceScheduling(user);
  }
  
  if (normalizedMessage === '4' || normalizedMessage.includes('vistoria')) {
    return await processInspectionScheduling(user);
  }
  
  return {
    shouldReply: true,
    message: '❓ Opção não reconhecida. Digite "menu" para voltar ao menu principal.',
    type: 'text'
  };
}

/**
 * Processa agendamento de ligação de água
 */
async function processWaterConnectionScheduling(user) {
  return {
    shouldReply: true,
    message: '💧 *Agendamento - Ligação de Água*\n\nPara agendar a ligação de água, preciso dos seguintes dados:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n\nDigite seus dados separados por vírgula:',
    type: 'text',
    newState: 'waiting_contact',
    stateData: { service: 'water_connection' }
  };
}

/**
 * Processa agendamento de ligação de esgoto
 */
async function processSewageConnectionScheduling(user) {
  return {
    shouldReply: true,
    message: '🚽 *Agendamento - Ligação de Esgoto*\n\nPara agendar a ligação de esgoto, preciso dos seguintes dados:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n\nDigite seus dados separados por vírgula:',
    type: 'text',
    newState: 'waiting_contact',
    stateData: { service: 'sewage_connection' }
  };
}

/**
 * Processa agendamento de manutenção
 */
async function processMaintenanceScheduling(user) {
  return {
    shouldReply: true,
    message: '🔧 *Agendamento - Manutenção*\n\nPara agendar manutenção, preciso dos seguintes dados:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n5️⃣ Descrição do problema\n\nDigite seus dados separados por vírgula:',
    type: 'text',
    newState: 'waiting_contact',
    stateData: { service: 'maintenance' }
  };
}

/**
 * Processa agendamento de vistoria
 */
async function processInspectionScheduling(user) {
  return {
    shouldReply: true,
    message: '🔍 *Agendamento - Vistoria*\n\nPara agendar vistoria, preciso dos seguintes dados:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n5️⃣ Tipo de vistoria\n\nDigite seus dados separados por vírgula:',
    type: 'text',
    newState: 'waiting_contact',
    stateData: { service: 'inspection' }
  };
}

/**
 * Manipula entrada de dados de contato
 */
async function handleContactInput(messageContent, user) {
  const data = messageContent.split(',').map(item => item.trim());
  
  let conversationData = {};
  try {
    conversationData = JSON.parse(user.conversation_data || '{}');
  } catch (e) {
    conversationData = {};
  }
  
  const service = conversationData.service;
  
  if (data.length < 4) {
    return {
      shouldReply: true,
      message: '❌ Dados incompletos. Por favor, forneça pelo menos:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n\nDigite novamente separados por vírgula:',
      type: 'text'
    };
  }
  
  // Validar CPF
  const cpf = data[1].replace(/\D/g, '');
  if (!validateCPF(cpf)) {
    return {
      shouldReply: true,
      message: '❌ CPF inválido. Por favor, forneça os dados novamente com um CPF válido:\n\n1️⃣ Nome completo\n2️⃣ CPF\n3️⃣ Endereço completo\n4️⃣ Telefone de contato\n\nDigite separados por vírgula:',
      type: 'text'
    };
  }
  
  // Nomes dos serviços
  const serviceNames = {
    water_connection: 'Ligação de Água 💧',
    sewage_connection: 'Ligação de Esgoto 🚽',
    maintenance: 'Manutenção 🔧',
    inspection: 'Vistoria 🔍'
  };
  
  const serviceName = serviceNames[service] || 'Serviço';
  const description = data[4] || 'Não informada';
  
  // Mostrar confirmação com botões
  return {
    shouldReply: true,
    message: {
      type: 'button',
      header: {
        type: 'text',
        text: '✅ Confirmar Agendamento'
      },
      body: {
        text: `Por favor, confirme os dados:\n\n🏛️ *Serviço:* ${serviceName}\n👤 *Cliente:* ${data[0]}\n📋 *CPF:* ${data[1]}\n📍 *Endereço:* ${data[2]}\n📱 *Telefone:* ${data[3]}\n📝 *Descrição:* ${description}\n\n📅 *Data sugerida:* ${getNextBusinessDay()}`
      },
      footer: {
        text: 'SAAE Palmital'
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'confirm_yes',
              title: '✅ Confirmar'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'confirm_no',
              title: '❌ Cancelar'
            }
          }
        ]
      }
    },
    type: 'interactive',
    newState: 'waiting_confirmation',
    stateData: {
      service,
      name: data[0],
      cpf: data[1],
      address: data[2],
      phone: data[3],
      description: description,
      scheduledDate: getNextBusinessDay()
    }
  };
}

/**
 * Manipula confirmação
 */
async function handleConfirmation(messageContent, user) {
  const normalizedMessage = messageContent.toLowerCase().trim();
  
  if (normalizedMessage === 'sim' || normalizedMessage === 's' || normalizedMessage === 'confirmar') {
    let conversationData = {};
    try {
      conversationData = JSON.parse(user.conversation_data || '{}');
    } catch (e) {
      conversationData = {};
    }
    return await finalizeScheduling(conversationData, user);
  } else if (normalizedMessage === 'não' || normalizedMessage === 'nao' || normalizedMessage === 'n' || normalizedMessage === 'cancelar') {
    return {
      shouldReply: true,
      message: '❌ Agendamento cancelado. Digite "menu" para voltar ao menu principal.',
      type: 'text',
      newState: 'menu'
    };
  }
  
  return {
    shouldReply: true,
    message: '❓ Por favor, responda "sim" para confirmar ou "não" para cancelar.',
    type: 'text'
  };
}

/**
 * Finaliza agendamento
 */
async function finalizeScheduling(data, user) {
  const serviceNames = {
    water_connection: 'Ligação de Água 💧',
    sewage_connection: 'Ligação de Esgoto 🚽',
    maintenance: 'Manutenção 🔧',
    inspection: 'Vistoria 🔍'
  };
  
  const serviceName = serviceNames[data.service] || 'Serviço';
  const protocolNumber = `SAAE${Date.now()}`;
  
  // Aqui você salvaria no banco de dados real
  try {
    await runQuery(
      `INSERT INTO appointments (phone_number, service_type, customer_name, cpf, address, phone, description, scheduled_date, protocol, status, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [
        user.phone_number,
        data.service,
        data.name,
        data.cpf,
        data.address,
        data.phone,
        data.description || '',
        data.scheduledDate,
        protocolNumber,
        'pending'
      ]
    );
  } catch (error) {
    console.error('❌ Erro ao salvar agendamento:', error);
    // Continuar mesmo com erro para não quebrar o fluxo
  }
  
  return {
    shouldReply: true,
    message: `✅ *Agendamento Confirmado com Sucesso!*\n\n🏛️ *Serviço:* ${serviceName}\n👤 *Cliente:* ${data.name}\n📋 *CPF:* ${data.cpf}\n📍 *Endereço:* ${data.address}\n📱 *Telefone:* ${data.phone}\n📅 *Data:* ${data.scheduledDate}\n\n📋 *Protocolo:* ${protocolNumber}\n\n✅ Seu agendamento foi registrado. Entraremos em contato em breve para confirmar o horário.\n\n📞 Dúvidas? Ligue: (18) 99999-9999\n\nDigite "menu" para voltar ao menu principal.`,
    type: 'text',
    newState: 'menu'
  };
}

/**
 * Calcula o próximo dia útil
 */
function getNextBusinessDay() {
  const today = moment();
  let nextDay = today.clone().add(1, 'days');
  
  // Pular finais de semana
  while (nextDay.day() === 0 || nextDay.day() === 6) {
    nextDay.add(1, 'days');
  }
  
  return nextDay.format('DD/MM/YYYY [às] 14h');
}

module.exports = {
  processBotLogic,
  checkBusinessHours,
  getUserOrCreate,
  updateUserState
};
