const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const Comment = require('./Comment'); // Import the Comment model

class Post extends Model {}

try {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      date_created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'Post',
    }
  );

} catch (error) {
  console.error('Error initializing Post model:', error.message);
}

module.exports = Post;
