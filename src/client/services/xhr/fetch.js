import axios from 'axios';
import message from '@/components/message';
import _ from 'lodash';
import queryString from 'query-string';
import { isEmpty } from '@/utils';
let BASE_URL = window.location.origin;

// let HOST_ENV = process.env.HOST_ENV || process.env.NODE_ENV;
// let hostMap = {
//   development: 'https://fc-test.bthome.com',
//   test: 'https://fc-test.bthome.com',
//   production: 'https://fc-test.bthome.com'
// };

// BASE_URL = hostMap[HOST_ENV] || 'https://fc-test.bthome.com';

/**
 * 创建xhr实例
 * 路径前缀
 * 超时失败时间
 */
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 500000
});

/**
 * @desc 设置服务请求拦截器
 * 定义token请求设置
 */
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

/**
 * @desc 设置服务响应拦截器
 * 截取返回状态 统一定义成功失败
 */
service.interceptors.response.use(
  (response) => {
    const { isCustomException = false } = response.config;
    const data = response.data;
    const type = Object.prototype.toString.call(data);
    if (type === '[object Object]') {
      const { code, success, message: msg } = data;
      if (code == 0 && success) {
        return Promise.resolve(data);
      } else if (code == 410 || code == 401) {
        // window.location = '/exit';
        if (window.location.hash !== '#/login') {
          localStorage.removeItem('userName');
          localStorage.removeItem('isWhitePermissions');
          window.location = '/#/login';
          message.error(msg);
        }
        return Promise.reject(data);
      } else {
        if (!isCustomException) {
          // 如果走自定义异常提示
          message.error(msg);
        }
        return Promise.reject(data);
      }
    } else if (type === '[object String]' && /^<!doctype/.test(data)) {
      // 刷新后 服务端重定向到登录页
      // window.location.reload();
    } else {
      return Promise.reject(data);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      if (response.code === 401) {
        // 刷新后 服务端重定向到登录页
        // 添加登录逻辑
        window.location.reload();
      }
    }

    console.log('err', error);
    if (!axios.isCancel(error)) {
      message.error(String(error));
    }
    return Promise.reject(error);
  }
);

function handleParam(param = {}) {
  const retParam = {};
  Object.keys(param).forEach((key) => {
    if (!isEmpty(param[key])) {
      retParam[key] = param[key];
    }
  });

  return queryString.stringify(retParam);
}

const get = (url, params = {}, isCustomException = false) => {
  let { __cancelSource, ...restParams } = params;
  params = handleParam(restParams);
  url = url + '?' + params;
  return service({
    url,
    method: 'get',
    isCustomException,
    cancelToken: __cancelSource?.token
  });
};

/**
 *
 * @param {*} url 请求路径
 * @param {*} data 请求参数
 * @param {*} isCustomException 是否启用自定义异常，如果为true，需要手动添加catch去处理异常，全局的异常提示不会显示
 */
const post = (url, data = {}, isCustomException = false) => {
  return service.post(url, data, { isCustomException });
};

export { get, post, service };
export default service;
