/*
 * @Author: fuzhenghao
 * @Date: 2022-03-01 15:49:35
 * @LastEditTime: 2022-03-04 00:42:42
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\loginPage\api.ts
 */
import { apiRoot } from '@/projectConfig';
export const loginApi = {
  login_police: `${apiRoot}/v1/login/staffLogin`,
  login_keyPerson: `${apiRoot}/v1/login/keyPersonnelLogin`,
};
