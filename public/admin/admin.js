// Admin Panel JavaScript
let statsChart = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadDashboard();
    setupEventListeners();
});

// Configurar navegação
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Adicionar active ao link clicado
            this.classList.add('active');
            
            // Mostrar seção correspondente
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Atualizar título da página
            const title = this.textContent.trim();
            document.getElementById('page-title').textContent = title;
        });
    });
}

// Mostrar seção específica
function showSection(section) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(s => s.style.display = 'none');
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`${section}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
        
        // Carregar dados da seção
        switch(section) {
            case 'dashboard':
                loadDashboard();
                break;
            case 'conversations':
                loadConversations();
                break;
            case 'users':
                loadUsers();
                break;
            case 'templates':
                loadTemplates();
                break;
            case 'config':
                loadConfig();
                break;
            case 'logs':
                loadLogs();
                break;
            case 'send-message':
                setupSendMessageForm();
                break;
        }
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Form de envio de mensagem
    const sendForm = document.getElementById('send-message-form');
    if (sendForm) {
        sendForm.addEventListener('submit', handleSendMessage);
    }
    
    // Configurar datas padrão
    const today = new Date().toISOString().split('T')[0];
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');
    
    if (startDate && endDate) {
        startDate.value = lastWeek;
        endDate.value = today;
    }
}

// Carregar dashboard
async function loadDashboard() {
    try {
        showLoading('dashboard-section');
        
        const response = await fetch('/admin/api/dashboard');
        const data = await response.json();
        
        if (data.success) {
            updateDashboardStats(data.data.stats);
            updateActiveConversations(data.data.activeConversations);
            updateLogStats(data.data.logStats);
        } else {
            showError('Erro ao carregar dados do dashboard');
        }
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
        showError('Erro ao carregar dashboard');
    }
}

// Atualizar estatísticas do dashboard
function updateDashboardStats(stats) {
    document.getElementById('total-messages').textContent = stats.total_messages || 0;
    document.getElementById('received-messages').textContent = stats.received_messages || 0;
    document.getElementById('sent-messages').textContent = stats.sent_messages || 0;
    document.getElementById('unique-users').textContent = stats.unique_users || 0;
}

// Atualizar conversas ativas
function updateActiveConversations(conversations) {
    const container = document.getElementById('active-conversations');
    
    if (!conversations || conversations.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhuma conversa ativa</p>';
        return;
    }
    
    const html = conversations.map(conv => `
        <div class="conversation-item">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <strong>${conv.user_name || 'Usuário'}</strong>
                    <br>
                    <small class="text-muted">${conv.phone_number}</small>
                </div>
                <div class="text-end">
                    <span class="badge bg-primary">${conv.message_count} msgs</span>
                    <br>
                    <small class="text-muted">${formatDate(conv.last_message)}</small>
                </div>
            </div>
            <div class="mt-2">
                <small class="text-muted">Estado: ${conv.conversation_state}</small>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Carregar conversas
async function loadConversations() {
    try {
        showLoading('conversations-section');
        
        const response = await fetch('/admin/api/conversations');
        const data = await response.json();
        
        if (data.success) {
            displayConversations(data.data);
        } else {
            showError('Erro ao carregar conversas');
        }
    } catch (error) {
        console.error('Erro ao carregar conversas:', error);
        showError('Erro ao carregar conversas');
    }
}

