import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileInfoAction from './action'
import * as PersistentActions from 'SRC/action'

// import { DatePicker } from 'antd'

class ProfileInfo extends Component {
  componentWillMount() {
    const query = this.props.location.query
    const { userId } = this.props.persistentStore
    this.props.actions.loadUserInfo(userId, query.uid)
  }
  componentWillReceiveProps(nextProps) {
    const query = this.props.location.query
    const nextQuery = nextProps.location.query
    if (query.uid !== nextQuery.uid) {
      const { userId } = this.props.persistentStore
      this.props.actions.loadUserInfo(userId, nextQuery.uid)
    }
  }
  render() {
    const { userInfo } = this.props
    return (
      <div>
        <div> Infomation </div>
        <div onClick={this.props.actions.loadUserInfo.bind(null, 2, 5)}>AAA</div>
        <div onClick={this.props.actions.loadUserInfo.bind(null, 2, 1)}>BBB</div>
        <p>{JSON.stringify(userInfo)}</p>
      </div>
    )
  }
}

ProfileInfo.propTypes = {
  location: React.PropTypes.object,
  userInfo: React.PropTypes.object,
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS(),
    userInfo: state.clientProfile.userInfo.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientProfileInfoAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileInfo)
