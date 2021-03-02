import Deck from "./Classes/Card Classes/Deck.js";
import GameDeck from "./Classes/Card Classes/GameDeck.js";
import Pile from "./Classes/Card Classes/Pile.js";
import PlayerHand from "./Classes/Card Classes/PlayerHand.js";

import Game from "./Classes/Game Classes/Game.js";
import Turn from "./Classes/Game Classes/Turn.js";
import Player from "./Classes/Game Classes/Player.js";
//import guiManager from "./guiManager.js";

const startForm = document.getElementById("new-game-form");
const playingBoard = document.getElementById("playing-board");
let game;
let gameDeck;
let round;
let turn;
let pile;
//let activePlayer;
let yanivButton;
let markedCards = [];
let newT;

startForm.addEventListener("submit", startGame, {
  once: false,
});

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
let guiManager = {
  topPlayerDiv: document.querySelector(".top-player"),
  leftPlayerDiv: document.querySelector(".side-player.left"),
  rightPlayerDiv: document.querySelector(".side-player.right"),
  mainDiv: document.querySelector(".active-player"),

  cleanUpGraphicsAfterTurn() {
    while (this.mainDiv.firstChild) {
      this.mainDiv.firstChild.dataset.clickAble = "false";
      alert(getEventListener(this.mainDiv));
      this.mainDiv.removeChild(mainDiv.firstChild);
    }
    while (topPlayerDiv.firstChild) {
      this.topPlayerDiv.removeChild(topPlayerDiv.firstChild);
    }
    while (leftPlayerDiv.firstChild) {
      this.leftPlayerDiv.removeChild(leftPlayerDiv.firstChild);
    }
    while (rightPlayerDiv.firstChild) {
      this.rightPlayerDiv.removeChild(rightPlayerDiv.firstChild);
    }
  },
  pileDeckGraphics() {
    pile.html.append(this.createCardNode(pile.topCard));
  },
  gameDeckGraphics() {
    gameDeck.topCardHtml = this.createCardNode(null, "black");
    gameDeck.html.append(gameDeck.topCardHtml);
  },
  activePlayerGraphics(activePlayer) {
    activePlayer.hand.cards.forEach((card) => {
      activePlayer.html.append(this.createCardNode(card));
      card.html.dataset.clickAble = "true";
    });
  },
  nonActivePlayerGraphics(activePlayer) {
    switch (game.numberOfPlayers) {
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

    function initTopDiv(player) {
      let nextPlayerDiv = this.topPlayerDiv;
      player.hand.cards.forEach((card, index) => {
        nextPlayerDiv.append(
          index % 2
            ? this.createCardNode(null, "Red")
            : this.createCardNode(null, "Black")
        );
      });
    }

    function initLeftDiv(player) {
      let nextPlayerDiv = this.leftPlayerDiv;
      player.hand.cards.forEach((card, index) => {
        let cardNode =
          index % 2
            ? this.createCardNode(null, "Red")
            : this.createCardNode(null, "Black");
        nextPlayerDiv.append(cardNode);
        cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
          4 * index
        }px) `;
      });
    }

    function initRightDiv(player) {
      let nextPlayerDiv = this.rightPlayerDiv;
      player.nextPlayer.hand.cards.forEach((card, index) => {
        let cardNode =
          index % 2
            ? this.createCardNode(null, "Red")
            : this.createCardNode(null, "Black");
        nextPlayerDiv.append(cardNode);
        cardNode.style.transform = `rotate(90deg) scale(6) translateX(${
          4 * index
        }px) `;
      });
    }
  },
  createCardNode(card, cardBack) {
    let cardNode = document.createElement("img");
    if (cardBack) {
      cardNode.setAttribute("src", `./Card Images/Back/${cardBack}.svg`);
      cardNode.setAttribute("alt", `${cardBack} back of card`);
    } else {
      cardNode.setAttribute("src", card.pictureSrc);
      cardNode.setAttribute("alt", `${card.rank} of ${card.suit}`);
      card.html = cardNode;
      cardNode.card = card;
    }
    return cardNode;
  },
};

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
    pile.add(gameDeck.remove("top"));
  }
  guiManager.pileDeckGraphics();
  guiManager.gameDeckGraphics();

  turn = round.newTurn();
  startNewTurn(turn);
}
function startNewTurn(turn) {
  let activePlayer = turn.player;

  activePlayer.html = document.querySelector(".active-player");
  guiManager.activePlayerGraphics(activePlayer);
  guiManager.nonActivePlayerGraphics(activePlayer);

  document.querySelector(".points-on-hand").innerText =
    "Points on hand: " + activePlayer.hand.points;
  activePlayer.html.addEventListener("click", markCards, {
    once: false,
  });

  function markCards(event) {
    let cardNode = event.target.closest("IMG");
    cardNode.card.isMarked = !cardNode.card.isMarked;
    cardNode.dataset.marked = cardNode.card.isMarked;
    markedCards = activePlayer.hand.updateMarkedCards(cardNode.card);
    document.querySelector(".points-of-marked").innerText = markedCards.length
      ? "Points of marked cards: " + activePlayer.hand.markedPoints
      : "";

    let legalCombo = activePlayer.hand.evaluateLegalCombination(markedCards);
    let throwButton = document.querySelector(".throw-button");
    throwButton.style.display = markedCards.length ? "block" : "none";
    if (legalCombo) {
      throwButton.innerText = "Throw cards";
      throwButton.dataset.legal = "true";
      throwButton.addEventListener("click", throwCardsFromHand, {
        once: false,
      });
    } else {
      throwButton.innerText = "Can't throw";
      throwButton.dataset.legal = "false";
      throwButton.removeEventListener("click", throwCardsFromHand);
    }
  }
  function throwCardsFromHand(event) {
    document.getElementById("yaniv-button").style.display = "none";
    activePlayer.html.removeEventListener("click", markCards);
    event.target.style.display = "none";

    gameDeck.topCardHtml.dataset.clickAble = "true";
    pile.topCard.html.dataset.clickAble = "true";

    markedCards.forEach((card) => {
      card.html.dataset.marked = "false";
      card.isMarked = false;
      activePlayer.html.removeChild(card.html);
    });
    update_points: {
      document.querySelector(".points-of-marked").innerText = "";
    }

    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "true";
      pile.firstCardOfSequence.html.addEventListener("click", drawCard, {
        once: false,
      });
    }

    gameDeck.topCardHtml.addEventListener("click", drawCard);
    pile.topCard.html.addEventListener("click", drawCard);
  }
  function drawCard(event) {
    event.stopPropagation();
    gameDeck.topCardHtml.removeEventListener("click", drawCard);
    gameDeck.html.removeEventListener("click", drawCard);

    pile.topCard.html.removeEventListener("click", drawCard);

    gameDeck.topCardHtml.dataset.clickAble = "false";
    pile.topCard.html.dataset.clickAble = "false";
    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "false";
      pile.firstCardOfSequence.html.removeEventListener("click", drawCard);
    }

    if (
      pile.lastAddedIsSequence &&
      event.target === pile.firstCardOfSequence.html
    ) {
      activePlayer.html.append(target);
      activePlayer.hand.add(pile.remove(pile.firstCardOfSequence));
      pile.html.removeChild(pile.topCard.html);
    }

    if (event.target === pile.topCard.html) {
      event.target.removeEventListener("click", drawCard);
      activePlayer.html.append(event.target);
      activePlayer.hand.add(pile.remove("top"));
    }
    if (event.target === gameDeck.topCardHtml) {
      let cardArr = gameDeck.remove("top");
      activePlayer.hand.add(cardArr);
      cardArr.forEach((card) =>
        activePlayer.html.append(guiManager.createCardNode(card))
      );
      pile.html.removeChild(pile.topCard.html);
    }
    addThrownCardToPile();
  }
  function addThrownCardToPile() {
    pile.add(activePlayer.hand.remove(markedCards));
    pile.topCard.html.dataset.clickAble = "false";
    pile.html.append(pile.topCard.html);
    if (pile.lastAddedIsSequence) {
      pile.firstCardOfSequence.html.dataset.clickAble = "false";
      pile.html.append(pile.firstCardOfSequence.html);
    }
    document.querySelector(".points-on-hand").innerText =
      "Points on hand: " + activePlayer.hand.points;
    markedCards = [];
    finishTurn();
  }
  function finishTurn() {
    let nextButton = document.getElementById("next-turn");
    nextButton.style.display = "block";
    nextButton.addEventListener("click", callNextTurn, { once: false });
  }

  function callNextTurn(event) {
    nextButton.removeEventListener("click", callNextTurn);
    nextButton.style.display = "none";
    newT = turn.nextTurn().nextTurn();
    alert(newT.player.name);
    startNewTurn(newT);
  }
}

/*
{
  yaniv_button: {
    yanivButton = document.getElementById("yaniv-button");
    if (activePlayer.canCallYaniv()) {
      yanivButton.style.display = "block";
      yanivButton.addEventListener("click", callYaniv, {
        once: false,
      });
      function callYaniv() {
        yanivButton.removeEventListener("click", callYaniv);
        alert("you called yaniv");
      }
    }
  }
}*/
