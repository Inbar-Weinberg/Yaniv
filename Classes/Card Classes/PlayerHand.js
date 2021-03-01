import Deck from "./Deck.js";
import Card from "./Card.js";

export default class PlayerHand extends Deck {
  constructor() {
    super();
    this.points = 0;
    this.markedCards = [];
    this.markedPoints = 0;
  }
  /**
   * @description Removes cards from 'this' deck.
   * @param {String|Card[]|Card} cards - One of: single string:"top","bottom","all but top", single Card, an array of Cards.
   * @returns {Card[]} An array of the removed cards ordered in sequence, jokers are set to enable a legal sequence.
   */
  remove(cards) {
    let removed = super.remove(cards);
    removed.sort((a, b) => a.cardValue - b.cardValue);
    for (let card of cards) {
      card.cardValue = card.isJoker ? 0 : card.cardValue;
    }
    this.markedCards = [];
    this.points -= this.markedPoints;
    this.markedPoints = 0;

    return removed;
  }
  /**
   * @description evaluate if the cards the player wants to play are a legal play.
   * Takes Jokers in consideration.
   * @param  {Card[]} cards - The card to evaluate.
   * @returns {Boolean} true if the marked cards are a legal combination.
   */
  evaluateLegalCombination(cards) {
    if (cards.length === 0) return false; // no cards marked.
    let cardsWithOutJokers = cards.filter((card) => !card.isJoker); // returns a new array without jokers
    let jokersInCards = cards.filter((card) => card.isJoker);
    const numOfJokers = jokersInCards.length;

    Single_Card_Play: {
      if (cardsWithOutJokers.length <= 1) return true; // the player is throwing out only one card that is not a joker
    }
    All_Cards_Are_Same_Rank: {
      if (areCardsSameRank()) return true;
    }
    at_least_three_cards_picked: {
      if (cards.length < 3) return false;
    }
    Cards_Form_A_Sequence: {
      if (!areCardsSameSuit()) return false;

      let valuesMissingFromSequence = evaluateValuesMissingFromSequence();
      let holesInSequence = valuesMissingFromSequence.length;
      if (holesInSequence === 0) return true;
      if (holesInSequence > numOfJokers) return false;
      fillInHoles();
      return true;
    }

    function areCardsSameRank() {
      for (let card of cardsWithOutJokers) {
        if (cardsWithOutJokers[0].rank != card.rank) return false;
      }
      return true;
    }
    function areCardsSameSuit() {
      for (let card of cardsWithOutJokers) {
        if (cardsWithOutJokers[0].suit != card.suit) return false;
      }
      return true;
    }

    function evaluateValuesMissingFromSequence() {
      // give the joker on hand the proper value to complete the sequence
      cardsWithOutJokers.sort((a, b) => a.cardValue - b.cardValue);
      let valuesMissing = [];
      for (let i = 0; i < cardsWithOutJokers.length - 1; i++) {
        let thisCardValue = cardsWithOutJokers[i].cardValue;
        let nextCardValue = cardsWithOutJokers[i + 1].cardValue;
        if (thisCardValue - nextCardValue !== 1) {
          for (let value = thisCardValue + 1; value < nextCardValue; i++) {
            valuesMissing.push(value);
          }
        }
      }
      return valuesMissing;
    }

    function fillInHoles() {
      for (let i = 0; i < holesInSequence; i++) {
        jokersInCards[i].cardValue = valuesMissingFromSequence[i];
      }
    }
  }
  /**
   * @description Adds cards to 'this' deck, update point in hand for every card ader
   * @param {String} location - Where to add cards, top or bottom.
   * @param {Card[] | Card} cards - The cards to add to the deck.
   * @return {Number} The new number of cards in the deck.
   */
  add(cards, location) {
    Validate_location: {
      location = typeof location === "string" ? location.toLowerCase() : "top";
    }
    Input_Is_Single_Card: {
      if (cards instanceof Card) {
        addCard.call(this, cards);
      }
    }
    Input_Is_An_Array_Of_Cards: {
      if (cards instanceof Array) {
        if (cards.length === 0) return;
        for (let card of cards) {
          if (card instanceof Card) {
            //Validate o
            addCard.call(this, card);
          }
        }
      }
    }
    super.updateNumberOfCards();
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
      this.points += card.isJoker
        ? 0
        : card.cardValue > 10
        ? 10
        : card.cardValue;
    }
  }

  /**
   * @description runs every time a player picks a card from their hand.
   * @param {Card} card - A Card in the player's hand after the player marks it.
   * @returns {Card[]} An array of all marked cards in the players hand.
   */

  updateMarkedCards(card) {
    if (card.isMarked) {
      this.markedCards.push(card);
      this.markedPoints += card.isJoker
        ? 0
        : card.cardValue > 10
        ? 10
        : card.cardValue;
      return this.markedCards;
    }
    if (!card.isMarked) {
      const index = this.markedCards.indexOf(card);
      if (index >= 0) {
        this.markedCards.splice(index, 1);
        this.markedPoints -= card.isJoker
          ? 0
          : card.cardValue > 10
          ? 10
          : card.cardValue;
        if (card.isJoker) card.cardValue = 0;
      }
    }
    return this.markedCards;
  }
}
