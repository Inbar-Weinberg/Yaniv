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
    if (this.numOfCards === 0) return removed;
    Input_Is_String: {
      if (typeof cards === "string") {
        const location = string.toLowerCase(cards);
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
        this.numOfCards = this.cards.length;
        return removed;
      }
    }
    Input_Is_Single_Card: {
      if (cards instanceof Card) removeSingleCard(cards);
    }
    Input_Is_An_Array_Of_Cards: {
      if (cards instanceof Array) {
        for (let i = 0; i < cards.length; i++) {
          removeSingleCard(cards[i]);
        }
      }
    }
    this.numOfCards = this.cards.length;
    return removed;
    
    function removeSingleCard(card) {
      const index = this.cards.indexOf(card);
      if (index >= 0) {
        removed.push(this.cards.splice(index, 1));
      }
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
          default:
            this.cards.push(card);
        }
      }
    }
    this.numOfCards = this.cards.length;
    return this.numOfCards;
  }
}
