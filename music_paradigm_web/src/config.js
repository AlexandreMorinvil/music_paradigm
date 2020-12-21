const apiUrl
	= process.env.NODE_ENV === 'production'
		? 'https://api.coffeylab.ca'
		: `${location.protocol}//${location.hostname}:4000`;

export default {
	apiUrl: apiUrl,
	maxRhythmError: 20,
};
