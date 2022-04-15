'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('matches', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      map: {
        type: Sequelize.STRING,
      },
      ct_score: {
        type: Sequelize.INTEGER,
      },
      t_score: {
        type: Sequelize.INTEGER,
      },
      m_winner: {
        type: Sequelize.INTEGER,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('matches')
  },
}
