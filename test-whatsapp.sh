#!/bin/bash

# 🚀 Script para Testar WhatsApp Real
# SAAE WhatsApp Bot

echo "🤖 SAAE WhatsApp Bot - Teste com WhatsApp Real"
echo "=============================================="

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se .env existe
if [ ! -f ".env" ]; then
    print_error "Arquivo .env não encontrado!"
    print_status "Copie production.env para .env e configure suas credenciais:"
    echo "   cp production.env .env"
    echo "   nano .env"
    exit 1
fi

# Verificar se ngrok está instalado
if ! command -v ngrok &> /dev/null; then
    print_warning "ngrok não está instalado!"
    print_status "Instale o ngrok:"
    echo "   brew install ngrok"
    echo "   # Ou baixe de: https://ngrok.com/download"
    exit 1
fi

# Parar processos existentes
print_status "Parando processos existentes..."
pkill -f "node.*demo.js" 2>/dev/null
pkill -f "ngrok" 2>/dev/null
sleep 2

# Verificar se porta 3000 está livre
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    print_warning "Porta 3000 está ocupada!"
    print_status "Liberando porta 3000..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null
    sleep 2
fi

# Iniciar servidor em modo produção
print_status "Iniciando servidor em modo produção..."
npm start &
SERVER_PID=$!
sleep 5

# Verificar se servidor iniciou
if ! curl -s http://localhost:3000/api/status > /dev/null; then
    print_error "Servidor não iniciou corretamente!"
    print_status "Verifique as credenciais no .env"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

print_success "Servidor iniciado com sucesso!"

# Iniciar ngrok
print_status "Iniciando ngrok..."
ngrok http 3000 &
NGROK_PID=$!
sleep 5

# Obter URL do ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

if [ "$NGROK_URL" = "null" ] || [ -z "$NGROK_URL" ]; then
    print_error "Não foi possível obter URL do ngrok!"
    kill $SERVER_PID $NGROK_PID 2>/dev/null
    exit 1
fi

print_success "ngrok iniciado: $NGROK_URL"

# Configurar webhook URL
WEBHOOK_URL="${NGROK_URL}/webhook"
print_status "URL do Webhook: $WEBHOOK_URL"

# Testar webhook
print_status "Testando webhook..."
VERIFY_TOKEN=$(grep WHATSAPP_WEBHOOK_VERIFY_TOKEN .env | cut -d'=' -f2)

if curl -s "${WEBHOOK_URL}?hub.mode=subscribe&hub.challenge=test&hub.verify_token=${VERIFY_TOKEN}" | grep -q "test"; then
    print_success "Webhook funcionando!"
else
    print_error "Webhook não está funcionando!"
    print_status "Verifique:"
    echo "   1. WHATSAPP_WEBHOOK_VERIFY_TOKEN no .env"
    echo "   2. Webhook configurado no Meta Business Manager"
fi

# Mostrar informações
echo ""
echo "🎯 CONFIGURAÇÃO NO META BUSINESS MANAGER:"
echo "=========================================="
echo "📱 Callback URL: $WEBHOOK_URL"
echo "🔑 Verify Token: $VERIFY_TOKEN"
echo ""
echo "📋 Webhook Fields (marcar):"
echo "   ✅ messages"
echo "   ✅ message_status"
echo ""
echo "🧪 TESTAR SISTEMA:"
echo "=================="
echo "1. Configure o webhook no Meta Business Manager"
echo "2. Envie mensagem para seu número WhatsApp"
echo "3. Bot deve responder automaticamente"
echo ""
echo "📊 MONITORAR:"
echo "============="
echo "• Dashboard: http://localhost:3000/dashboard"
echo "• Logs: tail -f logs/combined.log"
echo "• ngrok: http://localhost:4040"
echo ""
echo "🛑 PARAR SISTEMA:"
echo "================="
echo "Pressione Ctrl+C para parar"

# Função para limpeza ao sair
cleanup() {
    echo ""
    print_status "Parando sistema..."
    kill $SERVER_PID $NGROK_PID 2>/dev/null
    print_success "Sistema parado!"
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT SIGTERM

# Manter script rodando
print_status "Sistema rodando... Pressione Ctrl+C para parar"
while true; do
    sleep 1
done
