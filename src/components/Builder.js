import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import qs from 'query-string'
import Table from 'antd/lib/Table'
import selectors from '../selectors'
import { fetchHistory } from '../actions'

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
  componentWillMount() {
    const parsedHash = qs.parse(this.props.location.hash)
    this.props.fetchHistory(parsedHash.access_token)
  }

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
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.builder.loading,
  data: state.builder.data,
  pastHistory: selectors.history(state)
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchHistory }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Builder)
