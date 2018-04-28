import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import Blog from '@/components/blog/Blog'
import Travel from '@/components/travel/Travel'
import Admin from '@/components/admin/Admin'
import Login from '@/components/admin/login/Login'
import Dashboard from '@/components/admin/dashboard/Dashboard'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/blog',
    bane: 'blog',
    component: Blog,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/travel',
    bane: 'travel',
    component: Travel,
    meta: {
      title: 'Travels'
    }
  },
  {
    path: '/admin',
    redirect: '/admin/login',
    component: Admin,
    meta: {
      title: 'Admin'
    },
    children: [
      {
        path: 'login',
        component: Login,
        meta: {
          title: 'Admin Login'
        }
      },
      {
        path: 'dashboard',
        component: Dashboard,
        meta: {
          title: 'Admin Dashboard'
        }
      }
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'Jen\'s Blog - ' + to.meta.title
  next()
})
export default router