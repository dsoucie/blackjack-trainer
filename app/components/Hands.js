import React from 'react';

export default class Seat extends React.Component {

  render() {
    const { hands = [], who, dealersTurn, currentHand = 0 } = this.props;
    
    var seatClassName = `pocket ${who}`;
    
    return (
      <div className={seatClassName}>
        {hands.map((hand, index) => {

          var active;
          currentHand == index && who == 'player' ? active = 'active' : null;

          var handClassName = `hand ${active}`;

          return <div className={handClassName} key={index}>{hand.cards.map((card, index) => {
            return (dealersTurn || who != 'dealer' || index != 1) ? <img key={index} src={`https://s3-us-west-2.amazonaws.com/www.soucie.org/playingcards/${card.name}_of_${card.suit}.svg`} /> : <img key={index} className='cardImage' src='https://s3-us-west-2.amazonaws.com/www.soucie.org/playingcards/Card_back.svg' alt='card back' />
          })}</div>
        })}
      </div>
    );
  };
}
