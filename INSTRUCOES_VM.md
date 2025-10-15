# 🖥️ Deploy na sua VM Proxmox - Instruções Práticas

## 🎯 Processo Simplificado para sua VM

Como você já tem uma VM rodando no Proxmox, vamos fazer o deploy de forma rápida e eficiente.

## 📋 Pré-requisitos da VM

### **Verificar se sua VM tem:**
- ✅ **IP público** ou **porta forwarding** configurada
- ✅ **SSH ativo** e acessível
- ✅ **Acesso root** ou sudo
- ✅ **Conexão com internet**

### **Especificações recomendadas:**
- **RAM:** 2GB+ (4GB ideal)
- **CPU:** 2 vCPUs
- **Disco:** 10GB+ livres
- **Portas:** 22 (SSH), 80, 443

## 🚀 Deploy Automático

### **Opção 1: Script Automático (Recomendado)**

1. **Execute o script de deploy:**
```bash
# Do seu computador local
./deploy-to-vm.sh
```

2. **Digite o IP da sua VM quando solicitado**

3. **O script fará tudo automaticamente:**
   - ✅ Upload dos arquivos
   - ✅ Instalação do Node.js
   - ✅ Instalação das dependências
   - ✅ Configuração básica

### **Opção 2: Manual**

Se preferir fazer manualmente:

1. **Upload dos arquivos:**
```bash
# Via SCP
scp -r ./* root@SEU_IP_VM:/opt/saae-whatsapp-bot/

# Ou via SFTP
sftp root@SEU_IP_VM
put -r ./* /opt/saae-whatsapp-bot/
```

2. **Conectar na VM:**
```bash
ssh root@SEU_IP_VM
cd /opt/saae-whatsapp-bot
```

3. **Executar setup:**
```bash
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Instalar dependências
npm install --production

# Configurar VM
./vm-setup.sh
```

## ⚙️ Configuração Essencial

### **1. Configurar .env**
```bash
cd /opt/saae-whatsapp-bot
cp env.example .env
nano .env
```

**Edite com suas informações:**
```env
# WhatsApp Business API (obtenha no Meta for Developers)
WHATSAPP_ACCESS_TOKEN=seu_token_aqui
WHATSAPP_PHONE_NUMBER_ID=seu_phone_id_aqui
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_verificacao
WHATSAPP_BUSINESS_ACCOUNT_ID=seu_business_account_id

# URLs (use o IP da VM ou domínio)
WEBHOOK_URL=https://SEU_IP_VM:3000
ADMIN_PANEL_URL=https://SEU_IP_VM:3000/admin

# SAAE
SAAE_NAME=SAAE de Palmital
SAAE_PHONE=+5518999999999
SAAE_EMAIL=contato@saae-palmital.com.br
```

### **2. Configurar Domínio (Opcional)**

Se você tem um domínio:

1. **Aponte o DNS para sua VM:**
```
A    @           SEU_IP_VM
A    www         SEU_IP_VM
```

2. **Configure Nginx:**
```bash
nano /etc/nginx/sites-available/saae-bot
# Substitua '_' pelo seu domínio
```

3. **Obter SSL:**
```bash
certbot --nginx -d SEU_DOMINIO.com
```

### **3. Sem Domínio (IP Direto)**

Se não tem domínio, use o IP da VM:

1. **Configurar Nginx para IP:**
```bash
nano /etc/nginx/sites-available/saae-bot
```

**Conteúdo:**
```nginx
server {
    listen 80;
    server_name SEU_IP_VM;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

2. **Reiniciar Nginx:**
```bash
systemctl restart nginx
```

## 🚀 Iniciar Sistema

### **1. Iniciar com PM2:**
```bash
cd /opt/saae-whatsapp-bot
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### **2. Verificar Status:**
```bash
pm2 status
pm2 logs saae-whatsapp-bot
```

### **3. Testar Sistema:**
```bash
# Status da API
curl http://SEU_IP_VM:3000/api/status

# Webhook
curl "http://SEU_IP_VM:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=seu_token"
```

## 📱 Configurar WhatsApp

