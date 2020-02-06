import { lg, xzsp } from './actionTypes.js'
import { login } from '../request/api'
import { message, Button } from 'antd';
import axios from "axios";
const defaultState = {
        srzh: '', //账号
        xzdsp: '', //选择的视频信息
        // qqip: 'http://localhost:4000',
        qqip: 'http://118.25.7.128:4000'
            // qqip:'/api'
    } //默认数据
export default (state = defaultState, action) => { //就是一个方法函数
    switch (action.type) {
        case lg:
            console.log(action.value)
            let { value, loginStatus } = action.value
            login({ account: value, loginStatus: loginStatus }).then(res => {
                console.log(res)
                console.log(res.length)
                let prompt
                if (res.length != 0) {
                    prompt = loginStatus == '登录' ? res[0].password == value.password ? '登录成功' : '登录失败' : '注册成功'
                } else {
                    prompt = '登录失败'
                }
                message.info(prompt)
                if (prompt == '登录成功' || prompt == '注册成功') {


                }

            })
            return {...state, ... { srzh: value } };
            break;
        case xzsp:
            console.log(action.value)

            return {...state, ... { xzdsp: action.value } };


    }

    return state
}