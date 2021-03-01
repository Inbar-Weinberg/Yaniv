import Player from "./Player.js";
export default class Turn {
  constructor(player) {
    this.player = player;
  }



  nextTurn() {
    return new Turn(player.nextTurn);
  }
}
