export default {
	optimizedResourceUrl: (state) => (url) => {
		return state.resourcesPreloader.getUrlObjectIfPresent(url);
	},
};
