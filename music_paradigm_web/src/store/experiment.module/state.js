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
        anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,   // Allowing any piano key press to advance to the next page
        playingMode: constants.DEFAULT_MODE,            // Mode of the experiment ("rhythm" or "speed")
        timbreFile: constants.DEFAULT_TIMBRE_FILE       // URL or location of the timbre file used for the piano
    },

    // Data to navigate through the flow
    cursor: {
        current: {
            index: -1,                      // Index of the current block of the flow
            playableMediaIndex : 0,         // Index of the current step of the block (browses the midi and video file names)
            innerStepIndex: 0               // Index of the current step of the block (browses the picture file names)
        },
        navigation: {
            indexNext: 0,                   // Index of the next block of the flow
            indexLoopStart: -1,             // Index to which a loop start
            indexPlayableMediaPile: -1,     // Index to which there remains playable medias to depile
            totalInnerSteps: 0,             // Number of steps in a given block
            numberRepetition: 0,            // Number of repetitions left in a loop
            numberPiledPlayableMedia: 0     // Number of playable medias piled
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
        // Multimedia elements
        mediaFile: {
            pictureName: "",                                // Name of the current picture to display
            midiName: "",                                   // Name of the current midi file loaded in the player to play
            videoName: "",                                  // Name of the current video file to playback
        },
        // Block specific settings
        settings: {
            anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,
            numberRepetition: 0,
            progressBarFlag: false,
            timeoutInSeconds: 0,
            playingMode: constants.DEFAULT_MODE
        }
    }
};