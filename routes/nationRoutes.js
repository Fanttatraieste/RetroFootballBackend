const express = require('express');
const nationController = require('../controllers/nationController');

const router = express.Router();

// router.param('id', nationController.checkID);

router
  .route('/')
  .get(nationController.getAllNations)
  .post(nationController.createNation);
router
  .route('/:id')
  .get(nationController.getOneNation)
  .patch(nationController.updateNation)
  .delete(nationController.deleteNation);

module.exports = router;
