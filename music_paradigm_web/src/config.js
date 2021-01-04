const apiUrl = process.env.NODE_ENV === 'production' ? `https://paradigm.neuro.ki.se` : `${location.protocol}//${location.hostname}:4000`;

export default {
	apiUrl: apiUrl,
	maxRhythmError: 20,
	supportedLocals: {
		en: "english",
		fr: "français",
		sv: "svenska",
	},
};
