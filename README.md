# KanbanLife

Um quadro Kanban intuitivo para gerenciamento de projetos.

## Pré-requisitos

- Node.js 18+ instalado
- NPM ou Yarn
- Backend rodando na porta 3333 (ou ajuste a URL no .env.local)

## Como rodar o projeto

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
- Copie o arquivo `.env.local.example` para `.env.local`
- Ajuste a URL da API se necessário

3. Rode o projeto em desenvolvimento:
```bash
npm run dev
```

4. Acesse o projeto:
- Frontend: http://localhost:3000
- A API deve estar rodando em http://localhost:3333

## Estrutura do Projeto

- `src/app/` - Páginas e rotas (Next.js App Router)
- `src/components/` - Componentes React reutilizáveis
- `src/domain/` - Tipos e interfaces
- `src/hooks/` - Hooks customizados
- `src/services/` - Serviços e integrações
- `src/stores/` - Gerenciamento de estado

## Funcionalidades

- Autenticação de usuários
- Criação e gerenciamento de projetos
- Quadro Kanban com drag and drop
- Criação e organização de tarefas
- Múltiplas colunas personalizáveis
