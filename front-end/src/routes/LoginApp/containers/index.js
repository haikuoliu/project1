import React, { Component } from 'react'
import { Link } from 'react-router'
import { Card, Col, Row } from 'antd'

import CSSModules from 'react-css-modules'
import styles from './style.hcss'

class LoginApp extends Component {
  render() {
    return (
      <div>
        <div className="absolute-center-container" style={{ height: '98vh', width: '100%' }}>
          <div className="absolute-center" style={{ width: '100%', height: '310px' }}>
            <Row>
              <Col span={9} offset={3}>
                <Card style={{ width: '400px', height: '300px' }} bodyStyle={{ padding: 0 }}>
                  <div styleName="custom-image" style={{ height: '200px' }}>
                    <img alt="example" width="100%" src={require('SRC/assets/img/client.jpg')} />
                  </div>
                  <div styleName="custom-card">
                    <h1><Link to="/client">Client</Link></h1>
                    <p className="fs16">www.instagram.com</p>
                  </div>
                </Card>
              </Col>
              <Col span={9}>
                <Card style={{ width: '400px', height: '300px' }} bodyStyle={{ padding: 0 }}>
                  <div styleName="custom-image" style={{ height: '200px' }}>
                    <img alt="example" width="100%" src={require('SRC/assets/img/ads.jpg')} style={{ marginTop: '-50px' }} />
                  </div>
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
