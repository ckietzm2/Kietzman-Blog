const sequelize = require('../config/connection');
const { User, Comment} = require('../models/');

const userData = require('./userData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Use a different variable name (e.g., 'comment') for the loop
  for (const comment of commentData) {
    // Use 'Comment' model to create comments
    await Comment.bulkCreate([
      {
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      },
    ]);
  }

  process.exit(0);
};

seedDatabase();