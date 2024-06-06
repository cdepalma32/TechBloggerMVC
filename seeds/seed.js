const sequelize = require('../config/connection'); // Importing the Sequelize instance

const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    // ⚙️ Authenticating the connection
    console.log('🔍 Authenticating the database connection...');
    await sequelize.authenticate(); 

    // ⚙️ Sync all models
    console.log('🔄 Syncing all models...');
    await sequelize.sync({ force: true });

    // 🌱 Creating users
    console.log('👥 Creating users...');
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // 📝 Creating posts and associating them with users
    console.log('📝 Creating posts...');
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

    // 💬 Creating comments and associating them with users and posts
    console.log('💬 Creating comments...');
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

    // ✅ Seed completed
    console.log('✅ Database has been seeded successfully.');
    process.exit(0);
  } catch (error) {
    // ❌ Error handling
    console.error('❌ Error seeding the database:', error);
    process.exit(1);
  }
};

seedDatabase();
