/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import defaultState from './default-state';
import variableHandler from './variable-handler';

export default {
	initExperimentParsing,
	concludeExperimentParsing,
	setExperimentDescription,
	populateExperimentConstantVariables,
	setExperimentGeneralSettings,
	setExperimentInitialRecord,
	setExperimentKeyboardToMidiInputMapping,
	setExperimentFlow,
	storeParameterImposedValues,
	setExperimentVariables,
	setExperimentVariableSchedules,
};


/**
 * Store the parameters imposed to the user by the admin account.
 * The imposed values must be stored before the variables concerned are initialized when calling the setImposedParameterValues() function. 
 * @param {Object} state 						Vuex state
 * @param {Object} parameters					Object containing the list of the parameters imposed in to the user by the admin.
 * 												The object has the shape : 
 * 												{ NAME_OF_PARAMETER_1 : VALUE_OF_PARAMETER_1, NAME_OF_PARAMETER_2 : VALUE_OF_PARAMETER_2, ... }
*/
function storeParameterImposedValues(state, parameters) {
	for (const parameter in parameters) {
		const isVariableExisting = Boolean(state.variablesInformation.variables[parameter]);
		if (!isVariableExisting) state.variablesInformation.variables[parameter] = {};
		state.variablesInformation.variables[parameter].imposedValue = parameters[parameter];
	}
}


/**
 * Store the ID of the experiment received from the backend.
 * @param {Object} state 						Vuex state.
 * @param {Object} state.experiment 			Object from the backend conntaining all information related to the experiment.
*/
function initExperimentParsing(state, experiment) {
	state.experiment = JSON.parse(JSON.stringify(experiment));
	state._id = experiment._id;
}


/**
 * Store the ID of the experiment received from the backend.
 * @param {Object} state 							Vuex state.
*/
function concludeExperimentParsing(state) {
	delete state.experiment;
}


/**
 * Store the "folder", "group", "name" and "version" of the experiment received from the backend. 
 * @param {Object} state 						Vuex state.
 * @param {Object} state.experiment 			Object from the backend conntaining all information related to the experiment.
 * @param {String} state.experiment.folder		Directory where the ressources are stored in the backend.
 * @param {String} state.experiment.group		Group of the experiment.
 * @param {String} state.experiment.name		Name of the experiment.
 * @param {Number} state.experiment.version		Number indicating which version of the experiment it is.
*/
function setExperimentDescription(state) {
	const { name, folder, group, version } = state.experiment;
	state.description = {
		name: name,
		folder: folder,
		group: group || '',
		version: version || 0,
	};
}


/**
 * Store all the variables
 * @param {Object} state 								Vuex state
 * @param {Object} state.experiment						Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} state.experiment.variables	List of the all the variables of the experiment.
*/
function setExperimentVariables(state) {
	const { variables } = state.experiment;
	if (!Array.isArray(variables)) return;

	// Get the dynamic variables
	for (const variable of variables) {
		// Initialize the variable
		const parsedVariable = state.variablesInformation.variables[variable.name] || {};
		state.variablesInformation.variables[variable.name] = parsedVariable;

		// Verifying if there is a valis imposed value
		const hasImposedValue = Object.prototype.hasOwnProperty.call(parsedVariable, 'imposedValue');
		const allowedValues = new Set(variable.optionValues);
		allowedValues.add(variable.assignedValue);
		const isImposedValueValid = allowedValues.has(parsedVariable.imposedValue);

		// Assign the attributes of the variable
		parsedVariable.initialValue = (hasImposedValue && isImposedValueValid) ? parsedVariable.imposedValue : variable.assignedValue;
		parsedVariable.currentValue = parsedVariable.initialValue;
		parsedVariable.isConstant = variable.assignation === 'constant';
		parsedVariable.optionValues = variable.optionValues;
		parsedVariable.valueSelectionType = variable.valueSelectionType;
		parsedVariable.scheduleName = variable.scheduleName;
		parsedVariable.isStateVariable = false;
	}
}

/**
 * And initialize all the schedules
 * @param {Object} state 										Vuex state
 * @param {Object} state.experiment								Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} state.experiment.variablesSchedules	List of the all the schedules of the experiment.
*/
function setExperimentVariableSchedules(state) {
	const { variablesSchedules } = state.experiment;
	if (!Array.isArray(variablesSchedules)) return;

	// Store all the variable schedules
	for (const variablesSchedule in variablesSchedules) {
		const { name, schedule } = variablesSchedule;
		state.variablesInformation.schedules[name] = schedule;
	}
}

