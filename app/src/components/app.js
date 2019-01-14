import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authenticateUser } from '../actions'

class App extends Component {
  componentWillMount() {
    console.log('Mounting soon')
    this.props.authenticateUser()
  }

  render() {
    return (
      <div>First page</div>
    )
  }
}

export default connect(null, { authenticateUser })(App)
