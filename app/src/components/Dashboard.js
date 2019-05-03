import React, { Component } from 'react'
import styled from 'styled-components'
import Builder from './Builder'
import RangePicker from './RangePicker'

class Dashboard extends Component {
  render() {
    console.log('hi');
    return (
      <div>
        <RangePicker />
        <Builder />
      </div>
    )
  }
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

export default Dashboard
