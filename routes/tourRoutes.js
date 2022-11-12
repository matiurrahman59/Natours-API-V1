const express = require('express');

const tourControlller = require('../controllers/tourController');
const authControlller = require('../controllers/authController');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourControlller.aliasTopTour, tourControlller.getAllTours);

router.route('/tour-stats').get(tourControlller.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authControlller.protect,
    authControlller.restrictTo('admin', 'lead-guide', 'guide'),
    tourControlller.getMonthlyPlan
  );

router
  .route('/')
  .get(tourControlller.getAllTours)
  .post(
    authControlller.protect,
    authControlller.restrictTo('admin', 'lead-guide'),
    tourControlller.createTour
  );

router
  .route('/:id')
  .get(tourControlller.getTour)
  .patch(
    authControlller.protect,
    authControlller.restrictTo('admin', 'lead-guide'),
    tourControlller.updateTour
  )
  .delete(
    authControlller.protect,
    authControlller.restrictTo('admin', 'lead-guide'),
    tourControlller.deleteTour
  );

module.exports = router;
