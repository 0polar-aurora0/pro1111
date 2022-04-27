/*
 * @Author: fuzhenghao
 * @Date: 2022-03-03 22:49:18
 * @LastEditTime: 2022-04-27 19:25:01
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\commonService.ts
 */
import { message } from 'antd';
import { post, fileImport } from '@/utils/axios';
import {
  recordTypeListApi,
  treeListApi,
  keyPersonManagerApi,
  filePostApi,
} from './commonApi';

const header_all = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export function recordTypeListPost(data, callback, permission = null) {
  post(recordTypeListApi.query, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '下拉框请求失败');
    },
  );
}

export function treeListQuery(data, callback, permission = null) {
  post(treeListApi.query, data, {}, { headers: { permission } }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '查询失败');
    },
  );
}

export function keyPersonChange(data, callback, permission = null) {
  post(keyPersonManagerApi.change, data, {}, { header_all }).then(
    (response) => {
      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ? response.message : '新增失败');
    },
  );
}

export function policeFilesImport(data, callback, permission = null) {
  fileImport(
    filePostApi.policeFilesImport,
    data,
    {},
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  ).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ?? '导入失败');
  });
}

export function staffFilesImport(data, callback, permission = null) {
  fileImport(
    filePostApi.staffFilesImport,
    data,
    {},
    { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  ).then((response) => {
    if (response.code == '200') {
      callback(response.data);
      return;
    }
    message.error(response.message ? response.message : '导入失败');
  });
}

export function policeFilesExport(data, callback, permission = null) {
  post(filePostApi.policeFilesExport, data, {}, { header_all }).then(
    (response) => {
      console.log(response);
      // if (response.code == '200') {
      callback(response);
      return;
      // }
      // message.error(response.message ? response.message : '导出失败');
    },
  );
}
