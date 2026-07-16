import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORTA = Number(process.env.PORT || 3000);
const FRONTEND_URL = process.env.FRONTEND_URL || '*';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use(routes);

sequelize.authenticate()
  .then(() => console.log('✅ CONECTADO AO BANCO COM SUCESSO!'))
  .catch((erro) => console.error('❌ Erro ao conectar no banco:', erro));

sequelize.sync({ alter: true })
  .then(() => console.log('✅ Tabelas sincronizadas!'));
  
app.listen(PORTA, () => {
  console.log(`✅ Servidor rodando na porta ${PORTA}`);
});