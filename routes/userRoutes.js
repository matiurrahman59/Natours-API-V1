const express = require('express');
const authControlller = require('../controllers/authController');
const userControlller = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authControlller.signup);
router.post('/login', authControlller.login);
router.post('/forgotPassword', authControlller.forgotPassword);
router.patch('/resetPassword/:token', authControlller.resetPassword);

// Protect all routes after this middleware
router.use(authControlller.protect);

router.patch('/updateMyPassword', authControlller.updatePassword);

router.get('/me', userControlller.getMe, userControlller.getUser);
router.patch('/updateMe', userControlller.updateMe);
router.delete('/deleteMe', userControlller.deleteMe);

router.use(authControlller.restrictTo('admin'));

router
  .route('/')
  .get(userControlller.getAllUsers)
  .post(userControlller.createUser);

router
  .route('/:id')
  .get(userControlller.getUser)
  .patch(userControlller.updateUser)
  .delete(userControlller.deleteUser);

module.exports = router;
