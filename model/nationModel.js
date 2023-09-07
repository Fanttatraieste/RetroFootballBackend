const mongoose = require('mongoose');

const nationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A nation must have a name'],
      unique: true,
      maxLength: [50, 'A nation s name must have max 50 characrers'],
      minLength: [4, 'A nation s name must have max 4 characrers'],
    },
    confederation: {
      type: String,
      required: [true, 'A nation must be part of a confederation'],
    },
    worldCupTitles: [Number],
    worldCupRunnerup: [Number],
    worldCupThirdPlace: [Number],
    continentalTitles: [Number],
    continentalRunnerup: [Number],
    continentalThirdPlace: [Number],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

nationSchema.virtual('worldCupTitlesNumber').get(function () {
  return this.worldCupTitles.length;
});

// QUERY MIDDLEWARE
nationSchema.pre('find', function (next) {
  this.find({ name: { $ne: 'O tara random' } });

  next();
});

const Nation = mongoose.model('Nation', nationSchema);

module.exports = Nation;
