// import Vue from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import(/* webpackChunkName: "index" */ '@/pages/index')
const routes = [
  {path: '/index', redirect: '/'},
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      keepAlive: true
    },
  },
]

const mainRoutes = routes.concat()

export default createRouter({
  // TODO 测试环境为 /metatdexv2/v1 生产环境为 /
  history: createWebHistory(import.meta.env.VITE_APP_BASE_ROUTER_URL),
  routes: mainRoutes,
  scrollBehavior () {
    return {left: 0, top: 0}
  }
})
