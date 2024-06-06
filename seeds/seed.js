const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Create posts and associate them with users
  const posts = [];
  for (const post of postData) {
    // Randomly select a user for each post
    const randomUser = users[Math.floor(Math.random() * users.length)];

    // Create the post and associate it with the selected user
    const createdPost = await Post.create({
      ...post,
      user_id: randomUser.id,
    });

    // Collect created posts
    posts.push(createdPost);
  }

  // Create comments and associate them with users and posts
  for (const comment of commentData) {
    // Randomly select a user and a post for each comment
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    // Create the comment and associate it with the selected user and post
    await Comment.create({
      ...comment,
      user_id: randomUser.id,
      post_id: randomPost.id,
    });
  }

  process.exit(0);
};

seedDatabase();