// Exibir conversas
function displayConversations(conversations) {
    const container = document.getElementById('conversations-list');
    
    if (!conversations || conversations.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhuma conversa encontrada</p>';
        return;
    }
    
    // Agrupar conversas por telefone
    const groupedConversations = groupConversationsByPhone(conversations);
    
    const html = Object.keys(groupedConversations).map(phoneNumber => {
        const phoneConversations = groupedConversations[phoneNumber];
        const userName = phoneConversations[0].user_name || 'Usuário';
        
        return `
            <div class="card mb-3">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${userName}</strong>
                        <br>
                        <small>${phoneNumber}</small>
                    </div>
                    <span class="badge bg-primary">${phoneConversations.length} mensagens</span>
                </div>
                <div class="card-body">
                    ${phoneConversations.map(msg => `
                        <div class="message-bubble ${msg.type === 'sent' ? 'message-sent' : 'message-received'}">
                            <div class="message-content">${msg.content}</div>
                            <div class="message-time">
                                <small>${formatDate(msg.timestamp)}</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Agrupar conversas por telefone
function groupConversationsByPhone(conversations) {
    return conversations.reduce((groups, conversation) => {
        const phone = conversation.phone_number;
        if (!groups[phone]) {
            groups[phone] = [];
        }
        groups[phone].push(conversation);
        return groups;
    }, {});
}

// Buscar conversas
async function searchConversations() {
    try {
        const phoneNumber = document.getElementById('search-phone').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        
        let url = '/admin/api/conversations?';
        if (phoneNumber) url += `phoneNumber=${phoneNumber}&`;
        if (startDate) url += `startDate=${startDate}&`;
        if (endDate) url += `endDate=${endDate}&`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            displayConversations(data.data);
        } else {
            showError('Erro ao buscar conversas');
        }
    } catch (error) {
        console.error('Erro ao buscar conversas:', error);
        showError('Erro ao buscar conversas');
    }
}

// Carregar usuários
async function loadUsers() {
    try {
        const response = await fetch('/admin/api/users');
        const data = await response.json();
        
        if (data.success) {
            displayUsers(data.data);
        } else {
            showError('Erro ao carregar usuários');
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        showError('Erro ao carregar usuários');
    }
}

// Exibir usuários
function displayUsers(users) {
    const tbody = document.getElementById('users-table');
    
    if (!users || users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhum usuário encontrado</td></tr>';
        return;
    }
    
    const html = users.map(user => `
        <tr>
            <td>${user.phone_number}</td>
            <td>${user.name || '-'}</td>
            <td><span class="badge bg-info">${user.conversation_state}</span></td>
            <td>${formatDate(user.last_seen)}</td>
            <td>
                <span class="badge ${user.is_blocked ? 'bg-danger' : 'bg-success'}">
                    ${user.is_blocked ? 'Bloqueado' : 'Ativo'}
                </span>
            </td>
        </tr>
    `).join('');
    
    tbody.innerHTML = html;
}

// Carregar templates
async function loadTemplates() {
    try {
        const response = await fetch('/admin/api/templates');
        const data = await response.json();
        
        if (data.success) {
            displayTemplates(data.data);
        } else {
            showError('Erro ao carregar templates');
        }
    } catch (error) {
        console.error('Erro ao carregar templates:', error);
        showError('Erro ao carregar templates');
    }
}

// Exibir templates
function displayTemplates(templates) {
    const container = document.getElementById('templates-list');
    
    if (!templates || templates.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhum template encontrado</p>';
        return;
    }
    
    const html = templates.map(template => `
        <div class="card mb-3">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <strong>${template.name}</strong>
                    <br>
                    <small class="text-muted">${template.category || 'Geral'}</small>
                </div>
                <div>
                    <span class="badge ${template.is_active ? 'bg-success' : 'bg-secondary'}">
                        ${template.is_active ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
            </div>
            <div class="card-body">
                <textarea class="form-control mb-3" rows="4" id="template-${template.id}">${template.content}</textarea>
                <button class="btn btn-primary btn-sm" onclick="updateTemplate(${template.id})">
                    <i class="fas fa-save"></i> Salvar
                </button>
                <button class="btn btn-${template.is_active ? 'secondary' : 'success'} btn-sm ms-2" onclick="toggleTemplate(${template.id}, ${!template.is_active})">
                    <i class="fas fa-${template.is_active ? 'pause' : 'play'}"></i>
                    ${template.is_active ? 'Desativar' : 'Ativar'}
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// Atualizar template
async function updateTemplate(templateId) {
    try {
        const content = document.getElementById(`template-${templateId}`).value;
        
        const response = await fetch('/admin/api/templates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: templateId,
                content: content
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Template atualizado com sucesso!');
        } else {
            showError('Erro ao atualizar template');
        }
    } catch (error) {
        console.error('Erro ao atualizar template:', error);
        showError('Erro ao atualizar template');
    }
}

// Carregar configurações
async function loadConfig() {
    try {
        const response = await fetch('/admin/api/config');
        const data = await response.json();
        
        if (data.success) {
            displayConfig(data.data);
        } else {
            showError('Erro ao carregar configurações');
        }
    } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        showError('Erro ao carregar configurações');
    }
}

// Exibir configurações
function displayConfig(configs) {
    const container = document.getElementById('config-list');
    
    const html = Object.keys(configs).map(key => {
        const config = configs[key];
        return `
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4">
                            <strong>${key.replace(/_/g, ' ').toUpperCase()}</strong>
                            <br>
                            <small class="text-muted">${config.description || ''}</small>
                        </div>
                        <div class="col-md-6">
                            <input type="text" class="form-control" id="config-${key}" value="${config.value || ''}">
                        </div>
                        <div class="col-md-2">
                            <button class="btn btn-primary btn-sm w-100" onclick="updateConfig('${key}')">
                                <i class="fas fa-save"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Atualizar configuração
async function updateConfig(key) {
    try {
        const value = document.getElementById(`config-${key}`).value;
        
        const response = await fetch('/admin/api/config', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: key,
                value: value
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Configuração atualizada com sucesso!');
        } else {
            showError('Erro ao atualizar configuração');
        }
    } catch (error) {
        console.error('Erro ao atualizar configuração:', error);
        showError('Erro ao atualizar configuração');
    }
}

// Carregar logs
async function loadLogs() {
    try {
        const response = await fetch('/admin/api/logs');
        const data = await response.json();
        
        if (data.success) {
            displayLogs(data.data);
        } else {
            showError('Erro ao carregar logs');
        }
    } catch (error) {
        console.error('Erro ao carregar logs:', error);
        showError('Erro ao carregar logs');
    }
}

// Exibir logs
function displayLogs(logs) {
    const tbody = document.getElementById('logs-table');
    
    if (!logs || logs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum log encontrado</td></tr>';
        return;
    }
    
    const html = logs.map(log => `
        <tr>
            <td>${formatDate(log.timestamp)}</td>
            <td><span class="badge bg-info">${log.event_type}</span></td>
            <td>
                <span class="badge ${log.status === 'success' ? 'bg-success' : 'bg-danger'}">
                    ${log.status}
                </span>
            </td>
            <td>${log.error_message || '-'}</td>
        </tr>
    `).join('');
    
    tbody.innerHTML = html;
}

// Configurar formulário de envio de mensagem
function setupSendMessageForm() {
    // Limpar formulário
    document.getElementById('phone-number').value = '';
    document.getElementById('message-content').value = '';
}

// Enviar mensagem
async function handleSendMessage(e) {
    e.preventDefault();
    
    const phoneNumber = document.getElementById('phone-number').value;
    const message = document.getElementById('message-content').value;
    
    if (!phoneNumber || !message) {
        showError('Por favor, preencha todos os campos');
        return;
    }
    
    try {
        const response = await fetch('/admin/api/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
                message: message
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Mensagem enviada com sucesso!');
            document.getElementById('send-message-form').reset();
        } else {
            showError('Erro ao enviar mensagem: ' + data.error);
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        showError('Erro ao enviar mensagem');
    }
}

// Utilitários
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
}

function showLoading(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const loadingDiv = section.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'block';
        }
    }
}

function hideLoading(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const loadingDiv = section.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
    }
}

function showSuccess(message) {
    showAlert(message, 'success');
}

function showError(message) {
    showAlert(message, 'danger');
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.main-content');
    container.insertBefore(alertDiv, container.firstChild);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Atualizar dados
function refreshData() {
    const activeSection = document.querySelector('.nav-link.active');
    if (activeSection) {
        const section = activeSection.getAttribute('data-section');
        showSection(section);
    }
}

// Exportar dados
function exportData() {
    // Implementar exportação de dados
    showSuccess('Funcionalidade de exportação em desenvolvimento');
}

// Limpeza de dados
async function cleanupData() {
    if (!confirm('Tem certeza que deseja limpar os dados antigos? Esta ação não pode ser desfeita.')) {
        return;
    }
    
    try {
        const response = await fetch('/admin/api/cleanup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                daysOld: 90
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showSuccess('Limpeza realizada com sucesso!');
            refreshData();
        } else {
            showError('Erro na limpeza de dados');
        }
    } catch (error) {
        console.error('Erro na limpeza:', error);
        showError('Erro na limpeza de dados');
    }
}
