'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Events',
      [
        {
          id: 1,
          description: 'MIX CS GO',
          status: 'ONLINE',
        },
        {
          id: 2,
          description: 'COPA AGRESTE CS GO',
          status: 'ENCERRADO',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {})
  },
}
