import Deck from "./Classes/Card Classes/Deck.js";
import GameDeck from "./Classes/Card Classes/GameDeck.js";
import Pile from "./Classes/Card Classes/Pile.js";
import PlayerHand from "./Classes/Card Classes/PlayerHand.js";

import Game from "./Classes/Game Classes/Game.js";
import Turn from "./Classes/Game Classes/Turn.js";

const startForm = document.getElementById("new-game-form");
const playingBoard = document.getElementById("playing-board");
let game;
let gameDeck;
let round;
let turn;
let pile;
let activePlayer;
let yanivButton;

startForm.addEventListener("submit", startGame);

function startGame(event) {
  event.preventDefault();
  startForm.removeEventListener("submit", startGame);

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
    pile = new Pile();
    pile.html = document.querySelector(".pile");
  }
  deal_cards: {
    round.players.forEach((player) => {
      for (let i = 0; i < game.cardsAtStart; i++) {
        player.hand.add(gameDeck.remove("top"), "top");
      }
    });
    pile.add(gameDeck.remove("top"), false);
  }
  startNewTurn(round);
}

function startNewTurn(round) {
  turn = round.newTurn();
  activePlayer = turn.player;

  activePlayer.html = document.querySelector(".active-player");
  activateTurnGraphics();
  activePlayer.html.addEventListener("click", markCards);
}

function activateTurnGraphics() {
  player_hand_Graphics: {
    activePlayer.hand.cards.forEach((card) => {
      activePlayer.html.append(createCardNode(card));
    });
    switch (
      game.numberOfPlayers //set up non active players
    ) {
      case 2:
        initTopDiv(activePlayer.nextPlayer);
        break;
      case 3:
        initLeftDiv(activePlayer.nextPlayer);
        initRightDiv(activePlayer.nextPlayer.nextPlayer);

        break;
      case 4:
        initLeftDiv(activePlayer.nextPlayer);
        initTopDiv(activePlayer.nextPlayer.nextPlayer);
        initRightDiv(activePlayer.nextPlayer.nextPlayer.nextPlayer);
        break;
    }
  }
  pile_deck: {
    pile.html.append(createCardNode(pile.topCard));
    gameDeck.html.append(createCardNode(null, "black"));
  }
  yaniv_button: {
    if (activePlayer.canCallYaniv()) {
      yanivButton = document.getElementById("yaniv-button");
      yanivButton.style.display = "block";
      yanivButton.addEventListener("click", callYaniv);
      function callYaniv() {
        yanivButton.removeEventListener("click", callYaniv);
        alert("you called yaniv");
      }
    }
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
      nextPlayerDiv.append(cardNode);
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
      cardNode.card = card;
    }
    return cardNode;
  }
}

function markCards(event) {
  let cardNode = event.target.closest("IMG");
  cardNode.card.isMarked = !cardNode.card.isMarked;
  cardNode.dataset.marked = cardNode.card.isMarked;
  let markedCards = activePlayer.hand.updateMarkedCards(cardNode.card);
  let legalCombo = activePlayer.hand.evaluateLegalCombination(markedCards);
  let throwButton = document.querySelector(".throw-button");
  throwButton.style.display = markedCards.length ? "block" : "none";
  if (legalCombo) {
    throwButton.innerText = "Throw cards";
    throwButton.dataset.legal = "true";
  } else {
    throwButton.innerText = "Can't throw";
    throwButton.dataset.legal = "false";
  }
}
