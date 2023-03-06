const Sequelize = require('sequelize')

const sequelize = new Sequelize('ingressos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize
