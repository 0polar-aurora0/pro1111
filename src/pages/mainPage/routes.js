/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:12:57
 * @LastEditTime: 2022-04-25 18:37:21
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\src\pages\mainPage\routes.js
 */
export default {
  path: '/mainPage',
  component: '@/pages/mainPage/layouts/index',
  routes: [
    // { path: '/mainPage', component: '@/pages/mainPage/id.tsx' },
    { path: '/mainPage/index', component: '@/pages/mainPage/index.tsx' },
    { path: '/mainPage/policeManager', component: '@/pages/mainPage/policeManager/index.tsx' },
    { path: '/mainPage/staffManager', component: '@/pages/mainPage/staffManager/staffManagerController/index.tsx' },
    // { path: '/mainPage/personInfoModification', component: '@/pages/mainPage/personInfoModification/index.tsx' },
  ],
};
