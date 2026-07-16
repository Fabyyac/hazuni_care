import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Notificacao extends Model {
  public id!: number;
  public titulo!: string;
  public mensagem!: string;
  public lida!: boolean;
  public usuario_id!: number;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

Notificacao.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  lida: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Notificacao',
  tableName: 'notificacoes'
});

export default Notificacao;