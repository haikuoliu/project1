import React, { Component } from 'react'
import { Link } from 'react-router'
// import { DatePicker } from 'antd'

class Profile extends Component {
  render() {
    return (
      <div>
        <div> User Profile </div>
        <div>
          <Link to="/client/profile/info">Info </Link>
          <Link to="/client/profile/posts">Posts </Link>
          <Link to="/client/profile/follow">Follow </Link>
          <Link to="/client/profile/subscribe">Subscribe </Link>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Profile.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default Profile
