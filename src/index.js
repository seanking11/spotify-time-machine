import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'

import App from './components/app'
import Builder from './components/Builder'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/callback' component={Builder} />
      </Switch>
    </BrowserRouter>
  </Provider>


  , document.querySelector('.container')
)
