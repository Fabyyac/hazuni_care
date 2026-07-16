# Hazuni Care

Plataforma inteligente de assistência digital Hazuni Care. Este repositório contém a implementação atual do aplicativo web com backend e frontend, mantendo a identidade visual, logo e cores do projeto.

## 🚀 O que já foi implementado

### Funcionalidades principais
- Autenticação de usuário com cadastro e login.
- Perfil do usuário com edição de nome e e-mail.
- Alteração de senha autenticada.
- Chat Hazuni IA com interface de mensagens.
- Agenda de eventos com criação e exclusão.
- Cadastro e listagem de medicamentos.
- Gestão de documentos com categorias e links.
- Notificações com marcação como lida.

### Backend
- Node.js + Express + TypeScript.
- Sequelize com MySQL (XAMPP) para persistência de dados.
- Modelo `User`, `Agenda`, `Medicamento`, `Documento` e `Notificacao`.
- Rotas protegidas por JWT.
- API REST para todas as funcionalidades implementadas.

### Frontend
- React + TypeScript + Vite.
- Navegação com React Router.
- Pages completas para `Home`, `Login`, `Cadastro`, `Perfil`, `Hazuni IA`, `Agenda`, `Medicamentos`, `Documentos`, `Notificações` e `Alterar Senha`.
- Logo e esquema de cores preservados.

## 📁 Estrutura do repositório

- `backend/` - servidor Express e modelos Sequelize.
- `frontend/` - aplicação React com páginas e serviços.
- `package.json` - scripts de execução.
- `tsconfig.json` - configuração TypeScript.

## ▶️ Como executar

No diretório raiz do projeto:

```bash
npm install
npm run install:tudo
```

### Backend
```bash
npm run dev:backend
```

### Frontend
```bash
npm run dev:frontend
```

## 🧪 Verificação

O backend e o frontend foram compilados com sucesso após as últimas alterações:
- Backend: `npm run build:backend`
- Frontend: `npm run build:frontend`

## 🔜 Próximos passos

- Integrar IA com OpenAI para respostas reais.
- Adicionar upload de documentos e persistência em nuvem.
- Criar painel administrativo.
- Implementar mobile com React Native / Expo.
- Adicionar testes unitários e e2e.
- Configurar deploy automático no GitHub Actions.

## 📌 Observação

A identidade visual atual foi preservada e a `logo.png` não foi alterada. Se desejar, posso também ajudar a publicar este repositório no GitHub assim que você fornecer a URL ou criar o repositório para ser vinculado.
