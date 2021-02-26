class Pile {
  constructor() {
    super();
    this.lastAddedIsSequence = false;
    this.firstCardOfSequence = undefined;
    this.topCard = this.cards[this.numOfCards-1];
  }
  add(sequence, ...cards) {
    if (cards.length === 0) return;
    this.lastAddIsSequence = sequence ? true : false;
    this.firstCardOfSequence = sequence ? cards[0] : undefined;

    for (let card of cards) {
      if (card instanceof Card) {
        this.cards.push(card);
      }
    }
    this.numOfCards = this.cards.length;
    this.topCard = this.cards[this.numOfCards-1];
    return this.numOfCards;
  }
}