/**
 * Populate the flow and prelude flow with all the variable/parameter that are meant to be constant for the experiment. 
 * Once the constant variables/parameters are populated in the experiment, they can never be changed in the experiment for the ongoing session.
 * 
 * The only time in a session where the constant variables are populated is at the beginning. Afterward, any futher variable population is for
 * dynamic variables or state variables, but not for constant variables, which is why the this fonctions also handles the puplation of the 
 * randomized constant variables.
 * @param {Object} state 										Vuex state
 * @param {Object} state.experiment								Object from the backend conntaining all information related to the experiment.
*/
function populateExperimentConstantVariables(state) {
	state.experiment = variableHandler.populateVariables(state.experiment, true);
}


/**
 * Parse and store all the general settings of the experiment received from the backend.
 * If an expected attribute/parameter is not present in the "experiment" object, a default value is set for the attribute.
 * @param {Object} state 										Vuex state.
 * @param {Object} state.experiment 							Object from the backend conntaining all information related to the experiment 
 * 																including all the general settings of the experiment as attributes.
*/
function setExperimentGeneralSettings(state) {
	const {
		anyPianoKey,
		enableSoundFlag,
		playingMode,
		instrument,
		footnote,
		footnoteType,
		timeLimitInSeconds,
		logFlag,
		successesForSkip,
		hideFeedbackSmiley,
		isSkipStepButtonInFootnote,
		isGoBackButtonInFootnote,
		programmedOctaveOffset,
		interactivePianoFirstOctave,
		controlType,
		relativeRhythmImportance,
		rhythmErrorMarginInMilliseconds,
		rhythmRelativeErrorMarginInFloat,
		withProgressionBar,
		cueWaitForClick,
		withTimer,
		hasClearBackground,
		hasSound,
		timeLeftMessages,
		hashasNavigationBar,
		hasStatusBar,
		isFullScreen,
	} = state.experiment;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	const defaultSettings = defaultState.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.settings = {
		anyPianoKey: 						typeof anyPianoKey === 'boolean' 					? anyPianoKey : defaultSettings.anyPianoKey,
		enableSoundFlag: 					typeof enableSoundFlag === 'boolean' 				? enableSoundFlag : defaultSettings.enableSoundFlag,
		playingMode: 						typeof playingMode === 'string' 					? playingMode : defaultSettings.playingMode,
		instrument: 						typeof instrument === 'string' 						? instrument : defaultSettings.instrument,
		footnote: 							typeof footnote === 'boolean' 						? footnote : defaultSettings.footnote,
		footnoteType: 						typeof footnoteType === 'string' 					? footnoteType : defaultSettings.footnoteType,
		timeLimitInSeconds: 				typeof timeLimitInSeconds === 'number' 				? timeLimitInSeconds : defaultSettings.timeLimitInSeconds,
		logFlag: 							typeof logFlag === 'boolean' 						? logFlag : defaultSettings.logFlag,
		successesForSkip: 					typeof successesForSkip === 'number' 				? successesForSkip : defaultSettings.successesForSkip,
		hideFeedbackSmiley: 				typeof hideFeedbackSmiley === 'boolean' 			? hideFeedbackSmiley : defaultSettings.hideFeedbackSmiley,
		isSkipStepButtonInFootnote: 		typeof isSkipStepButtonInFootnote === 'boolean' 	? isSkipStepButtonInFootnote : defaultSettings.isSkipStepButtonInFootnote,
		isGoBackButtonInFootnote: 			typeof isGoBackButtonInFootnote === 'boolean' 		? isGoBackButtonInFootnote : defaultSettings.isGoBackButtonInFootnote,
		programmedOctaveOffset: 			typeof programmedOctaveOffset === 'number' 			? programmedOctaveOffset : defaultSettings.programmedOctaveOffset,
		interactivePianoFirstOctave: 		typeof interactivePianoFirstOctave === 'number' 	? interactivePianoFirstOctave : defaultSettings.interactivePianoFirstOctave,
		controlType: 						typeof controlType === 'string' 					? controlType : defaultSettings.controlType,
		relativeRhythmImportance: 			typeof relativeRhythmImportance === 'number' 		? relativeRhythmImportance : defaultSettings.relativeRhythmImportance,
		rhythmErrorMarginInMilliseconds: 	typeof rhythmErrorMarginInMilliseconds == 'number' 	? rhythmErrorMarginInMilliseconds : defaultSettings.rhythmErrorMarginInMilliseconds,
		rhythmRelativeErrorMarginInFloat: 	typeof rhythmRelativeErrorMarginInFloat == 'number' ? rhythmRelativeErrorMarginInFloat : defaultSettings.rhythmRelativeErrorMarginInFloat,
		withProgressionBar: 				typeof withProgressionBar === 'boolean' 			? withProgressionBar : defaultSettings.withProgressionBar,
		cueWaitForClick: 					typeof cueWaitForClick === 'boolean' 				? cueWaitForClick : defaultSettings.cueWaitForClick,
		withTimer: 							typeof withTimer === 'boolean' 						? withTimer : defaultSettings.withTimer,
		hasClearBackground: 				typeof hasClearBackground === 'boolean' 			? hasClearBackground : defaultSettings.hasClearBackground,
		hasSound: 							typeof hasSound === 'boolean' 						? hasSound : defaultSettings.hasSound,
		timeLeftMessages:					typeof timeLeftMessages === 'object'				? timeLeftMessages : defaultSettings.timeLeftMessages,
		hashasNavigationBar:				typeof hashasNavigationBar === 'boolean'			? hashasNavigationBar : defaultSettings.hashasNavigationBar,
		hasStatusBar:						typeof hasStatusBar === 'boolean'					? hasStatusBar : defaultSettings.hasStatusBar,
		isFullScreen:						typeof isFullScreen === 'boolean'					? isFullScreen : defaultSettings.isFullScreen,
	};
}


