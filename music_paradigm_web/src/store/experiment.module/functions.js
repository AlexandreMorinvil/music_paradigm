import router from '@/router'

const moveCursorNextStep = function (state) {
    const cursor = state.cursor;
    // Moving to the next inner step if there remains inner steps
    if (cursor.current.innerStepIndex < cursor.navigation.totalInnerSteps) {
        state.cursor.current.innerStepIndex += 1;
        Object.assign(state.isInitialized, { media: false });
    }
    // Moving to next block as specified by the next index of the navigation
    else if (state.cursor.navigation.indexNext < state.flow.length) {
        state.cursor.current.index = state.cursor.navigation.indexNext;
        Object.assign(state.isInitialized, { route: false, state: false, media: false });
    }
    // Moving beyond the last block of the flow
    else {
        throw new Error("Attempting to move cursor to a non-existing block");
    }
}

// Read the block for the index specific parameters
const updateCursorNavigation = function (state) {
    // Parsing the block's flow navigation parameters
    const currentBlock = state.flow[state.cursor.current.index];
    const {
        // Media files array
        pictureFileName,
        midiFileName,
        videoFileName,
        // Cursor parameters
        followedBy,
        numberRepetition
    } = currentBlock;

    // Initialize the total number of inner steps of the current block
    const numberPictureFiles = Array.isArray(pictureFileName) ? (pictureFileName.length - 1) || 0 : 0;
    state.cursor.navigation.totalInnerSteps = numberPictureFiles;

    // Initialize a loop (loop start index & number of repetitions) if :
    // 1. A number of repetition is specified in the block's settings, 
    // 2. The cursor is not currently in a loop (thus the number of reptition left is 0)
    // 3. The current index is not the start index of a previous loop (to avoid resetting a loop twice)
    if (numberRepetition > 0 &&
        state.cursor.navigation.numberRepetition === 0 &&
        state.cursor.current.index !== state.cursor.navigation.indexLoopStart) {
        state.cursor.navigation.indexLoopStart = state.cursor.current.index;
        state.cursor.navigation.numberRepetition = numberRepetition;
    }

    // Initialize the number of piled playable medias (playable media pile index & number of medias) if :
    // 1. There is more than one midi file or video file (so the their total index > 0), 
    // 2. The cursor is not currently depiling a playable media pile (thus the number of piled medias left is 0)
    // 3. The current index is not the start index of a previous pile (to avoid depiling a pile twice)
    const numberMidiFiles = Array.isArray(midiFileName) ? (midiFileName.length - 1) || 0 : 0;
    const numberVideoFiles = Array.isArray(videoFileName) ? (videoFileName.length - 1) || 0 : 0;
    const maxNumberMediaFiles = Math.max(numberMidiFiles, numberVideoFiles);
    if (maxNumberMediaFiles > 0 &&
        state.cursor.navigation.numberPiledPlayableMedia === 0 &&
        state.cursor.current.index !== state.cursor.navigation.indexPlayableMediaPile) {
        state.cursor.navigation.indexPlayableMediaPile = state.cursor.current.index;
        state.cursor.navigation.numberPiledPlayableMedia = maxNumberMediaFiles;
    }

    // Updating the next index
    // If the block is followed by the next block, we will necessarily go to the next block
    if (followedBy || false) {
        state.cursor.navigation.indexNext = state.cursor.current.index + 1;
    }
    // If there remains reptitions, we will loop back to the start of the loop
    else if (state.cursor.navigation.numberRepetition > 0) {
        state.cursor.navigation.indexNext = state.cursor.navigation.indexLoopStart;
        state.cursor.navigation.numberRepetition -= 1;
    }
    // If there remains playable media files to be played, we will loop back to that point
    else if (state.cursor.navigation.numberPiledPlayableMedia > 0) {
        state.cursor.navigation.indexNext = state.cursor.navigation.indexPlayableMediaPile;
        state.cursor.navigation.numberPiledPlayableMedia -= 1;
    }
    // By default, the next block is the following block
    else {
        state.cursor.navigation.indexNext = state.cursor.current.index + 1;
    }
}

const updateRoute = function (state) {
    router.push({ name: state.flow[state.cursor.current.index].type });
    state.isInitialized = { route: true, state: false, media: false };
}

/**
 * Initializes the state of the experiment according to the block pointed by the cursor
 * @param {Object} state    Vuex state from a store (automatic argument)
 */
const updateStateSettings = function (state) {
    // Parsing the current block's state settings
    const currentBlock = state.flow[state.cursor.current.index];
    const {
        anyPianoKey,
        playingMode,
        progressBarFlag,
        timeoutInSeconds
    } = currentBlock;

    // TODO: Integrate progress Bar ?
    // Set the settings for the state. If no value is found, an appropreate default value is set
    state.state.settings = {
        anyPianoKey: anyPianoKey || state.settings.anyPianoKey,
        playingMode: playingMode || state.settings.playingMode,
        progressBarFlag: progressBarFlag || false,
        timeoutInSeconds: timeoutInSeconds || 0
    };

    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(state.isInitialized, { state: true, media: false });
}

const updateStateMediaFiles = function (state) {
    // Parsing the current block's media files
    const currentBlock = state.flow[state.cursor.current.index];
    const {
        pictureFileName,
        midiFileName,
        videoFileName
    } = currentBlock;

    // Update the media files
    // If no file is specified for the index searched, the previous file is returned.
    // For the picture file name, we start from index the index of inner steps
    // For the midi and video file name, we start from the index of playable media files
    const innerStepIndex = state.cursor.current.innerStepIndex;
    const playableMediaIndex = state.cursor.current.playableMediaIndex;
    const updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[innerStepIndex] || null) : null;
    const updatedMidiFileName = Array.isArray(midiFileName) ? (midiFileName[playableMediaIndex] || null) : null;
    const updatedVideoFileName = Array.isArray(videoFileName) ? (videoFileName[playableMediaIndex] || null) : null;

    // Set the media files name. If no new value is found, it is kept unchanged
    const oldMediaFile = state.state.mediaFile;
    state.state.mediaFile.pictureName = updatedPictureFileName || oldMediaFile.pictureName;
    state.state.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
    state.state.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;

    // Indicate that the media files is initialized 
    Object.assign(state.isInitialized, { media: true });
}

const moveCursorNext = function (state) {
    moveCursorNextStep(state);
    updateCursorNavigation(state);
}

const updateState = function (state) {
    if (!state.isInitialized.route) updateRoute(state);
    if (!state.isInitialized.state) updateStateSettings(state);
    if (!state.isInitialized.media) updateStateMediaFiles(state);
}


export {
    updateState,
    moveCursorNext
}