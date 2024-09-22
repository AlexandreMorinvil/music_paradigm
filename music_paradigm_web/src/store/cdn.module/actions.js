import { cdnApi } from '@/api';

export default {
	// TODO: Include a call to this function at the end of an experiment
	clear({ commit }) {
		commit('clear');
	},

	testCdn({ dispatch, getters }) {
		if (!getters.usesCdn) return new Promise((resolve) => { return resolve(); });
		return cdnApi
			.pingCdn(getters.cdnUrl)
			.then(
				() => {
					dispatch('confirmCdnUse');
					console.log(`Using the CDN on ${getters.cdnUrl}`);
				},
				(error) => {
					dispatch('preventCdnUse');
					console.log(`The CDN is not used: ${error}`);
				},
			);
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
