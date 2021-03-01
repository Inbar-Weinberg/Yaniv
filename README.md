# Inbar's Yaniv Game

![Flow chart of Yaniv Game](https://github.com/Inbar-Weinberg/Yaniv/blob/master/Yaniv%20Game%20Plan.svg)

## Start Game:

    1. Create array of player names.
    2. Create new Game object.
    3. Create new GameDeck (deck with 54 cards).
    4. Call startNewRound(game) function.

## Start Round:

    1. Create new Round.
    2. Create game deck.
    3. Deal cards to each player.
    4. Create new Turn.

## Start Turn:

    1. Initiate start of turn graphics.

## Notes for clean up:

    - this.cardsAtStart = cardsAtStart;//maybe not needed
    - use declarative functions

## Things I learned the hard way:
    1. If I declare a variable inside a label (lable:{..code}) then its is only in the scope of that code.
    2. Can't call a class's (non static) method from inside the class.
    3. if I want to use a function inside a class declare it with regularly with function func()...
    4. 
