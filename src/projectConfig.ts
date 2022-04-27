/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 12:46:20
 * @LastEditTime: 2022-04-27 13:54:15
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\projectConfig.ts
 */
export const defaultPageListSetting = {
  pageSize: 10,
  pageSizeOption: [10, 15, 30],
  pageStartNumber: 0,
};

//本地环境启用 apiRoot配置为 '/api'
// export const apiRoot = '/api';
export const local = '/local';
//线上环境启用 apiRoot配置为 ''
export const apiRoot = '';
