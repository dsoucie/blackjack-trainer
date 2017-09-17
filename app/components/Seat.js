import React from 'react';

import Hands from './Hands';

export default class Seat extends React.Component {

  render() {
    const { hands = [], who, dealersTurn, currentHand = 0 } = this.props;

    var className = `Seat`

    return (
      <div className={className} >
        <Hands
          hands={hands}
          dealersTurn={dealersTurn}
          who={who}
          currentHand={currentHand}
        />
      </div>
      
    );
  };
}