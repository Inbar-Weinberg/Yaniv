import PlayerHand from "../Card Classes/PlayerHand.js";
export default class Player {
  constructor(name = "John Doe") {
    this.name = name;
    this.hand = new PlayerHand();
    this.score = 0;
  }
  /**
   *
   */
  changeScore(score, maxScore) {
    this.score = this.score === maxScore ? 0 : this.score + score;
    return this.score;
  }
}
