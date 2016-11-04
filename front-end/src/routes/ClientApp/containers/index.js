import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ClientGeneralAction from './action'
import * as PersistentActions from 'SRC/action'

import { Col, Row, Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

// import CSSModules from 'react-css-modules'
// import styles from './style.hcss'

class ClientApp extends Component {
  componentWillMount() {
    const { userId } = this.props.persistentStore
    this.props.actions.loadUserInfo(userId)
  }
  render() {
    const pathname = this.props.location.pathname.replace('/client/', '')
    const { userId } = this.props.persistentStore
    return (
      <Row>
        <Col span={4}>
          <Menu
            style={{ width: '100%' }}
            defaultOpenKeys={['topics', 'blog', 'profile']}
            selectedKeys={[pathname]}
            mode="inline"
            >
            <Menu.Item key="feed"><Link to="/client/feed">News Feed</Link></Menu.Item>
            <SubMenu key="topics" title="Topics">
              <Menu.Item key="profile/subscribe"><Link to="/client/profile/subscribe">My Topics</Link></Menu.Item>
              <Menu.Item key="topics/list"><Link to="/client/topics/list">More Topics</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="blog" title="Blog">
              <Menu.Item key="profile/posts"><Link to="/client/profile/posts">My Posts</Link></Menu.Item>
              <Menu.Item key="blog/edit"><Link to="/client/blog/edit">Create Blog</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="profile" title="Profile">
              <Menu.Item key="profile/info">
                <Link to={{ pathname: '/client/profile/info', query: { uid: userId } }}>
                  My Profile
                </Link>
              </Menu.Item>
              <Menu.Item key="profile/follow"><Link to="/client/profile/follow">My Follows</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={20}>
          <div>
            {this.props.children}
          </div>
        </Col>
      </Row>
    )
  }
}

ClientApp.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ]),
  location: React.PropTypes.object,
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

export default connect(mapState, mapDispatch)(ClientApp)
