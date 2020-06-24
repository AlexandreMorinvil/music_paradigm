import constants from './constants'

export default {
    // Indicator of wether or not the experiment was set
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
        anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY, // Allowing any piano key press to advance to the next page
        mode: constants.DEFAULT_MODE,                 // Mode of the experiment ("speed", "rhythm" or "mix")
        timbreFile: constants.DEFAULT_TIMBRE_FILE     // URL or location of the timbre file used for the piano
    },

    // Data to navigate through the flow
    cursor: {
        current: {
            stepIndex: constants.START_INDEX,         // Index of the current step of the block
            index: constants.UNSET_INDEX,             // Index of the current block of the flow
        },
        navigator: {
            totalSteps: constants.UNSET_INDEX,        // Number of steps in a given block
            indexNext: constants.START_INDEX,         // Index of the next block of the flow
            indexLoopStart: constants.UNSET_INDEX,    // Index to which thw loop start (from which a repetition is started)
            numberRepetition: 0,                      // Number of repetiotions left in a loop
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
    }
};