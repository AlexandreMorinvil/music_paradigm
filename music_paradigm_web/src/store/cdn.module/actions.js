import { cdnApi } from '@/api';

export default {
	// TODO: Include a call to this function at the end of an experiment
	clear({ commit }) {
		commit('clear');
	},

	testCdn({ dispatch, getters, rootGetters }) {
		if (!getters.usesCdn) return new Promise((resolve) => { return resolve(); });
		dispatch('resourcesPreloader/reset', undefined, { root: true });
		return cdnApi
			.pingCdn(getters.cdnUrl)
			.then(
				() => {
					dispatch('confirmCdnUse');
					dispatch('resourcesPreloader/setBaseUrl', getters.cdnUrl, { root: true });

					console.log(`Using the CDN on ${getters.cdnUrl}`);
				},
				(error) => {
					dispatch('preventCdnUse');
					console.log(`The CDN is not used: ${error}`);
				},
			)
			.then(() => {
				dispatch(
					'resourcesPreloader/initializePreloading',
					{
						folder: rootGetters['session/baseResourcesFolder'],
						flow: rootGetters['session/initialFlow'],
						index: rootGetters['session/initialReachedIndex'],
						flowPrelude: rootGetters['session/initialFlowPrelude'],
					},
					{ root: true }
				);
			});
	},

	setCdnDetails({ commit, dispatch }, sessionInformation) {
		commit('setCdnDetails', sessionInformation);
		dispatch('testCdn');
	},

	confirmCdnUse({ commit }) {
		commit('confirmCdnUse');
	},

	preventCdnUse({ commit }) {
		commit('preventCdnUse');
	},
};
