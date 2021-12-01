import url from '@/_helpers/url';

export default {
	urlStatic: () => (directory) => {
		return url.static(directory);
	},
	urlExperimentResource: () => (directory) => {
		return url.experimentResource(directory);
	},
};
