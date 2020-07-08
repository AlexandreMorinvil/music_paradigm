import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/experiment',
      name: 'experiment',
      // route level code-splitting
      // this generates a separate chunk (experiment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Experiment.vue'),
      children: [
        {
          path: '/instruction',
          name: 'instruction',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Instruction.vue')
        },
        {
          path: '/cue',
          name: 'cue',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Cue.vue')
        },
        {
          path: '/playing',
          name: 'playing',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Playing.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Video.vue')
        },
        {
          path: '/feedback',
          name: 'feedback',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Feedback.vue')
        },
        {
          path: '/rest',
          name: 'rest',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/Rest.vue')
        },
        {
          path: '/end',
          name: 'end',
          component: () => import(/* webpackChunkName: "experiment" */ './views/experiment/End.vue')
        },
      ]
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
      path: '/*',
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