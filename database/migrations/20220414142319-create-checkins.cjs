'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('checkins', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
          key: 'id',
        },
      },
      userSteamId: {
        type: Sequelize.BIGINT,
        references: {
          model: 'users',
          key: 'steamid',
        },
      },
      username: {
        type: Sequelize.STRING,
      },
      userlvl: {
        type: Sequelize.FLOAT,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('checkins')
  },
}
