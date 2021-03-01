import Player from "./Player.js";
export default class Turn {
  constructor(player) {
    this.player = player;
  }

  canCallYaniv() {
    return Player.maximumForYaniv >= this.player.hand.points;
  }

  nextTurn() {
    return new Turn(player.nextTurn);
  }
}
