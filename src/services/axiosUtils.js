
import axios from 'axios';
import baseURL from './baseUrl'
// import {AESDecrypt, MD5} from "./utils";

var _config = {
    baseURL: baseURL,
    crossDomain: true,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
}

const instance = axios.create(_config);

instance.interceptors.request.use(config => {
  return config;
}, error => {
  Promise.reject(error)
});

instance.interceptors.response.use(response_handle(), errorResponse_handle());

function response_handle() {
  return function(res) {
    if (res.status == 200) {
      return res.data;
    } else throw new Error(res.data);
  }
}

function errorResponse_handle() {
  return function(err) {
    // if (err.response.status == 403) {
    //   goLogin();
    // }
    throw err;
  }
}

// 暂时弃用
function errorCode_message(code) {
    var message = '';
    switch (code) {
      case 400:
        message = '请求错误'
        break
      case 401:
        message = '令牌过期，请重新登录'
        break
      case 403:
        message = '您无权操作'
        break
      case 404:
        message = `请求地址出错`
        break
      case 408:
        message = '请求超时'
        break
      case 500:
        message = '服务器错误'
        break
      case 501:
        message = '服务未实现'
        break
      case 502:
        message = '网关错误'
        break
      case 503:
        message = '服务不可用'
        break
      case 504:
        message = '网关超时'
        break
      case 505:
        message = 'HTTP版本不受支持'
        break
      default:
        message = '请求失败';
    }
    return message;
}


export default instance;