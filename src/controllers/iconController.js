const Icon = require('../src/model/iconModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllIcons = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Icon.find(), req.query)
      .filter()
      .sort()
      .limitFields();
    // .paginate();
    let icons = await features.query;

    features.sortByIcon(icons);
    icons = features.filterByIcon(icons);
    const results = icons.length;
    icons = features.paginateIcons(icons);
    // SEND RESPONSE

    res.status(200).json({
      status: 'success',
      results: results,
      data: {
        icons,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      messsage: err,
    });
  }
};

exports.createIcon = async (req, res) => {
  try {
    const newIcon = await Icon.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        icon: newIcon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      messsage: err,
    });
  }
};

exports.getOneIcon = async (req, res) => {
  try {
    const icon = await Icon.findById(req.params.id);
    // console.log(icon.fantascore);

    res.status(201).json({
      status: 'success',
      data: {
        icon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      messsage: err,
    });
  }
};

exports.updateIcon = async (req, res) => {
  try {
    // const icon = await Icon.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const icon = await Icon.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        icon,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      messsage: err,
    });
  }
};

exports.deleteIcon = async (req, res) => {
  try {
    await Icon.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      messsage: err,
    });
  }
};
