class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // BUILD QUERY
    // 1) Filtering
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'sortBy',
      'filterBy',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('name');
    }

    return this;
  }

  limitFields() {
    // Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginateIcons(icons) {
    // Pagination
    // if (this.queryString.page || this.queryString.limit) {
    //   const page = this.queryString.page * 1 || 1;
    //   const limit = this.queryString.limit * 1 || 20;

    //   this.query = this.query.skip((page - 1) * limit).limit(limit);
    // }

    // return this;

    if (this.queryString.page || this.queryString.limit) {
      const page = this.queryString.page * 1 || 1;
      const limit = this.queryString.limit * 1 || 20;

      // this.query = this.query.skip((page - 1) * limit).limit(limit);
      return icons.splice((page - 1) * limit, limit);
    }

    return icons;
  }

  sortByteams(teams) {
    if (!this.queryString.sortBy) return;

    const criteria = this.queryString.sortBy;

    switch (criteria) {
      case 'leagueTitles':
        teams.sort(
          (team1, team2) =>
            team2.leagueTitles.length - team1.leagueTitles.length,
        );
        break;
      case 'cupTitles':
        teams.sort(
          (team1, team2) => team2.cupTitles.length - team1.cupTitles.length,
        );
        break;
      case 'domesticSupercupTitles':
        teams.sort(
          (team1, team2) =>
            team2.domesticSupercupTitles.length -
            team1.domesticSupercupTitles.length,
        );
        break;
      case 'championsLeague':
        teams.sort(
          (team1, team2) =>
            team2.championsLeague.length - team1.championsLeague.length,
        );
        break;
      case 'uefaCup':
        teams.sort(
          (team1, team2) => team2.uefaCup.length - team1.uefaCup.length,
        );
        break;
      case 'uefaCupWinnersCup':
        teams.sort(
          (team1, team2) =>
            team2.uefaCupWinnersCup.length - team1.uefaCupWinnersCup.length,
        );
        break;
      case 'championsLeagueRunnerup':
        teams.sort(
          (team1, team2) =>
            team2.championsLeagueRunnerup.length -
            team1.championsLeagueRunnerup.length,
        );
        break;
      case 'uefaCupRunnerup':
        teams.sort(
          (team1, team2) =>
            team2.uefaCupRunnerup.length - team1.uefaCupRunnerup.length,
        );
        break;
      case 'uefaCupWinnersCupRunnerup':
        teams.sort(
          (team1, team2) =>
            team2.uefaCupWinnersCupRunnerup.length -
            team1.uefaCupWinnersCupRunnerup.length,
        );
        break;
      case 'uefaSuperCup':
        teams.sort(
          (team1, team2) =>
            team2.uefaSuperCup.length - team1.uefaSuperCup.length,
        );
        break;
      default:
        console.log('nimic');
    }
  }

  filterByNations(nations) {
    if (!this.queryString.filterBy) return nations;

    const filterList = this.queryString.filterBy.split(',');

    filterList.forEach((filter) => {
      // console.log(filter);
      nations = nations.filter((nation) => {
        let ok = false;
        // console.log(filter);
        switch (filter) {
          case 'worldCupTitles':
            if (nation.worldCupTitles.length > 0) ok = true;
            else ok = false;
            break;
          default:
            ok = true;
        }
        return ok;
      });
    });
    return nations;
  }

  filterByTeams(teams) {
    if (!this.queryString.filterBy) return teams;

    const filterList = this.queryString.filterBy.split(',');

    filterList.forEach((filter) => {
      // console.log(filter);
      teams = teams.filter((team) => {
        let ok = false;
        // console.log(filter);
        switch (filter) {
          case 'championsLeague':
            if (team.championsLeague.length > 0) ok = true;
            else ok = false;
            break;
          default:
            ok = true;
        }
        return ok;
      });
    });
    return teams;
  }

  filterByIcon(icons) {
    if (!this.queryString.filterBy) return icons;

    const filterList = this.queryString.filterBy.split(',');

    filterList.forEach((filter) => {
      // console.log(filter);
      icons = icons.filter((icon) => {
        let ok = false;
        // console.log(filter);
        switch (filter) {
          case 'ballonDor':
            // console.log(icon.ballonDor.winner);
            if (icon.ballonDor.winner.length > 0) {
              ok = true;
              // console.log(icon.ballonDor.winner.length);
            } else ok = false;
            break;
          case 'goldenShoe':
            // console.log(icon.ballonDor.winner);
            if (icon.goldenShoe.length > 0) {
              ok = true;
              // console.log(icon.goldenShoe.length);
            } else ok = false;
            break;
          case 'worldCup':
            // console.log(icon.nationalTeam.wordlCup);
            if (icon.nationalTeam.worldCup.length > 0) ok = true;
            else ok = false;
            break;
          case 'championsLeague':
            // let checkClub = false;
            icon.clubTeams.forEach((club) => {
              if (club.championsLeague.length > 0) {
                ok = true;
              }
            });
            // ok = checkClub;continentalCup
            break;
          case 'continentalCup':
            if (icon.nationalTeam.continentalCup.length > 0) ok = true;
            else ok = false;
            break;
          case 'midfielder':
            icon.positions.forEach((position) => {
              if (position === 'midfielder') ok = true;
            });
            break;
          case 'defender':
            icon.positions.forEach((position) => {
              if (position === 'defender') ok = true;
            });
            break;
          case 'striker':
            icon.positions.forEach((position) => {
              if (position === 'striker') ok = true;
            });
            break;
          case 'forward':
            icon.positions.forEach((position) => {
              if (position === 'forward') ok = true;
            });
            break;
          case 'winger':
            icon.positions.forEach((position) => {
              if (position === 'winger') ok = true;
            });
            break;
          case 'fullback':
            icon.positions.forEach((position) => {
              if (position === 'fullback') ok = true;
            });
            break;
          case 'goalkeeper':
            icon.positions.forEach((position) => {
              if (position === 'goalkeeper') ok = true;
            });
            break;
          default:
            ok = true;
        }
        return ok;
      });
    });
    return icons;
  }

  sortByIcon(icons) {
    if (!this.queryString.sortBy) return;

    const criteria = this.queryString.sortBy;

    //continentalCup worldCup
    switch (criteria) {
      case 'ballonDor':
        icons.sort(
          (icon1, icon2) =>
            icon2.ballonDor.winner.length - icon1.ballonDor.winner.length,
        );
        break;
      case 'continentalCup':
        icons.sort(
          (icon1, icon2) =>
            icon2.nationalTeam.continentalCup.length -
            icon1.nationalTeam.continentalCup.length,
        );
        break;
      case 'worldCup':
        icons.sort(
          (icon1, icon2) =>
            icon2.nationalTeam.worldCup.length -
            icon1.nationalTeam.worldCup.length,
        );
        break;
      case 'nationalGoals':
        icons.sort(
          (icon1, icon2) =>
            icon2.nationalTeam.goalsScored - icon1.nationalTeam.goalsScored,
        );
        break;
      case 'nationalGames':
        icons.sort(
          (icon1, icon2) =>
            icon2.nationalTeam.gamesPlayed - icon1.nationalTeam.gamesPlayed,
        );
        break;
      case 'nominations':
        icons.sort(
          (icon1, icon2) =>
            icon2.ballonDor.nominations.length -
            icon1.ballonDor.nominations.length,
        );
        break;
      case 'goldenShoe':
        icons.sort(
          (icon1, icon2) => icon2.goldenShoe.length - icon1.goldenShoe.length,
        );
        break;
      case 'championsLeagueTopScorer':
        icons.sort(
          (icon1, icon2) =>
            icon2.championsLeagueTopScorer.length -
            icon1.championsLeagueTopScorer.length,
        );
        break;

      case 'uefaCupTopScorer':
        icons.sort(
          (icon1, icon2) =>
            icon2.uefaCupTopScorer.length - icon1.uefaCupTopScorer.length,
        );
        break;
      case 'fantascore':
        icons.sort((icon1, icon2) => icon2.fantascore - icon1.fantascore);
        break;
      case 'careerGoals':
        icons.sort((icon1, icon2) => icon2.careerGoals - icon1.careerGoals);
        break;
      case 'careerGames':
        icons.sort((icon1, icon2) => icon2.careerGames - icon1.careerGames);
        break;
      case 'retired':
        icons.sort((icon1, icon2) => icon1.retired - icon2.retired);
        break;
      case 'worldCupGoals':
        icons.sort((icon1, icon2) => icon2.worldCupGoals - icon1.worldCupGoals);
        break;
      case 'careerLength':
        icons.sort((icon1, icon2) => icon2.careerLength - icon1.careerLength);
        break;
      case 'leagueTitles':
        icons.sort((icon1, icon2) => {
          let leagueCount1 = 0;
          let leagueCount2 = 0;

          // console.log(criteria);

          icon1.clubTeams.forEach((club) => {
            leagueCount1 += club.leagueTitles.length;
          });
          icon2.clubTeams.forEach((club) => {
            leagueCount2 += club.leagueTitles.length;
          });

          return leagueCount2 - leagueCount1;
        });
        break;
      case 'championsLeague':
        icons.sort((icon1, icon2) => {
          let leagueCount1 = 0;
          let leagueCount2 = 0;

          // console.log(criteria);

          icon1.clubTeams.forEach((club) => {
            leagueCount1 += club.championsLeague.length;
          });
          icon2.clubTeams.forEach((club) => {
            leagueCount2 += club.championsLeague.length;
          });

          return leagueCount2 - leagueCount1;
        });
        break;
      default:
        console.log('cv');
    }

    // return this;
  }
}

module.exports = APIFeatures;
