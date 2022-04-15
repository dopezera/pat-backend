'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'CH',
          steamid: '7777777777',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Denn1s',
          steamid: '1111111111',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'H4RD',
          steamid: '2222222222',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'CHK',
          steamid: '3333333333',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'PAT',
          steamid: '4444444444',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Ciobeck',
          steamid: '4200000000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Cabo Citonho',
          steamid: '5555555555',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'TIGER',
          steamid: '6666666666',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'ESPANCO',
          steamid: '8888888888',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
