import Player from "./Player.js";
export default class Round {
  /**
   *
   * @param {Player[]} players An array of all active game players
   * @param {Number} maximumForYaniv The maximum score a player can call Yaniv. default is 7.
   * @param {Number} cardsAtStart The amount of cards each player receives in the beginning of each round.
   * @param {Player} lastRoundWinner
   */
  constructor(
    players,
    maximumForYaniv,
    cardsAtStart,
    lastRoundWinner = players[0]
  ) {
    this.players = players;
    this.maximumForYaniv = maximumForYaniv;
    this.cardsAtStart = cardsAtStart;
    this.firstPlayer = lastRoundWinner;
    this.numberOfPlayers = this.players.length;
  }
  updateNumberOfPlayers() {
    this.numberOfPlayers = this.players.length;
  }

  /**
   * @description Evaluates round scores and declares a round's winner.
   * If two players are tied for the score the player with the lower index will be declared round winner.
   * @param {Player} player The player that called yaniv.
   * @return {{winner: Player, scores: Number[]}} An object describing the winner of the round and the scores of all players.
   */
  evaluateRoundWinner(player) {
    let asaf = false;
    let minIndex = 0;
    let scores = [];
    find_winner: {
      for (let i = 0; i < this.numberOfPlayers; i++) {
        if (this.players[i].hand.points < this.players[minIndex].hand.points) {
          minIndex = i;
        }
        scores.push(this.players[i].hand.points);
      }
    }
    is_Asaf: {
      if (
        this.players[minIndex].hand.points <= player.hand.points &&
        player != this.player[minIndex]
      ) {
        asaf = true;
        scores[this.players.indexOf(player)] + 30;
      }
    }
    return {winner: player[minIndex], scores: scores};  
  }
}
