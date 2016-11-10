import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
const FormItem = Form.Item

class NormalLoginForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{
              required: true,
              type: 'string',
              message: 'Invalid Username!'
              // pattern: /^\w[\w\s]+\w$/,
              // message: 'Invalid Username! Letters or Digits only!',
              // transform: (value) => value.trim()
            }]
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              type: 'string',
              required: true,
              message: 'Please input your Password!'
              // pattern: /^[^\s]{4,}$/,
              // message: 'Please input your Password! No space! At least 4 character!'
            }]
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <div className="text-center">
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            <span style={{ marginLeft: '20px' }}>Or</span> <a>Visitor</a>
          </div>
        </FormItem>
      </Form>
    )
  }
}

NormalLoginForm.propTypes = {
  form: React.PropTypes.object
}

export default Form.create()(NormalLoginForm)
