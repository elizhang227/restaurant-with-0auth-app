const express = require('express'),
    router = express.Router(),
    restaurantsModel = require('../models/restaurants');

router.get('/', async function(req, res, next) {
    const allRestaurants = await restaurantsModel.getAllRestaurants();

    if(!!req.session.is_logged_in) {
        res.render('template', {
            locals: {
                title: 'Home page',
                restaurantsList: allRestaurants,
                is_logged_in: req.session.is_logged_in,
                userName: req.session.first_name
            },
            partials: {
                content: 'partial-restaurants'
            }
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;