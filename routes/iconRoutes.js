const express = require('express');
const iconController = require('../controllers/iconController');

const router = express.Router();

router
  .route('/')
  .get(iconController.getAllIcons)
  .post(iconController.createIcon);
router
  .route('/:id')
  .get(iconController.getOneIcon)
  .patch(iconController.updateIcon)
  .delete(iconController.deleteIcon);

module.exports = router;
