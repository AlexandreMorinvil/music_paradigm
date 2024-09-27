export default {
	initializePreloading: (state, { flowPrelude, flow, index, folder }) => {
		state.resourcesPreloader.setBaseFolder(folder);
		state.resourcesPreloader.preloadListOfFilesBasedOnSlidingWindow(flowPrelude, 0, false);
		state.resourcesPreloader.preloadListOfFilesBasedOnSlidingWindow(flow,  index, false);
	},

    updatePreloader: (state, { flow, index, isMainFlow }) => {
        state.resourcesPreloader.preloadListOfFilesBasedOnSlidingWindow(flow,  index, isMainFlow);
    },

	setBaseUrl: (state, baseUrl) => {
		state.resourcesPreloader.setBaseUrl(baseUrl);
	},

	reset: (state) => {
		state.resourcesPreloader.reset();
	},
};