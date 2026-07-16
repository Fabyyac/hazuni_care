import express from 'express';
import cors from 'cors';
import routes from './routes/index';
// ✅ Importa a instância exportada por padrão
import sequelize from './config/database';

const app = express();
const PORTA = 3000;

// ✅ Configuração CORS compatível
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.use(routes);

// ✅ Agora o sequelize está definido e tem o método authenticate()
sequelize.authenticate()
  .then(() => console.log('✅ CONECTADO AO BANCO COM SUCESSO!'))
  .catch((erro) => console.error('❌ Erro ao conectar no banco:', erro));

// Cria a tabela se não existir — só na primeira vez
sequelize.sync({ alter: true })
  .then(() => console.log('✅ Tabela "usuarios" criada/sincronizada!'));
  
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});