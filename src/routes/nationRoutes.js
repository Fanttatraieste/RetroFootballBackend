const express = require('express');
const nationController = require('../controllers/nationController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', nationController.checkID);

router
  .route('/')
  .get(nationController.getAllNations)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    nationController.createNation,
  );
router
  .route('/:id')
  .get(nationController.getOneNation)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    nationController.updateNation,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    nationController.deleteNation,
  );

module.exports = router;
