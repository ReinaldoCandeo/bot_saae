#!/bin/bash

clear

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🤖 BOT WHATSAPP - VERSÃO QR CODE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ Vantagens desta versão:"
echo "   ✅ Não precisa do Meta Business"
echo "   ✅ Não precisa adicionar recipients"
echo "   ✅ Funciona em qualquer país"
echo "   ✅ Só escanear QR Code e usar!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
read -p "Pressione Enter para iniciar..."

clear

cd /Users/reinaldocandeo/Desktop/Postman

# Parar servidor anterior se estiver rodando
lsof -ti:3000 | xargs kill -9 2>/dev/null
ps aux | grep "bot-qrcode.js" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null

echo ""
echo "🚀 Iniciando bot..."
echo ""

# Iniciar bot
node bot-qrcode.js

