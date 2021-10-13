/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
/* eslint-disable key-spacing */
import defaultState from './default-state';

import variableHandler from './variable-handler';

export default {
	setExperimentId,
	setExperimentDescription,
	setImposedParameterValues,
	setVariableSelectionSchedules,
	setExperiementVariablesWithValueSelection,
	populateExperimentConstantVariables,
	setExperimentDynamicVariables,
	setExperimentGeneralSettings,
	setExperimentInitialState,
	setExperimentPrelude,
	setExperimentFlow,
	setExperimentTimeUpState,
	storeParameterImposedValues,
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

	if (timeUpState) {
		state.timeUpState = JSON.parse(JSON.stringify(timeUpState));
		state.timeUpState.type = 'end';
	}
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
		timbreFile,
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
		timbreFile:							typeof timbreFile === 'string' 						? timbreFile : defaultSettings.timbreFile,
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
	state.variables.imposedValue = parameters;
}


/**
 * Set the imposed parameter values for the experiment if the imposed values and the values allowed allowed by the experiment are compatible  
 * The imposed parameter values must first be stored with the storeParameterImposedValues() function before they can be set for the experiment.
 * The storage is done in an object in the following format : { $NAME_OF_PARAMETER$ : VALUE }, 
 * Here is an example of the data stored : { $ASSIGNED_TEXT_FOR_USER$ : "Good morning, you will have 2 melodies to play" }
 * The variables that are constant are stored in an attribute called "constant", since their value is set an invariable.
 * The variables that are dynamic are stored in an attribute called "initial", since their value could change (in which case, the new value 
 * be stored in an attribute called value, so that the "inital" attribute always reflexes the inital value of the attribute)
 * @param {Object} state 						Vuex state
 * @param {Object} experiment					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.variables	List of the all the variables of the experiment.
*/
function setImposedParameterValues(state, experiment) {
	// Get the variables targeted by the imposed parameters
	const { variables } = experiment;
	const imposedParameters = state.variables.imposedValue;

	const parameterNames = Object.keys(imposedParameters);
	const concernernedVariables = variables.filter((variable) => parameterNames.includes(variable.name));

	// Verify that the parameter imposed are part of the allowed vailues for all parameters
	for (const variable of concernernedVariables) {
		const allowedValues = new Set(variable.optionValues);
		allowedValues.add(variable.assignedValue);

		// If the imposed value is allowed, we set it in the assigned values (constant or dynamic)
		if (allowedValues.has(imposedParameters[variable.name])) {
			if (variable.assignation === 'constant')
				state.variables.constantValue[variableHandler.wrapVariableName(variable.name)] = imposedParameters[variable.name];
			else if (variable.assignation === 'dynamic')
				state.variables.initialValue[variableHandler.wrapVariableName(variable.name)] = imposedParameters[variable.name];
		}
	}
}


/**
 * Store the "variables schedules" to be used for variables that have a "scheduled" value selection.
 * The storage is done in an object in the following format : { NAME_OF_SCHEDULE : ARRAY_OF_SCHEDULE }, 
 * Here is an example of the data stored : { SCHEDULE_OF_FOUR_MELODIES : [2, 0, 3, 1] }
 * @param {Object} state 								Vuex state
 * @param {Object} experiment							Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.variables			List of the all the variables of the experiment.
 * @param {Array<Object>} experiment.variablesSchedules	Array of objects containing the order of of appearance of the value for the variables. 
 * 														The value of a substituted variable will be selected within its optional values at the
 * 														index specified within the "variablesSchedules" attribute.
*/
function setVariableSelectionSchedules(state, experiment) {
	const { variables, variablesSchedules } = experiment;
	if (!Array.isArray(variables)) return;

	// Store all the variable schedules
	for (const scheduling in variablesSchedules) {
		const { name, schedule } = scheduling;
		state.variables.schedules[name] = schedule;
	}
}


