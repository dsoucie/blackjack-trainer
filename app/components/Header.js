import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <div className='Header'>
        <div>Blackjack Trainer</div>
        <div className='headerButton '>Login</div>
        <div className='headerButton hb2'>Settings</div>
      </div>  
    );
  };
}