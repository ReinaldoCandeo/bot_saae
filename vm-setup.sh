#!/bin/bash

# Script de configuração rápida para VM Proxmox
# Execute este script DENTRO da VM após o deploy

echo "🔧 Configuração Rápida - SAAE WhatsApp Bot"
echo "=========================================="

# Verificar se está rodando como root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Execute como root ou com sudo"
    exit 1
fi

# Atualizar sistema
echo "📦 Atualizando sistema..."
apt update && apt upgrade -y

# Instalar dependências
echo "📦 Instalando dependências..."
apt install -y nginx certbot python3-certbot-nginx ufw git curl

# Configurar firewall
echo "🔥 Configurando firewall..."
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Configurar Nginx
echo "🌐 Configurando Nginx..."
cat > /etc/nginx/sites-available/saae-bot << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Redirecionar para HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name _;
    
    # SSL será configurado pelo Certbot
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
}
EOF

# Ativar site
ln -sf /etc/nginx/sites-available/saae-bot /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Testar configuração
nginx -t

# Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx

# Configurar backup automático
echo "💾 Configurando backup automático..."
cat > /opt/saae-whatsapp-bot/backup.sh << 'EOF'
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
DB_PATH="/opt/saae-whatsapp-bot/database/saae_bot.db"

mkdir -p $BACKUP_DIR

if [ -f "$DB_PATH" ]; then
    cp $DB_PATH $BACKUP_DIR/saae_bot_$DATE.db
    echo "Backup criado: saae_bot_$DATE.db"
    
    # Manter apenas últimos 7 backups
    find $BACKUP_DIR -name "saae_bot_*.db" -mtime +7 -delete
else
    echo "Banco de dados não encontrado: $DB_PATH"
fi
EOF

chmod +x /opt/saae-whatsapp-bot/backup.sh

# Configurar cron para backup
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/saae-whatsapp-bot/backup.sh") | crontab -

# Configurar logrotate
echo "📋 Configurando rotação de logs..."
cat > /etc/logrotate.d/saae-bot << 'EOF'
/opt/saae-whatsapp-bot/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

# Configurar monitoramento
echo "📊 Configurando monitoramento..."
cat > /opt/saae-whatsapp-bot/monitor.sh << 'EOF'
#!/bin/bash

# Script de monitoramento simples
LOG_FILE="/opt/saae-whatsapp-bot/logs/monitor.log"

check_service() {
    if pm2 list | grep -q "saae-whatsapp-bot.*online"; then
        echo "$(date): ✅ Serviço online" >> $LOG_FILE
    else
        echo "$(date): ❌ Serviço offline - reiniciando" >> $LOG_FILE
        pm2 restart saae-whatsapp-bot
    fi
}

check_disk() {
    USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ $USAGE -gt 80 ]; then
        echo "$(date): ⚠️ Disco com ${USAGE}% de uso" >> $LOG_FILE
    fi
}

check_memory() {
    USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ $USAGE -gt 90 ]; then
        echo "$(date): ⚠️ Memória com ${USAGE}% de uso" >> $LOG_FILE
    fi
}

check_service
check_disk
check_memory
EOF

chmod +x /opt/saae-whatsapp-bot/monitor.sh

# Adicionar monitoramento ao cron
(crontab -l 2>/dev/null; echo "*/5 * * * * /opt/saae-whatsapp-bot/monitor.sh") | crontab -

echo ""
echo "✅ Configuração da VM concluída!"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Configure o arquivo .env:"
echo "   cd /opt/saae-whatsapp-bot"
echo "   cp env.example .env"
echo "   nano .env"
echo ""
echo "2. Configure seu domínio:"
echo "   nano /etc/nginx/sites-available/saae-bot"
echo "   # Substitua '_' pelo seu domínio"
echo ""
echo "3. Obtenha certificado SSL:"
echo "   certbot --nginx -d SEU_DOMINIO.com"
echo ""
echo "4. Inicie a aplicação:"
echo "   cd /opt/saae-whatsapp-bot"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo "   pm2 startup"
echo ""
echo "5. Configure webhook no Meta Business Manager:"
echo "   URL: https://SEU_DOMINIO.com/webhook"
echo ""
echo "🎉 Sistema pronto para produção!"
