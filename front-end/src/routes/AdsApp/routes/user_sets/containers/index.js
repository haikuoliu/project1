import React, { Component } from 'react'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AdsGeneralAction from '../../../containers/action'

import { Table, Card } from 'antd'

const columns = [{
  title: 'Set Id',
  dataIndex: 'set_id',
  key: 'set_id',
  sorter: (a, b) => a.set_id - b.set_id,
  width: '100px'
}, {
  title: 'Size',
  dataIndex: 'size',
  key: 'size',
  sorter: (a, b) => a.size - b.size,
  width: '100px'
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
  width: '200px'
}, {
  title: 'Filters',
  dataIndex: 'filters',
  key: 'filters'
}]

class UserSets extends Component {
  render() {
    return (
      <div>
        <Card bordered style={{ margin: '30px 5%' }}>
          <h1 className="margB30"> User Sets List </h1>
          <Table dataSource={this.props.userSetsList} columns={columns} />
        </Card>
      </div>
    )
  }
}

UserSets.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
  userSetsList: React.PropTypes.array,
  persistentStore: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userSetsList: state.ads.get('userSetsList').toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(AdsGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(UserSets)
