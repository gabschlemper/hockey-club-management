# 🏑 Hockey Club Management - Início Rápido

## ⚡ Setup Rápido (3 minutos)

### Opção 1: Script Automático (Linux/Mac)

```bash
cd /tmp/hockey-club-management
chmod +x setup.sh
./setup.sh
```

### Opção 2: Manual

```bash
# 1. Verificar requisitos
node --version  # >= 18.0.0
pnpm --version  # >= 8.0.0

# 2. Instalar pnpm (se necessário)
npm install -g pnpm

# 3. Instalar dependências
cd /tmp/hockey-club-management
pnpm install

# 4. Rodar projeto
pnpm dev
```

---

## 🎯 Acesso Rápido

### URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000/api
- **Swagger**: http://localhost:4000/api/docs

### Contas de Teste

| Tipo | Email | Senha | Acesso |
|------|-------|-------|--------|
| **Admin** | admin@hockeyclub.com | 6+ chars | Dashboard completo |
| **Atleta** | athlete@hockeyclub.com | 6+ chars | Dashboard limitado |

---

## 📚 Documentação

- **README.md** - Visão geral do projeto
- **DEVELOPMENT.md** - Guia completo de desenvolvimento
- **PHASE1-COMPLETE.md** - Status e checklist da Fase 1

---

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
pnpm dev              # Rodar tudo
pnpm dev:web          # Apenas frontend
pnpm dev:api          # Apenas backend

# Build
pnpm build            # Build de tudo
pnpm build:web        # Build frontend
pnpm build:api        # Build backend

# Qualidade
pnpm lint             # Linter
pnpm type-check       # TypeScript check

# Limpeza
pnpm clean            # Limpar builds e node_modules
```

---

## 🎨 shadcn-vue Components

Instalar componentes sob demanda:

```bash
cd apps/web
npx shadcn-vue@latest add button
npx shadcn-vue@latest add card
npx shadcn-vue@latest add form
npx shadcn-vue@latest add input
npx shadcn-vue@latest add table
npx shadcn-vue@latest add dialog
```

---

## 🚀 Próximos Passos

1. ✅ Explorar dashboards Admin e Athlete
2. ✅ Testar autenticação e proteção de rotas
3. ✅ Revisar código e arquitetura
4. ⏳ Planejar Fase 2 (features completas)
5. ⏳ Integrar Supabase real
6. ⏳ Implementar gestão de eventos, presenças, financeiro

---

## 💡 Dicas

- Use o Swagger para explorar API endpoints
- Verifique console do browser para logs úteis
- Design tokens estão em `apps/web/src/lib/design-tokens.ts`
- Tipos compartilhados em `packages/types/src/`
- Stores seguem padrão feature-based

---

**Desenvolvido com 🏑 | Fase 1 - MVP Completo ✅**
