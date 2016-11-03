import React, { Component } from 'react'
import { Link } from 'react-router'
// import { DatePicker } from 'antd'

class DemoApp extends Component {
  render() {
    return (
      <div>
        <div> Login </div>
        <Link to="/client">Client</Link>
        <Link to="/ads">Ads</Link>
      </div>
    )
  }
}

export default DemoApp
