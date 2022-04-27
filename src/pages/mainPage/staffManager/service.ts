/*
 * @Author: fuzhenghao
 * @Date: 2022-03-03 10:51:06
 * @LastEditTime: 2022-04-26 00:25:52
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\service.ts
 */
/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:41:32
 * @LastEditTime: 2022-03-02 23:55:11
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\policeManager\service.ts
 */
import { message } from 'antd';
import { post } from '@/utils/axios';
import { keyPersonManagerApi as api } from '@/commonApi';

const header_all = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export function keyPersonQuery(id, data, callback, permission = null) {
  post(`${api.query}${id}`, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '查询失败');
    },
  );
}

export function keyPersonAdd(data, callback) {
  post(
    api.add,
    data,
    {},
    {
      header_all,
    },
  ).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '新增失败');
  });
}

export function keyPersonDelete(id, data, callback, permission = null) {
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

export function keyPersonSearch(identify, data, callback, permission = null) {
  post(`${api.search}${identify}`, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '搜索失败');
    },
  );
}
