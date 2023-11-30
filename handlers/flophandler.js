const {
  hasPair,
  hasTwoPair,
  hasTriple,
  hasStraight,
} = require('../helpers/hand-analyser');

function getAllCards(gameState) {
  const player = getPlayer(gameState);

  return [
    ...player.hole_cards,
    ...gameState.community_cards,
  ]
}

function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function handleFlop (gameState) {
  const allCards = getAllCards(gameState);
  const player = getPlayer(gameState);

  // continuatio bet
  if (gameState.current_buy_in === 0) {
    return doBet(4, player);
  }

  if (hasPair(allCards)) {
    return doBet(6, player);
  } else if (hasTwoPair(allCards)) {
    return doBet(8, player);
  } else if (hasTriple(allCards)) {
    return doBet(10, player);
  } else if (hasStraight) {
    return doBet(12, player);
  }

  return 0;
}

function doBet(smallBlindCount = 8, player) {
  return gameState.current_buy_in - player.bet + (gameState.small_blind * smallBlindCount);
}

module.exports = {
  handleFlop,
}