/**
 * Parse and store all the initial parameters to be sotred as "state records" of the experiment received from the backend.
 * If an expected attribute/parameter is not present in the "experiment" object, a default value is set for the attribute.
 * The "state records" differ from the "general settings" in that they are dynamic values that often change values as the
 * experiment progresses based on certain performances of the user or on explicit specifications in the experiment description.
 * @param {Object} state 								Vuex state.
 * @param {Object} state.experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {String} state.experiment.logLabel			Initial log label of the experiment (can be changed during the completion of the experiment).
*/
function setExperimentInitialRecord(state) {
	const { logLabel } = state.experiment;
	const defaultSettings = defaultState.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.state.record.logLabel = typeof logLabel === 'string' ? logLabel : defaultSettings.logLabel;
}


/**
 * Parse and store the keyboad to midi input mapping for the session. This mapping is notably useful for the experiments using the clicker or computer keyboard.
 * @param {Object} state 										Vuex state.
 * @param {Object} state.experiment 							Object from the backend conntaining all information related to the experiment.
 * @param {Object} state.experiment.keyboardToMidiInputMapping	Keyboard to midi mapping object
*/
function setExperimentKeyboardToMidiInputMapping(state) {
	const { keyboardToMidiInputMapping } = state.experiment;
	const defaultKeyboardToMidiInputMapping = defaultState.DEFAULT_KEYBOARD_TO_MIDI_INPUT_MAPPING();

	// Verify if the keyboardToMidiInputMapping is an object
	const hasMappingProvided = typeof keyboardToMidiInputMapping === 'object' && !Array.isArray(keyboardToMidiInputMapping);

	// Assign the mapping
	state.keyboardToMidiInputMapping = hasMappingProvided ? keyboardToMidiInputMapping : defaultKeyboardToMidiInputMapping;
}


/**
 * Store the main flow of the experiment received from the backend. 
 * @param {Object} state 								Vuex state.
 * @param {Object} state.experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} state.experiment.flow			Flow description of all the steps of the experiment.
*/
function setExperimentFlow(state) {
	// Deep copying the flow
	const { flow, flowPrelude, flowConclusion, timeUpState } = state.experiment;
	state.flow = JSON.parse(JSON.stringify(flow));

	// Deep copying the prelude flow
	const flowPreludeToAssign = Array.isArray(flowPrelude) ? flowPrelude : [];
	state.flowPrelude = JSON.parse(JSON.stringify(flowPreludeToAssign));

	// Deep copying the conclusion flow
	const flowConclusionToAssign = Array.isArray(flowConclusion) ? flowConclusion : [];
	state.flowConclusion = JSON.parse(JSON.stringify(flowConclusionToAssign));

	// Deep copying the timeout state
	state.timeUpState = timeUpState ? JSON.parse(JSON.stringify(timeUpState)) : null;
}
