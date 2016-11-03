import React, { Component } from 'react'
import { Link } from 'react-router'
// import { DatePicker } from 'antd'

class AdsApp extends Component {
  render() {
    return (
      <div>
        <div> Ads </div>
        <ol>
          <li><Link to="/ads/user_sets">User Sets</Link></li>
          <li><Link to="/ads/ads_list">Ads List</Link></li>
          <li><Link to="/ads/push">Push</Link></li>
        </ol>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

AdsApp.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element
  ])
}

export default AdsApp
