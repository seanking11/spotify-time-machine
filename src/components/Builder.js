import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'query-string'
import Table from 'antd/lib/Table'
import Button from 'antd/lib/Button'
import Icon from 'antd/lib/Icon'
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

  componentDidMount() {
    this.props.fetchHistory(DEBUG_USER, 1)
  }

  _onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  _onPressForwards = () => {
    if (this.state.currentPage < this.props.data.recenttracks['@attr'].totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 })
      this.props.fetchHistory(DEBUG_USER, this.state.currentPage + 1)
    }
  }

  _onPressBack = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 })
      this.props.fetchHistory(DEBUG_USER, this.state.currentPage - 1)
    }
  }

  parsedHash = qs.parse(this.props.location.hash)

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
                <h2>Current Page: {this.state.currentPage}/{this.props.data.recenttracks['@attr'].totalPages}</h2>
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
            />
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
  next: state.builder.data.next
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchHistory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder)
