import React from 'react';
import cardDeck from './cardDeck';

//component import
import Header from './components/Header';
import Table from './components/Table';
import Hands from './components/Hands';
import Seat from './components/Seat';
import BettingArea from './components/BettingArea';
import Chips from './components/Chips';
import ChipBank from './components/ChipBank';

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidUpdate() {
    console.log('component did update');
    //define store stuff
    const { dealersTurn, dealerHands, playerHands, currentHand } = this.props.appState;

    const { setDealersTurn, splitHandDealt } = this.props;
    ////////
    //splits
    try {
      console.log('inside splits try');
      if (playerHands[currentHand].status == 'split') {
        
        setTimeout(() => {
          this.props.dealToPlayer();
        }, 500);
        splitHandDealt();

      } 
    } catch (error) {
      console.log('splits error:', error);
    }
    //////////
    //bustouts and blackjack outs
    var bustOut;
    try {
      let bustCount = 0;
      playerHands.forEach((hand) => {
        if (hand.status == 'busted' || hand.status == 'blackjack') {
          bustCount++;
        }
      });
      
      bustCount == playerHands.length && bustCount != 0 ? bustOut = true : bustOut = false;
    } catch (error) {
      console.log('bustouts error:', error);
    }
    ///////////
    //blackjack
    try {

    } catch (error) {
      console.log('blackjack error:', error);
    }
    try {
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
          if (hand.status != '' && hand.status != 'split') {
            completedPlayerHandCount++;
            console.log('completedPlayerHandCount:', completedPlayerHandCount)
          }
        });

        if (completedPlayerHandCount == playerHands.length && dealerHands[0].cards.length == 2) {
          setDealersTurn();
        }
      }
    } catch (e) {
      console.log('error was thrown in third try: ', e);
    }
    
  }

  showdown = () => {
    var {dealerHands, playerHands, chipBank } = this.props.appState;
    var dealersHand = dealerHands[0];
    var chipChange = 0;
    playerHands.forEach( (hand) => {
      var bet = hand.betAmount;
      console.log('hand.betAmount in showdown:', hand.betAmount)
      if (hand.status == 'blackjack' && dealersHand.status != 'blackjack') {
        console.log('blackjack! payout 3:2')
        bet = ((bet / 2) * 3) + bet;
        console.log('chipChange:', chipChange);
        chipChange += bet;
      } else if (hand.status == 'blackjack' && dealersHand.status == 'blackjack') {
        console.log('its a bj push!');
        chipChange += bet;
        console.log('chipChange:', chipChange);
      } else if (hand.status == 'busted') {
        console.log('player busts!');
        console.log('chipChange:', chipChange);
        //do loss here
      } else if (dealersHand.status == 'busted' && hand.status != 'busted') {
        console.log('player wins!');
        chipChange += (2 * bet)
        console.log('chipChange:', chipChange);
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

    console.log('showdown chipChange Passed', chipChange);
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
      this.initialShuffleAndDeal();
    } else {
      this.initialDeal();
    }
  }

  clickSplit = () => {
    console.log('split clicked');
    const { playerHands, currentHand } = this.props.appState;
    const { split, dealToPlayer } = this.props;

    if (playerHands[currentHand].cards.length == 2 && 
      playerHands[currentHand].cards[0].value == playerHands[currentHand].cards[1].value
    ) {
      console.log('split executing');
      split();
      setTimeout( () => {
        dealToPlayer();
      }, 500);
    }
  }

  clickDoubleDown = () => {
    console.log('doubling Down')
    const { playerHands, currentHand } = this.props.appState;
    const { dealToPlayer } = this.props;


    if (playerHands[currentHand].cards.length == 2 ) {
      dealToPlayer(true);
    } else {
      console.log('can\'t double down if you already hit');
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
      clearBet
                          } = this.props;

    const {
      dealerHands,
      playerHands,
      chipBank,
      dealersTurn,
      currentHand,
      currentBet,
                          } = this.props.appState;


    var betButton = <div className='BetButton'></div>;
    var betInputField = <div className='BetButton'></div>; 
    var splitButton = <div className='BetButton'></div>;
    var doubleDownButton = <div className='BetButton'></div>;
    var hitButton = <div className='BetButton'></div>;
    var standButton = <div className='BetButton'></div>;
    var allTheButtons;

    


    if (playerHands.length >= 1) {
      hitButton = <div className='BetButton' onClick={dealToPlayer}>Hit</div>;
      standButton = <div className='BetButton' onClick={stand}>Stand</div>;
    }

    if (playerHands.length < 1) {
      betButton = 
      <div>
        <div className='BetButtonContainer'>
          <div className='BetButton'onClick={this.clickPlaceBet}>Bet: ${currentBet}</div>
          <div className='BetButton ClearButton' onClick={clearBet} >Clear Bet</div> 
        </div>
        <BettingArea
          currentBet={currentBet}
          placeBet={placeBet}
          clearBet={clearBet}
        />
      </div>;
      
    } else if (playerHands[currentHand].cards.length == 2) {
      doubleDownButton = <div className='BetButton' onClick={this.clickDoubleDown}>Double Down</div>;
      if (playerHands[currentHand].cards[0].value == playerHands[currentHand].cards[1].value) {
        splitButton = <div className='BetButton' onClick={this.clickSplit}>Split</div>;
      }
    }
    
    if (playerHands.length == 0 ) {
      allTheButtons = betButton
    } else {
      allTheButtons = 
      <div className='buttonArea'>
        {/*all buttons only appear when needed*/}
        {splitButton}
        {doubleDownButton}
        {hitButton}
        {standButton}
      </div>
    }
    
    return (
      

      <div className='App'>
        <Header />
        <div className='Table'>
          <Seat 
            hands={dealerHands}
            dealersTurn={dealersTurn}
            who='dealer'
            currentHand={currentHand}
          />
          <Seat 
            hands={playerHands}
            dealersTurn={dealersTurn}
            who='player'
            currentHand={currentHand}
          />
        </div>
        
        {allTheButtons}

        <ChipBank chipBank={chipBank}/>

      </div>
      
    );
  };
}

export default App;