import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Agenda extends Model {
  public id!: number;
  public titulo!: string;
  public descricao!: string;
  public data!: Date;
  public hora!: string;
  public concluido!: boolean;
  public usuario_id!: number;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

Agenda.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false
  },
  concluido: {
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
  modelName: 'Agenda',
  tableName: 'agendas'
});

export default Agenda;