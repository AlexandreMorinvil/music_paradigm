import constants from '../constants'

export default {
    setExperimentId,
    setExperimentDescription,
    setExperimentGeneralSettings,
    setExperimentFlow,
    setExperimentVariables,
}

function setExperimentId(state, experiment) {
    state._id = experiment._id;
}

function setExperimentDescription(state, experiment) {
    const {
        name,
        folder,
        group,
        version,
    } = experiment;

    state.description = {
        name:       name,
        folder:     folder,
        group:      group || "",
        version:    version || 0
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
    } = experiment;

    // Set the settings for the state. If no value is found, an appropreate default value is set
    const defaultSettings = constants.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
    state.settings = {
        anyPianoKey:                (typeof anyPianoKey === 'boolean') ?                anyPianoKey : defaultSettings.anyPianoKey,
        enableSoundFlag:            (typeof enableSoundFlag === 'boolean') ?            enableSoundFlag : defaultSettings.enableSoundFlag,
        playingMode:                (typeof playingMode === 'string') ?                 playingMode : defaultSettings.playingMode,
        timbreFile:                 (typeof timbreFile === 'string') ?                  timbreFile : defaultSettings.timbreFile,
        footnote:                   (typeof footnote === 'boolean') ?                   footnote : defaultSettings.footnote,
        footnoteType:               (typeof footnoteType === 'string') ?                footnoteType : defaultSettings.footnoteType,
        timeLimitInSeconds:         (typeof timeLimitInSeconds === 'number') ?          timeLimitInSeconds : defaultSettings.timeLimitInSeconds,
        logFlag:                    (typeof logFlag === 'boolean') ?                    logFlag : defaultSettings.logFlag,
        successesForSkip:           (typeof successesForSkip === 'number') ?            successesForSkip : defaultSettings.successesForSkip,
        hideFeedbackSmiley:         (typeof hideFeedbackSmiley === 'boolean') ?         hideFeedbackSmiley : defaultSettings.hideFeedbackSmiley,
        isSkipStepButtonInFootnote: (typeof isSkipStepButtonInFootnote === 'boolean') ? isSkipStepButtonInFootnote : defaultSettings.isSkipStepButtonInFootnote
    };
}

function setExperimentFlow(state, experiment) { 
    state.flow = experiment.flow;
}

function setExperimentVariables(state, experiment) {
    const { variables } = experiment;
    if(!Array.isArray(variables)) return;

    for(let variable of variables) {
        const entry = { name: '$' + variable.name + '$', value: variable.assignedValue };
        switch (variable.type) {
            case 'counter':
                state.variables.counters.push(entry);
                break;
            
            case 'variable':
            case 'parameter':
                state.variables.variables.push(entry);
                break;
        
            default:
                break;
        }
    }
}