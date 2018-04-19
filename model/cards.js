var sequelize = require('../util/conn.js')
const Sequelize = require('sequelize');
const cards = sequelize.define('cards', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    level: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
    skill: {
        type: Sequelize.STRING
    },
    describe: {
        type: Sequelize.STRING
    },
    attack: {
        type: Sequelize.STRING
    },
    defense: {
        type: Sequelize.STRING
    },
    attr: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    classify: {
        type: Sequelize.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
})

module.exports = cards;