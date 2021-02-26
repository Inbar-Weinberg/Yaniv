class PlayerHand {
  constructor() {
    super();
    this.points = 0;
    this.markedCards = [];
    this.markedPoints = 0;
  }
  remove(...cards) {
    let removed = super.remove(...cards);
    removed.sort((a, b) => a.cardValue - b.cardValue);
    for (let card of cards) {
      // maybe not needed
      card.cardValue = card.isJoker ? 0 : card.cardValue;
    }
    this.markedCards = [];
    this.points -= this.markedPoints;
    this.markedPoints = 0;

    return removed;
  }
  evaluateLegalCombination(...cards) {
    let cardsWithOutJokers = cards.filter((card) => !card.isJoker); // returns a new array without jokers
    let jokersInCards = cards.filter((card) => card.isJoker);
    if (cardsWithOutJokers.length <= 1) return true;
    const numOfJokers = jokersInCards.length;
    // the player is throwing out only one card that is not a joker

    if (areCardsSameRank) return true;

    if (!areCardsSameSuit) return false;

    let valuesMissingFromSequence = valuesMissingFromSequence();
    let holesInSequence = valuesMissingFromSequence.length;
    if (holesInSequence === 0) return true;
    if (holesInSequence > numOfJokers) return false;
    fillInHoles();
    return true;

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

    function valueMissingFromSequence() {
      // give the joker on hand the proper value to complete the sequence
      cardsWithOutJokers.sort((a, b) => a.cardValue - b.cardValue);
      valuesMissing = [];
      for (let i = 0; i < cardsWithOutJokers.length - 1; i++) {
        let thisCardValue = cardsWithOutJokers[i].cardValue;
        let nextCardValue = cardsWithOutJokers[i + 1].cardValue;
        if (thisCardValue - nextCardValue !== 1) {
          for (let value = thisCardValue + 1; value < nextCardValue; i++) {
            valuesMissing.push(value);
          }
        }
      }
    }
    function fillInHoles() {
      for (let i = 0; i < holesInSequence; i++) {
        jokersInCards[i].cardValue = valuesMissingFromSequence[i];
      }
    }
  }
  add(location, ...cards) {
    super.add(location, ...cards);
    this.points += card.isJoker ? 0 : card.cardValue > 10 ? 10 : card.cardValue;
  }

  updateMarkedCards(card) {
    if (card.isMarked) {
      this.markedCards.push(card);
      this.markedPoints += card.isJoker
        ? 0
        : card.cardValue > 10
        ? 10
        : card.cardValue;
      return;
    }
    if (!card.isMarked) {
      const index = this.markedCards.indexOf(card);
      if (index > 0) {
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
