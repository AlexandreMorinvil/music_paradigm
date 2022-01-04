import { blockHandler, cursorHandler, defaultState, experimentHandler, flowSwitcher, stateHandler } from '@/store-helper/experiment.module-helper';
import { routerNavigation } from '@/_helpers';

export default {
	clearState(state) {
		Object.assign(state, defaultState.DEFAULT_EXPERIMENT_STATE_VALUES());
	},

	setParameterValues(state, parameterValues) {
		experimentHandler.storeParameterImposedValues(state, parameterValues);
	},

	setExperiment(state, experiment) {
		// Initialize the experiment's reference information
		experimentHandler.initExperimentParsing(state, experiment);
		experimentHandler.setExperimentDescription(state);

		// Initialize the variables within the experiment's description
		experimentHandler.setExperimentVariables(state);
		experimentHandler.setExperimentVariableSchedules(state);
		experimentHandler.populateExperimentConstantVariables(state);

		// Initialzie the experiment's content and states
		experimentHandler.setExperimentPreludeFlow(state);
		experimentHandler.setExperimentFlow(state);
		experimentHandler.setExperimentTimeUpState(state); // TODO : Adjust that to Time Up Flow
		experimentHandler.setExperimentGeneralSettings(state);
		experimentHandler.setExperimentInitialState(state);

		// Conclude the experiment parsing
		experimentHandler.concludeExperimentParsing(state);
	},

	initCursor(state, presetCursor = null) {
		// If a cursor is provided, the experiment is resumed with the state of the cursor.
		// If no cursor is provided, the default values of the cursor is the start ofthe experiment.
		state.cursor = cursorHandler.assignCursor(state.flow, presetCursor);

		// Set the initialization indicators to false
		state.isInitialized = defaultState.IS_FULLY_NOT_INITIALIZED_STATUS();
	},

	initExperiment: (state, initialState) => {
		routerNavigation.moveToExperimentPreparation();
		stateHandler.initializeStartState(state.state, initialState);
		state.initialTimeIndicated = state.state.record.timeIndicated;
	},

	initInitialTime: (state, initialTimeInMilliseconds) => {
		state.initialTimeIndicated = initialTimeInMilliseconds ? initialTimeInMilliseconds / 1000 : state.settings.timeLimitInSeconds;
	},

	updateState: (state) => {
		const { flow, cursor, isInitialized, settings } = state;
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	// Prelude initialization functions
	initializePrelude: (state) => {
		flowSwitcher.moveToPreludeFlow(state);
	},

	leavePrelude: (state) => {
		flowSwitcher.leavePreludeFlow(state);
	},

	// Prelude initialization functions
	initializeTimeout: (state) => {
		// Moving the experiment flow, state and curdsor in a temporary memory to run the timeout flow
		state.tempMemory.flow = JSON.parse(JSON.stringify(state.flow));
		state.tempMemory.state = JSON.parse(JSON.stringify(state.state));
		state.tempMemory.cursor = JSON.parse(JSON.stringify(state.cursor));

		// Set the prelude flow as the experiment to run
		state.flow = state.timeoutFlow;
		state.state = defaultState.DEFAULT_EXPERIMENT_STATE_STATE_VALUES();
		state.cursor = cursorHandler.assignCursor(state.flow);
		state.cursor.flag.isInTimeout = true;

		state.isInitialized = defaultState.IS_FULLY_NOT_INITIALIZED_STATUS();
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

	// End functions
	endExperimentByTimeout: (state) => {
		if (state.state.type === 'end') return;
		state.cursor.flag.isInTimeUp = true;
		const { cursor, settings } = state;
		const timeoutBlock = blockHandler.getTimeUpBlock();
		const isInitialized = defaultState.IS_FULLY_NOT_INITIALIZED_STATUS();
		stateHandler.imposeState(state.state, timeoutBlock, cursor, isInitialized, settings);
		state.state.record.timeIndicated = 0;
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

	trackExperimentTimeIndicated: (state, timeIndicated) => {
		state.state.record.timeIndicatedInMilliseconds = timeIndicated;
	},
};
