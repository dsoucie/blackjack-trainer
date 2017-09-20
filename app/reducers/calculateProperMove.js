export default function calculateProperMove(dealersHand, playersHand, handMoves = false){
  console.log('inside calc proper Hand');
  const dealersUpCard = dealersHand.cards[0].value

  var isSplitable = false;
  var isAces = false;
  var is17OrOver = false;
  var is8orUnder = false;

  
  
  if (playersHand.cards[0].value == playersHand.cards[1].value) {
    isSplitable = true;
  } else {
    var aceCount = 0;
    playersHand.cards.forEach( (card) => {
      if (card.name == 'ace') {
        aceCount++
      }
    });
    aceCount > 0 ? isAces = true : null;
  }

  if (playersHand.cards.length != 2 && isAces) {
    console.log('inside isAces checker multiple cards')
    var valueWithoutAces = 0;
    playersHand.cards.forEach( (card) => {
      if (card.name != 'ace') {
        valueWithoutAces += card.value;
      }
    })
    if (valueWithoutAces > 10) {
      console.log('turning off isAces');
      isAces = false;
    }
  }

  if (!isSplitable && !isAces) {
    if (playersHand.handValue >= 17) {
      is17OrOver = true;
    } else if (playersHand.handValue <= 8) {
      is8orUnder = true;
    }
  }

  var properMove;

  if (!isSplitable && !isAces && !is17OrOver && !is8orUnder) {
    switch (dealersUpCard) {
      case 11: 
        properMove = 'hit';
        break;
      case 10:
        switch (playersHand.handValue) {
          case 16:
          case 15:
          case 14:
          case 13:
          case 12:
            properMove = 'hit';
            break;
          case 11:
            properMove = 'doubleDown';
            break;
          case 10:
          case 9:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru reg case 10';
        }
        break;
      case 9:
      case 8:
      case 7:
        switch (playersHand.handValue) {
          case 16:
          case 15:
          case 14:
          case 13:
          case 12:
            properMove = 'hit';
            break;
          case 11:
          case 10:
            properMove = 'doubleDown';
            break;
          case 9:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru reg case 7';
        }
        break;
      case 6:
        switch (playersHand.handValue) {
          case 16:
          case 15:
          case 14:
          case 13:
          case 12:
            properMove = 'stand';
            break;
          case 11:
          case 10:
            properMove = 'doubleDown';
            break;
          case 9:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru reg case 6';
        }
        break;
      case 5:
      case 4:
        switch (playersHand.handValue) {
          case 16:
          case 15:
          case 14:
          case 13:
          case 12:
            properMove = 'stand';
            break;
          case 11:
          case 10:
          case 9:
            properMove = 'doubleDown';
            break;
          default:
            properMove = 'fell thru reg case 4';
        }
      break;
      case 3:
        switch (playersHand.handValue) {
          case 16: 
          case 15:
          case 14:
          case 13:
            properMove = 'stand';
            break;
          case 12:
            properMove = 'hit';
            break;
          case 11:
          case 10:
          case 9:
            properMove = 'doubleDown';
            break;
          default:
            properMove = 'fell thru reg case 3';
        }
        break;
      case 2:
        switch (playersHand.handValue) {
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'stand';
            break;
          case 12:
            properMove = 'hit';
            break;
          case 11:
          case 10:
            properMove = 'doubleDown';
            break;
          case 9:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru reg case 2';
        }
    }
  }

  if (isAces && !isSplitable && !is17OrOver && !is8orUnder) {
    switch (dealersUpCard) {
      case 11:
      case 10:
      case 9:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
            properMove = 'stand';
            break;
          case 18:
          case 17:
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru aces case 9';
        }
        break;
      case 8:
      case 7:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
          case 18:
            properMove = 'stand';
            break;
          case 17:
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru aces case 7';
        }
        break;
      case 6:
      case 5:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
            properMove = 'stand';
            break;
          case 18:
          case 17:
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'doubleDown';
            break;
          default:
            properMove = 'fell thru aces case 5';
        }
        break;
      case 4:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
            properMove = 'stand';
            break;
          case 18:
          case 17:
          case 16:
          case 15:
            properMove = 'doubleDown';
            break;
          case 14:
          case 13:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru aces case 4';
        }
        break;
      case 3:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
            properMove = 'stand';
            break;
          case 18:
          case 17:
            properMove = 'doubleDown';
            break;
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru aces case 3';
        }
        break;
      case 2:
        switch (playersHand.handValue) {
          case 21:
          case 20:
          case 19:
          case 18:
            properMove = 'stand';
            break;
          case 17:
          case 16:
          case 15:
          case 14:
          case 13:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru aces case 2';
        }
        break;
    }
  }

  if (isSplitable && !isAces && !is17OrOver && !is8orUnder) {
    switch (dealersUpCard) {
      case 11:
      case 10:
        switch (playersHand.cards[0].value) {
          case 11:
            properMove = 'split';
            break;
          case 10:
          case 9:
            properMove = 'stand';
            break;
          case 8:
            properMove = 'split';
            break;
          case 7:
          case 6:
          case 5:
          case 4:
          case 3:
          case 2:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru splits case 10';
        }
        break;
      case 9:
      case 8:
        switch (playersHand.cards[0].value) {
          case 11:
            properMove = 'split';
            break;
          case 10:
            properMove = 'stand';
            break;
          case 9:
          case 8:
            properMove = 'split';
            break;
          case 7:
          case 6:
            properMove = 'hit';
            break;
          case 5:
            properMove = 'doubleDown';
            break;
          case 4:
          case 3:
          case 2:
            properMove = 'hit';
            break;
          default:
            properMove = 'fell thru splits case 8';
        }
        break;
      case 7:
        switch (playersHand.cards[0].value) {
          case 11:
            properMove = 'split';
            break;
          case 10:
          case 9:
            properMove = 'stand';
            break;
          case 8:
          case 7:
            properMove = 'split';
            break;
          case 6:
            properMove = 'hit';
            break;
          case 5:
            properMove = 'doubleDown';
            break;
          case 4:
            properMove = 'hit';
            break;
          case 3:
          case 2:
            properMove = 'split';
            break;
          default:
            properMove = 'fell thru splits case 7';
        }
        break;
      case 6:
      case 5:
        switch (playersHand.cards[0].value) {
          case 11:
            properMove = 'split';
            break;
          case 10:
            properMove = 'stand';
            break;
          case 9:
          case 8:
          case 7:
          case 6:
            properMove = 'split';
            break;
          case 5:
            properMove = 'doubleDown';
            break;
          case 4:
          case 3:
          case 2:
            properMove = 'split';
            break;
          default:
            properMove = 'fell thru splits case 5';
        }
        break;
      case 4:
      case 3:
      case 2:
        switch (playersHand.cards[0].value) {
          case 11:
            properMove = 'split';
            break;
          case 10:
            properMove = 'stand';
            break;
          case 9:
          case 8:
          case 7:
          case 6:
            properMove = 'split';
            break;
          case 5:
            properMove = 'doubleDown';
            break;
          case 4:
            properMove = 'hit';
            break;
          case 3:
          case 2:
            properMove = 'split';
            break;
          default:
            properMove = 'fell thru splits case 2';
        }
        break;
    }
  }

  if (is8orUnder && !isAces && !isSplitable && !is17OrOver) {
    properMove = 'hit';
  }

  if (is17OrOver && !isAces && !isSplitable && !is8orUnder) {
    properMove = 'stand';
  }

 if (!handMoves) {
   handMoves = {
     dealersUpCard: dealersUpCard,
     movesThisHand: [
       {
         playersHandValue: playersHand.handValue,
         properMove: properMove,
       }
     ],
   }
 } else {
   handMoves.movesThisHand.push({playersHandValue: playersHand.handValue,properMove: properMove})
 }

  return handMoves;
}