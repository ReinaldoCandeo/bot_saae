# 🖥️ Deploy na VM Proxmox - SAAE WhatsApp Bot

## 📋 Pré-requisitos da VM

### **Sistema Operacional Recomendado**
- ✅ **Ubuntu Server 22.04 LTS** (recomendado)
- ✅ **Debian 11/12**
- ✅ **CentOS 8/9**

### **Especificações Mínimas**
- **CPU:** 2 vCPUs
- **RAM:** 4GB
- **Disco:** 20GB SSD
- **Rede:** IP público com acesso à internet
- **Portas:** 80, 443, 3000 (para teste)

## 🔧 Configuração da VM

### **1. Acesso via SSH**
```bash
# Conectar na VM
ssh root@SEU_IP_VM

# Ou se tiver usuário específico
ssh usuario@SEU_IP_VM
```

### **2. Atualizar Sistema**
```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
# ou
sudo dnf update -y
```

### **3. Instalar Node.js 18+**
```bash
# Ubuntu/Debian - Usando NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verificar instalação
node --version  # deve ser v18+
npm --version
```

### **4. Instalar Dependências do Sistema**
```bash
# Ubuntu/Debian
sudo apt install -y git nginx certbot python3-certbot-nginx ufw

# CentOS/RHEL
sudo yum install -y git nginx certbot python3-certbot-nginx firewalld
```

## 📁 Deploy do Projeto

### **1. Clonar/Upload do Projeto**
```bash
# Opção A: Via Git (se disponível)
git clone https://github.com/seu-usuario/saae-whatsapp-bot.git
cd saae-whatsapp-bot

# Opção B: Upload via SCP/SFTP
# scp -r /caminho/local/saae-whatsapp-bot/ root@SEU_IP_VM:/opt/
# cd /opt/saae-whatsapp-bot
```

### **2. Instalar Dependências**
```bash
npm install --production
```

### **3. Configurar Variáveis de Ambiente**
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar configurações
nano .env
```

**Configuração do .env para produção:**
```env
# Configurações do WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=seu_token_real_aqui
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id_real
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_verify_token_seguro
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_business_account_id

# Configurações do Servidor
PORT=3000
NODE_ENV=production
HOST=0.0.0.0

# Configurações do Banco de Dados
DB_PATH=/opt/saae-whatsapp-bot/database/saae_bot.db

# URLs (substitua pelo IP/domínio da sua VM)
WEBHOOK_URL=https://SEU_DOMINIO.com
ADMIN_PANEL_URL=https://SEU_DOMINIO.com/admin

# Configurações do SAAE
SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
SAAE_ADDRESS=Rua Principal, 123 - Centro - Palmital/SP

# Configurações de Horário
BUSINESS_HOURS_START=08:00
BUSINESS_HOURS_END=17:00
BUSINESS_DAYS=1,2,3,4,5

# Segurança
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🔒 Configurar SSL com Let's Encrypt

### **1. Configurar Nginx**
```bash
# Criar configuração do Nginx
sudo nano /etc/nginx/sites-available/saae-bot
```

**Conteúdo do arquivo:**
```nginx
server {
    listen 80;
    server_name SEU_DOMINIO.com www.SEU_DOMINIO.com;

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
    }
}
```

### **2. Ativar Site**
```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/saae-bot /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### **3. Obter Certificado SSL**
```bash
# Obter certificado SSL
sudo certbot --nginx -d SEU_DOMINIO.com -d www.SEU_DOMINIO.com

