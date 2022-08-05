import { matrix } from '@/_helpers';

// PVT state parameters
export default {
	gltScoreForSuccess: (state) => {
		return state.state.settings.gltScoreForSuccess;
	},

	gltMustHideBeforeClick: (state) => {
		return state.state.settings.gltMustHideBeforeClick;
	},

	gltPauseBetweenPresentations: (state) => {
		return state.state.settings.gltPauseBetweenPresentations;
	},

	gltPauseBetweenStimuli: (state) => {
		return state.state.settings.gltPauseBetweenStimuli;
	},

	gltCellSize: (state) => {
		return state.state.settings.gltCellSize;
	},

	matrixSizeX: (state) => {
		return state.state.settings.matrixSizeX;
	},

	matrixSizeY: (state) => {
		return state.state.settings.matrixSizeY;
	},

	matrixUnusedCells: (state) => {
		return state.state.settings.matrixUnusedCells;
	},

	matrixUsedCellsCount: (state, getters) => {
		const matrixSizeY = getters.matrixSizeY;
		const matrixSizeX = getters.matrixSizeX;
		const matrixUnusedCells = getters.matrixUnusedCells;
		const totalMatrixCellCount = matrixSizeX * matrixSizeY;
		const maxUsedCellsCount =
			totalMatrixCellCount - matrix.getIgnoredCellsCount(matrixUnusedCells, matrixSizeX, matrixSizeY);
		const specififedMatrixUsedCellsCount = state.state.settings.matrixUsedCellsCount;

		// If the specified number of cells is positive, we return that number (or the number of all the cells if 
		// the number is too large).
		if (specififedMatrixUsedCellsCount > 0)
			return Math.min(specififedMatrixUsedCellsCount, maxUsedCellsCount);

		// If the specified number of cells is negative, we return the total number of cells minus the specified 
		// number (or a minumum of 0).
		else if (specififedMatrixUsedCellsCount < 0)
			return Math.max(
				Math.min(totalMatrixCellCount - Math.abs(specififedMatrixUsedCellsCount), maxUsedCellsCount),
				0,
			);

		// Otherwise, we return the specified number, which can only be 0.
		else return specififedMatrixUsedCellsCount;
	},

	stimuliTime: (state) => {
		return state.state.settings.stimuliTime;
	},

	includesPresentation: (state) => {
		return state.state.settings.includesPresentation;
	},

	includesTest: (state) => {
		return state.state.settings.includesTest;
	},
};
