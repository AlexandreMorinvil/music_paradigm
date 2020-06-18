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
            index: START_INDEX,             // Index of the current block of the flow
            stepIndex: START_INDEX          // Index of the current step of the block
        },
        navigator: {
            indexNext: START_INDEX + 1,     // Index of the next block of the flow
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
                index: START_INDEX,
                stepIndex: START_INDEX
            },
            navigator: {
                indexNext: START_INDEX + 1,
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
        } = state.flow[state.cursor.current.index];

        // Initializing the state
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

        // If it's the experiment was just set, to go to the first state
        if (state.cursor.current.stepIndex === START_INDEX) {
            router.push({ name: state.flow[0].type });
        }

        // If the following block has the property "followedBy"
        // (Meaning that it must be repeated at every round of the loop)
        else if (state.flow[state.cursor.next.index].hasOwnProperty("followedBy")) {
            state.cursor.next.index += 1;
            router.push({ name: state.flow[state.cursor.next.index].type });
        }

        else {
            if (state.cursor.current.stepIndex === state.cursor.total.index) {
                state.cursor.next.index += 1;
                state.cursor.current.stepIndex = PRESTART_INDEX;
                state.state.stateInited = false;
                router.push({ name: state.flow[state.cursor.next.index].type });
            } else {
                state.cursor.current.stepIndex += 1;

                if (state.cursor.current.block.type != state.flow[state.cursor.next.index].type) {
                    state.cursor.next.index = state.cursor.current.index;
                    // state.flow.findIndex((arr) => {return arr.type == state.cursor.current.block.type});
                    router.push({ name: state.cursor.current.block.type });
                } else {
                    const pictureName = state.cursor.current.block.pictureFileName[state.cursor.current.stepIndex];
                    state.state.pictureName = `${state.description.folder}/${pictureName}`;
                }
            }
        }
        // console.log(`${state.flow[state.cursor.next.index].type} onNexted: current.stepIndex=${state.cursor.current.stepIndex} total.index=${state.experiment.total.index}`);
    }
}

export const experiment = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};