# Testar renovação automática
sudo certbot renew --dry-run
```

## 🚀 Configurar PM2

### **1. Instalar PM2**
```bash
npm install -g pm2
```

### **2. Criar Arquivo de Configuração**
```bash
nano ecosystem.config.js
```

**Conteúdo:**
```javascript
module.exports = {
  apps: [{
    name: 'saae-whatsapp-bot',
    script: 'server.js',
    cwd: '/opt/saae-whatsapp-bot',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
```

### **3. Iniciar Aplicação**
```bash
# Iniciar com PM2
pm2 start ecosystem.config.js

# Configurar para iniciar automaticamente
pm2 startup
pm2 save

# Verificar status
pm2 status
pm2 logs saae-whatsapp-bot
```

## 🔥 Configurar Firewall

### **Ubuntu/Debian (UFW)**
```bash
# Configurar firewall
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Verificar status
sudo ufw status
```

### **CentOS/RHEL (Firewalld)**
```bash
# Configurar firewall
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Verificar status
sudo firewall-cmd --list-all
```

## 📱 Configurar WhatsApp Webhook

### **1. No Meta Business Manager**
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Vá na sua aplicação → WhatsApp → Configuration
3. Configure Webhook:
   - **Callback URL:** `https://SEU_DOMINIO.com/webhook`
   - **Verify Token:** Use o mesmo valor do `.env`
   - **Webhook Fields:** Marque `messages` e `message_status`

### **2. Testar Webhook**
```bash
# Teste de verificação
curl "https://SEU_DOMINIO.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"

# Deve retornar: test
```

## 🔧 Scripts de Manutenção

### **1. Backup Automático**
```bash
# Criar script de backup
nano /opt/saae-whatsapp-bot/backup.sh
```

**Conteúdo:**
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/opt/backups"
DB_PATH="/opt/saae-whatsapp-bot/database/saae_bot.db"

mkdir -p $BACKUP_DIR
cp $DB_PATH $BACKUP_DIR/saae_bot_$DATE.db

# Manter apenas últimos 7 backups
find $BACKUP_DIR -name "saae_bot_*.db" -mtime +7 -delete

echo "Backup criado: saae_bot_$DATE.db"
```

```bash
# Tornar executável
chmod +x /opt/saae-whatsapp-bot/backup.sh

# Agendar backup diário
crontab -e
# Adicionar linha:
0 2 * * * /opt/saae-whatsapp-bot/backup.sh
```

### **2. Monitoramento**
```bash
# Ver logs em tempo real
pm2 logs saae-whatsapp-bot --lines 100

# Monitorar recursos
pm2 monit

# Verificar status
pm2 status
```

## 🆘 Troubleshooting

### **Problemas Comuns**

#### **1. Aplicação não inicia**
```bash
# Verificar logs
pm2 logs saae-whatsapp-bot

# Verificar se porta está em uso
sudo netstat -tlnp | grep :3000

# Reiniciar aplicação
pm2 restart saae-whatsapp-bot
```

#### **2. Nginx não conecta**
```bash
# Verificar status do Nginx
sudo systemctl status nginx

# Verificar logs
sudo tail -f /var/log/nginx/error.log

# Testar configuração
sudo nginx -t
```

#### **3. SSL não funciona**
```bash
# Verificar certificado
sudo certbot certificates

# Renovar certificado
sudo certbot renew --force-renewal

# Verificar DNS
nslookup SEU_DOMINIO.com
```

#### **4. WhatsApp não conecta**
```bash
# Verificar conectividade
curl -I https://graph.facebook.com

# Testar webhook
curl "https://SEU_DOMINIO.com/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"

# Verificar logs da aplicação
pm2 logs saae-whatsapp-bot | grep webhook
```

## 📊 Monitoramento e Logs

### **1. Logs da Aplicação**
```bash
# Logs em tempo real
pm2 logs saae-whatsapp-bot

# Logs específicos
tail -f /opt/saae-whatsapp-bot/logs/combined.log
```

### **2. Logs do Sistema**
```bash
# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs do sistema
sudo journalctl -u nginx -f
```

### **3. Monitoramento de Recursos**
```bash
# Uso de CPU e memória
htop

# Uso de disco
df -h

# Uso de rede
iftop
```

## 🎯 URLs Finais

Após configuração completa:

- **🌐 Site Principal:** `https://SEU_DOMINIO.com`
- **👨‍💼 Admin Panel:** `https://SEU_DOMINIO.com/admin`
- **📱 Webhook:** `https://SEU_DOMINIO.com/webhook`
- **📊 API Status:** `https://SEU_DOMINIO.com/api/status`

## ✅ Checklist Final

- [ ] VM configurada com Node.js 18+
- [ ] Projeto deployado e dependências instaladas
- [ ] Variáveis de ambiente configuradas
- [ ] Nginx configurado como proxy reverso
- [ ] SSL configurado com Let's Encrypt
- [ ] PM2 configurado para gerenciamento de processos
- [ ] Firewall configurado
- [ ] Webhook configurado no Meta Business Manager
- [ ] Backup automático configurado
- [ ] Monitoramento configurado

---

## 🎉 Sistema Pronto!

Seu SAAE WhatsApp Bot estará rodando em produção na sua VM Proxmox com:
- ✅ SSL automático
- ✅ Backup automático
- ✅ Monitoramento completo
- ✅ Alta disponibilidade
- ✅ Segurança configurada

**Próximo passo:** Configure as credenciais reais do WhatsApp Business API no arquivo `.env` e teste o sistema!
