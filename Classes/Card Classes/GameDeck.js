import Deck from "./Deck.js";
import Card from "./Card.js";
import { SUITS, RANKS } from "./Suit and Ranks.js";

export default class GameDeck extends Deck {
  constructor() {
    super();
    for (let suit of SUITS) {
      for (let rank of RANKS) {
        this.cards.push(new Card(rank, suit));
      }
    }
    this.cards.push(new Card(0, 'Red', true)); //add two Joker Card, rank must be string.
    this.cards.push(new Card(0, 'Black', true));
    this.updateNumberOfCards=this.cards.length;
    super.updateNumberOfCards();
  }
}
