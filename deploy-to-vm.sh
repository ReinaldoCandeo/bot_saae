#!/bin/bash

# Script para Deploy do SAAE WhatsApp Bot na VM Proxmox
# Execute este script do seu computador local

echo "🚀 Deploy do SAAE WhatsApp Bot para VM Proxmox"
echo "================================================"

# Verificar se rsync está instalado
if ! command -v rsync &> /dev/null; then
    echo "❌ rsync não encontrado. Instalando..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install rsync
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install -y rsync
    fi
fi

# Configurações (edite conforme necessário)
VM_IP=""
VM_USER="root"
VM_PATH="/opt/saae-whatsapp-bot"
LOCAL_PATH="."

# Solicitar IP da VM se não configurado
if [ -z "$VM_IP" ]; then
    echo "📝 Digite o IP da sua VM Proxmox:"
    read VM_IP
fi

# Verificar conectividade
echo "🔍 Testando conectividade com $VM_IP..."
if ! ping -c 1 $VM_IP &> /dev/null; then
    echo "❌ Não foi possível conectar com $VM_IP"
    echo "   Verifique se a VM está rodando e acessível"
    exit 1
fi

echo "✅ Conectividade OK"

# Criar diretório na VM se não existir
echo "📁 Criando diretório na VM..."
ssh $VM_USER@$VM_IP "mkdir -p $VM_PATH"

# Sincronizar arquivos
echo "📤 Enviando arquivos para a VM..."
rsync -avz --progress \
    --exclude 'node_modules/' \
    --exclude '.git/' \
    --exclude 'database/' \
    --exclude 'logs/' \
    --exclude '.env' \
    --exclude '*.log' \
    $LOCAL_PATH/ $VM_USER@$VM_IP:$VM_PATH/

echo "✅ Arquivos enviados com sucesso!"

# Executar comandos de setup na VM
echo "🔧 Configurando ambiente na VM..."

ssh $VM_USER@$VM_IP << EOF
    cd $VM_PATH
    
    # Instalar Node.js se não estiver instalado
    if ! command -v node &> /dev/null; then
        echo "📦 Instalando Node.js..."
        curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
        apt-get install -y nodejs
    fi
    
    # Instalar dependências
    echo "📦 Instalando dependências..."
    npm install --production
    
    # Criar diretórios necessários
    mkdir -p database logs backups
    
    # Configurar permissões
    chmod +x start.js demo.js
    
    # Instalar PM2 se não estiver instalado
    if ! command -v pm2 &> /dev/null; then
        echo "📦 Instalando PM2..."
        npm install -g pm2
    fi
    
    echo "✅ Configuração concluída!"
EOF

echo ""
echo "🎉 Deploy concluído com sucesso!"
echo ""
echo "📋 Próximos passos na VM:"
echo "1. Configure o arquivo .env com suas credenciais:"
echo "   ssh $VM_USER@$VM_IP"
echo "   cd $VM_PATH"
echo "   cp env.example .env"
echo "   nano .env"
echo ""
echo "2. Configure o Nginx (se necessário):"
echo "   sudo nano /etc/nginx/sites-available/saae-bot"
echo ""
echo "3. Configure SSL com Let's Encrypt:"
echo "   sudo certbot --nginx -d SEU_DOMINIO.com"
echo ""
echo "4. Inicie a aplicação:"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 save"
echo ""
echo "5. Configure o webhook no Meta Business Manager:"
echo "   URL: https://SEU_DOMINIO.com/webhook"
echo ""
echo "📖 Para mais detalhes, consulte: DEPLOY_PROXMOX.md"
