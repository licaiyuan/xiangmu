import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:4000';
    
}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = '/api';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '/api';
}
axios.defaults.timeout = 90000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// axios.defaults.transformRequest = [function (data, config) {
//     if (!config['Content-Type']) return QS.stringify(data);
//     switch (config['Content-Type'].toLowerCase()) {
//         case 'application/json;charset=utf-8': {
//             return data
//         }
//         case 'multipart/form-data;charset=utf-8': {
//             return data
//         }
//         default: {
//             return QS.stringify(data)
//         }
//     }


// }]
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
export function post(url, params,headers= { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' } ) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
                console.log(res.data)

            })
            .catch(err => {
                reject(err.data)
            })
    });
}