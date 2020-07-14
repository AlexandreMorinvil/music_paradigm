import constants from './constants'

export default {
    // Indicator of wether or not the experiment was set
    hasExperiment: false,

    // The sequence of the experiment
    flow: [],

    // Mandatory description of the flow
    description: {
        name: "",   // Name of the experiment
        folder: ""  // Folder in which the resources for the experiment are located
    },

    // General settings of the flow
    settings: {
        anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,           // Allowing any piano key press to advance to the next page
        enableSoundFlag: constants.DEFAULT_ENABLE_SOUND_FLAG,   // Whether or not the piano output is enabled by default in the session
        playingMode: constants.DEFAULT_MODE,                    // Mode of the experiment ("rhythm" or "speed")
        timbreFile: constants.DEFAULT_TIMBRE_FILE               // URL or location of the timbre file used for the piano
    },

    // Data to navigate through the flow
    cursor: {
        current: {
            index: 0,                   // Index of the current block of the flow
            piledContentIndex : 0,      // Index of the current step of the block (browses the midi and video file names)
            innerStepIndex: 0,          // Index of the current step of the block (browses the picture file names)
            isBeyondEnd: false          // Indicator of whether the index as reached the end of the flow (is checked before moving the cursor forward)
        },
        navigation: {
            indexNext: 1,               // Index of the next block of the flow
            indexLoopStart: -1,         // Index to which a loop start
            indexPileStart: -1,         // Index to which there remains content to depile
            indexGroupEnd: -1,          // Index of the end of a group of blocks (the last index with a followedBy or an individual block)
            totalInnerSteps: 0,         // Number of steps in a given block
            numberRepetition: 1,        // Number of repetitions left to do
            numberPiledContent: 0,      // Number of content piled at the index pile start
        }
    },

    // Initialization status of vue pages
    isInitialized : {
        route: false,
        state: false,
        media: false
    },
    // Data used by the view pages
    state: {
        type: "",
        // Multimedia elements
        mediaFile: {
            pictureName: "",                                // Name of the current picture to display
            midiName: "",                                   // Name of the current midi file loaded in the player to play
            videoName: "",                                  // Name of the current video file to playback
        },
        // Block specific settings
        settings: {
            anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,
            enableSoundFlag: constants.DEFAULT_ENABLE_SOUND_FLAG,
            numberRepetition: 0,
            progressBarFlag: true,
            timeoutInSeconds: 0,
            playingMode: constants.DEFAULT_MODE
        }
    }
};