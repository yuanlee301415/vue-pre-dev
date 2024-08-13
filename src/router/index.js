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
  }
]

export { routes }
export default new Router({
  routes
})
