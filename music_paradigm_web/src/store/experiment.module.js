import router from '@/router'

// Default settings values
const DEFAULT_ANY_PIANO_KEY = false;
const DEFAULT_MODE = "Mix";
const DEFAULT_TIMBRE_FILE = "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js";

// Index default values
const UNSET_INDEX = -1;
const START_INDEX = 0;

const state = {
    experimentSet: false,

    // The sequence of the experiment
    flow: [],

    // Mandatory description of the flow
    description: {
        name: "",   // Name of the experiment
        folder: ""  // Folder in which the resources for the experiment are located
    },

    // General settings of the flow
    settings: {
        anyPianoKey: DEFAULT_ANY_PIANO_KEY, // Allowing any piano key press to advance to the next page
        mode: DEFAULT_MODE,                 // Mode of the experiment ("speed", "rhythm" or "mix")
        timbreFile: DEFAULT_TIMBRE_FILE     // URL or location of the timbre file used for the piano
    },

    // Data to navigate through the flow
    cursor: {
        current: {
            stepIndex: START_INDEX,         // Index of the current step of the block
            index: UNSET_INDEX,             // Index of the current block of the flow
        },
        navigator: {
            totalSteps: UNSET_INDEX,        // Number of steps in a given block
            indexNext: START_INDEX,     // Index of the next block of the flow
            indexLoopStart: UNSET_INDEX,    // Index to which thw loop start (from which a repetition is started)
            numberRepetition: 0,            // Number of repetiotions left in a loop
        }
    },

    // Data used by the view pages
    state: {
        stateInited: false,
        midiName: "",
        pictureName: "",
        videoName: "",

        // Block specific settings
        settings: {
            followedBy: false,
            numberRepetition: 0,
            progressBarFlag: false,
            timeoutInSeconds: 0,
        }
    },

    experiment: {
        innerBlockNum: 0,
        totalInnerBlockNum: 0,
    },

};

const getters = {
    midiName: (state) => {
        return state.state.midiName;
    },
    pictureName: (state) => {
        // Fetch the picture name
        const pictureName = state.state.pictureName;

        // Verify that the file name describes a supported file format
        const pictureNameExtension = pictureName.split(".").pop();
        if (!["jpg", "png", "bmp"].includes(pictureNameExtension)) {
            throw new Error(`
                Incompatible image format for the "${pictureName}" image file.\n
                The "${pictureNameExtension}" file format is not supported.
            `);
        }

        // Return the picture name
        return `${state.description.folder}/${pictureName}`;
    },
    videoName: (state) => {
        return state.state.videoName;
    }
}

const actions = {
    setExperiment: ({ commit }, experiment) => {
        commit('setExperiment', experiment);
    },
    initExperiment: ({ commit }) => {
        commit('initExperiment');
    },
    initState: ({ commit }) => {
        commit('initState');
    },
    onNext: ({ commit }) => {
        commit('onNext');
    }
}

const mutations = {

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
            anyPianoKey: experiment.anyPianoKey || DEFAULT_ANY_PIANO_KEY,
            mode: experiment.mode || DEFAULT_MODE,
            timbreFile: experiment.timbreFile || DEFAULT_TIMBRE_FILE
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
                stepIndex: START_INDEX,
                index: UNSET_INDEX
            },
            navigator: {
                totalSteps: UNSET_INDEX,
                indexNext: START_INDEX,
                indexLoopStart: UNSET_INDEX,
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
            midiName: Array.isArray(midiFileName) ? midiFileName[START_INDEX] || "" : "",
            pictureName: Array.isArray(pictureFileName) ? pictureFileName[START_INDEX] || "" : "",
            videoName: Array.isArray(videoFileName) ? videoFileName[START_INDEX] || "" : "",

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

        // Start 
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
            state.cursor.current.index = state.cursor.navigator.indexNext;
            state.cursor.navigator.indexNext += 1;
        }

        return;

        // Verify the cursor.navigator.numberRepetition to know if necessary to repeat
        // Verify the "FollowedBy" to continue in a loop
    }
}

export const experiment = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};