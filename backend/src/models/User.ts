import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // ✅ Importa a instância que criamos

class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha_hash!: string;
  public status!: boolean;
  public foto?: string;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

// ✅ Passa a instância do sequelize — ISSO QUE ESTAVA FALTANDO!
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  foto: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize, // ✅ AQUI! Passa a instância para o modelo
  modelName: 'User',
  tableName: 'usuarios'
});

export default User;