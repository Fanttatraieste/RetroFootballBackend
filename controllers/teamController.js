const Team = require('../model/teamModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllTeams = catchAsync(async (req, res, next) => {
  // EXECUTE QUERY
  const features = new APIFeatures(Team.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  let teams = await features.query;

  features.sortByteams(teams);
  teams = features.filterByTeams(teams);

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: teams.length,
    data: {
      teams,
    },
  });
});

exports.createTeam = catchAsync(async (req, res, next) => {
  const newTeam = await Team.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      team: newTeam,
    },
  });

  // try {
  //   const newTeam = await Team.create(req.body);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       team: newTeam,
  //     },
  //   });
  // } catch (err) {
  //   res.status(404).json({
  //     status: 'failed',
  //     message: err,
  //   });
  // }
});

exports.getOneTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findById(req.params.id);

  if (!team) {
    return next(new AppError('No team found with this id gg ez xaxaxax', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      team,
    },
  });
});

exports.updateTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!team) {
    return next(new AppError('No team found with this id gg ez xaxaxax', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      team,
    },
  });
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
  const team = await Team.findByIdAndDelete(req.params.id);

  if (!team) {
    return next(new AppError('No team found with this id gg ez xaxaxax', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTeamStats = catchAsync(async (req, res, next) => {
  const { country } = req.params;

  const stats = await Team.aggregate([
    {
      $unwind: '$championsLeague',
    },
    {
      $match: { country: country },
    },
    {
      $group: {
        _id: '$name',
        numOfChampionsLeagues: { $sum: 1 },
        years: { $push: '$championsLeague' },
      },
    },
    {
      $sort: { numOfChampionsLeagues: -1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
