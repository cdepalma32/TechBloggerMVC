const router = require('express').Router();
const { User } = require('../../models');

// Sign up
router.post('/', async (req, res) => {
  console.log('Signup request body:', req.body);
  try {
    console.log("create a new user");
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!newUser) {
      console.log('Failed to create a new user');
      return res.status(500).json({ message: 'Failed to create a new user' });
    }

    console.log("try to save the session");
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      console.log("Session object after saving:", req.session); // Log the session object
      res.status(200).json(newUser);
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('Login request body:', req.body);
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userData = await User.findOne({ where: { email } });

    // If user data not found, return error
    if (!userData) {
      console.error(`User with email ${email} not found.`);
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    // Check if the password is correct
    const validPassword = await userData.checkPassword(password);

    // If the password is incorrect, return error
    if (!validPassword) {
      console.error(`Incorrect password for user with email ${email}.`);
      return res.status(400).json({ message: 'Incorrect email or password, please try again' });
    }

    // If both email and password are correct, create a session
    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.save(() => {
      console.log(`User with email ${email} logged in successfully.`);
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.error('Error occurred during login:', err);
    res.status(400).json(err);
  }
});



// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
