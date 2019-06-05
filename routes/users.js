const express = require('express'),
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

module.exports = router;