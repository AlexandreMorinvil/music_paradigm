import { cursorHandler, defaultState, experimentHandler, flowHandler, stateHandler, taskMarkerCriticalBackup } from '@/store-helper/experiment.module-helper';
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
		experimentHandler.setExperimentFlow(state);
		experimentHandler.setExperimentGeneralSettings(state);
		experimentHandler.setExperimentInitialRecord(state);
		experimentHandler.setExperimentKeyboardToMidiInputMapping(state);

		// Conclude the experiment parsing
		experimentHandler.concludeExperimentParsing(state);
	},

	initCursor(state, presetCursor = null) {
		// If a cursor is provided, the experiment is resumed with the state of the cursor.
		// If no cursor is provided, the default values of the cursor is the start ofthe experiment.
		state.cursor = cursorHandler.assignCursor(state.flow, presetCursor);
		cursorHandler.determineGroupEnd(state.flow, state.cursor);

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

	// HACK
	setCriticalBackup: (state, { criticalBackup, previousState, previousCursor }) => {
		state.criticalBackup = criticalBackup ?? { state: previousState, cursor: previousCursor };
	},

	updateCriticalBackup: (state) => {
		taskMarkerCriticalBackup.updateCriticalBackup(state);
	},

	updateState: (state) => {
		const { flow, isInitialized, settings } = state;
		taskMarkerCriticalBackup.performCriticalAdjustment(state); // HACK
		stateHandler.updateState(state.state, flow, state.cursor, isInitialized, settings);
	},

	// Prelude flow initialization functions
	initializePrelude: (state) => {
		flowHandler.moveToPreludeFlow(state);
		const { flow, cursor, isInitialized, settings } = state;
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	// Conclusion flow initialization functions
	endExperimentByTimeUp: (state) => {
		state.hasJustEnteredTheMainFlow = false;
		flowHandler.moveToTimesUpConclusionFlow(state);
		const { flow, cursor, isInitialized, settings } = state;
		stateHandler.updateState(state.state, flow, cursor, isInitialized, settings);
	},

	// Cursor handling
	moveNextStep: (state) => {
		state.hasJustEnteredTheMainFlow = false;
		let { flow, cursor, isInitialized, settings } = state;
		cursorHandler.advance(state.state, flow, cursor, isInitialized);
		({ flow, cursor, isInitialized, settings } = flowHandler.changeFlowIfNeeded(state));
		taskMarkerCriticalBackup.performCriticalAdjustment(state); // HACK
		stateHandler.updateState(state.state, flow, state.cursor, isInitialized, settings);
	},

	movePreviousInnerStep: (state) => {
		state.hasJustEnteredTheMainFlow = false;
		let { flow, cursor, isInitialized, settings } = state;
		cursorHandler.goBack(flow, cursor, isInitialized);
		({ flow, cursor, isInitialized, settings } = flowHandler.changeFlowIfNeeded(state));
		taskMarkerCriticalBackup.performCriticalAdjustment(state); // HACK
		stateHandler.updateState(state.state, flow, state.cursor, isInitialized, settings);
	},

	movePostSkip: (state) => {
		state.hasJustEnteredTheMainFlow = false;
		let { flow, cursor, isInitialized, settings } = state;
		cursorHandler.skip(state.state, flow, cursor, isInitialized);
		({ flow, cursor, isInitialized, settings } = flowHandler.changeFlowIfNeeded(state));
		taskMarkerCriticalBackup.performCriticalAdjustment(state); // HACK
		stateHandler.updateState(state.state, flow, state.cursor, isInitialized, settings);
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

	setReferenceSurveyAnswer: (state, referenceSurveyAnswer) => {
		state.state.record.referenceSurveyAnswer = referenceSurveyAnswer;
	},

	stopWaitingStartSignalReady: (state) => {
		state.state.record.isWaitingReadyStartSignal = false;
	},

	trackExperimentTimeIndicated: (state, timeIndicated) => {
		state.state.record.timeIndicatedInMilliseconds = timeIndicated;
	},

	setTimesUpStatus: (state) => {
		state.state.record.isInTimeUp = true;
	}
};
