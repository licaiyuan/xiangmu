import React, { useState, useEffect, Component } from 'react';
import { Player, ControlBar } from "video-react";
import './ksp.scss'
import { connect } from "react-redux";
// function Ksp() {
class Ksp extends Component {
  constructor(props) {
    super(props); //调用父类的构造函数，固定写法
    this.state = {


    };
  }
  // useEffect(() => {
  //   // console.log(this.props.location.query)
  //   console.log(this.props.xzdsp)
  // })
  // const [player, setplayer] = useState();
  componentDidMount() {
    console.log(this.props.xzdsp)

  }
  render() {
    let { title, jj, spmz } = this.props.xzdsp
    return (
      <div>
        <div className="spdx">
          <div>{title}</div>
          <Player
            ref={player => {
              player = player;
            }}

          >
            <source src={`http://localhost:4000/video/${spmz}`}/>
            <ControlBar autoHide={false} />
          </Player>
          <div>简介:{jj}</div>
        </div>

      </div>
    )
  }
}
// export default Ksp;

const stateToProps = state => {
  return {
    xzdsp: state.xzdsp
  };
};
const dispatchToProps = dispatch => {
  return {

  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(Ksp);