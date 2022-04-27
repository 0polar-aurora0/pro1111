/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:41:32
 * @LastEditTime: 2022-03-03 10:39:34
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\loginPage\service.ts
 */
import { message } from 'antd';
import { post } from '@/utils/axios';
import { loginApi as api } from './api';

export function loginPost_police(data, callback, permission = null) {
  post(api.login_police, data, {}, { headers: { permission } }).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '登录失败');
  });
}


export function loginPost_keyPerson(data, callback, permission = null) {
  post(api.login_keyPerson, data, {}, { headers: { permission } }).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '登录失败');
  });
}
