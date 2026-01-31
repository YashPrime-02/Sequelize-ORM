// Import sequelize and User model
const { sequelize, User, Post } = require('./models');

const express = require('express');
const app = express();

// Middleware to parse JSON body
app.use(express.json());

/**
 * POST /users
 * Create a new user
 */
app.post('/users', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    // Create new user in database
    const newUser = await User.create({ name, email, role });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/posts-all', async (req, res) => {
  try {
    // Fetch all posts with associated user
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user" // must match alias in association
        }
      ]
    });

    // Send response
    return res.status(200).json(posts);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});


// GET /users

app.get('/users', async (req, res) => {
  try {
    // Fetch all users from database    
    const users = await User.findAll();
    res.status(200).json(users);
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /users/:uuid

app.get('/users/:uuid', async (req, res) => {
  const { uuid } = req.params;  
    try {
    // Fetch user by UUID
    const user = await User.findOne
    ({ where: { uuid } });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }   
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/posts', async (req, res) => {
  const { userUuid, body } = req.body;

  try {

    // Find user by UUID
    const user = await User.findOne({
      where: { uuid: userUuid }
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    // Create post linked to user
    const post = await Post.create({
      body,
      userId: user.id
    });

    return res.status(201).json(post);

  } catch (error) {
    return res.status(400).json({
      error: error.message
    });
  }
});



/**
 * Start server after DB sync
 */
app.listen(3000, async () => {
  try {
    // Step 1 — Check database connection
    // This only verifies DB access
    // It does NOT modify tables
    await sequelize.authenticate();

    console.log("✅ Database connected successfully.");
    console.log("🚀 Server running on http://localhost:3000");

  } catch (error) {
    console.error("❌ Error starting app:", error);
  }
});

