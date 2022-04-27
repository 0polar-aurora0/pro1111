/*
 * @Author: fuzhenghao
 * @Date: 2021-10-11 09:22:56
 * @LastEditTime: 2022-03-03 14:02:58
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\config\routes.ts
 *
 */
import mainPage from '../src/pages/mainPage/routes';
import keyPersonEditPage from '../src/pages/keyPersonEditPage/routes';

export default [
  mainPage,
  keyPersonEditPage,
  {
    path: '/login',
    component: '@/pages/loginPage/layouts/index',
    routes: [
      {
        path: '/login',
        component: '@/pages/loginPage/index.tsx',
      },
    ],
  },
  {
    path: '/',
    component: '@/pages/loginPage/layouts/index',
    routes: [
      {
        path: '/',
        redirect: '/login',
      },
      {
        path: '/index',
        redirect: '/login',
      },
      {
        path: '/login',
        component: '@/pages/loginPage/index.tsx',
      },
    ],
  },
];
