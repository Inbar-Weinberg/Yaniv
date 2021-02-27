import Player from "./Player.js";
import Round from "./Classes/Game Classes/Round.js.js";
import Turn from "./Classes/Game Classes/Turn.js.js";
import Player from "./Classes/Game Classes/Player.js.js";

export default class Game {
  /**
   *
   * @param {String[]} names An array of player names
   * @param {Number} maximumForYaniv The maximum score a player can call Yaniv. default is 7.
   * @param {Number} maxPointForPlayer The maximum point before a player is removed from the game.
   * @param {Number} cardsAtStart The amount of cards each player receives in the beginning of each round.
   */
  constructor(
    names,
    maximumForYaniv = 7,
    maxPointForPlayer = 200,
    cardsAtStart = 5
  ) {
    this.lastRoundWinner = undefined;
    this.maximumForYaniv = maximumForYaniv;
    this.maxPointForPlayer = maxPointForPlayer;
    this.players = []; // array of Player
    for (let i = 0; i < names.length; i++) {
      if (names[i]) {
        this.players.push(new Player(names[i]));
      }
    }
    this.numberOfPlayers = this.players.length;
  }

  updateNumberOfPlayers() {
    this.numberOfPlayers = this.players.length;
  }
  /**
   * @param  {Number[]} scores An array containing the scores of all player by order.
   */
  updateScores(scores) {
    for (let i = 0; i < this.numOfPlayers; i++) {
      this.players[i].changeScore(scores[i], this.maxPointForPlayer);
    }
  }
  /**
   * @description A method to removing loosing players from the last round and declare a game winner.
   * Does not deal with a tie in first place, for example if the two last players got 210 point each.
   * @returns {{winner: Player, lastRoundLosers: String}} An object describing the winner of the game and the losers of the last round
   */
  evaluateGameLooser() {
    //return an object {winner:Player,lastRoundLosers:String}
    let minScore = this.players[0].score;
    let minIndex = 0;
    let lastRoundLosers = "";
    All_Players_Went_Over_MaxPoints: {
      for (let i = 1; i < this.numberOfPlayers; i++) {
        if (this.players[i].score < minScore) {
          minIndex = i;
          minScore = this.players[i].score;
        }
      }
      if (minScore >= this.maxPointForPlayer) {
        for (let i = 0; i < this.numberOfPlayers; i++) {
          lastRoundLosers +=
            i === minIndex
              ? ""
              : i != this.numberOfPlayers - 1
              ? this.players[i].name + ", "
              : this.players[i].name;
        }

        return {
          winner: this.players[minIndex],
          lastRoundLosers: lastRoundLosers,
        };
      }
    }
    some_One_Did_Not_Go_Over: {
      //clean out losers
      for (let i = 0; i < this.numberOfPlayers; i++) {
        if (this.players[i].score > this.maxPointForPlayer) {
          lastRoundLosers +=
            this.numberOfPlayers != 2
              ? this.players[i].name
              : this.players[i].name + ", ";
          this.players.splice(i, 1);
          i--; // if array shortens do no move i up
          this.updateNumberOfPlayers();
        }
      }
      if (this.numberOfPlayers === 1)
        return { winner: this.players[0], lastRoundLosers };
    }
  }
  newRound(){
    return new Round(this.players, this.maximumForYaniv, this.cardsAtStart)
  }
}
