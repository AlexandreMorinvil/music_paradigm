import { routerNavigation } from '@/_helpers'
import constants from './constants'
import functions from './functions'

export default {
    clearState(state) {
        Object.assign(state, constants.DEFAULT_EXPERIMENT_STATE_VALUES());
    },

    /**
     * Set an experiment for the session and its general parameters (sets the flow and settings)
     * @param {Object} state                Vuex state from a store (automatic argument)
     * @param {Object} experiment           Experiment object
     * @param {Object} experiment.name      Name of the experiment
     * @param {Object} experiment.folder    Name of the folder of the assets of the experiement
     * @param {Array} experiment.flow       Flow with the sequence of blocks
     */
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

    /**
     * Initializes the cursor to start navigating through the experiment
     * @param {Object} state            Vuex state from a store (automatic argument)
     * @param {Object} presetCursor     Cursor from another session, in order to restart where the experiment was left
     */
    initCursor(state, presetCursor = null) {
        // If a cursor is provided, the experiment is resumed with the state of the cursor.
        // If no cursor is provided, the default values of the cursor is the start ofthe experiment.
        state.cursor = functions.assignCursor(state.flow, presetCursor);

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
        functions.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    moveNextStep: (state) => {
        functions.moveCursorNext(state.flow, state.cursor, state.isInitialized);
        functions.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkip: (state) => {
        do {
            functions.moveCursorNext(state.flow, state.cursor, state.isInitialized);
            functions.updateStateOnSkip(state.state, state.flow, state.cursor, state.isInitialized);
        } while (state.cursor.current.isInSkipableChain)
        functions.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    endExperimentByTimeout: (state) => {
        const message = "The time limit was reached.\nThe experiment ends here.";
        functions.forceEndState(state.state, state.isInitialized, message);
    },

    leaveExperiment: () => {
        routerNavigation.goToRootPage();
    }
}