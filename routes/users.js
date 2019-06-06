const express = require('express'),
    bcrypt = require('bcryptjs'),
    router = express.Router(),
    usersModel = require('../models/users');

router.get('/', async (req, res, next) => {
    const allUsers = await usersModel.getAllUsers();

    res.render('template', { 
        locals: {
            title: 'List of Users',
            usersList: allUsers
        },
        partials : {
            content: 'partial-users'
        }
    });
})

router.get('/login', async (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'Login Page'
    },
    partials: {
      content: 'partial-login-form'
    }
  })
});

router.get('/signup', async (req, res, next) => {
  res.render('template', {
    locals: {
      title: 'Signup Page'
    },
    partials: {
      content: 'partial-signup-form'
    }
  })
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Salt and hash our password!
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Creates a new user instance, with the sign up information
  const userInstance = new usersModel(null, first_name, last_name, email, hash);

  userInstance.addUser().then(response => {
    console.log("response is", response);
  });
});

module.exports = router;