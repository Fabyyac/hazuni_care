import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Documento extends Model {
  public id!: number;
  public titulo!: string;
  public descricao!: string;
  public url!: string;
  public categoria!: string;
  public usuario_id!: number;
  public readonly criado_em!: Date;
  public readonly atualizado_em!: Date;
}

Documento.init({
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
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'geral'
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Documento',
  tableName: 'documentos'
});

export default Documento;