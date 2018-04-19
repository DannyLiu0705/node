const Sequelize = require('sequelize');

const sequelize = new Sequelize('node', 'root', '123123', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000    
    }
})

module.exports = sequelize;