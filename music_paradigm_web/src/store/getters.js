import url from'@/_helpers/url';

export default{
	urlStatic: () => (directory) => {
		return url.static(directory);
	},
	urlExperimentRessource: () => (directory) => {
		return url.experimentRessource(directory);
	}
};
