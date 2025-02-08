# Arquitetura e Padrões de Projeto

## Estrutura de Pastas

```
src/
├── actions/         # Actions para manipulação de dados
├── app/            # Componentes e páginas da aplicação (Next.js App Router)
│   ├── (auth)/     # Grupo de rotas autenticadas
│   │   ├── login/  # Página de login
│   │   └── register/ # Página de registro
│   └── (kanban)/   # Grupo de rotas do kanban
│       ├── board/  # Visualização do quadro Kanban
│       └── projects/ # Gerenciamento de projetos
├── assets/         # Recursos estáticos
├── components/     # Componentes reutilizáveis
│   ├── ui/        # Componentes de UI básicos
│   ├── kanban/    # Componentes específicos do Kanban
│   └── forms/     # Componentes de formulário
├── domain/        # Tipos e interfaces do domínio
│   ├── types/     # Tipos TypeScript
│   └── dtos/      # Objetos de transferência de dados
├── hooks/         # Hooks customizados
│   ├── auth/      # Hooks de autenticação
│   └── kanban/    # Hooks específicos do Kanban
├── lib/           # Utilitários e configurações
├── providers/     # Provedores de contexto
├── services/      # Serviços e integrações
│   ├── api/       # Cliente de API
│   └── kanban/    # Serviços específicos do Kanban
└── stores/        # Gerenciamento de estado
    └── kanban/    # Store do Kanban
```

## Padrões de Projeto Identificados

### 1. Clean Architecture
O projeto segue princípios da Clean Architecture, separando claramente as camadas de:
- Domain (regras de negócio e tipos)
- Services (casos de uso e integrações)
- UI (componentes e páginas)

### 2. Feature-First Structure
- Organização baseada em features dentro do diretório `app`
- Cada feature tem seus próprios componentes, hooks e lógica de negócio

### 3. Custom Hooks Pattern
- Separação da lógica de negócio dos componentes usando hooks customizados
- Exemplos: `use-financial-table.ts`, `use-pix-table.ts`, `use-movements-table.tsx`

### 4. Container/Presenter Pattern
- Separação entre lógica (hooks) e apresentação (componentes)
- Exemplo: 
  - `financial-table.tsx` (apresentação)
  - `use-financial-table.ts` (lógica)

### 5. Service Pattern
- Serviços isolados para operações específicas
- Input/Output DTOs bem definidos
- Exemplo: `services/financial/`, `services/pix/`

### 6. Type-First Development
- Forte tipagem com TypeScript
- Tipos de domínio centralizados em `domain/types`

### 7. Component Composition
- Componentes reutilizáveis em `components/`
- Composição para criar interfaces mais complexas

### 8. Route Groups Pattern (Next.js)
- Uso de route groups com parênteses para organizar rotas
- Separação clara entre rotas autenticadas e públicas: `(auth)` e `(kanban)`

### 9. Drag and Drop Pattern
- Implementação de drag and drop para cards do Kanban
- Uso de bibliotecas como `react-beautiful-dnd` ou `@dnd-kit`

### 10. State Management
- Zustand para gerenciamento de estado global
- React Query para cache e gerenciamento de estado do servidor

## Boas Práticas Implementadas

1. **Separação de Responsabilidades**
   - Cada módulo tem uma responsabilidade única e bem definida

2. **Reutilização de Código**
   - Componentes e hooks compartilhados
   - Tipos e interfaces reutilizáveis

3. **Organização por Funcionalidade**
   - Código relacionado agrupado em diretórios específicos
   - Facilita manutenção e escalabilidade

4. **Tipagem Forte**
   - TypeScript utilizado em todo o projeto
   - Interfaces e tipos bem definidos

5. **Gerenciamento de Estado**
   - Store centralizada para estado global
   - Hooks para gerenciamento de estado local

## Tecnologias Principais

1. **Framework**
   - Next.js 14 (App Router)
   - React 18
   - TypeScript

2. **Estilização**
   - Tailwind CSS
   - Shadcn/ui para componentes base
   - CSS Modules para estilos específicos

3. **Gerenciamento de Estado**
   - Zustand
   - React Query

4. **Formulários**
   - React Hook Form
   - Zod para validação

5. **Drag and Drop**
   - @dnd-kit/core
   - @dnd-kit/sortable

## Colors

The main colors used in the project are:

- White (#FFFFFF) - Primary background color
- Black (#000000) - Headers and text
- Purple (#6B46C1) - Primary accent color and interactive elements


Depois das alterações rode yarn build para ver se quebrou algo