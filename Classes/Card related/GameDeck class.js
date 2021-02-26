class GameDeck {
  constructor() {
    super();
    const suits = ["spades", "diamonds", "clubs", "hearts"];
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    for (let suit of suits) {
        for (let value of values){
            this.cards.push(new Card(suit,value));
        }
    }
    this.cards.push(new Card(0,0,true));
    this.cards.push(new Card(0,0,true));
    this.numOfCards = this.cards.length;
  }
}
