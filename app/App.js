import React from 'react';
import cardDeck from './cardDeck';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      betInput: '',
    }
  }

  componentDidUpdate() {
    try {
      const { dealersTurn, dealerHands, playerHands, } = this.props.appState;

      const { setDealersTurn } = this.props;

      //did player completely bust out
      let bustCount = 0;
      playerHands.forEach( (hand) => {
        if (hand.status == 'busted') {
          bustCount++;
        }
      });
      var bustOut;
      bustCount == playerHands.length && bustCount != 0 ? bustOut = true : bustOut = false;
      //TODO DOES PLAYER HAVE BLACKJACK

      console.log('dealersTurn: ', dealersTurn);
      if (dealersTurn || bustOut) {
        if (dealerHands[0].handValue >= 17 || bustOut) {
          this.showdown();
        } else {
          setTimeout(() => {
            this.props.dealToDealer();
          }, 3000);
        }
      } else {
        var completedPlayerHandCount = 0;
        playerHands.forEach((hand) => {
          console.log('cphc', hand.status);
          if (hand.status != '') {
            completedPlayerHandCount++;
            console.log('completedPlayerHandCount:', completedPlayerHandCount)
          }
        });

        if (completedPlayerHandCount == playerHands.length && dealerHands[0].cards.length == 2) {
          setDealersTurn();
        }
      }
    } catch (e) {
      console.log('this error was thrown because hand doesn\'t exist yet. no worrores');
    }
    
  }

  showdown = () => {
    var {dealerHands, playerHands, chipBank } = this.props.appState;
    var dealersHand = dealerHands[0];
    var chipChange = 0;
    playerHands.forEach( (hand) => {
      var bet = hand.betAmount;
      console.log('hand.currentBet in showdown:', hand.betAmount)
      if (hand.status == 'blackjack' && dealersHand.status != 'blackjack') {
        console.log('blackjack! payout 3:2')
        bet = ((bet / 2) * 3) + bet;
        chipChange += bet;
      } else if (hand.status == 'blackjack' && dealersHand.status == 'blackjack') {
        console.log('its a bj push!');
        chipChange += bet;
      } else if (hand.status == 'busted') {
        console.log('player busts!')
        //do loss here
      } else if (dealersHand.status == 'busted' && hand.status != 'busted') {
        console.log('player wins!');
        chipChange += (2 * bet)
      } else if (dealersHand.handValue > hand.handValue) {
        console.log('dealer is closer to 21, dealer wins');
        //do loss here
      } else if (hand.handValue > dealersHand.handValue) {
        console.log('player is closer to 21, player wins!');
        chipChange += (2 * bet)
      } else if (hand.handValue == dealersHand.handValue) {
        console.log('same hand! push!');
        chipChange += bet;
      }
        else {
        console.log('UNANTICIPATED SHOWDOWN');
      }
    })

    setTimeout( () => {
      this.props.clearTable(chipChange);
    }, 5000);
  }

  handleChange = (e) => {
    const betInput = e.target.value;

    this.setState({
      betInput: betInput,
    });
  
  } 

  generateShuffledShoe = () => {
    var decks = 2;

    var shuffledDeck = [];

    var unshuffledDeck = [];

    for (let i = 1; i <= decks; i++) {
      cardDeck.forEach((card, index) => {
        var uid = ((i - 1) * 51) + index;
        let insert = {};
        insert.uid = uid;
        insert.hiLo = card.hiLo;
        insert.name = card.name;
        insert.suit = card.suit;
        insert.side = card.side;
        insert.value = card.value;
        unshuffledDeck.push(insert);
      });
    }

    while (unshuffledDeck.length > 0) {
      shuffledDeck.push(unshuffledDeck.splice(Math.floor(Math.random() * unshuffledDeck.length), 1));
    }

    shuffledDeck = [].concat.apply([], shuffledDeck);

    this.props.shuffleShoe(shuffledDeck);
  }

  initialShuffleAndDeal = () => {
    this.generateShuffledShoe();
    this.initialDeal();
  }

  initialDeal = () => {
    this.props.createDealerHand();
    this.props.createPlayerHand();
    setTimeout(() => {
      this.props.dealToPlayer();
      setTimeout(() => {
        this.props.dealToDealer();
        setTimeout(() => {
          this.props.dealToPlayer();
          setTimeout(() => {
            this.props.dealToDealer(true);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }

  clickPlaceBet = () => {
    const { shoe } = this.props.appState;

    if (shoe.length == 0) {
      this.props.placeBet(this.state.betInput);
      this.initialShuffleAndDeal();
    } else {
      this.props.placeBet(this.state.betInput);
      this.initialDeal();
    }
  }

  render() {
    const { 
      createPlayerHand,
      createDealerHand,
      placeBet,
      shuffleShoe,
      dealToDealer,
      dealToPlayer,
      stand,
                          } = this.props;

    const {
      dealerHands,
      playerHands,
      chipBank,
                          } = this.props.appState;


    const betInput = this.state.betInput;

    return (
      
      <div>
        <div className='displayArea'>
          <div className='seat'>
            <h2>Dealer's Hand</h2>
            <pre>{JSON.stringify(dealerHands, null, 2)}</pre>
          </div>
          <div className='seat'>
            <h2>Player's Hand</h2>
            <pre>{JSON.stringify(playerHands, null, 2)}</pre>
          </div>
        </div>
        <div className='buttonArea'>
          
          <input type='number' onChange={this.handleChange} value={betInput || ''} />
          <button onClick={this.clickPlaceBet}>Place Bet</button>
          <br />
          <button onClick={dealToPlayer.bind(null, true)}>Double Down</button>
          <br />
          <button onClick={dealToPlayer}>Hit</button>
          <br />
        <button onClick={stand}>Stand</button>
        </div>
       <p>ChipBank: {chipBank}</p>
      </div>
      
    );
  };
}

export default App;