/*
 * @Author: fuzhenghao
 * @Date: 2022-02-28 21:34:54
 * @LastEditTime: 2022-04-22 19:21:28
 * @LastEditors: fuzhenghao
 * @Description:
 * @FilePath: \pro1111\.umirc.ts
 */
import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: {},
  // routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  routes: routes,
  proxy: {
    '/login': {
      target: 'http://124.222.55.113',
      // target: 'http://127.0.0.1',
      secure: false,
      changeOrigin: true,
    },
    '/logout': {
      target: 'http://124.222.55.113',
      // target: 'http://127.0.0.1',
      secure: false,
      changeOrigin: true,
    },

    '/api/*': {
      target: 'http://124.222.55.113',
      // target: 'http://127.0.0.1',
      secure: false, // 接受 运行在 https 上的服务
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
});
