import sequelize from '../db.js';
import Sequelize from 'sequelize';

const Event = sequelize.define('events', {
    description: { 
        type: Sequelize.STRING
    },
    status: { 
        type: Sequelize.STRING
    },
});

//Pstats.belongsTo(Match); //isso aqui tava on todo tempo tirei bóver //nao usei de novo agora voltando a pegar no projeto

//Event.sync({force: true});

export default Event;