import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Medicamento extends Model {
  public id!: number;
  public nome!: string;
  public dosagem!: string;
  public frequencia!: string;
  public horario!: string;
  public vencimento!: Date;
  public ativo!: boolean;
  public usuario_id!: number;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

Medicamento.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dosagem: {
    type: DataTypes.STRING,
    allowNull: false
  },
  frequencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vencimento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Medicamento',
  tableName: 'medicamentos'
});

export default Medicamento;