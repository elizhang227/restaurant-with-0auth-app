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

module.exports = router;