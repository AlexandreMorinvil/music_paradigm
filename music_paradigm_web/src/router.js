import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Feedback from './views/Feedback.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/instruction',
      name: 'instruction',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Instruction.vue')
    },
    {
      path: '/cue',
      name: 'cue',
      component: () => import(/* webpackChunkName: "about" */ './views/Cue.vue')
    },
    {
      path: '/playing',
      name: 'playing',
      component: () => import(/* webpackChunkName: "about" */ './views/Playing.vue')
    },
    {
      path: '/video',
      name: 'video',
      component: () => import(/* webpackChunkName: "about" */ './views/Video.vue')
    },
    // {
    //   path: '/feedback/:status',
    //   name: 'feedback',
    //   component: Feedback,
    //   props: true
    // },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    },
    {
      path: '/rest',
      name: 'rest',
      component: () => import(/* webpackChunkName: "about" */ './views/Rest.vue')
    },
    {
      path: '/end',
      name: 'end',
      component: () => import(/* webpackChunkName: "about" */ './views/End.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "about" */ './views/AdminLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ './views/Register.vue'),
    },
    {
      path: '*',
      redirect: '/'
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/', '/admin'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/');
//   }

//   next();
// })

export default router