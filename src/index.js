import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promiseMiddleware from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import App from './components/app'
import Builder from './components/Builder'
import reducers from './reducers'

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(promiseMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/callback' component={Builder} />
      </Switch>
    </BrowserRouter>
  </Provider>


  , document.querySelector('.container')
)
