module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('records', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      operation_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'operations',
          key: 'id',
        },
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      operation_response: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });

    // await queryInterface.addConstraint('records', {
    //   type: 'foreign key',
    //   fields: ['user_id'],
    //   name: 'fk_record_user',
    //   references: {
    //     table: 'users',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION',
    // });

    // await queryInterface.addConstraint('records', {
    //   type: 'foreign key',
    //   fields: ['operation_id'],
    //   name: 'fk_record_operation',
    //   references: {
    //     table: 'operations',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'NO ACTION',
    // });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('records');
  },
};
