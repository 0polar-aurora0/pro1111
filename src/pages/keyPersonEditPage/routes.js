/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:12:57
 * @LastEditTime: 2022-04-25 18:38:34
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\keyPersonEditPage\routes.js
 */
export default {
  path: '/keyPersonEditPage',
  component: '@/pages/keyPersonEditPage/layouts/index',
  routes: [
    {
      path: '/keyPersonEditPage/index',
      component: '@/pages/keyPersonEditPage/index.tsx',
    },
    {
      path: '/keyPersonEditPage/personInfoModification',
      component: '@/pages/keyPersonEditPage/personInfoModification/index.tsx',
    },
  ],
};
