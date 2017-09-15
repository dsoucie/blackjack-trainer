import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';
import { soloReducerDefaultState } from './reducers/soloReducer'; 


const defaultState = {
  appState: soloReducerDefaultState,
  routing: history,
};

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);



export const history = syncHistoryWithStore(createBrowserHistory(), store);

export default store;