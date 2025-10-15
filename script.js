// Dados simulados dos tanques
const tanksData = [
    {
        id: 1,
        name: "Tanque Principal - Centro",
        level: 85,
        capacity: 50000,
        location: "Centro da Cidade",
        lastUpdate: "2 min atrás",
        status: "normal"
    },
    {
        id: 2,
        name: "Tanque Norte",
        level: 25,
        capacity: 30000,
        location: "Bairro Norte",
        lastUpdate: "1 min atrás",
        status: "critical"
    },
    {
        id: 3,
        name: "Tanque Sul",
        level: 65,
        capacity: 40000,
        location: "Bairro Sul",
        lastUpdate: "3 min atrás",
        status: "warning"
    },
    {
        id: 4,
        name: "Tanque Leste",
        level: 92,
        capacity: 35000,
        location: "Bairro Leste",
        lastUpdate: "1 min atrás",
        status: "normal"
    },
    {
        id: 5,
        name: "Tanque Oeste",
        level: 78,
        capacity: 45000,
        location: "Bairro Oeste",
        lastUpdate: "2 min atrás",
        status: "normal"
    }
];

// Dados históricos simulados
const historicalData = {
    levels: [],
    consumption: []
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    generateHistoricalData();
    updateDashboard();
    setupCharts();
    startRealTimeUpdates();
});

// Inicializar dashboard
function initializeDashboard() {
    updateAlerts();
    updateSummaryCards();
    renderTanks();
    updateLastUpdateTime();
}

// Atualizar alertas
function updateAlerts() {
    const alertsGrid = document.getElementById('alertsGrid');
    const alerts = [];
    
    tanksData.forEach(tank => {
        if (tank.status === 'critical') {
            alerts.push({
                type: 'critical',
                icon: 'fas fa-exclamation-triangle',
                title: 'Nível Crítico',
                message: `${tank.name} está com apenas ${tank.level}% de capacidade`,
                time: tank.lastUpdate
            });
        } else if (tank.status === 'warning') {
            alerts.push({
                type: 'warning',
                icon: 'fas fa-exclamation-circle',
                title: 'Nível Baixo',
                message: `${tank.name} está com ${tank.level}% de capacidade`,
                time: tank.lastUpdate
            });
        }
    });
    
    // Adicionar alertas do sistema
    alerts.push({
        type: 'info',
        icon: 'fas fa-info-circle',
        title: 'Sistema Ativo',
        message: 'Todos os sensores ESP32 estão funcionando normalmente',
        time: 'Agora'
    });
    
    alertsGrid.innerHTML = alerts.map(alert => `
        <div class="alert-card alert-${alert.type}">
            <i class="${alert.icon}"></i>
            <div>
                <h4>${alert.title}</h4>
                <p>${alert.message}</p>
                <small>${alert.time}</small>
            </div>
        </div>
    `).join('');
}

// Atualizar cards de resumo
function updateSummaryCards() {
    const totalTanks = tanksData.length;
    const activeAlerts = tanksData.filter(tank => tank.status === 'critical' || tank.status === 'warning').length;
    const averageLevel = Math.round(tanksData.reduce((sum, tank) => sum + tank.level, 0) / totalTanks);
    const overallStatus = activeAlerts === 0 ? 'Normal' : activeAlerts <= 2 ? 'Atenção' : 'Crítico';
    
    document.getElementById('totalTanks').textContent = totalTanks;
    document.getElementById('activeAlerts').textContent = activeAlerts;
    document.getElementById('averageLevel').textContent = averageLevel + '%';
    
    const statusElement = document.querySelector('#activeAlerts').parentElement.parentElement.querySelector('.card-value');
    statusElement.textContent = overallStatus;
    statusElement.className = `card-value status-${overallStatus.toLowerCase()}`;
}

