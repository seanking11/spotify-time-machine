import React, { Component } from 'react'
import { connect } from 'react-redux'
import Pagination from 'antd/lib/Pagination'
import constants from '../constants'
import { changeTablePage, fetchHistory } from '../actions'
import { DEBUG_USER } from '../keys'

class TablePagination extends Component {
  _isBetween = (n, a, b) => (n - a) * (n - b) <= 0

  handleOnChange = page => {
    const clickedFetchedPage = Math.ceil(this.props.currentTablePage / 20)
    console.log(['currentTablePage', this.props.currentTablePage, 'clickedFetchedPage', clickedFetchedPage]);
    // should fetch new
    let justSet
    if (!(clickedFetchedPage == this.props.currentFetchedPage) && !(clickedFetchedPage == justSet)) {
      // and didn't fetch last one
      console.log(!(clickedFetchedPage == this.props.currentFetchedPage));
      console.log(`should fetch ${clickedFetchedPage}, on ${this.props.currentFetchedPage} now`);
      this.props.fetchHistory({ user: DEBUG_USER, page: clickedFetchedPage })
    }

    // dispatch setting the currentTablePage
    justSet = clickedFetchedPage
    this.props.changeTablePage(page)
  }

  // handleOnChange = page => {
  //   console.log(page);
  //   if (this._check()) {
  //     // fetch
  //   }
  //
  //   this.setState({ currentTablePage: page })
  // }

  // Given a current page number (out of the total table pages), you want to see
  // if that number is within the first number in that call, (1, 201, 401, etc)

  render() {
    return (
      <Pagination
        showQuickJumper
        current={this.props.currentTablePage}
        onChange={this.handleOnChange}
        total={this.props.totalTracks}
      />
    )
  }
}

const mapStateToProps = state => ({
  totalTracks: state.builder.totalTracks,
  totalTablePages: state.builder.totalTablePages,
  currentTablePage: state.builder.currentTablePage,
  currentFetchedPage: state.builder.currentFetchedPage
})

export default connect(mapStateToProps, { fetchHistory, changeTablePage })(TablePagination)
