/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
/* eslint-disable key-spacing */
import defaultState from './default-state';

import variableHandler from './variable-handler';

export default {
	setExperimentId,
	setExperimentDescription,
	populateExperimentConstantVariables,
	setExperimentGeneralSettings,
	setExperimentInitialState,
	setExperimentPrelude,
	setExperimentFlow,
	setExperimentTimeUpState,
	storeParameterImposedValues,

	setExperimentVariables,
	setExperimentVariableSchedules,
};

/**
 * Store the ID of the experiment received from the backend.
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {String} experiment._id				Database ID of the experiment from the backend.
*/
function setExperimentId(state, experiment) {
	state._id = experiment._id;
}


/**
 * Store the "folder", "group", "name" and "version" of the experiment received from the backend. 
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {String} experiment.folder			Directory where the ressources are stored in the backend.
 * @param {String} experiment.group				Group of the experiment.
 * @param {String} experiment.name				Name of the experiment.
 * @param {Number} experiment.version			Number indicating which version of the experiment it is.
*/
function setExperimentDescription(state, experiment) {
	const { name, folder, group, version } = experiment;

	state.description = {
		name: name,
		folder: folder,
		group: group || '',
		version: version || 0,
	};
}


/**
 * Store the prelude flow of the experiment received from the backend. 
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.prelude	Flow description of the "prelude" which is a set of steps that will be presented  
 * 												before the main experiment takes place.
*/
function setExperimentPrelude(state, experiment) {
	// Verify if a prelude is provided
	if (!experiment.prelude) return;
	let { prelude } = experiment;

	// Deep copying the prelude
	prelude = Array.isArray(prelude) ? prelude : [];
	state.prelude = JSON.parse(JSON.stringify(prelude));
}


/**
 * Store the main flow of the experiment received from the backend. 
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.flow		Flow description of all the steps of the experiment.
*/
function setExperimentFlow(state, experiment) {
	// Deep copying the flow
	state.flow = JSON.parse(JSON.stringify(experiment.flow));
}


/**
 * Store the state to be presented when the time available is lapsed for the experiment received from the backend.
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {Object} experiment.timeUpState		Block of type "End" that will be presented upon a time's up for the experiment.
*/
function setExperimentTimeUpState(state, experiment) {
	// Deep copying the state
	const timeUpState = experiment.timeUpState;
	if (!timeUpState) return;
	state.timeUpState = JSON.parse(JSON.stringify(timeUpState));
	state.timeUpState.type = 'end';
}


/**
 * Store all the variables
 * @param {Object} state 						Vuex state
 * @param {Object} experiment					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.variables	List of the all the variables of the experiment.
*/
function setExperimentVariables(state, experiment) {
	const { variables } = experiment;
	if (!Array.isArray(variables)) return;

	// Get the dynamic variables
	for (const variable of variables) {
		// Initialize the variable
		const parsedVariable = state.variable.variables[variable.name] || {};
		state.variable.variables[variable.name] = parsedVariable;

		// Verifying if there is a valis imposed value
		const hasImposedValue = Object.prototype.hasOwnProperty.call(parsedVariable, 'imposedValue');
		const allowedValues = new Set(variable.optionValues);
		allowedValues.add(variable.assignedValue);
		const isImposedValueValid = allowedValues.has(parsedVariable[variable.name].imposedValue);

		// Assign the attributes of the variable
		parsedVariable.initialValue = (hasImposedValue && isImposedValueValid) ? parsedVariable.imposedValue : variable.assignedValue;
		parsedVariable.currentValue = parsedVariable.initialValue;
		parsedVariable.isDynamic = variable.assignation === 'dynamic';
		parsedVariable.optionValues = variable.optionValues;
		parsedVariable.valueSelectionType = variable.valueSelectionType;
		parsedVariable.schedule = variable.schedule;
	}
}

/**
 * And initialize all the schedules
 * @param {Object} state 						Vuex state
 * @param {Object} experiment					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.schedules	List of the all the schedules of the experiment.
*/
function setExperimentVariableSchedules(state, experiment) {
	const { variablesSchedules } = experiment;
	if (!Array.isArray(variablesSchedules)) return;

	// Store all the variable schedules
	for (const variablesSchedule in variablesSchedules) {
		const { name, schedule } = variablesSchedule;
		state.variable.schedules[name] = schedule;
	}
}

/**
 * Populate the flow and prelude with all the variable/parameter that are meant to be constant for the experiment. 
 * Once the constant variables/parameters are populated in the experiment, they can never be changed in the experiment for the ongoing session.
 * 
 * The only time in a session where the constant variables are populated is at the beginning. Afterward, any futher variable population is for
 * dynamic variables or state variables, but not for constant variables, which is why the this fonctions also handles the puplation of the 
 * randomized constant variables.
 * @param {Object} state 						Vuex state
 * @param {Object} experiment					Object from the backend conntaining all information related to the experiment.
*/
function populateExperimentConstantVariables(state, experiment) {
	// Populate the constant variables
	for (const attribute in experiment)
		experiment[attribute] = variableHandler.populateVariables(experiment[attribute]);
}


