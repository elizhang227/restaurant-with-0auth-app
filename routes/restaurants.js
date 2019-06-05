const express = require('express'),
    router = express.Router(),
    restaurantsModel = require('../models/restaurants');

router.get('/', async (req, res, next) => {
    const allRestaurants = await restaurantsModel.getAllRestaurants();

    res.render('template', { 
        locals: {
            title: 'List of Restaurants',
            restaurantsList: allRestaurants
        },
        partials : {
            content: 'partial-restaurants'
        }
    });
})

// router.post('/', (req, res) => {
//     console.log(req.body);
//     const { name } = req.body;

//     restaurantsModel.getOneBusiness(name)
//     .then(async () => {
//         const allRestaurants = await restaurantsModel.getAllReviewsForBusiness(name);

//         res.status(200).render('template', {
//             locals: {
//                 title: 'List of REVIEWS',
//                 restaurantsList: allRestaurants
//             },
//             partials: {
//                 content: 'partial-restaurants'
//             }
//         });
//     })
//     .catch((err) => {
//         res.sendStatus(500).send(err.message);
//     });
// });

module.exports = router;