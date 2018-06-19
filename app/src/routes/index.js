import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'
import Blog from '@/components/blog/Blog'
import Travel from '@/components/travel/Travel'
import Admin from '@/components/admin/Admin'
import Login from '@/components/admin/login/Login'
import Dashboard from '@/components/admin/dashboard/Dashboard'
import General from '@/components/admin/dashboard/General'
import Editor from '@/components/admin/dashboard/Editor'
import BannerSetting from '@/components/admin/dashboard/BannerSetting'
import BlogManager from '@/components/admin/dashboard/BlogManager'
import MusicManager from '@/components/admin/dashboard/MusicManager'
import PhotoManager from '@/components/admin/dashboard/PhotoManager'
import TravelManager from '@/components/admin/dashboard/TravelManager'
import VlogManager from '@/components/admin/dashboard/VlogManager'
import ArticleView from '@/components/view/Article'

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
    name: 'blog',
    component: Blog,
    meta: {
      title: 'Blogs'
    }
  },
  {
    path: '/article',
    name: 'article',
    component: ArticleView,
    meta: {
      title: 'View Article'
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
        redirect: '/admin/dashboard/general',
        component: Dashboard,
        meta: {
          title: 'Admin Dashboard'
        },
        children: [
          {
            path: 'general',
            component: General,
            meta: {
              title: 'Admin Dashboard - General Settings'
            }
          },
          {
            path: 'banner-setting',
            component: BannerSetting,
            meta: {
              title: 'Admin Dashboard - Setting'
            }
          },
          {
            path: 'blog-list',
            component: BlogManager,
            meta: {
              title: 'Admin Dashboard - Blog Management'
            }
          },
          {
            path: 'subject',
            component: Editor,
            meta: {
              title: 'Blog Editor'
            }
          },
          {
            path: 'travel-list',
            component: TravelManager,
            meta: {
              title: 'Admin Dashboard - Travel Management'
            }
          },
          {
            path: 'music-list',
            component: MusicManager,
            meta: {
              title: 'Admin Dashboard - Music Management'
            }
          },
          {
            path: 'photo-list',
            component: PhotoManager,
            meta: {
              title: 'Admin Dashboard - Photo Management'
            }
          },
          {
            path: 'vlog-list',
            component: VlogManager,
            meta: {
              title: 'Admin Dashboard - Vlog Management'
            },
          }
        ]
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