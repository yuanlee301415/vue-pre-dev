import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
Vue.use(Router)

const routes = [
  // Home
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '',
        name: 'Home',
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
    meta: {
      title: 'Tree'
    },
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
  },

  // vue-tree-list
  {
    path: '/vue-tree-list',
    name: 'vue-tree-list',
    meta: {
      title: 'VUE_TREE_LIST'
    },
    component: Layout,
    children: [
      {
        path: 'basic',
        name: 'vue-tree-list_basic',
        meta: {
          title: 'Basic'
        },
        component: () => import('@/views/vue-tree-list/basic.vue')
      },
      {
        path: 'empty',
        name: 'vue-tree-list_empty',
        meta: {
          title: 'Empty'
        },
        component: () => import('@/views/vue-tree-list/empty.vue')
      },
      {
        path: 'pid',
        name: 'vue-tree-list_pid',
        meta: {
          title: 'PID'
        },
        component: () => import('@/views/vue-tree-list/pid.vue')
      }
    ]
  }
]

export { routes }
export default new Router({
  routes
})
