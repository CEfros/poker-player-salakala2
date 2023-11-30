const {
  hasPair,
  hasTwoPair,
  hasTriple,
  hasStraight,
  hasFlush,
  hasFourOfAKind,
  hasFullHouse,
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

  // continuation bet
  if (gameState.current_buy_in === 0) {
    return doBet(4, player);
  }

  if (hasPair(allCards)) {
    return doBet(4, player, gameState);
  } else if (hasTwoPair(allCards)) {
    return doBet(6, player, gameState);
  } else if (hasTriple(allCards)) {
    return doBet(8, player, gameState);
  } else if (
    hasStraight(allCards) ||
    hasFlush(allCards) ||
    hasFourOfAKind(allCards) ||
    hasFullHouse(allCards)
  ) {
    return doBet(10, player, gameState);
  }

  return 0;
}


function doBet(smallBlindCount = 8, player, gameState) {
  return gameState.current_buy_in - player.bet + (gameState.small_blind * smallBlindCount);
}

module.exports = {
  handleFlop,
}

