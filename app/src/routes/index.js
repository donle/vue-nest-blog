import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/Home'

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
    ]
})

router.beforeEach((to, from, next) => {
    document.title = 'Jen\'s Blog - ' + to.meta.title
    next()
})
export default router