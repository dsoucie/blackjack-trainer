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

export function dealToPlayer(doubleDown, split) {
  return {
    type: 'DEAL_TO_PLAYER',
    doubleDown,
    split,
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

export function clearTable(chipChange, playerHands) {
  return {
    type: 'CLEAR_TABLE',
    chipChange,
    playerHands,
  }
}

export function split() {
  return {
    type: 'SPLIT',
  }
}

export function splitHandDealt() {
  return {
    type: 'SPLIT_HAND_DEALT',
  }
}

export function clearBet() {
  return {
    type: 'CLEAR_BET',
  }
}

export function updateWinners(playerHands) {
  return {
    type: 'UPDATE_WINNERS',
    playerHands,
  }
}

// export function () {
//   return {
//     type: '',
//   }
// }