import constants from '../constants';
import variableHandler from './variableHandler';

export default {
	setExperimentId,
	setExperimentDescription,
	setExperimentGeneralSettings,
	setExperimentFlow,
	setExperimentVariables,
	setParameterImposedValues,
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
		programmedOctaveOffset,
		interactivePianoFirstOctave,
		controlType,
	} = experiment;

	// Set the settings for the state. If no value is found, an appropreate default value is set
	const defaultSettings = constants.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
	state.settings = {
		anyPianoKey: typeof anyPianoKey === 'boolean' ? anyPianoKey : defaultSettings.anyPianoKey,
		enableSoundFlag: typeof enableSoundFlag === 'boolean' ? enableSoundFlag : defaultSettings.enableSoundFlag,
		playingMode: typeof playingMode === 'string' ? playingMode : defaultSettings.playingMode,
		timbreFile: typeof timbreFile === 'string' ? timbreFile : defaultSettings.timbreFile,
		footnote: typeof footnote === 'boolean' ? footnote : defaultSettings.footnote,
		footnoteType: typeof footnoteType === 'string' ? footnoteType : defaultSettings.footnoteType,
		timeLimitInSeconds: typeof timeLimitInSeconds === 'number' ? timeLimitInSeconds : defaultSettings.timeLimitInSeconds,
		logFlag: typeof logFlag === 'boolean' ? logFlag : defaultSettings.logFlag,
		successesForSkip: typeof successesForSkip === 'number' ? successesForSkip : defaultSettings.successesForSkip,
		hideFeedbackSmiley: typeof hideFeedbackSmiley === 'boolean' ? hideFeedbackSmiley : defaultSettings.hideFeedbackSmiley,
		isSkipStepButtonInFootnote:
			typeof isSkipStepButtonInFootnote === 'boolean' ? isSkipStepButtonInFootnote : defaultSettings.isSkipStepButtonInFootnote,
		programmedOctaveOffset: typeof programmedOctaveOffset === 'number' ? programmedOctaveOffset : defaultSettings.programmedOctaveOffset,
		interactivePianoFirstOctave:
			typeof interactivePianoFirstOctave === 'number' ? interactivePianoFirstOctave : defaultSettings.interactivePianoFirstOctave,
		controlType: typeof controlType === 'string' ? controlType : defaultSettings.controlType,
	};
}

function setExperimentFlow(state, experiment) {
	state.flow = experiment.flow;
}

function setExperimentVariables(state, experiment) {
	const { variables } = experiment;
	if (!Array.isArray(variables)) return;

	for (const variable of variables) state.variables.initial[variableHandler.wrapVariableName(variable.name)] = variable.assignedValue;
	state.variables.value = JSON.parse(JSON.stringify(state.variables.initial));
}

// TODO : Verify that the parameter imposed are part of the possibilities
function setParameterImposedValues(state, parameters) {
	for (const parameter of parameters) state.variables.initial[variableHandler.wrapVariableName(parameter.name)] = parameter.assignedValue;
	state.variables.value = JSON.parse(JSON.stringify(state.variables.initial));
}
