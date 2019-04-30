import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import qs from 'query-string'
import Table from 'antd/lib/Table'
import Button from 'antd/lib/Button'
import Icon from 'antd/lib/Icon'
import Pagination from './TablePagination'
import selectors from '../selectors'
import { fetchHistory } from '../actions'
import { DEBUG_USER } from '../keys'

const columnsConfig = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title'
}, {
  title: 'Artist',
  dataIndex: 'artist',
  key: 'artist'
}, {
  title: 'Album',
  dataIndex: 'album',
  key: 'album'
}, {
  title: 'Date',
  dataIndex: 'date',
  key: 'date'
}]

class Builder extends Component {
  state = {
    currentPage: 1,
    selectedRowKeys: []
  }

  componentWillMount() {
    this.props.fetchHistory({ user: DEBUG_USER })
  }

  onPress = () => {
    return axios.post('http://localhost:5001/spotify-time-machine/us-central1/getSpotifyIdsFromSongsHandler')
      .then(results => console.log(results))
      .catch(error => console.log(error))
  }

  _onPressBack = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 })
      this.props.fetchHistory(DEBUG_USER, this.state.currentPage - 1)
    }
  }

  _onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys })
    console.log(selectedRowKeys);
    console.log(selectedRows);
  }

  _onPressForwards = () => {
    if (this.state.currentPage < this.props.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 })
      this.props.fetchHistory({ user: DEBUG_USER }, this.state.currentPage + 1)
    }
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this._onSelectChange
    }

    return (
      <div>
        { !this.props.data ? <div>loading...</div> : (
          <div>
            <h1>Your history</h1>
            <div className='btn-wrapper'>
              <Button type='primary' onClick={this._onPressBack}>
                <Icon type='left' />Page Back
              </Button>
              {this.props.data.recenttracks['@attr'] && (
                <h2>Current Page: {this.state.currentPage}/{this.props.totalPages}</h2>
              )}
              <Button type='primary' onClick={this._onPressForwards}>
                Page Forward<Icon type='right' />
              </Button>
            </div>

            <Table
              dataSource={this.props.pastHistory}
              columns={columnsConfig}
              size='middle'
              rowSelection={rowSelection}
              loading={this.props.loading}
              pagination={<Pagination />}
            />

            <Button onClick={this.onPress}>
              Log History Objects
            </Button>

            <Pagination />

            <div>
              {`Rows selected: ${this.state.selectedRowKeys.length}`}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.builder.loading,
  data: state.builder.data,
  pastHistory: selectors.history(state),
  next: state.builder.data.next,
  totalPages: state.builder.totalPages
})

export default connect(mapStateToProps, { fetchHistory })(Builder)
