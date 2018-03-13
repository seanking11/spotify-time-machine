import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'query-string'
import Table from 'antd/lib/Table'
import Button from 'antd/lib/Button'
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
    pageToFetch: 2
  }

  componentWillMount() {
    this.props.fetchHistory(DEBUG_USER)
  }

  _onPressForwards = () => {
    if (this.state.pageToFetch <= this.props.data.recenttracks['@attr'].totalPages) {
      this.setState({ pageToFetch: this.state.pageToFetch + 1 })
      this.props.fetchHistory(DEBUG_USER, this.state.pageToFetch)
    }
  }

  _onPressBack = () => {
    this.setState({ pageToFetch: this.state.pageToFetch - 1 })
    this.props.fetchHistory(DEBUG_USER, this.state.pageToFetch)
  }

  parsedHash = qs.parse(this.props.location.hash)

  render() {
    return (
      <div>
        <div>
          You're logged in.
        </div>
        { !this.props.data ? <div>loading...</div> : (
          <div>
            <h1>Your history</h1>
            <Table
              dataSource={this.props.pastHistory}
              columns={columnsConfig}
              size='middle'
              rowSelection={{}}
            />
            <Button type='primary' onClick={this._onPressBack}>Page Back</Button>
            <Button type='primary' onClick={this._onPressForwards}>Page Forward</Button>
            <h4>Don't fetch below 0</h4>
            {this.props.data.recenttracks['@attr'] ? (
              <h2>Current Page: {this.state.pageToFetch - 1}/{this.props.data.recenttracks['@attr'].totalPages}</h2>
            ) : ''}
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
