import React from 'react';

class Counter extends React.Component {

  render() {
    const { countArray, increment, decrement, index } = this.props;
    console.log('countArray:', countArray)
    return (
      <div>
        <p>The Count Will Go Here: {countArray[index]}</p>
        <button onClick={increment.bind(null, index)} >+</button>
        <button onClick={decrement.bind(null, index)} >-</button>
      </div>
    );
  };
}

export default Counter;
