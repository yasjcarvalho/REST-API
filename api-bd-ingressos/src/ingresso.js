const { modele, DataTypes } = require('sequelize')
const sequelize = require('./database')

/** Representação de uma tabela do banco mapeada nessa classe */
/**
 * https://sequelize.org/docs/v6/core-concepts/model-basics/
 *
 * */

const Ingresso = sequelize.define(
  'ingresso',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    evento: {
      type: DataTypes.STRING,
      allowNull: false
    },
    local: {
      type: DataTypes.STRING,
      allowNull: false
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'ingresso',
    timestamps: false
  }
)

module.exports = Ingresso
