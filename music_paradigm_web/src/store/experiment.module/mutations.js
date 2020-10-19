import { routerNavigation } from '@/_helpers'
import constants from './constants'
import cursorHandler from './cursorHandler'
import stateHandler from './stateHandler'

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
        state.settings = {
            anyPianoKey: (typeof experiment.anyPianoKey !== 'undefined') ? Boolean(experiment.anyPianoKey) : constants.DEFAULT_ANY_PIANO_KEY,
            enableSoundFlag: (typeof experiment.enableSoundFlag !== 'undefined') ? Boolean(experiment.enableSoundFlag) : constants.DEFAULT_ENABLE_SOUND_FLAG,
            playingMode: (typeof experiment.mode === 'string') ? experiment.mode : constants.DEFAULT_PLAYING_MODE,
            timbreFile: (typeof experiment.timbreFile === 'string') ? experiment.timbreFile : constants.DEFAULT_TIMBRE_FILE,
            footnote: (typeof experiment.footnote !== 'undefined') ? Boolean(experiment.footnote) : constants.DEFAULT_FOOTNOTE,
            timeLimitInSeconds: (typeof experiment.timeLimitInSeconds === 'number') ? experiment.timeLimitInSeconds : constants.DEFAULT_TIME_LIMIT,
            logFlag: (typeof experiment.logFlag === 'boolean') ? experiment.logFlag : constants.DEFAULT_LOG_FLAG,
            successesForSkip: (typeof experiment.successesForSkip === 'number') ? experiment.successesForSkip : constants.DEFAULT_SUCCESSES_FOR_SKIP,
            hideFeedbackSmiley: (typeof experiment.hideFeedbackSmiley === 'boolean') ? experiment.hideFeedbackSmiley : constants.DEFAULT_HIDE_FEEDBACK_SMILEY
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
        cursorHandler.advanceCursor(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkip: (state) => {
        cursorHandler.skipCursor(state.state, state.flow, state.cursor, state.isInitialized);
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

/// IMPLEMENT THE HANDLING OF SKIPS ON SUCCESSES
// IMPLEMENT THE COSTUMIZED FOOTNOTES
// IMPLEMENT THE Text Image stacks
// Speed Play fixed