class Game {
  constructor(
    names, // an array of strings
    minimumForYaniv = 7,
    maxPointForPlayer = 200,
    cardsAtStart = 5
  ) {
    this.lastRoundWinner = undefined;
    this.minimumForYaniv = minimumForYaniv;
    this.maxPointForPlayer = maxPointForPlayer;
    this.players = []; // array of Player
    for (let i = 0; i < names.length; i++) {
      if (names[i]) {
        this.players[i] = new Player(names[i]);
      }
    }
    this.numberOfPlayers = this.players.length;
  }
  updateScores(...scores) {
    for (let i = 0; i < this.numOfPlayers; i++) {
      this.players[i].score += scores[i];
    }
  }

  evaluateLooser() {
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
      if (minScore >= maxPointForPlayer) {
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
      for (let i = 0; i < this.numberOfPlayers; i++) {
        if (players[i].score > maxPointForPlayer) {
          lastRoundLosers +=
            this.numberOfPlayers != 2
              ? this.players[i].name
              : this.players[i].name + ", ";
          players.splice(i, 1);
          i--; // if array shortens do no move i up
          this.numberOfPlayers = this.players.length;
        }
      }
    }
  }
}
