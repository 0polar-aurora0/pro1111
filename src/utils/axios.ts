/*
 * @Author: fuzhenghao
 * @Date: 2021-10-20 09:50:51
 * @LastEditTime: 2022-04-26 16:07:19
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\utils\axios.ts
 *
 */
import axios from 'axios';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=utf-8'; //POST请求参数获取不到的问题
export function get(url: string, params: any, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params, ...config })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url: string, datas: any, params: any, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, qs.stringify(datas), { params: params, ...config })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
export function fileImport(url: string, datas: any, params: any, config = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, datas, { params: params, ...config })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}
