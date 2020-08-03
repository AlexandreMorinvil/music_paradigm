import constants from './constants'

export default {
    // Indicator of wether or not the experiment was set
    hasExperiment: false,                                           // Indicator of whether or not an experiment was parsed

    // The sequence of the experiment
    flow: [],                                                       // Description of the different steps of the experiment

    // Mandatory description of the flow
    description: {
        name: "",                                                   // Name of the experiment
        folder: ""                                                  // Folder in which the resources for the experiment are located
    },

    // General settings of the flow
    settings: {
        anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,               // Allowing any piano key press to advance to the next page
        enableSoundFlag: constants.DEFAULT_ENABLE_SOUND_FLAG,       // Whether or not the piano output is enabled by default in the session
        playingMode: constants.DEFAULT_PLAYING_MODE,                // Mode of the experiment ("rhythm" or "speed")
        timbreFile: constants.DEFAULT_TIMBRE_FILE,                  // URL or location of the timbre file used for the piano
        footnote: constants.DEFAULT_FOOTNOTE,                       // Whether or not the experiment must display the inidcative foot note in each state
        timeLimitInSeconds: constants.DEFAULT_TIME_LIMIT            // Time limit of the experiment. If set to 0, ther is no limit and the timer will count up, otherwise the timer will count down
    },

    // Data to navigate through the flow
    cursor: {
        current: {
            index: 0,                                               // Index of the current block of the flow
            piledMediaIndex : 0,                                    // Index of the current step of the block (browses the midi and video file names)
            innerStepIndex: 0,                                      // Index of the current step of the block (browses the picture file names)
            isBeyondEnd: false                                      // Indicator of whether the index as reached the end of the flow (is checked before moving the cursor forward)
        },
        navigation: {
            indexNext: 1,                                           // Index of the next block of the flow
            indexLoopStart: -1,                                     // Index to which a loop start
            indexPileStart: -1,                                     // Index to which there remains content to depile
            indexGroupEnd: -1,                                      // Index of the end of a group of blocks (the last index with a followedBy or an individual block)
            totalInnerSteps: 0,                                     // Number of steps in a given block
            numberRepetition: 1,                                    // Number of repetitions left to do
            numberPiledMedia: 0,                                    // Number of media content piled at the index pile start
        }
    },

    // Initialization status of vue pages
    isInitialized : {
        route: false,                                               // Flag indicating whether the route needs to be updated
        state: false,                                               // Flag indicating whether the state's settings need to be opdated
        media: false,                                               // Flag indicating whether the state's media files need to be updated
        content: false                                              // Flag indicating whether the state's content need to be updated
    },
    
    // Data used by the view pages
    state: {
        type: "",                                                   // Type of the current state
        // Displayable content elements
        content: {
            text: "",                                               // Text to display
            pictureName: "",                                        // Name of the current picture to display
            interactivePiano: false                                 // <Boolean|String> Directive to display the interactive piano
        },
        // Multimedia elements
        mediaFile: {
            midiName: "",                                           // Name of the current midi file loaded in the player to play
            videoName: "",                                          // Name of the current video file to playback
        },
        // Block specific settings
        settings: {
            anyPianoKey: constants.DEFAULT_ANY_PIANO_KEY,           // Block specific "anyPianoLKey" superseding the general setting
            enableSoundFlag: constants.DEFAULT_ENABLE_SOUND_FLAG,   // Block specific "enableSoundFlag" superseding the general setting
            numberRepetition: 0,                                    // Number of repetitions of a block group
            timeoutInSeconds: 0,                                    // Time limit for a given block
            playingMode: constants.DEFAULT_PLAYING_MODE,            // Playing mode ("rhythm" or "speed")
            footnote: constants.DEFAULT_FOOTNOTE                    // Block specific "footnote" superseding the general setting
        }
    }
};