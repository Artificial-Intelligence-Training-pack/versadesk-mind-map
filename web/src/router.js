import Vue from 'vue';
import VueRouter from 'vue-router';

// 同步導入所有頁面
import Edit from './pages/Edit/Index.vue';
import Doc from './pages/Doc.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Edit',
    component: Edit, // 同步導入的組件
  },
  {
    path: '/index',
    redirect: '/',
  },
  {
    path: '/doc/zh',
    component: Doc, // 同步導入的組件
  },
];

const router = new VueRouter({
  routes,
});

export default router;
