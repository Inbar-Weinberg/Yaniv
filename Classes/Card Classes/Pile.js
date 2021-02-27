import Deck from "./Deck.js";
import Card from './Card.js'

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
  add(sequence, cards) {
    Input_Is_Single_Card: {
      if (cards instanceof Card) {
        addCard(card);
        this.lastAddIsSequence = false;
        this.firstCardOfSequence = undefined;
      }
    }

    Input_Is_An_Array_Of_Cards: {
      if (cards instanceof Array) {
        if (cards.length === 0) return 0;
        this.lastAddIsSequence = sequence ? true : false;
        this.firstCardOfSequence = sequence ? cards[0] : undefined;
        for (let card of cards) {
          if (card instanceof Card) {
            addCard(card);
          }
        }
      }
    }

    this.updateNumberOfCards();
    this.topCard = this.cards[this.numberOfCards - 1];

    return this.numberOfCards;
    function addCard(card) {
      this.cards.push(card);
    }
  }
}
