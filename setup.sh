#!/bin/bash

# 🏑 Hockey Club Management - Quick Start Script
# Automatiza a instalação e setup inicial do projeto

set -e

echo "🏑 Hockey Club Management - Quick Start"
echo "========================================"
echo ""

# Check Node.js version
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js >= 18.0.0"
    echo "   https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js versão 18+ necessária. Versão atual: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"
echo ""

# Check pnpm
echo "📦 Verificando pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm não encontrado. Instalando..."
    npm install -g pnpm
fi

echo "✅ pnpm $(pnpm -v) detectado"
echo ""

# Install dependencies
echo "📦 Instalando dependências..."
pnpm install

echo ""
echo "✅ Instalação concluída!"
echo ""

# Instructions
echo "🚀 Próximos passos:"
echo ""
echo "1. Rodar o projeto:"
echo "   pnpm dev             # Frontend + Backend juntos"
echo "   pnpm dev:web         # Apenas frontend (porta 3000)"
echo "   pnpm dev:api         # Apenas backend (porta 4000)"
echo ""
echo "2. Acessar aplicação:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:4000/api"
echo "   Swagger Docs: http://localhost:4000/api/docs"
echo ""
echo "3. Contas de teste:"
echo "   Admin: admin@hockeyclub.com (senha: qualquer 6+ chars)"
echo "   Atleta: athlete@hockeyclub.com (senha: qualquer 6+ chars)"
echo ""
echo "📚 Documentação:"
echo "   README.md           - Visão geral"
echo "   DEVELOPMENT.md      - Guia completo de desenvolvimento"
echo "   PHASE1-COMPLETE.md  - Status da Fase 1"
echo ""
echo "✨ Projeto pronto para desenvolvimento!"
