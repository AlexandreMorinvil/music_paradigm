import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

function loggedInGuard(to, from, next) {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user) {
		switch (user.role) {
			case 'admin':
				next('/admin');
				break;
			case 'user':
				next('/user');
				break;
			default:
				break;
		}
	} else next();
}

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'login',
			component: () => import(/* webpackChunkName: "login" */ './views/login.page.vue'),
			beforeEnter: loggedInGuard,
		},
		{
			path: '/experiment',
			name: 'experiment',
			// Route level code-splitting
			// this generates a separate chunk (experiment.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/experiment.context.vue'),
			children: [
				{
					path: 'preparing',
					name: 'experiment.preparing',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/preparing.page.vue'),
				},
				{
					path: 'transition',
					name: 'experiment.transition',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/transition.page.vue'),
				},
				{
					path: 'instruction',
					name: 'experiment.instruction',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/instruction.page.vue'),
				},
				{
					path: 'cue',
					name: 'experiment.cue',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/cue.page.vue'),
				},
				{
					path: 'playing',
					name: 'experiment.playing',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/playing.page.vue'),
				},
				{
					path: 'video',
					name: 'experiment.video',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/video.page.vue'),
				},
				{
					path: 'feedback',
					name: 'experiment.feedback',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/feedback.page.vue'),
				},
				{
					path: 'rest',
					name: 'experiment.rest',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/rest.page.vue'),
				},
				{
					path: 'survey',
					name: 'experiment.survey',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/survey.page.vue'),
				},
				{
					path: 'writting',
					name: 'experiment.writting',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/writting.page.vue'),
				},
				{
					path: 'end',
					name: 'experiment.end',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/end.page.vue'),
				},
			],
		},
		{
			path: '/user',
			component: () => import(/* webpackChunkName: "user" */ './views/user/user.context.vue'),
			children: [
				{
					path: 'home',
					name: 'user.home',
					component: () => import(/* webpackChunkName: "user" */ './views/user/home.page.vue'),
				},
				{
					path: 'pre-session',
					name: 'user.pre-session',
					component: () => import(/* WebpackChunkName: "user" */ './views/user/pre-session.page.vue'),
				},
				{
					path: '',
					name: 'user',
					redirect: { name: 'user.home' },
				},
			],
		},
		// TODO: Guard for the admin page : verify that we are indeed an admin
		{
			path: '/admin',
			component: () => import(/* WebpackChunkName: "admin" */ './views/admin/admin.context.vue'),
			children: [
				{
					path: 'home',
					name: 'admin.home',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/home.page.vue'),
				},
				{
					path: 'users',
					name: 'admin.users',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/users.page.vue'),
				},
				{
					path: 'experiments',
					name: 'admin.experiments',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/experiments.page.vue'),
				},
				{
					path: 'curriculums',
					name: 'admin.curriculums',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/curriculums.page.vue'),
				},
				{
					path: 'ressources',
					name: 'admin.ressources',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/experiment-ressources.page.vue'),
				},
				{
					path: 'data',
					name: 'admin.data',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/data.page.vue'),
				},
				{
					path: 'account',
					name: 'admin.account',
					component: () => import(/* WebpackChunkName: "admin" */ './views/admin/account.page.vue'),
				},
				{
					path: '',
					name: 'admin',
					redirect: { name: 'admin.home' },
				},
			],
		},
		{
			path: '/*',
			redirect: '/',
		},
	],
});

router.beforeEach((to, from, next) => {
	// Redirect to login page if not logged in and trying to access a restricted page
	const publicPages = ['/'];
	const authRequired = !publicPages.includes(to.path);
	const loggedIn = localStorage.getItem('user');

	if (authRequired && !loggedIn) {
		return next('/');
	} else {
		return next();
	}
});

export default router;
