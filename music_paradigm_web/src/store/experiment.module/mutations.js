import { routerNavigation } from '@/_helpers'
import constants from './constants'
import cursorHandler from './flowHelper/cursorHandler'
import stateHandler from './flowHelper/stateHandler'

export default {
    clearState(state) {
        Object.assign(state, constants.DEFAULT_EXPERIMENT_STATE_VALUES());
    },

    setExperiment(state, experiment) {
        // Verify the minimal required properties
        if (!experiment.hasOwnProperty("name")) throw new Error("No name was found in the experiment");
        if (!experiment.hasOwnProperty("folder")) throw new Error("No folder was found in the experiment");
        if (!experiment.hasOwnProperty("flow")) throw new Error("No flow was found in the experiment");

        // Set the description (mandatory)
        state.description = {
            name: experiment.name,
            folder: experiment.folder,
            group: experiment.group || "",
            version: experiment.version || 0
        };

        // Set the flow (mandatory)
        state.flow = experiment.flow;

        // Set the settings (optionals, default values if not set)
        state.settings = constants.DEFAULT_EXPERIMENT_STATE_SETTINGS_VALUES();
        Object.assign(state.settings, { record: true });
        state.settings = {
            anyPianoKey: (typeof experiment.anyPianoKey === 'boolean') ? Boolean(experiment.anyPianoKey) : state.settings.anyPianoKey,
            enableSoundFlag: (typeof experiment.enableSoundFlag === 'boolean') ? Boolean(experiment.enableSoundFlag) : state.settings.enableSoundFlag,
            playingMode: (typeof experiment.mode === 'string') ? experiment.mode : state.settings.playingMode,
            timbreFile: (typeof experiment.timbreFile === 'string') ? experiment.timbreFile : state.settings.timbreFile,
            footnote: (typeof experiment.footnote === 'boolean') ? experiment.footnote : state.settings.footnote,
            footnoteType: (typeof experiment.footnoteType === 'string') ? experiment.footnoteType : state.settings.footnoteType,
            timeLimitInSeconds: (typeof experiment.timeLimitInSeconds === 'number') ? experiment.timeLimitInSeconds : state.settings.timeLimitInSeconds,
            logFlag: (typeof experiment.logFlag === 'boolean') ? experiment.logFlag : state.settings.logFlag,
            successesForSkip: (typeof experiment.successesForSkip === 'number') ? experiment.successesForSkip : state.settings.successesForSkip,
            hideFeedbackSmiley: (typeof experiment.hideFeedbackSmiley === 'boolean') ? experiment.hideFeedbackSmiley : state.settings.hideFeedbackSmiley
        };

        // Toggle the boolean value indicating that an experiment is mounted
        state.hasExperiment = true;
    },

    initCursor(state, presetCursor = null) {
        // If a cursor is provided, the experiment is resumed with the state of the cursor.
        // If no cursor is provided, the default values of the cursor is the start ofthe experiment.
        state.cursor = cursorHandler.assignCursor(state.flow, presetCursor);

        // Set the initialization indicators to false
        state.isInitialized = {
            route: false,
            state: false,
            media: false,
            content: false
        };
    },

    initExperiment: () => {
        routerNavigation.moveToExperimentPrelude();
    },

    updateState: (state) => {
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    moveNextStep: (state) => {
        cursorHandler.advance(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkip: (state) => {
        cursorHandler.skip(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkipRepetions: (state) => {
        cursorHandler.moveCursorPostSkipRepetions(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    endExperimentByTimeout: (state) => {
        const message = "The time limit was reached.\nThe experiment ends here.";
        stateHandler.forceEndState(state.state, state.isInitialized, message);
    },

    leaveExperiment: () => {
        routerNavigation.goToRootPage();
    },

    addSuccess: (state) => {
        state.state.record.sucesses += 1;
        state.state.record.successesInLoop += 1;
    }
}