import React from 'react';

export default class ChipBank extends React.Component {

  
  render() {
    const { chipBank } = this.props;
    
    return (
      <div className='ChipBank'>
       <p className='chipTitle' >Chips: ${chipBank}</p>
       {/*<p clasName='chipAmout' >{chipBank}</p>*/}
      </div>
    );
  };
}