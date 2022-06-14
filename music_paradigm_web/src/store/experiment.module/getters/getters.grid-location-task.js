// PVT state parameters
export default {
	matrixSizeX: (state) => {
		return state.state.settings.matrixSizeX;
	},

	matrixSizeY: (state) => {
		return state.state.settings.matrixSizeY;
	},

	stimuliTime: (state) => {
		return state.state.settings.stimuliTime;
	},
};