### **1. No Meta Business Manager:**
1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Sua App → WhatsApp → Configuration
3. Configure Webhook:
   - **URL:** `http://SEU_IP_VM:3000/webhook` (ou https se tiver SSL)
   - **Token:** Mesmo valor do `WHATSAPP_WEBHOOK_VERIFY_TOKEN`

### **2. Testar Webhook:**
```bash
curl "http://SEU_IP_VM:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"
# Deve retornar: test
```

## 🔧 Comandos Úteis

### **Gerenciar Aplicação:**
```bash
# Ver status
pm2 status

# Ver logs
pm2 logs saae-whatsapp-bot

# Reiniciar
pm2 restart saae-whatsapp-bot

# Parar
pm2 stop saae-whatsapp-bot

# Monitorar recursos
pm2 monit
```

### **Backup:**
```bash
# Backup manual
/opt/saae-whatsapp-bot/backup.sh

# Verificar backups
ls -la /opt/backups/
```

### **Logs:**
```bash
# Logs da aplicação
tail -f /opt/saae-whatsapp-bot/logs/combined.log

# Logs do sistema
journalctl -u nginx -f
```

## 🌐 URLs de Acesso

Após configuração:

- **👨‍💼 Admin Panel:** `http://SEU_IP_VM:3000/admin`
- **📊 API Status:** `http://SEU_IP_VM:3000/api/status`
- **📱 Webhook:** `http://SEU_IP_VM:3000/webhook`

**Com domínio e SSL:**
- **👨‍💼 Admin Panel:** `https://SEU_DOMINIO.com/admin`
- **📊 API Status:** `https://SEU_DOMINIO.com/api/status`
- **📱 Webhook:** `https://SEU_DOMINIO.com/webhook`

## 🆘 Troubleshooting

### **Problemas Comuns:**

#### **1. Não consegue conectar na VM:**
```bash
# Verificar se VM está rodando
ping SEU_IP_VM

# Verificar SSH
ssh -v root@SEU_IP_VM
```

#### **2. Aplicação não inicia:**
```bash
# Verificar logs
pm2 logs saae-whatsapp-bot

# Verificar arquivo .env
cat /opt/saae-whatsapp-bot/.env

# Testar manualmente
cd /opt/saae-whatsapp-bot
node server.js
```

#### **3. Nginx não funciona:**
```bash
# Verificar status
systemctl status nginx

# Testar configuração
nginx -t

# Ver logs
tail -f /var/log/nginx/error.log
```

#### **4. WhatsApp não conecta:**
```bash
# Verificar conectividade
curl -I https://graph.facebook.com

# Verificar webhook
curl "http://SEU_IP_VM:3000/webhook?hub.mode=subscribe&hub.challenge=test&hub.verify_token=SEU_TOKEN"
```

## 📊 Monitoramento

### **Status do Sistema:**
```bash
# Recursos
htop
df -h
free -h

# Aplicação
pm2 status
pm2 monit

# Logs
tail -f /opt/saae-whatsapp-bot/logs/combined.log
```

### **Backup Automático:**
- ✅ Configurado para rodar diariamente às 2h
- ✅ Mantém últimos 7 backups
- ✅ Localização: `/opt/backups/`

## 🎯 Checklist Final

- [ ] VM acessível via SSH
- [ ] Arquivos enviados para VM
- [ ] Node.js instalado (v18+)
- [ ] Dependências instaladas
- [ ] Arquivo .env configurado
- [ ] Nginx configurado
- [ ] Aplicação rodando com PM2
- [ ] Webhook configurado no Meta
- [ ] Teste de conectividade OK
- [ ] Backup automático ativo

## 🎉 Sistema Pronto!

Após seguir estas instruções, seu SAAE WhatsApp Bot estará rodando em produção na sua VM Proxmox!

**URLs de acesso:**
- **Admin:** `http://SEU_IP_VM:3000/admin`
- **Status:** `http://SEU_IP_VM:3000/api/status`
- **Webhook:** `http://SEU_IP_VM:3000/webhook`

---

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs: `pm2 logs saae-whatsapp-bot`
2. Consulte DEPLOY_PROXMOX.md para detalhes
3. Teste cada componente individualmente

**Seu chatbot WhatsApp está pronto para atender os cidadãos de Palmital! 🏛️🤖**
