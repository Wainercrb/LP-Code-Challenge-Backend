module.exports = {
  async up(queryInterface, Sequelize) {
    const seedData = [
      {
        username: 'admin',
        password: '$2a$10$U0njzGrKQIdtgbbsaXtQZeb4UlzCzL88lm1J653xm81.7UvdwDT4K',
        role: 'admin',
        balance: 10000,
      },
      {
        username: 'juan',
        password: '$2a$10$U0njzGrKQIdtgbbsaXtQZeb4UlzCzL88lm1J653xm81.7UvdwDT4K',
        role: 'guess',
        balance: 7000,
      },
      {
        username: 'luis',
        password: '$2a$10$U0njzGrKQIdtgbbsaXtQZeb4UlzCzL88lm1J653xm81.7UvdwDT4K',
        role: 'guess',
        balance: 7600,
      },
      {
        username: 'carlos',
        password: '$2a$10$U0njzGrKQIdtgbbsaXtQZeb4UlzCzL88lm1J653xm81.7UvdwDT4K',
        role: 'guess',
        balance: 7100,
      },
      {
        username: 'lucas',
        password: '$2a$10$U0njzGrKQIdtgbbsaXtQZeb4UlzCzL88lm1J653xm81.7UvdwDT4K',
        role: 'guess',
        balance: 7800,
      },
    ];

    await queryInterface.bulkInsert('users', seedData);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
