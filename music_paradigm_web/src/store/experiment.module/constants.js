// Default settings values
const DEFAULT_ANY_PIANO_KEY = false;
const DEFAULT_ENABLE_SOUND_FLAG = false;
const DEFAULT_PLAYING_MODE = "rhythm";
const DEFAULT_TIMBRE_FILE = "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js";
const DEFAULT_FOOTNOTE = false;
const DEFAULT_TIME_LIMIT = 0;
const DEFAULT_LOG_FLAG = true;
const DEFAULT_SUCCESSES_FOR_SKIP = 0;
const DEFAULT_HIDE_FEEDBACK_SMILEY = false;

const DEFAULT_EXPERIMENT_STATE_VALUES = function () {
    return {
        // Indicator of wether or not the experiment was set
        hasExperiment: false,                                   // Indicator of whether or not an experiment was parsed

        // The sequence of the experiment
        flow: [],                                               // Description of the different steps of the experiment

        // Mandatory description of the flow
        description: {
            name: "",                                           // Name of the experiment
            folder: "",                                         // Folder in which the resources for the experiment are located
            group: "",                                          // Group of the experiment
            version: 0                                          // Version of the experiment
        },

        // General settings of the flow
        settings: {
            anyPianoKey: DEFAULT_ANY_PIANO_KEY,                 // Allowing any piano key press to advance to the next page
            enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG,         // Whether or not the piano output is enabled by default in the session
            playingMode: DEFAULT_PLAYING_MODE,                  // Mode of the experiment ("rhythm" or "speed")
            timbreFile: DEFAULT_TIMBRE_FILE,                    // URL or location of the timbre file used for the piano
            footnote: DEFAULT_FOOTNOTE,                         // Whether or not the experiment must display the inidcative foot note in each state
            timeLimitInSeconds: DEFAULT_TIME_LIMIT,             // Time limit of the experiment. If set to 0, ther is no limit and the timer will count up, otherwise the timer will count down
            logFlag: DEFAULT_LOG_FLAG,                          // Indicate wether or not the blocks must log it's data
            successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP        // Indicate the number of successful 'Playing' states before being able to leave a group of blocks
        },

        // Data to navigate through the flow
        cursor: {
            current: {
                index: 0,                                       // Index of the current block of the flow
                piledMediaIndex: 0,                             // Index of the current step of the block (browses the midi and video file names)
                innerStepIndex: 0,                              // Index of the current step of the block (browses the picture file names)
                isBeyondEnd: false,                             // Indicator of whether the index as reached the end of the flow (is checked before moving the cursor forward)
                isInSkipableChain: false,                       // Indicates whether the block must be skipped upon a skip request
            },
            navigation: {
                indexNext: 1,                                   // Index of the next block of the flow
                indexLoopStart: -1,                             // Index to which a loop start
                indexPileStart: -1,                             // Index to which there remains content to depile
                indexGroupEnd: -1,                              // Index of the end of a group of blocks (the last index with a followedBy or an individual block)
                totalInnerSteps: 0,                             // Number of steps in a given block
                numberRepetition: 1,                            // Number of repetitions left to do
                numberPiledMedia: 0,                            // Number of media content piled at the index pile start
            }
        },

        // Initialization status of vue pages
        isInitialized: {
            route: false,                                       // Flag indicating whether the route needs to be updated
            state: false,                                       // Flag indicating whether the state's settings need to be opdated
            media: false,                                       // Flag indicating whether the state's media files need to be updated
            content: false                                      // Flag indicating whether the state's content need to be updated
        },

        // Data used by the view pages
        state: {
            type: "",                                           // Type of the current state
            // Displayable content elements
            content: {
                text: "",                                       // Text to display
                pictureName: "",                                // Name of the current picture to display
                helperImageName: "",                            // Name of the helper image to display
                interactivePiano: false                         // <Boolean|String> Directive to display the interactive piano
            },
            // Multimedia elements
            mediaFile: {
                midiName: "",                                   // Name of the current midi file loaded in the player to play
                videoName: "",                                  // Name of the current video file to playback
            },
            // Block specific settings
            settings: {
                anyPianoKey: DEFAULT_ANY_PIANO_KEY,             // Block specific "anyPianoLKey" superseding the general setting
                enableSoundFlag: DEFAULT_ENABLE_SOUND_FLAG,     // Block specific "enableSoundFlag" superseding the general setting
                numberRepetition: 0,                            // Number of repetitions of a block group
                timeoutInSeconds: 0,                            // Time limit for a given block
                playingMode: DEFAULT_PLAYING_MODE,              // Playing mode ("rhythm" or "speed")
                footnote: DEFAULT_FOOTNOTE,                     // Block specific "footnote" superseding the general setting
                logFlag: DEFAULT_LOG_FLAG,                      // Block specific "logFlag" superseding the general setting
                skipStepButton: "",                             // Button to press to skip the next block (is valid only if a button is specified)
                skipStepButtonMessage: "",                      // Message indicated on the skip button if there is a skip button
                successesForSkip: DEFAULT_SUCCESSES_FOR_SKIP    // Block specific "successesForSkip" superseding the general setting
            }
        }
    };
}

export default {
    DEFAULT_ANY_PIANO_KEY,
    DEFAULT_ENABLE_SOUND_FLAG,
    DEFAULT_PLAYING_MODE,
    DEFAULT_TIMBRE_FILE,
    DEFAULT_FOOTNOTE,
    DEFAULT_TIME_LIMIT,
    DEFAULT_LOG_FLAG,
    DEFAULT_SUCCESSES_FOR_SKIP,
    DEFAULT_HIDE_FEEDBACK_SMILEY,
    DEFAULT_EXPERIMENT_STATE_VALUES
}