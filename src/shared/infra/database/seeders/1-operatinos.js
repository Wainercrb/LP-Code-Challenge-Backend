module.exports = {
  async up(queryInterface, Sequelize) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { operationData } = require('../seed-data/data.json');

    await queryInterface.bulkInsert('operations', operationData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('operations', null, {});
  },
};
