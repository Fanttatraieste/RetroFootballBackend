const Nation = require('../model/nationModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllNations = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Nation.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let nations = await features.query;
    nations = features.filterByNations(nations);

    // SEND RESPONSE

    res.status(200).json({
      status: 'success',
      results: nations.length,
      data: {
        nations,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createNation = async (req, res) => {
  try {
    const newNation = await Nation.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newNation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getOneNation = async (req, res) => {
  try {
    const nation = await Nation.findById(req.params.id);

    res.status(201).json({
      status: 'success',
      data: {
        nation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.updateNation = async (req, res) => {
  try {
    const nation = await Nation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        nation,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.deleteNation = async (req, res) => {
  try {
    await Nation.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};
