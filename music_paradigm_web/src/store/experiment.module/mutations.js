import { routerNavigation } from '@/_helpers';

import constants from './constants';
import cursorHandler from './flow-helper/cursor-handler';
import experimentHandler from './flow-helper/experiment-handler';
import stateHandler from './flow-helper/state-handler';

export default {
	clearState(state) {
		Object.assign(state, constants.DEFAULT_EXPERIMENT_STATE_VALUES());
	},

	setParameterValues(state, parameterValues) {
		experimentHandler.storeParameterImposedValues(state, parameterValues);
	},

	setExperiment(state, experiment) {
		// Verify the minimal required properties
		if (!Object.prototype.hasOwnProperty.call(experiment, 'name')) throw new Error('No name was found in the experiment');
		if (!Object.prototype.hasOwnProperty.call(experiment, 'folder')) throw new Error('No folder was found in the experiment');
		if (!Object.prototype.hasOwnProperty.call(experiment, 'flow')) throw new Error('No flow was found in the experiment');

		experimentHandler.setExperimentId(state, experiment);
		experimentHandler.setExperimentDescription(state, experiment);
		experimentHandler.setExperimentPrelude(state, experiment);
		experimentHandler.setExperimentFlow(state, experiment);
		experimentHandler.setExperimentGeneralSettings(state, experiment);
		experimentHandler.setImposedParameterValues(state, experiment);
		experimentHandler.populateExperimentConstantVariables(state, experiment);
		experimentHandler.setExperimentDynamicVariables(state, experiment);

		state.hasExperiment = true;
	},

	initCursor(state, presetCursor = null) {
		// If a cursor is provided, the experiment is resumed with the state of the cursor.
		// If no cursor is provided, the default values of the cursor is the start ofthe experiment.
		state.cursor = cursorHandler.assignCursor(state.flow, presetCursor);

		// Set the initialization indicators to false
		state.isInitialized = constants.IS_FULLY_NOT_INITIALIZED_STATUS();
	},

	initExperiment: (state, initialState) => {
		routerNavigation.moveToExperimentPreparation();
		state.state = initialState || constants.DEFAULT_EXPERIMENT_STATE_STATE_VALUES();
	},

	updateState: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	// Prelude initialization functions
	initializePrelude: (state, initialState) => {
		routerNavigation.moveToExperimentPrelude();
		state.state = initialState || constants.DEFAULT_EXPERIMENT_STATE_STATE_VALUES();
	},

	initPreludeCursor(state) {
		state.cursor = cursorHandler.assignCursor(state.prelude);
		state.isInitialized = constants.IS_FULLY_NOT_INITIALIZED_STATUS();
	},

	updateStateInPrelude: (state) => {
		const { prelude, preludeCursor, isInitialized, settings } = state;
		stateHandler.updateState(state.state, prelude, preludeCursor, isInitialized, settings);
	},

	// Cursor handling
	moveNextStep: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		cursorHandler.advance(state.state, flow, cursor, isInitialized);
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	movePreviousInnerStep: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		cursorHandler.goBack(flow, cursor, isInitialized);
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	movePostSkip: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		cursorHandler.skip(state.state, flow, cursor, isInitialized);
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	movePostSkipRepetions: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		cursorHandler.moveCursorPostSkipRepetions(state.state, flow, cursor, isInitialized);
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	// End functions
	endExperimentByTimeout: (state) => {
		const message = 'The time limit was reached.\nThe experiment ends here.';
		stateHandler.forceEndState(state.state, state.isInitialized, message);
	},

	leaveExperiment: () => {
		routerNavigation.goToRootPage();
	},

	// Record functions
	addSuccess: (state) => {
		state.state.record.isSuccess = true;
		state.state.record.sucesses += 1;
		state.state.record.successesInLoop += 1;
	},

	stopWaitingStartSignalReady: (state) => {
		state.state.record.isWaitingReadyStartSignal = false;
	},
};
