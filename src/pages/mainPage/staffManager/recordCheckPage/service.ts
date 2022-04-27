/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:41:32
 * @LastEditTime: 2022-03-03 23:48:02
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\recordCheckPage\service.ts
 */
import { message } from 'antd';
import { post } from '@/utils/axios';
import { checkApi as api } from './api';

export function queryByKpPost(id, data, callback, permission = null) {
  post(`${api.query}${id}`, data, {}, { headers: { permission } }).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '查询失败');
  });
}
