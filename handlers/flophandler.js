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

  if (hasPair(allCards)) {
    return doBet(6);
  } else if (hasTwoPair(allCards)) {
    return doBet(8);
  } else if (hasTriple(allCards)) {
    return doBet(10);
  } else if (hasStraight) {
    return doBet(12);
  }

  return 0;
}

function doBet(smallBlindCount = 8) {
  return gameState.current_buy_in - gameState.players[gameState.in_action][gameState.bet] + (gameState.small_blind * smallBlindCount);
}

module.exports = {
  handleFlop,
}

