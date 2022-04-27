/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:49:35
 * @LastEditTime: 2022-04-26 18:20:17
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\api.ts
 */
import { apiRoot } from '@/projectConfig';
export const logApi = {
  query: `${apiRoot}/v1/record/queryByTime`,
  add: `${apiRoot}/v1/record/insertRecord`,
  update: `${apiRoot}/v1/record/updateRecord`,
  delete: `${apiRoot}/v1/record/delete/`,
  search: `${apiRoot}/v1/record/queryByTime`,
};
