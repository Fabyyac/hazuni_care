import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'hazuni_care',       // Nome do banco que acabamos de criar
  'root',              // Usuário padrão do XAMPP
  '',                  // SENHA VAZIA — XAMPP não tem senha por padrão!
  {
    host: 'localhost',
    port: 3306,        // Porta padrão do MySQL no XAMPP
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
);

export default sequelize;