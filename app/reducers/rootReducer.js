import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import soloReducer from './soloReducer';

const rootReducer = combineReducers({
  appState: soloReducer,
  routing: routerReducer,
});

export default rootReducer;