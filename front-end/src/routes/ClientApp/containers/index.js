import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

// import { DatePicker } from 'antd'

class ClientApp extends Component {
  componentWillMount() {
    const { userId } = this.props.persistentStore
    this.props.actions.loadUserInfo(userId)
  }
  render() {
    return (
      <div>
        <div> Client </div>
        <ol>
          <li><Link to="/client/feed">News Feed</Link></li>
          <li><Link to="/client/topics">Topics</Link></li>
          <li><Link to="/client/profile">My Profile</Link></li>
          <li><Link to="/client/blog/edit">Create Blog</Link></li>
        </ol>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

ClientApp.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  persistentStore: React.PropTypes.object,
  persistentActions: React.PropTypes.object,
  actions: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentStore: state.persistentStore.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ClientGeneralAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(ClientApp, styles))
