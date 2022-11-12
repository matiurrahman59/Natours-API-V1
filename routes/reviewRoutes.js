const express = require('express');
const reviewControlller = require('../controllers/reviewControlller');
const authControlller = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// Protect(middleware) all routes
router.use(authControlller.protect);

router
  .route('/')
  .get(reviewControlller.getAllReviews)
  .post(
    authControlller.restrictTo('user'),
    reviewControlller.setTourUserIds,
    reviewControlller.createReview
  );

router
  .route('/:id')
  .get(reviewControlller.getReview)
  .patch(
    authControlller.restrictTo('user', 'admin'),
    reviewControlller.updateReview
  )
  .delete(
    authControlller.restrictTo('user', 'admin'),
    reviewControlller.deleteReview
  );

module.exports = router;
