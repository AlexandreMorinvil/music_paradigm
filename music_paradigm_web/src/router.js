import Vue from 'vue';
import Router from 'vue-router';

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
			component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
			beforeEnter: loggedInGuard,
		},
		{
			path: '/experiment',
			name: 'experiment',
			// Route level code-splitting
			// this generates a separate chunk (experiment.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Experiment.vue'),
			children: [
				{
					path: 'prelude',
					name: 'experiment.prelude',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Prelude.vue'),
				},
				{
					path: 'transition',
					name: 'experiment.transition',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Transition.vue'),
				},
				{
					path: 'instruction',
					name: 'experiment.instruction',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Instruction.vue'),
				},
				{
					path: 'cue',
					name: 'experiment.cue',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Cue.vue'),
				},
				{
					path: 'playing',
					name: 'experiment.playing',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Playing.vue'),
				},
				{
					path: 'video',
					name: 'experiment.video',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Video.vue'),
				},
				{
					path: 'feedback',
					name: 'experiment.feedback',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Feedback.vue'),
				},
				{
					path: 'rest',
					name: 'experiment.rest',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/Rest.vue'),
				},
				{
					path: 'end',
					name: 'experiment.end',
					component: () => import(/* WebpackChunkName: "experiment" */ './views/experiment/End.vue'),
				},
			],
		},
		{
			path: '/user',
			component: () => import(/* webpackChunkName: "user" */ './views/userPage/UserPage.vue'),
			children: [
				{
					path: 'home',
					name: 'user.home',
					component: () => import(/* webpackChunkName: "user" */ './views/userPage/Home.vue'),
				},
				{
					path: 'experiments',
					name: 'user.experiment',
					component: () => import(/* WebpackChunkName: "user" */ './views/userPage/Experiments.vue'),
				},
				{
					path: 'account',
					name: 'user.account',
					component: () => import(/* WebpackChunkName: "user" */ './views/userPage/Account.vue'),
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
			component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/AdminPage.vue'),
			children: [
				{
					path: 'home',
					name: 'admin.home',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Home.vue'),
				},
				{
					path: 'users',
					name: 'admin.users',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Users.vue'),
				},
				{
					path: 'experiments',
					name: 'admin.experiments',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Experiments.vue'),
				},
				{
					path: 'curriculums',
					name: 'admin.curriculums',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Curriculums.vue'),
				},
				{
					path: 'ressources',
					name: 'admin.ressources',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/ExperimentRessources.vue'),
				},
				{
					path: 'data',
					name: 'admin.data',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Data.vue'),
				},
				{
					path: 'account',
					name: 'admin.account',
					component: () => import(/* WebpackChunkName: "admin" */ './views/adminPage/Account.vue'),
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
		next();
	}
});

export default router;
