module.exports = {
  async up(queryInterface, Sequelize) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { recordData } = require('../seed-data/data.json');

    const mappedSeed = recordData.map((item) => ({ ...item, date: new Date(item.date) }));

    await queryInterface.bulkInsert('records', mappedSeed);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('records', null, {});
  },
};
