const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
const Post = require('./Post'); // Import the Post model
const Comment = require('./Comment'); // Import the Comment model

class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  
try {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'User',
    }
  );

  // Hook to delete associated posts and comments when a user is deleted
  User.beforeDestroy(async (user, options) => {
    await Post.destroy({ where: { user_id: user.id } });
    await Comment.destroy({ where: { user_id: user.id } });
  });
} catch (error) {
  console.error('Error initializing User model:', error.message);
}

module.exports = User;
