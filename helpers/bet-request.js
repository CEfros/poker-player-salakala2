function isPreFlop(gameState) {
  if (!gameState.community_cards) {
    return true;
  }

  return gameState.community_cards.length === 0;
}

module.exports = {
  isPreFlop,
}
