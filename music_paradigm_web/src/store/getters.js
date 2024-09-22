import url from '@/_helpers/url';

export default {
	urlStatic: () => (directory) => {
		return url.static(directory);
	},

	// eslint-disable-next-line no-unused-vars
	urlExperimentResource: (_, __, ___, rootGetters) => (directory) => {
		if (rootGetters['cdn/canUseCdn']) 
			return rootGetters['cdn/cdnUrl'] + '/experiment_resources/' + directory;
		else
			return url.experimentResource(directory);
	},
};
