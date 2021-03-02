import Deck from "./Deck.js";
import Card from "./Card.js";

export default class Pile extends Deck {
  constructor() {
    super();
    this.lastAddedIsSequence = false;
    this.firstCardOfSequence = undefined;
    this.topCard = this.cards[this.numberOfCards - 1];
  }
  /**
   *
   * @param {boolean} sequence - true if the cards being added are in sequence false other wise.
   * @param  {Card[] | Card} cards - The card to add to the deck.
   * @return {Number} The new number of cards in the deck.
   */
  add(cards) {
    Input_Is_Single_Card: {
      if (cards instanceof Card) {
        addCard.call(this, cards);
        this.lastAddIsSequence = false;
        this.firstCardOfSequence = undefined;
      }
    }

    Input_Is_An_Array_Of_Cards: {
      let sequence = cards[0].rank != cards[cards.length - 1].rank;
      if (cards instanceof Array) {
        if (cards.length === 0) return;
        this.lastAddedIsSequence = sequence ? true : false;
        this.firstCardOfSequence = sequence ? cards[0] : undefined;
        cards.forEach((card) => this.cards.push(card));
      }
    }

    super.updateNumberOfCards();
    this.topCard = this.cards[this.numberOfCards - 1];
    return this.numberOfCards;
  }
}
