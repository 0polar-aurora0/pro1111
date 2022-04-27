/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 23:03:19
 * @LastEditTime: 2022-04-22 19:25:59
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\config\config.ts
 */
// ref: https://umijs.org/config/
import { defineConfig, utils } from 'umi';
// import webpackConfig from "./webpack.config";
// const { winPath } = utils;

// import { primaryColor } from "./defaultSettings";
import routes from './routes';

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },

  dynamicImport: {
    // loading: '@/components/PageLoading/index',
  },

  targets: {
    ie: 9,
  },
  hash: true,
  /**
   * 路由相关配置
   */
  routes: routes,
  history: {
    type: 'hash',
  },
});
