export default {
	DEFAULT_PVT_STATE,
};

function DEFAULT_PVT_STATE() {
	return {
		// Resultst information
		pvtStimuli: [],
		pvtInputTimes: [],
		pvtReactionTimes: [],
		pvtReactionTooEarly: [],

		// Context information
		pvtMinTime: null,
		pvtMaxTime: null,
		pvtCount: null,
		pvtHasCentralElement: true,
	};
}
