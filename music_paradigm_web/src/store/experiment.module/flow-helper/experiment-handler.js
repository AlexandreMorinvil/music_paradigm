/* eslint-disable max-lines-per-function */
/* eslint-disable prettier/prettier */
/* eslint-disable key-spacing */
import constants from '../constants';
import variableHandler from './variable-handler';

export default {
	setExperimentId,
	setExperimentDescription,
	setImposedParameterValues,
	populateExperimentConstantVariables,
	setExperimentDynamicVariables,
	setExperimentGeneralSettings,
	setExperimentInitialState,
	setExperimentPrelude,
	setExperimentFlow,
	setExperimentTimeUpState,
	storeParameterImposedValues,
};

function setExperimentId(state, experiment) {
	state._id = experiment._id;
}

function setExperimentDescription(state, experiment) {
	const { name, folder, group, version } = experiment;

	state.description = {
		name: name,
		folder: folder,
		group: group || '',
		version: version || 0,
	};
}

function setExperimentPrelude(state, experiment) {
	// Verify if a prelude is provided
	if (!experiment.prelude) return;
	let { prelude } = experiment;

	// Deep copying the prelude
	prelude = Array.isArray(prelude) ? prelude : [];
	state.prelude = JSON.parse(JSON.stringify(prelude));
}

function setExperimentFlow(state, experiment) {
	// Deep copying the flow
	state.flow = JSON.parse(JSON.stringify(experiment.flow));
}

function setExperimentTimeUpState(state, experiment) {
	// Deep copying the state
	const timeUpState = experiment.timeUpState;

	if (timeUpState) {
		state.timeUpState = JSON.parse(JSON.stringify(timeUpState));
		state.timeUpState.type = 'end';
	}
}

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
		withProgressionBar,
	} = experiment;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	const defaultSettings = constants.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.settings = {
		anyPianoKey:					typeof anyPianoKey === 'boolean' 				? anyPianoKey : defaultSettings.anyPianoKey,
		enableSoundFlag:				typeof enableSoundFlag === 'boolean' 			? enableSoundFlag : defaultSettings.enableSoundFlag,
		playingMode:					typeof playingMode === 'string' 				? playingMode : defaultSettings.playingMode,
		timbreFile:						typeof timbreFile === 'string' 					? timbreFile : defaultSettings.timbreFile,
		footnote:						typeof footnote === 'boolean' 					? footnote : defaultSettings.footnote,
		footnoteType:					typeof footnoteType === 'string' 				? footnoteType : defaultSettings.footnoteType,
		timeLimitInSeconds:				typeof timeLimitInSeconds === 'number' 			? timeLimitInSeconds : defaultSettings.timeLimitInSeconds,
		logFlag:						typeof logFlag === 'boolean' 					? logFlag : defaultSettings.logFlag,
		successesForSkip:				typeof successesForSkip === 'number' 			? successesForSkip : defaultSettings.successesForSkip,
		hideFeedbackSmiley:				typeof hideFeedbackSmiley === 'boolean' 		? hideFeedbackSmiley : defaultSettings.hideFeedbackSmiley,
		isSkipStepButtonInFootnote:		typeof isSkipStepButtonInFootnote === 'boolean' ? isSkipStepButtonInFootnote : defaultSettings.isSkipStepButtonInFootnote,
		isGoBackButtonInFootnote:		typeof isGoBackButtonInFootnote === 'boolean' 	? isGoBackButtonInFootnote : defaultSettings.isGoBackButtonInFootnote,
		programmedOctaveOffset:			typeof programmedOctaveOffset === 'number' 		? programmedOctaveOffset : defaultSettings.programmedOctaveOffset,
		interactivePianoFirstOctave:	typeof interactivePianoFirstOctave === 'number' ? interactivePianoFirstOctave : defaultSettings.interactivePianoFirstOctave,
		controlType:					typeof controlType === 'string' 				? controlType : defaultSettings.controlType,
		relativeRhythmImportance:		typeof relativeRhythmImportance === 'number' 	? relativeRhythmImportance : defaultSettings.relativeRhythmImportance,
		withProgressionBar:				typeof withProgressionBar === 'boolean' 		? withProgressionBar : defaultSettings.withProgressionBar,
	};
}

function setExperimentInitialState(state, experiment) {
	const { logLabel } = experiment;
	const defaultSettings = constants.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.state.record.logLabel = typeof logLabel === 'string' ? logLabel : defaultSettings.logLabel;
}

function storeParameterImposedValues(state, parameters) {
	state.variables.imposed = parameters;
}

function setImposedParameterValues(state, experiment) {
	// Get the variables targeted by the imposed parameters
	const { variables } = experiment;
	const imposedParameters = state.variables.imposed;

	const parameterNames = Object.keys(imposedParameters);
	const concernernedVariables = variables.filter((variable) => parameterNames.includes(variable.name));

	// Verify that the parameter imposed are part of the allowed vailues for all parameters
	for (const variable of concernernedVariables) {
		const allowedValues = new Set(variable.optionValues);
		allowedValues.add(variable.assignedValue);

		// If the imposed value is allowed, we set it in the assigned values (constant or dynamic)
		if (allowedValues.has(imposedParameters[variable.name])) {
			if (variable.assignation === 'constant')
				state.variables.constant[variableHandler.wrapVariableName(variable.name)] = imposedParameters[variable.name];
			else if (variable.assignation === 'dynamic')
				state.variables.initial[variableHandler.wrapVariableName(variable.name)] = imposedParameters[variable.name];
		}
	}
}

function populateExperimentConstantVariables(state, experiment) {
	const { variables, flow, prelude } = experiment;
	if (!Array.isArray(variables)) return;

	// Get the constant variables
	const constantVariables = { ...state.variables.constant };
	for (const variable of variables) {
		const isConstant = variable.assignation === 'constant';
		const wasAlreadyAssigned = Object.keys(constantVariables).includes(variable.name);
		if (isConstant && !wasAlreadyAssigned) {
			constantVariables[variableHandler.wrapVariableName(variable.name)] = variable.assignedValue;
		}
	}

	// Populate the constant variables
	for (const index in flow) state.flow[index] = variableHandler.populateVariables(flow[index], constantVariables);
	for (const index in prelude) state.prelude[index] = variableHandler.populateVariables(prelude[index], constantVariables);
	if (state.timeUpState) state.timeUpState = variableHandler.populateVariables(state.timeUpState, constantVariables);
}

function setExperimentDynamicVariables(state, experiment) {
	const { variables } = experiment;
	if (!Array.isArray(variables)) return;

	// Get the dynamic variables
	for (const variable of variables) {
		const isDynamic = variable.assignation === 'dynamic';
		const wasAlreadyAssigned = Object.keys(state.variables.initial).includes(variable.name);
		if (isDynamic && !wasAlreadyAssigned) {
			state.variables.initial[variableHandler.wrapVariableName(variable.name)] = variable.assignedValue;
		}
	}
	state.variables.value = JSON.parse(JSON.stringify(state.variables.initial));
}
