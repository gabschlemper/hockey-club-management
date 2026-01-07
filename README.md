# 🏑 Hockey Club Management System

Sistema moderno de gestão para clubes de hóquei sobre grama.

## 🏗️ Arquitetura

Monorepo organizado seguindo **Clean Architecture** e **SOLID principles**.

```
hockey-club-management/
├── apps/
│   ├── web/          # Frontend Vue 3 + Vite
│   └── api/          # Backend NestJS
└── packages/
    ├── types/        # Tipos TypeScript compartilhados
    └── config/       # Configurações compartilhadas
```

## 🚀 Stack Tecnológica

### Frontend
- **Vue 3** (Composition API)
- **TypeScript** (strict mode)
- **Vite** (build tool)
- **Pinia** (state management)
- **Vue Router** (routing)
- **shadcn-vue** (UI components)
- **Tailwind CSS** (styling)

### Backend
- **NestJS** (framework)
- **TypeScript** (strict mode)
- **Supabase** (PostgreSQL + Auth + Storage)

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 🛠️ Instalação

```bash
# Instalar pnpm globalmente (se necessário)
npm install -g pnpm

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env
```

## 🏃 Desenvolvimento

```bash
# Rodar todos os serviços em paralelo
pnpm dev

# Rodar apenas o frontend
pnpm dev:web

# Rodar apenas o backend
pnpm dev:api
```

## 🏗️ Build

```bash
# Build de todos os projetos
pnpm build

# Build individual
pnpm build:web
pnpm build:api
```

## 👥 Roles do Sistema

### Admin
- Gerenciamento completo do clube
- Criação e edição de eventos
- Controle de presenças
- Gestão financeira

### Athlete
- Visualização do próprio perfil
- Calendário de eventos
- Histórico de presenças
- Consulta de dívidas

## 🎨 Design System

O sistema utiliza uma paleta baseada em:
- 🟧 **Laranja** (cor primária)
- ⬛ **Preto** (texto e elementos escuros)
- ⬜ **Branco** (backgrounds e espaços)

Todos os valores de design são gerenciados através de **design tokens** centralizados.

## 📦 Fase 1 (Atual)

- ✅ Autenticação e autorização
- ✅ Dashboards por role
- ✅ Estrutura base escalável

## 🔮 Fase 2 (Futuro)

- ⏳ Gestão de eventos
- ⏳ Controle de presenças
- ⏳ Sistema financeiro
- ⏳ Upload de planilhas Excel

## 📝 Convenções de Código

- **Clean Code**: Código limpo e auto-explicativo
- **SOLID**: Princípios de design orientado a objetos
- **Outside-In**: Desenvolvimento começando pela UI
- **Feature-based**: Organização por funcionalidade, não por tipo de arquivo
- **Type-safe**: TypeScript strict mode em todo o projeto

## 📄 Licença

MIT
