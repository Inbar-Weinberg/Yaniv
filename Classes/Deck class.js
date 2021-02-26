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
   * removes cards from deck accepts the strings:"top","bottom","all but top" or any cards in the deck
   * return the removed cards, in array if more then 1 else as a card.
   */
  remove(...cards) {
    let removed = [];
    if (cards.length === 0 || this.numOfCards === 0) return;
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
            break;
        }
      }

      if (cards[i] instanceof Card) {
        const index = this.cards.indexOf(cards[i]);
        if (index > 0) removed.push(this.cards.splice(index, 1));
      }
      this.numOfCards = this.cards.length;
      if (removed.length === 1) return removed[0];
      return removed;
    }
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
        }
      }
    }
    this.numOfCards = this.cards.length;
    return this.numOfCards;
  }
}
