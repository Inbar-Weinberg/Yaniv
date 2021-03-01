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
  main_Player_Graphics: {
    const mainPlayer = document.querySelector(".main-player");
    turn.player.hand.cards.forEach((card) => {
      mainPlayer.append(createCardNode(card));
    });
  }

  switch (game.numberOfPlayers) {
    case 2:
      twoPlayerGraphics(turn.player.nextPlayer);
      break;
    case 3:
      threePlayerGraphics(turn.player.nextPlayer);
      break;
    case 4:
      fourPlayerGraphics();
      break;
  }

  function twoPlayerGraphics(player) {
    initTopDiv(player);
  }

  function threePlayerGraphics(player) {
    initLeftDiv(player);
    initRightDiv(player.nextPlayer);
  }
  function fourPlayerGraphics(player) {
    initLeftDiv(player);
    initTopDiv(player.nextPlayer);
    initRightDiv(player.nextPlayer.nextPlayer);
  }

  function initTopDiv(player) {
    const nextPlayerDiv = document.querySelector(".top-player");
    player.hand.cards.forEach((card, index) => {
      nextPlayerDiv.append(
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black")
      );
    });
  }

  function initLeftDiv(player) {
    let nextPlayerDiv = document.querySelector(".side-player.left");
    player.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      player.append(cardNode);
      cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
        4 * index
      }px) `;
    });
  }

  function initRightDiv(player) {
    let nextPlayerDiv = document.querySelector(".side-player.right");
    player.nextPlayer.hand.cards.forEach((card, index) => {
      let cardNode =
        index % 2 ? createCardNode(null, "Red") : createCardNode(null, "Black");
      nextPlayerDiv.append(cardNode);
      cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
        4 * index
      }px) `;
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
