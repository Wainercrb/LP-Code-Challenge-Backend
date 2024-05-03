module.exports = {
  async up(queryInterface, Sequelize) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { userData } = require('../seed-data/data.json');

    await queryInterface.bulkInsert('users', userData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
