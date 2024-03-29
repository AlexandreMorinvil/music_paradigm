import router from '@/router';

export default {
	// User routes
	moveToPreSession: function () {
		router.replace({ name: 'user.pre-session' });
	},

	// Experiment navigation
	moveToExperimentPreparation: function () {
		router.push({ name: 'experiment.preparing' });
	},

	moveToState: function (blockTyoe) {
		// The instantaneous "transition" page is to force Vue to unmount a page and then remount it
		// for each block (which would not happen if two consecutive blocks were of the same type).
		// The unmounting and remounting of a page will force vue to redo the "mounted" component
		// each time we reach a new block, regardless of whether or not we move to twice the same
		// type of vue page.
		router.replace({ name: 'experiment.transition' });
		const microDelay = setTimeout(() => {
			router.replace({ name: 'experiment.' + blockTyoe });
			clearTimeout(microDelay);
		}, 1);
	},
	// Redirect to home page
	goToRootPage: function () {
		router.push({ path: '/' });
	},
	goToHomePage: function (role) {
		switch (role) {
			case 'admin':
				router.push({ path: '/admin' });
				break;
			default:
				router.push({ path: '/user' });
				break;
		}
	},
};
