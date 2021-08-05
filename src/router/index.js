/*
 * @Author: abc
 * @Date: 2021-07-28 17:31:16
 * @LastEditors: abc
 * @LastEditTime: 2021-08-05 17:40:02
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router';
import Private from '../views/Private.vue';

const routes = [
  {
    path: '/',
    name: 'Private',
    component: Private
  },
  {
    path: '/Address',
    name: 'Address',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Address.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
