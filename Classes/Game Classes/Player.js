import PlayerHand from "../Card Classes/PlayerHand.js";
export default class Player {
  /**
   * 
   * @param {String} name 
   * @param {Player} nextPlayer 
   */
  constructor(name = "John Doe", nextPlayer) {
    this.name = name;
    this.nextPlayer = 
    this.hand = new PlayerHand();
    this.score = 0;
  }
  static maximumForYaniv;

  /**
   *
   */
  changeScore(score, maxScore) {
    this.score = this.score === maxScore ? 0 : this.score + score;
    return this.score;
  }

  canCallYaniv() {
    return Player.maximumForYaniv >= this.hand.points;
  }

}
