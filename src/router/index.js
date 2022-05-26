import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

const routes = [
  // Home
  {
    path: '/',
    name: 'Home',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '',
        meta: {
          title: 'Home'
        },
        component: () => import('@/views/home')
      }
    ]
  },

  // Tree
  {
    path: '/tree',
    name: 'Tree',
    component: Layout,
    redirect: '/tree/my-tree',
    children: [
      {
        path: 'my-tree',
        name: 'MyTree',
        meta: {
          title: 'MyTree'
        },
        component: () => import('@/views/tree/my-tree')
      },
      {
        path: 'vue-js-tree',
        name: 'VueJsTree',
        meta: {
          title: 'VueJsTree'
        },
        component: () => import('@/views/tree/js-tree')
      }
    ]
  }
]

export { routes }
export default new Router({
  routes
})
