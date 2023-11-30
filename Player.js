class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState, bet) {
    console.log('gamestate Sala1: ', gameState);

    let amount = 0;
    if (isPreFlop(gameState)) {
      amount = handlePreflop(gameState);
    }

    bet(amount || 0);
  }

  static showdown(gameState) {
    console.log('showdown gameState', gameState);
  }
}

function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function isPairCards(gameState) {
  const player = getPlayer(gameState);
  return player.hole_cards[0] === player.hole_cards[1];
}

 function handlePreflop (gameState) {
  const player = getPlayer(gameState);
  console.log('player', player);

  if (isPairCards(gameState)) {
    return player.stack;
  }
}
function isPreFlop(gameState) {
  if (!gameState.community_cards) {
    return true;
  }

  return gameState.community_cards.length === 0;
}

module.exports = Player;
