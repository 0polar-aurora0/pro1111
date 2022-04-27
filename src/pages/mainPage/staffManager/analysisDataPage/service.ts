/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:41:32
 * @LastEditTime: 2022-04-25 19:49:06
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\analysisDataPage\service.ts
 */
import { message } from 'antd';
import { post } from '@/utils/axios';
import { lineChartApi as api } from './api';

export function querylineChartData(data, callback, permission = null) {
  post(`${api.query}`, data, {}, { headers: { permission } }).then(
    (response) => {
      console.log(response);

      if (response.code == '200') {
        callback(response.data);
        return;
      }
      message.error(response.message ?? '查询失败');
    },
  );
}
