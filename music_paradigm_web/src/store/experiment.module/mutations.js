import constants from './constants'
import {
    updateState,
    moveCursorNext
} from './functions'

export default {

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
            folder: experiment.folder
        };

        // Set the flow (mandatory)
        state.flow = experiment.flow;

        // Set the settings (optionals, default values if not set)
        state.settings = {
            anyPianoKey: (typeof experiment.anyPianoKey !== 'undefined') ? Boolean(experiment.anyPianoKey) : constants.DEFAULT_ANY_PIANO_KEY,
            enableSoundFlag: (typeof experiment.enableSoundFlag !== 'undefined') ? Boolean(experiment.enableSoundFlag) : constants.DEFAULT_ENABLE_SOUND_FLAG,
            playingMode: (typeof experiment.mode !== 'string') ? experiment.mode : constants.DEFAULT_MODE,
            timbreFile: (typeof experiment.timbreFile !== 'string') ? experiment.timbreFile : constants.DEFAULT_TIMBRE_FILE
        };

        // Toggle the boolean value indicating that an experiment is mounted
        state.experimentSet = true;
    },

    /**
     * Initializes the cursor to start navigating through the experiment
     * @param {Object} state            Vuex state from a store (automatic argument)
     * @param {Object} presetCursor     Cursor from another session, in order to restart
     *                                  where the experiment was left
     */
    initCursor(state, presetCursor = null) {
        // If a cursor is provided, the experiment is resumed with the state of the cursor
        if (presetCursor) {
            Object.assign(state.cursor, presetCursor);
        }
        // If no cursor is provided, the default values of the cursor
        else {
            state.cursor = {
                current: {
                    index: 0,
                    innerStepIndex: 0,
                    playableMediaIndex: 0
                },
                navigation: {
                    indexNext: 1,
                    indexPlayableMediaPile: -1,
                    indexLoopStart: -1,
                    totalInnerSteps: 0,
                    numberPiledPlayableMedia: 0,
                    numberRepetition: 0,
                }
            };
        }

        // Set the initialization indicators to false
        state.isInitialized = {
            route: false,
            state: false,
            media: false
        };
    },
    updateState: (state) => {
        updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },
    moveNextStep: (state) => {
        moveCursorNext(state.flow, state.cursor, state.isInitialized);
        updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    }
}