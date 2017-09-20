import calculateProperMove from './calculateProperMove';

export const soloReducerDefaultState = {
  shoe: [],
  shoePosition: 0,
  currentHand: 0,
  dealerHands: [],
  playerHands: [],
  chipBank: 10000,
  currentBet: 0,
  dealersTurn: false,
  movesArray: [],
  handsPriorToDeal: 0,
  count: 0,
};

const soloReducer = (state = soloReducerDefaultState, action) => {
  switch (action.type) {
    case 'SHUFFLED_SHOE':
      return {
        ...state,
        shoe: action.shuffledShoe,
      };
    case 'PLACE_BET':
    var currentBet = state.currentBet;
    var newBet = currentBet + action.bet;
      return {
        ...state,
        currentBet: newBet,
      };
    case 'CREATE_PLAYER_HAND':
      var { playerHands, currentBet, currentHand, chipBank } = state;
      var newHand = {
        cards: [],
        status: '',
        betAmount: currentBet,
        handValue: 0,
        result: '',
      };
      playerHands = [
        ...playerHands.slice(0, currentHand + 1),
        newHand,
        ...playerHands.slice(currentHand + 1)
      ];
      return {
        ...state,
        playerHands,
        chipBank: chipBank - currentBet,
      }
    case 'CREATE_DEALER_HAND': 
      var { dealerHands, currentBet, currentHand } = state;
      var newHand = {
        cards: [],
        status: '',
        handValue: 0,
      };
      dealerHands = [
        ...dealerHands.slice(0, currentHand + 1),
        newHand,
        ...dealerHands.slice(currentHand + 1)
      ];
      return {
        ...state,
        dealerHands,
      }
    case 'DEAL_TO_DEALER':
      var { shoe, shoePosition, dealerHands, dealersTurn, playerHands, count, } = state;
      var card = shoe[shoePosition];
      
      if (action.flip) {
        card.side = 'back';
      }
      dealerHands[0].cards.push(card);
      if (dealerHands[0].cards.length != 2 ) {
        count += card.hiLo;
        console.log('adding dealers card to count')
      }
      ////
      var hand = dealerHands[0].cards;
      var handValue = 0;

      hand.forEach((card) => {
        if (card.name != 'ace') {
          handValue += card.value;
        }
      });
      hand.forEach((card) => {
        if (card.name == 'ace') {
          handValue += 11;
          if (handValue > 21) {
            handValue -= 10;
          }
        }
        
      });

      dealerHands[0].handValue = handValue;
      ////busts and blackjack
      dealerHands[0].handValue = handValue;
      if (handValue > 21) {
        dealerHands[0].status = 'busted';
      }

      if (dealerHands[0].cards.length == 2) {
        var aces = 0;
        var tens = 0;
        dealerHands[0].cards.forEach((card) => {
          if (card.name == 'ace') {
            aces++;
          }
          if (card.value == 10) {
            tens++
          }
        });

        if (aces == 1 && tens == 1) {
          dealerHands[0].status = 'blackjack';
          dealersTurn = true;
        }
      }
      ////end busts and blackjack

      return {
        ...state,
        shoePosition: shoePosition + 1,
        dealerHands,
        dealersTurn,
        count,
      }    
      case 'DEAL_TO_PLAYER':
      var { shoe, shoePosition, playerHands, currentHand,
         dealersTurn, dealerHands, movesArray, handsPriorToDeal, count  } = state;
      var card = shoe[shoePosition];
      var movesArrayCurrentHand = currentHand;
      playerHands[currentHand].cards.push(card);
      count += card.hiLo;
      console.log('adding players card to count')
      ////
      var hand = playerHands[currentHand].cards;
      var handValue = 0;

      hand.forEach((card) => {
        if (card.name != 'ace') {
          handValue += card.value;
        }
      });
      hand.forEach((card) => {
        if (card.name == 'ace') {
          handValue += 11;
          if (handValue > 21) {
            handValue -= 10;
          }
        }

      });

      if (playerHands[movesArrayCurrentHand].cards.length > 2) {
        movesArray[movesArrayCurrentHand + handsPriorToDeal].movesThisHand[movesArray[movesArrayCurrentHand + handsPriorToDeal].movesThisHand.length -1].actualMove = 'hit';
      }
      if (action.doubleDown == true) {
        movesArray[movesArrayCurrentHand + handsPriorToDeal].movesThisHand[movesArray[movesArrayCurrentHand + handsPriorToDeal].movesThisHand.length - 1].actualMove = 'doubleDown';
        playerHands[currentHand].status = 'standing';
        playerHands[currentHand].betAmount = (playerHands[currentHand].betAmount * 2)
        if (currentHand == playerHands.length - 1) {
          dealersTurn = true;
        } else {
          currentHand += 1;
        }
      }

      playerHands[currentHand].handValue = handValue;
      if (handValue > 21) {
        playerHands[currentHand].status = 'busted';
        if (currentHand == playerHands.length - 1) {
          dealersTurn = true;
        } else {
          currentHand += 1;
        }
      }

      if (playerHands[currentHand].cards.length == 2) {
        var aces = 0;
        var tens = 0;
        playerHands[currentHand].cards.forEach( (card) => {
          if (card.name == 'ace') {
            aces++;
          }
          if (card.value == 10) {
            tens++
          }
        });

        if (aces == 1 && tens == 1) {
          playerHands[currentHand].status = 'blackjack';
          if (currentHand == playerHands.length - 1) {
          } else {
            currentHand += 1;
          }
        }
      }

      //if 2nd card, make new moveArray, unless it already exists => define it
      //else, if more than 2 cards || already defined, => update it


      if (playerHands[currentHand].cards.length == 2 && typeof movesArray[handsPriorToDeal + currentHand] === 'undefined') {
        movesArray.push(calculateProperMove(dealerHands[0], playerHands[movesArrayCurrentHand], movesArray[handsPriorToDeal + movesArrayCurrentHand]));
        console.log('making new movesArray item');
      } else if (playerHands[currentHand].cards.length > 2 || typeof movesArray[handsPriorToDeal + currentHand] !== 'undefined' ) {
        console.log('updating existing movesArray item');
        movesArray[movesArrayCurrentHand + handsPriorToDeal] = calculateProperMove(dealerHands[0], playerHands[movesArrayCurrentHand], movesArray[handsPriorToDeal + movesArrayCurrentHand]);
      } else {
        console.warn('deal movesArray create/update fell thru');
      }
      

      return {
        ...state,
        shoePosition: shoePosition + 1,
        playerHands,
        currentHand,
        dealersTurn,
        movesArray: movesArray,
        count,
      }
      case 'PLAYER_STANDS':
        var { currentHand, playerHands, dealersTurn, handsPriorToDeal, movesArray} = state;
        playerHands[currentHand].status = 'standing'
        movesArray[currentHand + handsPriorToDeal].movesThisHand[playerHands[currentHand].cards.length - 2].actualMove = 'stand';

        movesArray[currentHand + handsPriorToDeal].movesThisHand.push({playersHandValue: playerHands[currentHand].handValue, properMove: 'none'});

        if (currentHand == playerHands.length - 1) {
          dealersTurn = true;
        } else {
          currentHand += 1;
        }

        return {
          ...state,
          currentHand,
          playerHands,
          dealersTurn,
          movesArray: movesArray,
        }
      case 'SET_DEALERS_TURN':
      var { count, dealerHands } = state;
      var card = dealerHands[0].cards[1];
      count += card.hiLo;
      console.log('adding dealers second card to count')
        return {
          ...state,
          dealersTurn: true,
          count,
        }
      case 'CLEAR_TABLE':
      var {playerHands, dealerHands, dealersTurn, currentHand, chipBank, handsPriorToDeal} = state;
      console.log('Clear table reducer chipChange', action.chipChange)  
      return {
          ...state,
          handsPriorToDeal: playerHands.length + handsPriorToDeal,
          playerHands: [],
          dealerHands: [],
          dealersTurn: false,
          currentHand: 0,
          chipBank: chipBank + action.chipChange,
        }
      case 'SPLIT':
      var { currentHand, playerHands, currentBet, chipBank, movesArray, handsPriorToDeal } = state;
        
      movesArray[currentHand + handsPriorToDeal].movesThisHand[playerHands[currentHand].cards.length - 2].actualMove = 'split';

        var handToSplit = {
          ...playerHands[currentHand]
        };

        var cardToMove = {
          ...handToSplit.cards[1],
        };

        handToSplit.cards.splice(1, 1);

        var newHand = {
          cards: [cardToMove],
          status: 'split',
          betAmount: currentBet,
          handValue: 0,
          moveArray: movesArray,
          handsPriorToDeal: handsPriorToDeal,
        }

        chipBank -= currentBet;

        playerHands = [
          ...playerHands.slice(0, currentHand),
          handToSplit,
          newHand,
          ...playerHands.slice(currentHand + 1),
        ]

        return {
          ...state,
          playerHands,
          chipBank,
        }
      case 'SPLIT_HAND_DEALT':
        var { playerHands, currentHand, } = state;

        playerHands[currentHand].status = '';
        return {
          ...state,
          playerHands,
        }
      case 'CLEAR_BET':
        return {
          ...state,
          currentBet: 0,
        }
      case 'UPDATE_WINNERS':

        return {
          ...state,
          playerHands: action.playerHands,
        }
    default:
      return state;
  }
}

export default soloReducer;

    // case 'SPLIT_HAND_DEALT':
    //   return {

    // }