import React from "react";

import "./App.scss";
import bttp from "./image/bttp.jpg";
import WrappedNormalLoginForm from "./dlbd.js";
import { Input, Select, Row, Col, Form, Icon, Button, Checkbox, Pagination } from "antd";
import store from "./store";
import { spqqlb } from './request/api';
import { Provider } from "react-redux";
import { Fyzj } from './commonshow.js'
import { connect } from "react-redux";
import NormalLoginForm from './dlbd'
const { Option } = Select;
const { Search } = Input;
const Component = React.Component;

//分页组件  
// function Fyzj(props) {
//   return (
//     <Pagination defaultCurrent={1} total={props.sl} className="lbfy" />
//   )
// }

class App extends Component {
  constructor(props) {
    super(props); //调用父类的构造函数，固定写法
    this.state = {
      inputValue: "aa",
      currentTime: '',
      store: store.getState(),
      spsj: [],
      sl: ''

    };


  }
  componentDidMount() {
    // this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    this.lbqq()
  }
  handleStateChange(state, prevState) {
    // copy player state to this component's state

    this.setState({
      player: state,
      currentTime: state.currentTime
    });
  }
  //視頻列表請求
  lbqq = () => {
    spqqlb().then(res => {
      let { sl, content } = res
      this.setState({
        spsj: content,
        sl: sl
      }, () => {
        console.log(this.state.spsj)
      })
      console.log(res)
    })
  }
  //视频跳转
  ksp = (val) => {
    console.log(val)
    let { title, jj, spmz } = val
    this.props.xzsp(val)
    this.props.history.push({ pathname: '/ksp', quert: {} })


  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    return (
      <div>
        <div className="dbhs"> </div>

        <div className="qbjz">

          <NormalLoginForm></NormalLoginForm>
          <div style={{ width: '970px' }}>
            <div className="yhdssk">
              <p style={{ height: "10px", color: "rgba(233, 30, 99, 0.73)" }}>
                影片搜寻
                </p>
              <Search
                placeholder=""
                onSearch={value => console.log(value)}
                enterButton
              />
              <Select
                defaultValue="ypmc"
                style={{
                  width: 120,
                  position: "absolute",
                  left: this.state.loginStatus == '登录' ? "422px" : ''
                }}
                onChange={handleChange}
              >
                <Option value="ypmc">影片名称</Option>
                <Option value="ypyy">影片演员</Option>
              </Select>
            </div>


            <Row style={{ marginTop: '15px' }}>
              {
                this.state.spsj.map((item, index) => {
                  return (
                    <Col span={6} key={index}>
                      <div onClick={() => this.ksp(item)}>
                        <img src={`${this.props.qqip}/upload/${item.zpmz}`} />
                        <div >{item.title}</div>
                      </div>

                    </Col>

                  )
                })
              }
              {/* <Col span={8}>
            <Player
                ref={player => {
                  this.player = player;
                }}
                autoPlay
              >
                <source src="/api/video/1.mp4" />
                <ControlBar autoHide={false} />
              </Player>
            </Col> */}
            </Row>
            <Fyzj sl={Number(this.state.sl)}></Fyzj>

          </div>
        </div>


      </div >
    );
  }
}

// export default App;

const stateToProps = state => {
  return {
    qqip: state.qqip
  };
};
const dispatchToProps = dispatch => {
  return {
    xzsp(values) {

      let action = {
        type: 'Selectvideo',
        value: values
      }
      dispatch(action)

    }
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(App);
