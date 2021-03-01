import Deck from "./Classes/Card Classes/Deck.js";
import GameDeck from "./Classes/Card Classes/GameDeck.js";
import Pile from "./Classes/Card Classes/Pile.js";
import PlayerHand from "./Classes/Card Classes/PlayerHand.js";

import Game from "./Classes/Game Classes/Game.js";

const startForm = document.getElementById("new-game-form");
const playingBoard = document.getElementById("playing-board");
let game;
let gameDeck;
let round;
let turn;

startForm.addEventListener("submit", startGame);

function startGame(event) {
  event.preventDefault();
  create_game: {
    const names = [];
    document.querySelectorAll(".player-name").forEach((input) => {
      if (input.value) {
        names.push(input.value);
        input.value = "";
      }
    });

    const maximumForYaniv = document.getElementById("maximum-for-yaniv").value;
    const maxPointForPlayer = document.getElementById(
      "maximum-points-for-player"
    ).value;
    const cardsAtStart = document.getElementById("cards-at-start").value;
    game = new Game(names, maximumForYaniv, maxPointForPlayer, cardsAtStart);
  }
  transition_to_playing_board: {
    startForm.style.display = "none";
    playingBoard.style.display = "grid";
  }
  startNewRound(game);
}
function startNewRound(game) {
  create_new_round: {
    round = game.newRound();
  }

  create_game_deck: {
    gameDeck = new GameDeck();
    gameDeck.shuffle();
    gameDeck.html = document.querySelector(".game-deck");
  }

  deal_cards: {
    round.players.forEach((player) => {
      for (let i = 0; i < game.cardsAtStart; i++) {
        player.hand.add("top", gameDeck.remove("top"));
      }
    });
  }
  startNewTurn(round);
}

function startNewTurn(round) {
  turn = round.newTurn();
  activateTurnGraphics();
}

function activateTurnGraphics() {
  const turnGraphics = [
    mainPlayerGraphics,
    twoPlayerGraphics,
    threePlayerGraphics,
  ];

  //turnGraphics[0]();
  //turnGraphics[1]();

  function mainPlayerGraphics() {
    const mainPlayer = document.querySelector(".main-player");
    turn.player.hand.cards.forEach((card) => {
      mainPlayer.append(createCardNode(card));
    });
  }

  function twoPlayerGraphics() {
    const nextPlayerDiv = document.querySelector(".top-player");
    turn.player.nextPlayer.hand.cards.forEach((card, index) => {
      nextPlayerDiv.append(
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black")
      );
    });
  }

  function threePlayerGraphics() {
    let nextPlayerDiv = document.querySelector(".side-player.left");
    turn.player.nextPlayer.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      nextPlayerDiv.append(cardNode);
      cardNode.style.transform = `rotate(90deg) translateX(${
        -5 - 20 * index
      }vh) translateY(-5vh)`;
    });

    nextPlayerDiv = document.querySelector(".side-player.right");
    turn.player.nextPlayer.nextPlayer.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      nextPlayerDiv.append(cardNode);
      cardNode.style.transform = `rotate(90deg) translateX(${
        -5 - 20 * index
      }vh) translateY(-5vh)`;
    });
  }

  function createCardNode(card, cardBack) {
    let cardNode = document.createElement("img");

    if (cardBack) {
      cardNode.setAttribute("src", `./Card Images/Back/${cardBack}.svg`);
      cardNode.setAttribute("alt", `${cardBack} back of card`);
    } else {
      cardNode.setAttribute("src", card.pictureSrc);
      cardNode.setAttribute("alt", `${card.rank} of ${card.suit}`);
    }
    return cardNode;
  }
}
