module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = [
      {
        operation_id: 1,
        user_id: 1,
        amount: 100,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
      {
        operation_id: 2,
        user_id: 2,
        amount: 200,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
      {
        operation_id: 3,
        user_id: 3,
        amount: 300,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
      {
        operation_id: 1,
        user_id: 1,
        amount: 400,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
      {
        operation_id: 2,
        user_id: 2,
        amount: 500,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
      {
        operation_id: 3,
        user_id: 3,
        amount: 600,
        operation_response: JSON.stringify('{}'),
        date: new Date(),
        isDeleted: false,
      },
    ];

    await queryInterface.bulkInsert('records', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('records', null, {});
  },
};
