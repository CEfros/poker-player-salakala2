function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function isPairCards(gameState) {
    const player = getPlayer(gameState);
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
}

function hasAceInHand(gameState) {
  return gameState.community_cards.some(el => el.rank === 'A');
}

function handlePreflop (gameState) {
  const player = getPlayer(gameState);
  console.log('player', player);
  console.log('gameState.current_buy_in', gameState.current_buy_in);
  console.log('player bet', player.bet);
  console.log('gameState.small_blind', gameState.small_blind);

  if (isPairCards(gameState)) {
    return player.stack;
  } else {
    return gameState.current_buy_in - player.bet + (gameState.small_blind * 4);
  }

  console.log('default preflop bet');
  return 0;
}

module.exports = {
  handlePreflop,
  getPlayer,
}
