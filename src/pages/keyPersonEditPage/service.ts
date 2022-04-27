/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:41:32
 * @LastEditTime: 2022-04-26 18:20:31
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\service.ts
 */
import { message } from 'antd';
import { post } from '@/utils/axios';
import { logApi as api } from './api';

export function logPost(data, callback, permission = null) {
  post(api.query, data, {}, { headers: { permission } }).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '查询失败');
  });
}

export function recordAddPost(data, callback, permission = null) {
  post(api.add, data, {}, { headers: { permission } }).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '新增失败');
  });
}

export function recordDeletePost(id, data, callback, permission = null) {
  post(`${api.delete}${id}`, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '删除失败');
    },
  );
}

export function searchQuery(data, callback, permission = null) {
  post(`${api.search}`, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '删除失败');
    },
  );
}
