import sequelize from '../db.js';
import Sequelize from 'sequelize';

const User = sequelize.define('users', {
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    steamid: {
        type: Sequelize.BIGINT,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    },
    kdr: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    winPercentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    impact: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    plan: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

//User.sync({force: true});

export default User;