'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pstats', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      matchId: {
        type: Sequelize.INTEGER,
        references: {model: 'matches', key: 'id'},
      },
      steamid: {
        type: Sequelize.BIGINT,
        //references: { model: 'users', key: 'steamid' } -- removido pq estou usando loader com steamids que não existem
      },
      username: {
        type: Sequelize.STRING,
      },
      team: {
        type: Sequelize.INTEGER,
      },
      winner: {
        type: Sequelize.BOOLEAN,
      },
      kills: {
        type: Sequelize.INTEGER,
      },
      assists: {
        type: Sequelize.INTEGER,
      },
      deaths: {
        type: Sequelize.INTEGER,
      },
      mvps: {
        type: Sequelize.INTEGER,
      },
      score: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pstats')
  },
}
