// PVT state parameters
export default {
	matrixSizeX: (state) => {
		return state.state.settings.matrixSizeX;
	},

	matrixSizeY: (state) => {
		return state.state.settings.matrixSizeY;
	},

	matrixUsedCellsCount: (state, getters) => {
		const totalMatrixCellCount = getters.matrixSizeX * getters.matrixSizeY;
		const specififedMatrixUsedCellsCount = state.state.settings.matrixUsedCellsCount;

		// If the specified number of cells is positive, we return that number (or the number of all the cells if the number is too large).
		if (specififedMatrixUsedCellsCount > 0) return Math.min(specififedMatrixUsedCellsCount, totalMatrixCellCount);

		// If the specified number of cells is negative, we return the total number of cells minus the specified number (or a minumum of 0).
		else if (specififedMatrixUsedCellsCount < 0) return Math.max(totalMatrixCellCount - Math.abs(specififedMatrixUsedCellsCount), 0);

		// Otherwise, we return the specified number, which can only be 0.
		else return specififedMatrixUsedCellsCount;
	},

	stimuliTime: (state) => {
		return state.state.settings.stimuliTime;
	},
};
