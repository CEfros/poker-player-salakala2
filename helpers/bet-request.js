function isPreFlop(gameState) {
  if (!gameState.community_cards) {
    return true;
  }

  return gameState.community_cards.length === 0;
}

function isFlop(gameState) {
  if (!gameState.community_cards) {
    return true;
  }

  return gameState.community_cards.length === 3;
}

function isTurn(gameState) {
  if (!gameState.community_cards) {
    return true;
  }

  return gameState.community_cards.length === 4;
}

module.exports = {
  isPreFlop,
  isFlop,
  isTurn,
}
