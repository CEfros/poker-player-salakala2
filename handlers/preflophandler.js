function getPlayer(gameState) {
  return gameState.players.find(el => el.hole_cards);
}

function isPairCards(gameState) {
    const player = getPlayer(gameState);
    return player.hole_cards[0].rank === player.hole_cards[1].rank;
}

function handlePreflop (gameState) {
  const player = getPlayer(gameState);
  console.log('player', player);

  if (isPairCards(gameState)) {
    const fakeCall = Math.random() > 0.5;

    if (fakeCall) {
      return gameState.current_buy_in;
    }

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