// Renderizar tanques
function renderTanks() {
    const tanksGrid = document.getElementById('tanksGrid');
    
    tanksGrid.innerHTML = tanksData.map(tank => `
        <div class="tank-card ${tank.status}">
            <div class="tank-header">
                <h3 class="tank-name">${tank.name}</h3>
                <span class="tank-status ${tank.status}">
                    ${tank.status === 'critical' ? 'Crítico' : 
                      tank.status === 'warning' ? 'Atenção' : 'Normal'}
                </span>
            </div>
            
            <div class="tank-level">
                <div class="level-label">
                    <span>Nível de Água</span>
                    <span>${tank.level}%</span>
                </div>
                <div class="level-bar">
                    <div class="level-fill ${tank.status}" style="width: ${tank.level}%">
                        <span class="level-percentage">${tank.level}%</span>
                    </div>
                </div>
            </div>
            
            <div class="tank-info">
                <div class="tank-info-item">
                    <span>Capacidade:</span>
                    <span>${tank.capacity.toLocaleString()}L</span>
                </div>
                <div class="tank-info-item">
                    <span>Localização:</span>
                    <span>${tank.location}</span>
                </div>
                <div class="tank-info-item">
                    <span>Atualização:</span>
                    <span>${tank.lastUpdate}</span>
                </div>
                <div class="tank-info-item">
                    <span>Volume Atual:</span>
                    <span>${Math.round(tank.capacity * tank.level / 100).toLocaleString()}L</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Gerar dados históricos simulados
function generateHistoricalData() {
    const now = new Date();
    const hours = [];
    const levels = [];
    const consumption = [];
    
    // Gerar dados das últimas 24 horas
    for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        hours.push(time.getHours() + ':00');
        
        // Simular variação de nível
        const baseLevel = 70 + Math.sin(i * 0.3) * 20;
        levels.push(Math.max(0, Math.min(100, baseLevel + (Math.random() - 0.5) * 10)));
        
        // Simular consumo
        consumption.push(Math.round(1000 + Math.random() * 2000));
    }
    
    historicalData.levels = { hours, levels };
    historicalData.consumption = { hours, consumption };
}

// Configurar gráficos
function setupCharts() {
    setupLevelChart();
    setupConsumptionChart();
}

// Gráfico de nível de água
function setupLevelChart() {
    const ctx = document.getElementById('levelChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.levels.hours,
            datasets: [{
                label: 'Nível de Água (%)',
                data: historicalData.levels.levels,
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2196F3',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point: {
                    hoverRadius: 8
                }
            }
        }
    });
}

// Gráfico de consumo
function setupConsumptionChart() {
    const ctx = document.getElementById('consumptionChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: historicalData.consumption.hours,
            datasets: [{
                label: 'Consumo (L/h)',
                data: historicalData.consumption.consumption,
                backgroundColor: 'rgba(76, 175, 80, 0.8)',
                borderColor: '#4CAF50',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + 'L';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Atualizar dashboard
function updateDashboard() {
    // Simular pequenas variações nos dados
    tanksData.forEach(tank => {
        const variation = (Math.random() - 0.5) * 2;
        tank.level = Math.max(0, Math.min(100, tank.level + variation));
        
        // Atualizar status baseado no nível
        if (tank.level < 20) {
            tank.status = 'critical';
        } else if (tank.level < 40) {
            tank.status = 'warning';
        } else {
            tank.status = 'normal';
        }
        
        tank.lastUpdate = Math.floor(Math.random() * 5) + 1 + ' min atrás';
    });
    
    updateAlerts();
    updateSummaryCards();
    renderTanks();
    updateLastUpdateTime();
}

// Atualizar tempo da última atualização
function updateLastUpdateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR');
    document.getElementById('lastUpdate').textContent = `Última atualização: ${timeString}`;
}

// Iniciar atualizações em tempo real
function startRealTimeUpdates() {
    // Atualizar a cada 30 segundos
    setInterval(updateDashboard, 30000);
    
    // Atualizar tempo a cada minuto
    setInterval(updateLastUpdateTime, 60000);
}

// Adicionar efeitos visuais
function addVisualEffects() {
    // Adicionar animação de fade-in aos cards
    const cards = document.querySelectorAll('.tank-card, .summary-card, .alert-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
}

// Simular recebimento de dados do ESP32
function simulateESP32Data() {
    // Simular dados que viriam do sensor ultrassônico
    const sensorData = {
        tankId: Math.floor(Math.random() * 5) + 1,
        distance: Math.random() * 200 + 50, // Distância em cm
        timestamp: new Date().toISOString(),
        temperature: 25 + Math.random() * 10, // Temperatura ambiente
        humidity: 60 + Math.random() * 20 // Umidade
    };
    
    // Converter distância em nível de água
    const tankHeight = 300; // Altura do tanque em cm
    const waterLevel = Math.max(0, Math.min(100, 
        ((tankHeight - sensorData.distance) / tankHeight) * 100
    ));
    
    // Atualizar dados do tanque correspondente
    const tank = tanksData.find(t => t.id === sensorData.tankId);
    if (tank) {
        tank.level = Math.round(waterLevel);
        tank.lastUpdate = 'Agora';
        
        // Atualizar status
        if (tank.level < 20) {
            tank.status = 'critical';
        } else if (tank.level < 40) {
            tank.status = 'warning';
        } else {
            tank.status = 'normal';
        }
    }
    
    return sensorData;
}

// Adicionar funcionalidade de notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                        type === 'error' ? 'exclamation-circle' : 
                        type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : 
                    type === 'error' ? '#f44336' : 
                    type === 'warning' ? '#ff9800' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Adicionar CSS para animações de notificação
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Simular alertas críticos
function simulateCriticalAlert() {
    const criticalTanks = tanksData.filter(tank => tank.status === 'critical');
    if (criticalTanks.length > 0) {
        showNotification(
            `ALERTA: ${criticalTanks[0].name} está com nível crítico!`, 
            'error'
        );
    }
}

// Inicializar simulações
setTimeout(() => {
    addVisualEffects();
    simulateCriticalAlert();
}, 1000);

// Simular dados do ESP32 a cada 10 segundos
setInterval(() => {
    const sensorData = simulateESP32Data();
    console.log('Dados recebidos do ESP32:', sensorData);
}, 10000);