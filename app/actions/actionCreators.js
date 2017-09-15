export function shuffleShoe(shuffledShoe) {
  return {
    type: 'SHUFFLED_SHOE',
    shuffledShoe,
  }
}

export function placeBet(bet) {
  return {
    type: 'PLACE_BET',
    bet: Number(bet),
  }
}

export function createPlayerHand() {
  return {
    type: 'CREATE_PLAYER_HAND',
  }
}

export function createDealerHand() {
  return {
    type: 'CREATE_DEALER_HAND',
  }
}

export function dealToPlayer(doubleDown) {
  return {
    type: 'DEAL_TO_PLAYER',
    doubleDown,
  }
}

export function dealToDealer(flip) {
  
  return {
    type: 'DEAL_TO_DEALER',
    flip,
  }
}

export function stand() {
  return {
    type: 'PLAYER_STANDS',
  }
}

export function setDealersTurn() {
  return {
    type: 'SET_DEALERS_TURN',
  }
}

export function clearTable(chipChange) {
  return {
    type: 'CLEAR_TABLE',
    chipChange,
  }
}


// export function () {
//   return {
//     type: '',
//   }
// }