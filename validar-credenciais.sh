#!/bin/bash

# 🔍 Script para Validar Credenciais do Meta
# SAAE WhatsApp Bot

echo "🔍 Validador de Credenciais Meta Business API"
echo "=============================================="
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar se .env existe
if [ ! -f ".env" ]; then
    echo -e "${RED}❌ Arquivo .env não encontrado!${NC}"
    echo ""
    echo "Passos:"
    echo "  1. cp production.env .env"
    echo "  2. nano .env"
    echo "  3. Cole suas credenciais"
    echo ""
    exit 1
fi

echo "✅ Arquivo .env encontrado!"
echo ""

# Função para validar variável
validate_var() {
    local var_name=$1
    local min_length=$2
    local prefix=$3
    
    local value=$(grep "^${var_name}=" .env | cut -d'=' -f2-)
    
    if [ -z "$value" ] || [ "$value" = "SEU_ACCESS_TOKEN_AQUI" ] || [ "$value" = "123456789012345" ] || [ "$value" = "987654321098765" ] || [ "$value" = "seu_token_verificacao_seguro" ]; then
        echo -e "${RED}❌ $var_name não configurado${NC}"
        return 1
    fi
    
    local length=${#value}
    if [ $length -lt $min_length ]; then
        echo -e "${YELLOW}⚠️  $var_name muito curto (${length} caracteres, mínimo $min_length)${NC}"
        return 1
    fi
    
    if [ ! -z "$prefix" ] && [[ ! "$value" =~ ^${prefix} ]]; then
        echo -e "${YELLOW}⚠️  $var_name não começa com '$prefix'${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ $var_name OK (${length} caracteres)${NC}"
    return 0
}

# Validar cada credencial
echo "🔑 Validando credenciais:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

errors=0

# 1. Phone Number ID
validate_var "WHATSAPP_PHONE_NUMBER_ID" 10 ""
if [ $? -ne 0 ]; then ((errors++)); fi

# 2. Access Token
validate_var "WHATSAPP_ACCESS_TOKEN" 100 "EAA"
if [ $? -ne 0 ]; then ((errors++)); fi

# 3. Business Account ID
validate_var "WHATSAPP_BUSINESS_ACCOUNT_ID" 10 ""
if [ $? -ne 0 ]; then ((errors++)); fi

# 4. Verify Token
validate_var "WHATSAPP_WEBHOOK_VERIFY_TOKEN" 10 ""
if [ $? -ne 0 ]; then ((errors++)); fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Resultado final
if [ $errors -eq 0 ]; then
    echo -e "${GREEN}🎉 Todas as credenciais estão OK!${NC}"
    echo ""
    echo "Próximos passos:"
    echo "  1. npm start          # Iniciar servidor"
    echo "  2. ngrok http 3000    # Expor publicamente"
    echo "  3. Configurar webhook no Meta"
    echo ""
else
    echo -e "${RED}❌ Encontrados $errors problemas nas credenciais${NC}"
    echo ""
    echo "Correções necessárias:"
    echo "  1. nano .env"
    echo "  2. Corrija as credenciais marcadas acima"
    echo "  3. Execute novamente: ./validar-credenciais.sh"
    echo ""
    echo "Consulte:"
    echo "  📍 ONDE_ENCONTRAR_CREDENCIAIS.md"
    echo ""
    exit 1
fi

# Validações adicionais
echo "🔍 Validações adicionais:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar porta
port=$(grep "^PORT=" .env | cut -d'=' -f2)
if [ -z "$port" ]; then
    echo -e "${YELLOW}⚠️  PORT não definida, usando padrão 3000${NC}"
else
    echo -e "${GREEN}✅ PORT: $port${NC}"
fi

# Verificar ambiente
env=$(grep "^NODE_ENV=" .env | cut -d'=' -f2)
if [ -z "$env" ]; then
    echo -e "${YELLOW}⚠️  NODE_ENV não definida${NC}"
else
    echo -e "${GREEN}✅ NODE_ENV: $env${NC}"
fi

# Verificar banco de dados
db=$(grep "^DB_PATH=" .env | cut -d'=' -f2)
if [ -z "$db" ]; then
    echo -e "${YELLOW}⚠️  DB_PATH não definida${NC}"
else
    echo -e "${GREEN}✅ DB_PATH: $db${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Testar Node.js
echo "🔧 Verificando ambiente:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não instalado${NC}"
    ((errors++))
else
    node_version=$(node --version)
    echo -e "${GREEN}✅ Node.js: $node_version${NC}"
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm não instalado${NC}"
    ((errors++))
else
    npm_version=$(npm --version)
    echo -e "${GREEN}✅ npm: $npm_version${NC}"
fi

# Verificar node_modules
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Dependências não instaladas${NC}"
    echo "   Execute: npm install"
else
    echo -e "${GREEN}✅ node_modules instalados${NC}"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Resultado final
if [ $errors -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✨ Sistema pronto para iniciar! ✨${NC}"
    echo ""
    echo "Execute:"
    echo "  npm start"
    echo ""
else
    echo ""
    echo -e "${RED}⚠️  Corrija os problemas acima antes de iniciar${NC}"
    echo ""
    exit 1
fi
