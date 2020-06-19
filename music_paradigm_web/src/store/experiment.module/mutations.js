import router from '@/router'
import constants from './constants'

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
            anyPianoKey: experiment.anyPianoKey || constants.DEFAULT_ANY_PIANO_KEY,
            mode: experiment.mode || constants.DEFAULT_MODE,
            timbreFile: experiment.timbreFile || constants.DEFAULT_TIMBRE_FILE
        };

        // Toggle the boolean value indicating that an experiment is mounted
        state.experimentSet = true;
    },

    /**
     * Initializes the cursor to start navigating through the experiment (sets the cursor)
     * @param {Object} state    Vuex state from a store (automatic argument)
     */
    initExperiment(state) {
        state.cursor = {
            current: {
                stepIndex: constants.START_INDEX,
                index: constants.UNSET_INDEX
            },
            navigator: {
                totalSteps: constants.UNSET_INDEX,
                indexNext: constants.START_INDEX,
                indexLoopStart: constants.UNSET_INDEX,
                numberRepetition: 0
            }
        }
    },

    /**
     * Initializes the state of the experiment according to the block pointed by the cursor (sets the state and cursor)
     * @param {Object} state    Vuex state from a store (automatic argument)
     */
    initState(state) {
        // Verify that the state was not already initialized
        if (state.state.stateInited) throw new Error("Attempting to initizalize a stat already initialized");
        // Verify that the current state to initialize possesses a type
        if (!state.flow[state.cursor.current.index].type) throw new Error("Attempting to initizalize a stat already initialized");

        // Parsing the block
        const currentBlock = state.flow[state.cursor.current.index];
        const {
            // Media Arrays (state)
            midiFileName,
            pictureFileName,
            videoFileName,
            // Block specific settings affecting the flow navigation (cursor)
            numberRepetition,
            // Block specific settings affecting the vue instances (state)
            followedBy,
            progressBarFlag,
            timeoutInSeconds
        } = currentBlock;

        // Setting the state parameters
        state.state = {
            midiName: Array.isArray(midiFileName) ? midiFileName[constants.START_INDEX] || "" : "",
            pictureName: Array.isArray(pictureFileName) ? pictureFileName[constants.START_INDEX] || "" : "",
            videoName: Array.isArray(videoFileName) ? videoFileName[constants.START_INDEX] || "" : "",

            settings: {
                followedBy: followedBy || false,
                progressBarFlag: progressBarFlag || false,
                timeoutInSeconds: timeoutInSeconds || -1,
            }
        };

        // Set the cursor parameters

        // Count to number of steps in the block
        switch (currentBlock.type) {
            case "cue":
                state.cursor.navigator.totalSteps = Array.isArray(midiFileName) ? midiFileName.length - 1 || 0 : 0;
                break;
            case "instruction":
                state.cursor.navigator.totalSteps = Array.isArray(pictureFileName) ? pictureFileName.length - 1 || 0 : 0;
                break;
            case "video":
                state.cursor.navigator.totalSteps = Array.isArray(videoFileName) ? videoFileName.length - 1 || 0 : 0;
                break;
            default: // "playing", "feedback", "rest" or "end"
                state.cursor.navigator.totalSteps = 0;
                break;
        }

        // Initializting the loops if : 
        // 1. A number of repetition is specified in the block settings, 
        // 2. The cursor is not currently in a loop (thus the number of reptition left is 0)
        // 3. The current index is not the start index of a previous loop (to avoid resetting a loop twice)
        if (numberRepetition > 0 &&
            state.cursor.navigator.numberRepetition === 0 &&
            state.cursor.current.index !== state.cursor.navigator.indexLoopStart) {
            state.cursor.navigator.indexLoopStart = state.cursor.current.index;
            state.cursor.navigator.numberRepetition = numberRepetition;
        }

        // Indicate that the state is initialized 
        state.state.stateInited = true;
    },
    onNext(state) {

        // Step within same block if there are steps left to do
        if (state.cursor.current.stepIndex < state.cursor.navigator.totalSteps) {
            state.cursor.current.stepIndex += 1;
            const currentBlock = state.flow[state.cursor.current.index];
            switch (currentBlock.type) {
                case "cue":
                    state.state.midiName = currentBlock.midiFileName[state.cursor.current.stepIndex];
                    break;
                case "instruction":
                    state.state.pictureName = currentBlock.pictureFileName[state.cursor.current.stepIndex];
                    break;
                case "video":
                    state.state.videoName = currentBlock.videoFileName[state.cursor.current.stepIndex];
                    break;
                default: // "playing", "feedback", "rest" or "end"
                    break;
            }
        }

        // Move to next block
        else if (state.cursor.navigator.indexNext < state.flow.length) {
            router.push({ name: state.flow[state.cursor.navigator.indexNext].type });
            state.state.stateInited = false;
            state.cursor.current.index = state.cursor.navigator.indexNext;
            state.cursor.navigator.indexNext += 1;
        }

        // Verify the cursor.navigator.numberRepetition to know if necessary to repeat
        // Verify the "FollowedBy" to continue in a loop
    }
}