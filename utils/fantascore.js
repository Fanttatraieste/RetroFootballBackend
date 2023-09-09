exports.goalScore = (goals, position) => {
  let score = 0;

  if (goals <= 200) score = 0;
  else if (goals >= 200 && goals <= 299) score += 1;
  else if (goals >= 300 && goals <= 399) score += 2;
  else if (goals >= 400 && goals <= 499) score += 3;
  else if (goals >= 500 && goals <= 599) score += 5;
  else if (goals >= 600 && goals <= 699) score += 7;
  else if (goals >= 700 && goals <= 799) score += 9;
  else score += 10;

  switch (position) {
    case 'forward':
      score *= 1;
      break;
    case 'midfielder':
      score *= 1.5;
      break;
    case 'defender':
      score *= 2;
      break;
    case 'goalkeeper':
      score *= 3;
      break;
    default:
      score += 0;
  }

  console.log(`Goal score is ${score}`);

  return score;
};

exports.gameScore = (games) => {
  let score = 0;

  if (games >= 500 && games <= 699) score += 1;
  else if (games >= 700 && games <= 999) score += 2;
  else score += 3;

  return score;
};

exports.ballonDorScore = (status) => {
  let score = 0;

  score += status.nominations.length;

  score += status.winner.length * 25;
  score += status.secondPlace.length * 20;
  score += status.thirdPlace.length * 15;
  score += status.fourthPlace.length * 10;
  score += status.fifthPlace.length * 8;
  score += status.sixthPlace.length * 7;
  score += status.seventhPlace.length * 6;
  score += status.eighthPlace.length * 5;
  score += status.ninethPlace.length * 4;
  score += status.tenthPlace.length * 2;

  console.log(`Ballon dor score is ${score}`);

  return score;
};

exports.nationScore = (nation) => {
  let score = 0;

  score += nation.worldCup.length * 25;
  score += nation.worldCupRunnerup.length * 20;
  score += nation.worldCupThirdPlace.length * 15;

  score += nation.continentalCup.length * 15;
  score += nation.continentalCupRunnerup.length * 10;
  score += nation.continentalCupThirdPlace.length * 5;

  const goals = nation.goalsScored;
  const games = nation.gamesPlayed;

  if (games < 50) score += 0;
  else if (games >= 50 && games <= 100) score += 1;
  else if (games >= 100 && games <= 149) score += 2;
  else score += 3;

  if (goals < 30) score += 0;
  else if (goals >= 30 && goals <= 50) score += 1;
  else if (goals >= 50 && goals <= 100) score += 2;
  else score += 4;

  console.log(`Nation score is : ${score}`);

  return score;
};

exports.teamScore = (team) => {
  let score = 0;

  if (team.gamesPlayed > 400) score += 1;
  if (team.gamesPlayed > 500) score += 1;
  if (team.gamesPlayed > 600) score += 1;
  if (team.gamesPlayed > 700) score += 1;
  if (team.gamesPlayed > 800) score += 2;

  if (team.goalsScored > 100) score += 1;
  if (team.goalsScored > 200) score += 1;
  if (team.goalsScored > 300) score += 1;
  if (team.goalsScored > 400) score += 1;
  if (team.goalsScored > 500) score += 2;

  score += team.leagueTitles.length * 5;
  score += team.cupTitles.length;
  score += team.supercupTitles.length;
  score += team.championsLeague.length * 15;
  score += team.championsLeagueRunnerup.length * 10;
  score += team.uefaCup.length * 10;
  score += team.uefaCupRunnerup.length;
  score += team.uefaCupWinnersCup.length * 5;
  score += team.uefaCupWinnersCupRunnerup.length;
  score += team.uefaSuperCup.length;

  console.log(`team score is ${score} for ${team.name}`);

  return score;
};

exports.bonusPoints = (name) => {
  const easyName = name.toLowerCase();
  if (
    easyName === 'pele' ||
    easyName === 'lev yashin' ||
    easyName === 'stanley matthews' ||
    easyName === 'franz beckenbauer' ||
    easyName === 'giuseppe meazza'
  )
    return 25;
  return 0;
};

exports.calculate = ({
  yearOfBirth,
  careerLength,
  goldenShoe,
  championsLeagueTopScorer,
  uefaCupTopScorer,
  uefaCupWinnersCupTopScorer,
  worldCupGoldenBall,
  worldCupTopScorer,
  worldCupGoals,
  continentalCupGoldenBall,
  continentalCupTopScorer,
  continentalCupTopTOT,
  worldCupTopTOT,
}) => {
  let score = 0;

  if (yearOfBirth <= 1960) score += 5;
  if (yearOfBirth <= 1940) score += 5;
  if (yearOfBirth <= 1920) score += 5;
  if (careerLength >= 20) score += 5;

  score += goldenShoe.length * 15;
  score += championsLeagueTopScorer.length * 10;
  score += uefaCupTopScorer.length * 5;
  score += uefaCupWinnersCupTopScorer.length;
  score += worldCupGoldenBall.length * 15;
  score += worldCupTopScorer.length * 10;
  score += worldCupGoals * 2;
  score += continentalCupGoldenBall.length * 10;
  score += continentalCupTopScorer.length * 5;
  score += continentalCupTopTOT.length * 10;
  score += worldCupTopTOT.length * 10;

  console.log(`Stuff score is ${score}`);

  return score;
};
