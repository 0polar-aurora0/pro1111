/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:49:35
 * @LastEditTime: 2022-03-04 00:43:09
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\policeManager\api.ts
 */
import { apiRoot } from '@/projectConfig';
export const policeManagerApi = {
  query: `${apiRoot}/v1/staff/queryAll`,
  add: `${apiRoot}/v1/staff/insertStaff`,
  change: `${apiRoot}/v1/staff/updateStaff`,
  delete: `${apiRoot}/v1/staff/delete/`,
};
