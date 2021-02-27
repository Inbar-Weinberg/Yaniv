import Deck from './Deck.js'
import Card from './Card.js'

export default class GameDeck extends Deck{
  constructor() {
    super();
    const suits = ["spades", "diamonds", "clubs", "hearts"];
    const ranks = [
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
        for (let rank of ranks){
            this.cards.push(new Card(rank,suit));
        }
    }
    this.cards.push(new Card(0,0,true));//add two Joker Card
    this.cards.push(new Card(0,0,true));
    super.updateNumberOfCards();
  }
}
