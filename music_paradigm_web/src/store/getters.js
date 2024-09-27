import url from '@/_helpers/url';

export default {
	urlStatic: () => (directory) => {
		return url.static(directory);
	},

	// eslint-disable-next-line no-unused-vars
	urlExperimentResource: (_, __, ___, rootGetters) => (directory) => {
		// Verify if a CDN is being used
		let resourceUrl = null;
		if (rootGetters['cdn/canUseCdn']) 
			resourceUrl = rootGetters['cdn/cdnUrl'] + '/experiment_resources/' + directory;
		else
			resourceUrl = url.experimentResource(directory);

		// Return the obejct URL if the resource was preloaded
		return rootGetters['resourcesPreloader/optimizedResourceUrl'](resourceUrl);
	},
};
