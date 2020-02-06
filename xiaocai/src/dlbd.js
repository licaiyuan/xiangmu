import React from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import "./dlbd.css";
//已登录显示组件
// Dlhxs = (props) => {
function Dlhxs(props) {
  return (<div>
    {props.srzh.username}

  </div>)
}
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.login(values, this.state.loginStatus)
      }
    });
  };

  constructor(props) {
    super(props)
    this.state = {
      loginStatus: '登录'
    }
  }
  componentDidMount() {
    console.log(this.props.srzh)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const dlan = {
      width: "167px"
    };
    return (
      <div>
        {
          this.props.srzh == '' ?

            <Form onSubmit={this.handleSubmit} className="login-form" >
              <Form.Item>
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "Please input your username!" }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="Username"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "Please input your Password!" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    placeholder="Password"
                  />
                )}
              </Form.Item>
              <Form.Item>
                <p style={{ display: this.state.loginStatus == '登录' ? 'block' : 'none' }} onClick={() => { this.setState({ loginStatus: '注册' }) }}>立即注册</p>
                <p style={{ display: this.state.loginStatus == '登录' ? 'none' : 'block' }} onClick={() => { this.setState({ loginStatus: '登录' }) }}>登录</p>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={dlan}
                >

                  {this.state.loginStatus}
                </Button>

              </Form.Item>


            </Form>
            :

            <Dlhxs srzh={this.props.srzh}></Dlhxs>

        }

      </div>
    )


  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);
const stateToProps = state => {
  return {
    srzh: state.srzh,
    qqip: state.qqip
  };
};
const dispatchToProps = dispatch => {
  return {
    login(values, loginStatus) {

      let action = {
        type: 'login',
        value: {
          value: values,
          loginStatus: loginStatus

        }
      }
      dispatch(action)

    }
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(WrappedNormalLoginForm);
// export default WrappedNormalLoginForm;
