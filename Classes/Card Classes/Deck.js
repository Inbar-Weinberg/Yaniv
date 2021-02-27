import Card from './Card.js'
export default class Deck {
  constructor() {
    // deck top is last index of the cards array - more efficient
    this.cards = [];
    this.numberOfCards = this.cards.length;
  }
  /**
   * @description Shuffles the deck at random.
   */
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

  /**
   * @description Removes cards from 'this' deck.
   * @param {String|Card[]|Card} cards - One of: single string:"top","bottom","all but top", single Card, an array of Cards.
   * @returns {Card[]} An array of the removed cards.
   */
  remove(cards) {
    let removed = [];
    if (this.numberOfCards === 0) return removed;
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
        this.updateNumberOfCards();
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
    this.updateNumberOfCards();

    return removed;

    function removeSingleCard(card) {
      const index = this.cards.indexOf(card);
      if (index >= 0) {
        removed.push(this.cards.splice(index, 1));
      }
    }
  }

  /**
   * @description Adds cards to 'this' deck
   * @param {String} location - Where to add cards, top or bottom.
   * @param {Card[] | Card} cards - The cards to add to the deck.
   * @return {Number} The new number of cards in the deck.
   */
  add(location, cards) {
    Validate_location: {
      location =
        typeof location === "string" ? string.toLowerCase(location) : "top";
    }
    Input_Is_Single_Card: {
      if (cards instanceof Card) {
        addCard(card);
      }
    }
    Input_Is_An_Array_Of_Cards: {
      if (cards instanceof Array) {
        if (cards.length === 0) return;
        for (let card of cards) {
          if (card instanceof Card) {
            //Validate o
            addCard(card);
          }
        }
      }
    }
    this.updateNumberOfCards();
    return this.numberOfCards;

    function addCard(card) {
      switch (location) {
        case "bottom":
          this.cards.unshift(card);
          break;
        default:
          // same as case"top"
          this.cards.push(card);
      }
    }
  }

  updateNumberOfCards() {
    this.numberOfCards = this.cards.length;
  }
}
