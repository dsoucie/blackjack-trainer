export const soloReducerDefaultState = {
  shoe: [],
  shoePosition: 0,
  currentHand: 0,
  dealerHands: [],
  playerHands: [],
  chipBank: 10000,
  currentBet: 0,
  dealersTurn: false,
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
      var { shoe, shoePosition, dealerHands, dealersTurn } = state;
      var card = shoe[shoePosition];
      if (action.flip) {
        card.side = 'back';
      }
      dealerHands[0].cards.push(card);

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

      ////
      return {
        ...state,
        shoePosition: shoePosition + 1,
        dealerHands,
        dealersTurn,
      }    
      case 'DEAL_TO_PLAYER':
      var { shoe, shoePosition, playerHands, currentHand,
         dealersTurn} = state;
      var card = shoe[shoePosition];

      playerHands[currentHand].cards.push(card);
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

      if (action.doubleDown == true) {
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

      

      return {
        ...state,
        shoePosition: shoePosition + 1,
        playerHands,
        currentHand,
        dealersTurn,
      }
      case 'PLAYER_STANDS':
        var { currentHand, playerHands, dealersTurn} = state;
        playerHands[currentHand].status = 'standing'

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
        }
      case 'SET_DEALERS_TURN':
        return {
          ...state,
          dealersTurn: true,
        }
      case 'CLEAR_TABLE':
      var {playerHands, dealerHands, dealersTurn, currentHand, chipBank} = state;
      console.log('Clear table reducer chipChange', action.chipChange)  
      return {
          ...state,
          playerHands: [],
          dealerHands: [],
          dealersTurn: false,
          currentHand: 0,
          chipBank: chipBank + action.chipChange,
        }
      case 'SPLIT':
        var {currentHand, playerHands, currentBet, chipBank } = state;

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
    default:
      return state;
  }
}

export default soloReducer;

    // case 'SPLIT_HAND_DEALT':
    //   return {

    // }