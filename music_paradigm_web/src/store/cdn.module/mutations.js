export default {
	setCdnDetails: (state, sessionInformation) => {
		state.usesCdn = sessionInformation.usesCdn;
		state.cdnUrl = sessionInformation.cdnUrl;
	},

	confirmCdnUse: (state) => {
		state.canUseCdn = true;
	},

	preventCdnUse: (state) => {
		state.canUseCdn = false;
	},

	clear: (state) => {
		state.canUseCdn = false;
		state.cdnUrl = '';
		state.usesCdn = false;
	}
};