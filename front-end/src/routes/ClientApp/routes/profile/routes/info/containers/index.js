import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientProfileInfoAction from './action'
import * as PersistentActions from 'SRC/action'

import { Row, Col, Button } from 'antd'

import moment from 'moment'
import { throttle } from 'SRC/utils/utils'

const infoList = [
  ['User Name', 'userName'],
  ['Sex', 'sex'],
  ['Birth Day', 'birth', (timestamp) => moment(timestamp).format('YYYY-MM-DD')],
  ['Email', 'email'],
  ['Number of Followers', 'followerNum']
]

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.switchFollowStatus = throttle(this.switchFollowStatus, 5000).bind(this)
  }
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
  switchFollowStatus() {
    const { uid, isFollow } = this.props.userInfo // otherId
    const { userId } = this.props.persistentStore // myId
    this.props.actions.switchFollow(userId, uid, isFollow ? 'cancel' : 'follow')
  }
  render() {
    const { userInfo } = this.props
    return (
      <div>
        <div> Infomation </div>
        {
          infoList.map((args) => (
            <Row key={args[0]} className="fs16" style={{ marginBottom: '24px' }}>
              <Col span={8}><h4 className="text-right fc-dark">{`${args[0]}:`}</h4></Col>
              {
                args[2] ?
                  <Col span={8} offset={2}>{args[2](userInfo[args[1]])}</Col> :
                  <Col span={8} offset={2}>{userInfo[args[1]]}</Col>
              }
            </Row>
          ))
        }
        {
          userInfo.isSelf ? null :
            <Row className="fs16" style={{ marginBottom: '24px' }}>
              <Col span={8} offset={10}>
                <Button
                  type={userInfo.isFollow ? 'default' : 'primary'}
                  size="large"
                  className="fs16"
                  onClick={this.switchFollowStatus}
                  >
                  {userInfo.isFollow ? 'Cancel Follow' : 'Follow'}
                </Button>
              </Col>
            </Row>
        }
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
