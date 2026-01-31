'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('users', {

      // Primary Key ID
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      // UUID → Unique public identifier
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true
      },

      // Name → Required field
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },

      // Email → Required + Unique
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true
        }
      },

      // Role → Default value
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user"
      },

      // Created timestamp
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      // Updated timestamp
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
