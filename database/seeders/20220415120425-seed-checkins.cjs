'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Checkins',
      [
        {
          userid: 2222222222,
          eventid: 1,
          username: 'H4RD',
          userlvl: 10,
        },
        {
          userid: 7777777777,
          eventid: 1,
          username: 'CH',
          userlvl: 7,
        },
        {
          userid: 1111111111,
          eventid: 1,
          username: 'Denn1s',
          userlvl: 7,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Checkins', null, {})
  },
}
