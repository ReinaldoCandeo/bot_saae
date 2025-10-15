#!/bin/bash

# Script para testar o bot facilmente
# Criado para facilitar os testes

echo "🤖 =================================="
echo "   TESTE DO BOT DE TRIAGEM"
echo "=================================="
echo ""
echo "Escolha o que fazer:"
echo ""
echo "1) Enviar 'menu' e ver menu principal"
echo "2) Clicar em 'Agendamento'"
echo "3) Clicar em 'Consulta de Conta'"
echo "4) Enviar mensagem personalizada"
echo "5) Ver últimas conversas no banco"
echo "6) Ver logs do servidor"
echo "7) Verificar se servidor está rodando"
echo "0) Sair"
echo ""
read -p "Digite sua opção: " opcao

case $opcao in
  1)
    echo ""
    echo "📤 Enviando 'menu'..."
    curl -s -X POST http://localhost:3000/webhook \
      -H "Content-Type: application/json" \
      -d '{
        "object": "whatsapp_business_account",
        "entry": [{
          "changes": [{
            "field": "messages",
            "value": {
              "messages": [{
                "from": "5518999999999",
                "type": "text",
                "id": "msg_'$(date +%s)'",
                "timestamp": "'$(date +%s)'",
                "text": {"body": "menu"}
              }]
            }
          }]
        }]
      }' > /dev/null
    echo "✅ Mensagem enviada!"
    echo ""
    echo "📝 Resposta do bot (últimas linhas do log):"
    tail -15 server_output.log | grep -A 5 "DEMO:"
    ;;
    
  2)
    echo ""
    echo "📤 Clicando no botão 'Agendamento'..."
    curl -s -X POST http://localhost:3000/webhook \
      -H "Content-Type: application/json" \
      -d '{
        "object": "whatsapp_business_account",
        "entry": [{
          "changes": [{
            "field": "messages",
            "value": {
              "messages": [{
                "from": "5518999999999",
                "type": "interactive",
                "id": "msg_'$(date +%s)'",
                "timestamp": "'$(date +%s)'",
                "interactive": {
                  "type": "button_reply",
                  "button_reply": {
                    "id": "btn_3",
                    "title": "📅 Agendamento"
                  }
                }
              }]
            }
          }]
        }]
      }' > /dev/null
    echo "✅ Botão clicado!"
    echo ""
    echo "📝 Resposta do bot:"
    tail -15 server_output.log | grep -A 5 "DEMO:"
    ;;
    
  3)
    echo ""
    echo "📤 Clicando no botão 'Consulta de Conta'..."
    curl -s -X POST http://localhost:3000/webhook \
      -H "Content-Type: application/json" \
      -d '{
        "object": "whatsapp_business_account",
        "entry": [{
          "changes": [{
            "field": "messages",
            "value": {
              "messages": [{
                "from": "5518999999999",
                "type": "interactive",
                "id": "msg_'$(date +%s)'",
                "timestamp": "'$(date +%s)'",
                "interactive": {
                  "type": "button_reply",
                  "button_reply": {
                    "id": "btn_1",
                    "title": "📋 Consulta de Conta"
                  }
                }
              }]
            }
          }]
        }]
      }' > /dev/null
    echo "✅ Botão clicado!"
    echo ""
    echo "📝 Resposta do bot:"
    tail -10 server_output.log | grep "DEMO:" -A 3
    ;;
    
  4)
    echo ""
    read -p "Digite sua mensagem: " mensagem
    echo ""
    echo "📤 Enviando '$mensagem'..."
    curl -s -X POST http://localhost:3000/webhook \
      -H "Content-Type: application/json" \
      -d '{
        "object": "whatsapp_business_account",
        "entry": [{
          "changes": [{
            "field": "messages",
            "value": {
              "messages": [{
                "from": "5518999999999",
                "type": "text",
                "id": "msg_'$(date +%s)'",
                "timestamp": "'$(date +%s)'",
                "text": {"body": "'"$mensagem"'"}
              }]
            }
          }]
        }]
      }' > /dev/null
    echo "✅ Mensagem enviada!"
    echo ""
    echo "📝 Resposta do bot:"
    tail -15 server_output.log | grep "DEMO:" -A 5
    ;;
    
  5)
    echo ""
    echo "📊 Últimas 5 conversas:"
    sqlite3 database/saae_bot_demo.db "SELECT datetime(timestamp, 'localtime') as data, type, message_type, SUBSTR(content, 1, 50) as conteudo FROM conversations ORDER BY timestamp DESC LIMIT 5;" -header -column
    ;;
    
  6)
    echo ""
    echo "📝 Últimas 30 linhas do log:"
    echo "=================================="
    tail -30 server_output.log
    ;;
    
  7)
    echo ""
    echo "🔍 Verificando servidor..."
    if curl -s http://localhost:3000/health > /dev/null; then
      echo "✅ Servidor está RODANDO!"
      echo ""
      curl -s http://localhost:3000/health | jq '.'
    else
      echo "❌ Servidor NÃO está rodando!"
      echo "Execute: npm start"
    fi
    ;;
    
  0)
    echo "👋 Até logo!"
    exit 0
    ;;
    
  *)
    echo "❌ Opção inválida!"
    ;;
esac

echo ""
echo "=================================="
echo "Pressione Enter para voltar ao menu ou Ctrl+C para sair"
read
./testar-bot-agora.sh

