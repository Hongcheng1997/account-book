import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/login/index' },
    { path: '/home', component: '@/pages/home/index' },
    { path: '/accountList', component: '@/pages/account-list/index' },
    { path: '/accountDetails', component: '@/pages/account-details/index' },
    { path: '/charts', component: '@/pages/charts/index' },
  ],
  fastRefresh: {},
  antd: {
    mobile: false,
  },
});
