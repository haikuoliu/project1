import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Col, Row } from 'antd'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

class LoginApp extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }
  componentWillMount() {
    sessionStorage.clear()
  }
  login(type) {
    if (type === 'client') {
      sessionStorage.setItem('userId', 2)
      this.props.router.push('/client')
    } else { // type === 'ads'
      sessionStorage.setItem('sponsorId', 1)
      this.props.router.push('/ads')
    }
  }
  render() {
    return (
      <div>
        <div className="absolute-center-container" style={{ height: '98vh', width: '100%' }}>
          <div className="absolute-center" style={{ width: '100%', height: '40%' }}>
            <Row style={{ height: '100%' }}>
              <Col span={8} offset={3} className="full-height pointer">
                <Card
                  className="full"
                  style={{ height: '95%' }}
                  bodyStyle={{ padding: 0, height: '100%' }}
                  onClick={this.login.bind(null, 'client')}
                  >
                  <div styleName="custom-image1" />
                  <div styleName="custom-card">
                    <h1 style={{ color: '#2db7f5' }}>Client</h1>
                    <p className="fs16">www.instagram.com</p>
                  </div>
                </Card>
              </Col>
              <Col span={8} offset={1} className="full-height pointer">
                <Card
                  className="full"
                  style={{ height: '95%' }}
                  bodyStyle={{ padding: 0, height: '100%' }}
                  onClick={this.login.bind(null, 'ads')}
                  >
                  <div styleName="custom-image2" />
                  <div styleName="custom-card">
                    <h1><Link to="/ads">Ads</Link></h1>
                    <p className="fs16">www.instagram.com</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

LoginApp.propTypes = {
  router: React.PropTypes.object
}

export default CSSModules(LoginApp, styles)
