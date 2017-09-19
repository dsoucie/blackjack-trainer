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
            return (dealersTurn || who != 'dealer' || index != 1) ? <img key={index} src={require(`../cardImages/${card.name}_of_${card.suit}.svg`)} /> : <img key={index} className='cardImage' src={require(`../cardImages/Card_back.svg`)} alt='card back' />
          })}
            <div className='resultPanel' >{hand.result}</div>
          </div>
        })}
      </div>
    );
  };
}
