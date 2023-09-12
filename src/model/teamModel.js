const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A team must have a name'],
    unique: true,
  },
  country: {
    type: String,
    required: [true, 'A team must be from some Country'],
  },
  leagueTitles: [Number],
  cupTitles: [Number],
  domesticSupercupTitles: [Number],
  championsLeague: [Number],
  uefaCup: [Number],
  uefaCupWinnersCup: [Number],
  championsLeagueRunnerup: [Number],
  uefaCupRunnerup: [Number],
  uefaCupWinnersCupRunnerup: [Number],
  uefaSuperCup: [Number],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