/**
 * Parse and store all the general settings of the experiment received from the backend.
 * If an expected attribute/parameter is not present in the "experiment" object, a default value is set for the attribute.
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment 
 * 												including all the general settings of the experiment as attributes.
*/
function setExperimentGeneralSettings(state, experiment) {
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
	} = experiment;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	const defaultSettings = defaultState.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.settings = {
		anyPianoKey:						typeof anyPianoKey === 'boolean' 					? anyPianoKey : defaultSettings.anyPianoKey,
		enableSoundFlag:					typeof enableSoundFlag === 'boolean' 				? enableSoundFlag : defaultSettings.enableSoundFlag,
		playingMode:						typeof playingMode === 'string' 					? playingMode : defaultSettings.playingMode,
		instrument:							typeof instrument === 'string' 						? instrument : defaultSettings.instrument,
		footnote:							typeof footnote === 'boolean' 						? footnote : defaultSettings.footnote,
		footnoteType:						typeof footnoteType === 'string' 					? footnoteType : defaultSettings.footnoteType,
		timeLimitInSeconds:					typeof timeLimitInSeconds === 'number' 				? timeLimitInSeconds : defaultSettings.timeLimitInSeconds,
		logFlag:							typeof logFlag === 'boolean' 						? logFlag : defaultSettings.logFlag,
		successesForSkip:					typeof successesForSkip === 'number' 				? successesForSkip : defaultSettings.successesForSkip,
		hideFeedbackSmiley:					typeof hideFeedbackSmiley === 'boolean' 			? hideFeedbackSmiley : defaultSettings.hideFeedbackSmiley,
		isSkipStepButtonInFootnote:			typeof isSkipStepButtonInFootnote === 'boolean' 	? isSkipStepButtonInFootnote : defaultSettings.isSkipStepButtonInFootnote,
		isGoBackButtonInFootnote:			typeof isGoBackButtonInFootnote === 'boolean' 		? isGoBackButtonInFootnote : defaultSettings.isGoBackButtonInFootnote,
		programmedOctaveOffset:				typeof programmedOctaveOffset === 'number' 			? programmedOctaveOffset : defaultSettings.programmedOctaveOffset,
		interactivePianoFirstOctave:		typeof interactivePianoFirstOctave === 'number' 	? interactivePianoFirstOctave : defaultSettings.interactivePianoFirstOctave,
		controlType:						typeof controlType === 'string' 					? controlType : defaultSettings.controlType,
		relativeRhythmImportance:			typeof relativeRhythmImportance === 'number' 		? relativeRhythmImportance : defaultSettings.relativeRhythmImportance,
		rhythmErrorMarginInMilliseconds: 	typeof rhythmErrorMarginInMilliseconds == 'number' 	? rhythmErrorMarginInMilliseconds : defaultSettings.rhythmErrorMarginInMilliseconds,
		rhythmRelativeErrorMarginInFloat:	typeof rhythmRelativeErrorMarginInFloat == 'number' ? rhythmRelativeErrorMarginInFloat : defaultSettings.rhythmRelativeErrorMarginInFloat,
		withProgressionBar:					typeof withProgressionBar === 'boolean' 			? withProgressionBar : defaultSettings.withProgressionBar,
		cueWaitForClick: 					typeof cueWaitForClick === 'boolean'				? cueWaitForClick : defaultSettings.cueWaitForClick,
	};
}


/**
 * Parse and store all the initial parameters to be sotred as "state records" of the experiment received from the backend.
 * If an expected attribute/parameter is not present in the "experiment" object, a default value is set for the attribute.
 * The "state records" differ from the "general settings" in that they are dynamic values that often change values as the
 * experiment progresses based on certain performances of the user or on explicit specifications in the experiment description.
 * @param {Object} state 						Vuex state.
 * @param {Object} experiment 					Object from the backend conntaining all information related to the experiment.
 * @param {String} experiment.logLabel			Initial log label of the experiment (can be changed during the completion of the experiment).
*/
function setExperimentInitialState(state, experiment) {
	const { logLabel } = experiment;
	const defaultSettings = defaultState.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.state.record.logLabel = typeof logLabel === 'string' ? logLabel : defaultSettings.logLabel;
}


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
		const isVariableExisting = Boolean(state.variable.variables[parameter]);
		if (!isVariableExisting) state.variable.variables[parameter] = {};
		state.variable.variables[parameter].imposedValue = parameters[parameter];
	}
}
