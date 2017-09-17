import React from 'react';

export default class Chips extends React.Component {

  render() {
    const { amount, color, placeBet } = this.props;

    var outerStyle = {
      backgroundColor: color,
      width: '5vh',
      height: '5vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5vh',
      margin: '.1vw',
    }

    var innerStyle = {
      height: '2.5vh',
      width: '2.5vh',
      borderRadius: '2.5vh',
      backgroundColor: 'white',
      lineHeight: '2.5vh',
      textAlign: 'center',
    }
    return (
      <div style={outerStyle} onClick={placeBet.bind(null, amount)} >
        <div style={innerStyle}>
          {amount}
        </div>
      </div>
    );
  };
}