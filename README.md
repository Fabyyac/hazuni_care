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

## 🚀 Deploy

### Frontend no Vercel
1. Crie uma conta no Vercel e conecte seu GitHub.
2. Importe o repositório `hazuni_care`.
3. No projeto do Vercel, defina `Root Directory` como `frontend`.
4. Configure a variável de ambiente do Vercel:
   - `VITE_API_URL` = `https://<seu-backend>/api/v1`
5. O Vercel irá construir usando `npm run build` e publicar o frontend.

### Backend na nuvem gratuita
O backend deve ser hospedado em um serviço separado, pois o Vercel serve apenas o frontend neste projeto.

Se a Railway disser "Free plan resource creation has been exceeded", use Render com um banco gratuito como Supabase ou Neon.

Opção totalmente gratuita recomendada:
- Render (backend)
- Supabase (PostgreSQL gratuito)

Passos rápidos:
1. Crie uma conta gratuita no Render e conecte seu GitHub.
2. Importe o repositório `hazuni_care`.
3. Configure o serviço como Web Service e use `backend` como Root Directory.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm run start`
6. Adicione as variáveis de ambiente do backend:
   - `DATABASE_URL` = connection string do banco
   - `DB_DIALECT=postgres`
   - `JWT_SECRET` = sua chave secreta forte
   - `JWT_EXPIRES_IN=24h`
   - `FRONTEND_URL` = URL do frontend no Vercel
7. Faça o deploy.

### Banco de dados gratuito
O projeto usa PostgreSQL ou MySQL via URL de conexão.

Opções gratuitas recomendadas:
- Supabase (PostgreSQL grátis)
- Neon (PostgreSQL grátis)
- PlanetScale (MySQL grátis)

Se usar Supabase:
1. Crie uma conta em https://supabase.com/
2. Crie um novo projeto gratuito.
3. Copie a URL do banco em Settings > Database > Connection string.
4. Defina `DATABASE_URL` no Render com essa URL.
5. Defina `DB_DIALECT=postgres` no Render.

### Variáveis de ambiente do backend
No serviço de backend, defina:
- `DATABASE_URL` = URL do banco de dados na nuvem
- `DB_DIALECT` = `postgres` ou `mysql`
- `JWT_SECRET` = uma chave secreta forte
- `JWT_EXPIRES_IN` = `24h`
- `FRONTEND_URL` = URL do frontend no Vercel

### Variáveis de ambiente do frontend
No Vercel, defina:
- `VITE_API_URL` = `https://<seu-backend>/api/v1`

## 🌐 O que foi ajustado

- `backend/src/config/database.ts` agora usa `DATABASE_URL` ou variáveis individuais.
- `backend/src/server.ts` agora carrega `dotenv` e usa `PORT` e `FRONTEND_URL`.
- `frontend/src/services/api.ts` agora usa `import.meta.env.VITE_API_URL`.
- Adicionada `vercel.json` para definir `rootDirectory: "frontend"`.
- Atualizada `.env.example` com `DATABASE_URL`, `DB_DIALECT` e `VITE_API_URL`.

## 🔜 Próximos passos

- Conectar o backend a um banco em nuvem gratuito.
- Implantar o backend em Railway, Render ou serviço similar.
- Definir `VITE_API_URL` no Vercel.
- Testar o fluxo completo no ambiente de produção.

## 📌 Observação

A identidade visual atual foi preservada e a `logo.png` não foi alterada.
