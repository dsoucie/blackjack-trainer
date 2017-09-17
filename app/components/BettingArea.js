import React from 'react';
import Chips from './Chips';
export default class BettingArea extends React.Component {

  render() {
    const { currentBet, placeBet } = this.props;
    return (
      <div className='BettingArea' >
        <div className='chipContainer' >
          <Chips
            amount={5}
            placeBet={placeBet}
            color='red'
          />
          <Chips
            amount={25}
            placeBet={placeBet}
            color='green'
          />
          <Chips
            amount={50}
            placeBet={placeBet}
            color='blue'
          />
          <Chips
            amount={100}
            placeBet={placeBet}
            color='black'
          />
        </div>
      </div>

    );
  };
}