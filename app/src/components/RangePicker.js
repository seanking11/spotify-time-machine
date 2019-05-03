import React, { Component } from 'react'
import moment from 'moment'
// import { connect } from 'react-redux'
import DatePicker from 'antd/lib/date-picker'

const MonthPicker = DatePicker.RangePicker

class RangePicker extends Component {
  componentDidMount() {

  }

  onChange = e => {
    console.log(e);
  }

  render() {
    return (
      <MonthPicker
        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
        showTime
        format='MMM Do YYYY'
        onChange={this.onChange}
      />
    )
  }
}

// const mapStateToProps = state => ({
//
// })

export default RangePicker
// export default connect(null, null)(RangePicker)
