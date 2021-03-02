export default class Card {
  constructor(rank, suit, isJoker = false, isMarked = false) {
    this.rank = rank;
    this.suit = suit;
    this.isJoker = isJoker;
    this.isMarked = isMarked;
    set_picture: {
      let s = suit.charAt(0).toUpperCase();
      let r = isJoker ? "J" : rank;
      this.pictureSrc = `./Card Images/${r}${s}.svg`;
    }

    if (isJoker) this.cardValue = 0;
    else if (rank === "A") this.cardValue = 1;
    else if (rank === "J") this.cardValue = 11;
    else if (rank === "Q") this.cardValue = 12;
    else if (rank === "K") this.cardValue = 13;
    else this.cardValue = Number(rank);

  }
}
