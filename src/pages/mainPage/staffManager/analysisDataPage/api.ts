/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:49:35
 * @LastEditTime: 2022-04-27 00:12:11
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\staffManager\analysisDataPage\api.ts
 */
import { apiRoot, local } from '@/projectConfig';
export const lineChartApi = {
  query: `${apiRoot}/v1/record/analyzer`,
};
