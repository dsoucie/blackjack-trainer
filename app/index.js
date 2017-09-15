//import packages
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
//import top level compoenent
import AppContainer from './AppContainer';
//import store
import store, { history } from './store'
//import css
import css from './index.css';

const router = (
  <Provider store={store} >
    <Router history={history} >
      <Route path='/' component={AppContainer}></Route>
    </Router>
  </Provider>
  
)

ReactDOM.render(  
  router,
  document.querySelector('#root')
);
