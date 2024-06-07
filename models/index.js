const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

try {

  // Post belongs to User
  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

  // Post has many Comments
  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
  });

  // Comment belongs to User
  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
} catch (error) {
  console.error('Error defining associations:', error.message);
}

module.exports = { User, Post, Comment };
