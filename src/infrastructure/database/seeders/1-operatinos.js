module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = [
      { type: 'addition', cost: 500 },
      { type: 'subtraction', cost: 550 },
      { type: 'multiplication', cost: 200 },
      { type: 'division', cost: 100 },
      { type: 'square_root', cost: 250 },
      { type: 'random_string', cost: 400 },
    ];

    await queryInterface.bulkInsert('operations', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('operations', null, {});
  },
};



