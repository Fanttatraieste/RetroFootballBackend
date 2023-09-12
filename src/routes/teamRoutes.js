const express = require('express');
const teamController = require('../controllers/teamController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/teamStats/:country').get(teamController.getTeamStats);

router
  .route('/')
  .get(teamController.getAllTeams)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    teamController.createTeam,
  );
router
  .route('/:id')
  .get(teamController.getOneTeam)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    teamController.updateTeam,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    teamController.deleteTeam,
  );

module.exports = router;
