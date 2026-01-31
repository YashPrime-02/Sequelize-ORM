'use strict';

// Import Model class from Sequelize
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Post extends Model {

    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user"
      });
    }

    toJSON() {  
      const values = { ...this.get() };
      delete values.id;
      delete values.userId;
      return values;
    }
  }

  Post.init({

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // Foreign Key
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    tableName: 'posts',
    modelName: 'Post',
  });

  return Post;
};
