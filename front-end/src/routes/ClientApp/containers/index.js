import React, { Component } from 'react'
import { Link } from 'react-router'
// import { DatePicker } from 'antd'

class ClientApp extends Component {
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
  ])
}

export default ClientApp
