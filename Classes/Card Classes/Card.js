export default class Card {
  constructor(rank, suit, isJoker = false, isMarked = false) {
    this.rank = rank;
    this.suit = suit;
    this.isJoker = isJoker;
    this.isMarked = isMarked;
    if (isJoker) this.cardValue = 0;
    else if (rank === "A") this.numValue = 1;
    else if (rank === "J") this.numValue = 11;
    else if (rank === "Q") this.numValue = 12;
    else if (rank === "K") this.numValue = 13;
    else this.cardValue = Number(rank);
  }
}
