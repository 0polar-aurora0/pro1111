/*
 * @Author: fuzhenghao
 * @Date: 2022-03-03 22:49:34
 * @LastEditTime: 2022-04-26 17:41:36
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\commonApi.ts
 */
import { apiRoot } from '@/projectConfig';

export const recordTypeListApi = {
  query: `${apiRoot}/v1/record/getTypeList`,
};

export const treeListApi = {
  query: `${apiRoot}/v1/keyPer/getKpType`,
};

export const keyPersonManagerApi = {
  query: `${apiRoot}/v1/keyPer/getKp/`,
  add: `${apiRoot}/v1/keyPer/insertKp`,
  change: `${apiRoot}/v1/keyPer/updateKp`,
  delete: `${apiRoot}/v1/keyPer/delete/`,
  search: `${apiRoot}/v1/keyPer/queryByIdentify/`,
};

export const filePostApi = {
  policeFilesImport: `${apiRoot}/v1/staff/import`,
  policeFilesExport: `${apiRoot}/v1/staff/export`,
  staffFilesImport: `${apiRoot}/v1/keyPer/import`,
};
