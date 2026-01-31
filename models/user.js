"use strict";

// Import Model class from Sequelize
const { Model } = require("sequelize");

// Export function that defines the User model
module.exports = (sequelize, DataTypes) => {
  // Create User class extending Sequelize Model
  class User extends Model {
    /**
     * This method is used to define relationships between models.
     * Example: User.hasMany(Post)
     * It is automatically called by models/index.js
     */
   static associate({ Post }) {
  this.hasMany(Post, {
    foreignKey: "userId",
    as: "posts"
  });
}


    toJSON() {
      const values = { ...this.get() };
      delete values.id;
      return values;
    }
  }

  // Initialize model fields and configurations
  User.init(
    {
      uuid: {
        type: DataTypes.UUID, // column type = UUID
        defaultValue: DataTypes.UUIDV4, // auto-generate UUID v4
      },

      // Name field
      name: {
        type: DataTypes.STRING, // column type = VARCHAR
        allowNull: false, // field cannot be empty
      },

      // Email field
      email: {
        type: DataTypes.STRING,
        allowNull: false, // must have value
        unique: true, // no duplicate emails allowed
      },

      // Role field
      role: {
        type: DataTypes.STRING,
        defaultValue: "user", // if not provided → default = "user"
      },
    },
    {
      sequelize, // DB connection instance
      tableName: "users", // Explicit table name in DB
      modelName: "User", // Model name used in Sequelize
    },
  );

  // Return model
  return User;
};