/**
 * Store the option values of all varibles with a value selection status not "assigned" (random and scheduled) and initialized the 
 * helpers in memory in charge of helping get the appropriate value for those variables.
 * @param {Object} state 								Vuex state
 * @param {Object} experiment							Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.variables			List of the all the variables of the experiment.
*/
function setExperiementVariablesWithValueSelection(state, experiment) {
	const { variables } = experiment;
	if (!Array.isArray(variables)) return;

	// Store all the variable's 
	for (const variable in variables) {

		const { name, valueSelection, optionValues, scheduling, assignedValue } = variable;

		// Store the variables with selection status in the appropriate category
		let mustStoreOptionValues = true;
		switch (valueSelection) {
			case 'random':
				state.variables.randomizedVariables[variableHandler.wrapVariableName(name)] = true;
				break;
			case 'scheduled':
				state.variables.scheduledVariables[variableHandler.wrapVariableName(name)] = scheduling;
				break;
			default:
				mustStoreOptionValues = false;
				break;
		}

		// Store the option values from which the value of the variables will be selected from
		if (mustStoreOptionValues) {
			const allowedValues = new Set(optionValues);
			allowedValues.add(assignedValue);
			state.variables.selectionValuesOptions[name] = allowedValues;
		}
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
 * @param {Array<Object>} experiment.variables	List of the all the variables of the experiment.
 * @param {Array<Object>} experiment.flow		Flow description of all the steps of the experiment.
 * @param {Array<Object>} experiment.prelude	Flow description of the "prelude" which is a set of steps that will be presented  
 * 												before the main experiment takes place.
*/
function populateExperimentConstantVariables(state, experiment) {
	const { variables, flow, prelude } = experiment;
	if (!Array.isArray(variables)) return;

	// Get the constant variables
	const constantVariables = { ...state.variables.constantValue };
	for (const variable of variables) {

		const isConstant = variable.assignation === 'constant';
		const wrappedVariableName = variableHandler.wrapVariableName(variable.name);
		const wasAlreadyAssigned = Object.keys(constantVariables).includes(wrappedVariableName);

		if (isConstant && !wasAlreadyAssigned) {
			constantVariables[wrappedVariableName] = variable.assignedValue;
		}
	}

	// Populate the constant variables
	for (const index in flow) state.flow[index] = variableHandler.populateVariables(flow[index], constantVariables);
	for (const index in prelude) state.prelude[index] = variableHandler.populateVariables(prelude[index], constantVariables);
	if (state.timeUpState) state.timeUpState = variableHandler.populateVariables(state.timeUpState, constantVariables);
}


/**
 * Store the values of all the variable/parameter that are meant to be dynamic for the experiment. 
 * The dynamic parameters are not directly populated in the experiment. The value of the dynamic variables/parameters are stored and when
 * an occurence of the variable in the experiment appears, the value of the dynamic variable/parameter is substituted on the spot.
 * The dynamic variables are more flexible than the constant variables since their value can change from one appearance to the other.
 * (The downside of those types of variables is that they require more computation since each block must constantly be expected 
 * everytime to verify the whether there is an occurence of a dynamic variable present needing to be substituted. However, this additional 
 * computation time is negligeable) 
 * @param {Object} state 						Vuex state
 * @param {Object} experiment					Object from the backend conntaining all information related to the experiment.
 * @param {Array<Object>} experiment.variables	List of the all the variables of the experiment.
*/
function setExperimentDynamicVariables(state, experiment) {
	const { variables } = experiment;
	if (!Array.isArray(variables)) return;

	// Get the dynamic variables
	for (const variable of variables) {
		const isDynamic = variable.assignation === 'dynamic';
		const wrappedVariableName = variableHandler.wrapVariableName(variable.name);
		const wasAlreadyAssigned = Object.keys(state.variables.initialValue).includes(wrappedVariableName);
		if (isDynamic && !wasAlreadyAssigned) {
			state.variables.initialValue[wrappedVariableName] = variable.assignedValue;
		}
	}
	state.variables.dynamicValue = JSON.parse(JSON.stringify(state.variables.initialValue));
}
