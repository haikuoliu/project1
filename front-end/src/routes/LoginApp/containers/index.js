import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Col, Row } from 'antd'
import api from 'SRC/apis'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

class LoginApp extends Component {
  render() {
    console.log(api('users:getUserInfo', 1, 2))
    return (
      <div>
        <div className="absolute-center-container" style={{ height: '98vh', width: '100%' }}>
          <div className="absolute-center" style={{ width: '100%', height: '40%' }}>
            <Row style={{ height: '100%' }}>
              <Col span={8} offset={3} className="full-height">
                <Card className="full" style={{ height: '95%' }} bodyStyle={{ padding: 0, height: '100%' }}>
                  <div styleName="custom-image1" />
                  <div styleName="custom-card">
                    <h1 style={{ color: '#2db7f5' }}>Client</h1>
                    <p className="fs16">www.instagram.com</p>
                  </div>
                </Card>
              </Col>
              <Col span={8} offset={1} className="full-height">
                <Card className="full" style={{ height: '95%' }} bodyStyle={{ padding: 0, height: '100%' }}>
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

export default CSSModules(LoginApp, styles)
