const mongoose = require('mongoose');
const fantascoreUtil = require('../utils/fantascore');

const nationalTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A Country must have a name'],
  },
  gamesPlayed: {
    type: Number,
    default: 0,
  },
  goalsScored: {
    type: Number,
    default: 0,
  },
  worldCup: {
    type: [Number],
    default: [],
  },
  worldCupRunnerup: {
    type: [Number],
    default: [],
  },
  worldCupThirdPlace: {
    type: [Number],
    default: [],
  },
  continentalCup: {
    type: [Number],
    default: [],
  },
  continentalCupRunnerup: {
    type: [Number],
    default: [],
  },
  continentalCupThirdPlace: {
    type: [Number],
    default: [],
  },
});

const ballonDorSchema = new mongoose.Schema({
  winner: {
    type: [Number],
    default: [],
  },
  secondPlace: {
    type: [Number],
    default: [],
  },
  thirdPlace: {
    type: [Number],
    default: [],
  },
  fourthPlace: {
    type: [Number],
    default: [],
  },
  fifthPlace: {
    type: [Number],
    default: [],
  },
  sixthPlace: {
    type: [Number],
    default: [],
  },
  seventhPlace: {
    type: [Number],
    default: [],
  },
  eighthPlace: {
    type: [Number],
    default: [],
  },
  ninethPlace: {
    type: [Number],
    default: [],
  },
  tenthPlace: {
    type: [Number],
    default: [],
  },
  nominations: {
    type: [Number],
    default: [],
  },
});

const iconSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An Icon must have a name'],
      trim: true,
      unique: true,
    },
    yearOfBirth: {
      type: Number,
      required: [true, 'An Icon must have been born sometime'],
    },
    careerLength: {
      type: Number,
      required: [true, 'An Icon must have career length'],
    },
    careerGames: {
      type: Number,
      required: [true, 'An Icon must have played games'],
    },
    careerGoals: {
      type: Number,
      required: [true, 'An Icon must have scored goals'],
    },
    fantascore: {
      type: Number,
      validate: {
        message:
          'A player can be an icon only if his fantascore ({VALUE}) is greater then 50 (the quivalent of 2 ballon dors)',
        validator: function (score) {
          // the functiuon can only return true or false
          return score >= 50;
        },
      },
    },
    positions: {
      type: [String],
      required: [true, 'An icon must have played a position'],
      enum: {
        values: [
          'goalkeeper',
          'defender',
          'midfielder',
          'striker',
          'winger',
          'fullback',
          'forward',
        ],
        message:
          'Validation error !! A player can only be goalkeeper, defender, midfielder, striker, winger, fullback, forward',
      },
    },
    country: {
      type: [String],
      required: [true, 'An icon must have played for at least one country'],
    },
    description: {
      type: String,
      trim: true,
    },
    goldenShoe: {
      type: [Number],
      default: [],
    },
    championsLeagueTopScorer: {
      type: [Number],
      default: [],
    },
    uefaCupTopScorer: {
      type: [Number],
      default: [],
    },
    uefaCupWinnersCupTopScorer: {
      type: [Number],
      default: [],
    },
    worldCupGoldenBall: {
      type: [Number],
      default: [],
    },
    worldCupTopScorer: {
      type: [Number],
      default: [],
    },
    worldCupGoals: {
      type: Number,
      default: 0,
    },
    continentalCupGoldenBall: {
      type: [Number],
      default: [],
    },
    continentalCupTopScorer: {
      type: [Number],
      default: [],
    },
    continentalCupTopTOT: {
      type: [Number],
      default: [],
    },
    worldCupTopTOT: {
      type: [Number],
      default: [],
    },
    retired: {
      type: Number,
      required: [true, 'An icon must be a retired player'],
    },
    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    ballonDor: ballonDorSchema,
    nationalTeam: {
      type: nationalTeamSchema,
      required: [true, 'An Icon must have a national team'],
    },
    clubTeams: [
      {
        name: {
          type: String,
          trim: true,
          required: [true, 'A team must have a name'],
        },
        country: {
          type: String,
          trim: true,
          required: [true, 'A team must be from a country'],
        },
        gamesPlayed: {
          type: Number,
          required: [
            true,
            'A player must have played some games for this team',
          ],
        },
        goalsScored: {
          type: Number,
          required: [
            true,
            'A player must have played some games for this team',
          ],
        },
        leagueTitles: {
          type: [Number],
          default: [],
        },
        cupTitles: {
          type: [Number],
          default: [],
        },
        supercupTitles: {
          type: [Number],
          default: [],
        },
        championsLeague: {
          type: [Number],
          default: [],
        },
        championsLeagueRunnerup: {
          type: [Number],
          default: [],
        },
        uefaCup: {
          type: [Number],
          default: [],
        },
        uefaCupRunnerup: {
          type: [Number],
          default: [],
        },
        uefaCupWinnersCup: {
          type: [Number],
          default: [],
        },
        uefaCupWinnersCupRunnerup: {
          type: [Number],
          default: [],
        },
        uefaSuperCup: {
          type: [Number],
          default: [],
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// DOCUMENT MIDDLEWARE : RUNS BEFORE THE SAVE COMMAND AND CREATE COMMAND
iconSchema.pre('save', function (next) {
  let score = 0;
  score += fantascoreUtil.ballonDorScore(this.ballonDor);
  score += fantascoreUtil.bonusPoints(this.name);
  score += fantascoreUtil.calculate(this);
  score += fantascoreUtil.gameScore(this.careerGames);
  score += fantascoreUtil.goalScore(this.careerGoals, this.positions[0]);
  score += fantascoreUtil.nationScore(this.nationalTeam);
  this.clubTeams.forEach((team) => {
    score += fantascoreUtil.teamScore(team);
  });

  this.fantascore = score;

  // console.log(this.fantascore);
  next();
});

iconSchema.pre('findOneAndUpdate', async function (next) {
  const docToUpdate = await this.model.findOne(this.getQuery());

  let score = 0;
  score += fantascoreUtil.ballonDorScore(docToUpdate.ballonDor);
  score += fantascoreUtil.bonusPoints(docToUpdate.name);
  score += fantascoreUtil.calculate(docToUpdate);
  score += fantascoreUtil.gameScore(docToUpdate.careerGames);
  score += fantascoreUtil.goalScore(
    docToUpdate.careerGoals,
    docToUpdate.positions[0],
  );
  docToUpdate.clubTeams.forEach((team) => {
    score += fantascoreUtil.teamScore(team);
  });

  score += fantascoreUtil.nationScore(docToUpdate.nationalTeam);

  // docToUpdate.fantascore = score;
  this.set({ fantascore: score });
  // console.log(docToUpdate);

  next();
});

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;
