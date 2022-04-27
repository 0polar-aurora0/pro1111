/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:49:35
 * @LastEditTime: 2022-03-05 23:06:35
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\recordCheckPage\api.ts
 */
import { apiRoot } from '@/projectConfig';
export const checkApi = {
  query: `${apiRoot}/v1/record/queryByKp/`,
};
