const cardDeck = [
  //spades
  {
    suit: 'spades',
    name: 'ace',
    value: 11,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: 'king',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: 'queen',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: 'jack',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '10',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '9',
    value: 9,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '8',
    value: 8,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '7',
    value: 7,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '6',
    value: 6,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '5',
    value: 5,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '4',
    value: 4,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '3',
    value: 3,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'spades',
    name: '2',
    value: 2,
    hiLo: 1,
    side: 'front',
  },
  //hearts
  {
    suit: 'hearts',
    name: 'ace',
    value: 11,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: 'king',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: 'queen',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: 'jack',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '10',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '9',
    value: 9,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '8',
    value: 8,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '7',
    value: 7,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '6',
    value: 6,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '5',
    value: 5,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '4',
    value: 4,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '3',
    value: 3,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'hearts',
    name: '2',
    value: 2,
    hiLo: 1,
    side: 'front',
  },
  //clubs
  {
    suit: 'clubs',
    name: 'ace',
    value: 11,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: 'king',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: 'queen',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: 'jack',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '10',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '9',
    value: 9,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '8',
    value: 8,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '7',
    value: 7,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '6',
    value: 6,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '5',
    value: 5,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '4',
    value: 4,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '3',
    value: 3,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'clubs',
    name: '2',
    value: 2,
    hiLo: 1,
    side: 'front',
  },
  //diamonds
  {
    suit: 'diamonds',
    name: 'ace',
    value: 11,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: 'king',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: 'queen',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: 'jack',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '10',
    value: 10,
    hiLo: -1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '9',
    value: 9,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '8',
    value: 8,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '7',
    value: 7,
    hiLo: 0,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '6',
    value: 6,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '5',
    value: 5,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '4',
    value: 4,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '3',
    value: 3,
    hiLo: 1,
    side: 'front',
  },
  {
    suit: 'diamonds',
    name: '2',
    value: 2,
    hiLo: 1,
    side: 'front',
  },
];

export default cardDeck;