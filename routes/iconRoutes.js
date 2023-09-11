const express = require('express');
const iconController = require('../controllers/iconController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(iconController.getAllIcons)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    iconController.createIcon,
  );
router
  .route('/:id')
  .get(iconController.getOneIcon)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    iconController.updateIcon,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    iconController.deleteIcon,
  );

module.exports = router;
