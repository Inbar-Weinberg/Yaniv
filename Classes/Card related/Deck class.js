class Deck {
  constructor() {
    // deck top is last index of the cards array - more efficient
    this.cards = [];
    this.numOfCards = this.cards.length;
  }
  shuffle() {
    for (let i = 0; i < this.cards.length; i++) {
      swapAtRandom(i);
    }
    return this.cards;
    function swapAtRandom(i) {
      let index = Math.floor(Math.random() * this.cards.length);
      let temp = this.cards[index];
      this.cards[index] = this.cards[i];
      this.cards[i] = temp;
    }
  }
  /*
   * removes cards from deck accepts one of:
   * single string:"top","bottom","all but top"
   * single card
   * an array of cards
   * return the removed cards, in an array
   */
  remove(cards) {
    let removed = [];
    if (cards.length === 0 || this.numOfCards === 0) return;
    if (typeof cards === "string")
    for (let i = 0; i < cards.length; i++) {
      if (typeof cards[i] === "string") {
        const location = string.toLowerCase(cards[0]);
        switch (location) {
          case "top":
            removed.push(this.cards.pop());
            break;
          case "bottom":
            removed.push(this.cards.shift());
            break;
          case "all but top":
            removed = this.cards;
            this.cards = removed.pop;
            this.numOfCards = 1;
            return removed;
            break;
        }
      }

      if (cards[i] instanceof Card) {
        const index = this.cards.indexOf(cards[i]);
        if (index > 0) {
          removed.push(this.cards.splice(index, 1));
        }
      }
    }
    this.numOfCards = this.cards.length;
    return removed;
  }

  add(location, ...cards) {
    if (cards.length === 0) return;
    location =
      typeof location === "string" ? string.toLowerCase(location) : "top";
    for (let card of cards) {
      if (card instanceof Card) {
        switch (location) {
          case "top":
            this.cards.push(card);
            break;
          case "bottom":
            this.cards.unshift(card);
            break;
          default:
            this.cards.push(card);
        }
      }
    }
    this.numOfCards = this.cards.length;
    return this.numOfCards;
  }
}
