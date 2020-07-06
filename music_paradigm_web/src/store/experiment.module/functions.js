import router from '@/router'

const moveCursorNextStep = function (flow, cursor, isInitialized = {}) {
    // Moving to the next inner step if there remains inner steps
    if (cursor.current.innerStepIndex < cursor.navigation.totalInnerSteps) {
        cursor.current.innerStepIndex += 1;
        Object.assign(isInitialized, { media: false });
    }
    // Moving to next block as specified by the next index of the navigation
    else if (cursor.navigation.indexNext < flow.length) {
        cursor.current.index = cursor.navigation.indexNext;
        Object.assign(isInitialized, { route: false, state: false, media: false });
    }
    // Moving beyond the last block of the flow
    else {
        throw new Error("Attempting to move cursor to a non-existing block");
    }
}

// Read the block for the index specific parameters
const updateCursorNavigation = function (flow, cursor) {
    // Parsing the block's flow navigation parameters
    const currentBlock = flow[cursor.current.index];
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
    cursor.navigation.totalInnerSteps = numberPictureFiles;

    // Initialize a loop (loop start index & number of repetitions) if :
    // 1. A number of repetition is specified in the block's settings, 
    // 2. The cursor is not currently in a loop (thus the number of reptition left is 0)
    // 3. The current index is not the start index of a previous loop (to avoid resetting a loop twice)
    if (numberRepetition > 0 &&
        cursor.navigation.numberRepetition === 0 &&
        cursor.current.index !== cursor.navigation.indexLoopStart) {
        cursor.navigation.indexLoopStart = cursor.current.index;
        cursor.navigation.numberRepetition = numberRepetition;
    }

    // Initialize the number of piled playable medias (playable media pile index & number of medias) if :
    // 1. There is more than one midi file or video file (so the their total index > 0), 
    // 2. The cursor is not currently depiling a playable media pile (thus the number of piled medias left is 0)
    // 3. The current index is not the start index of a previous pile (to avoid depiling a pile twice)
    const numberMidiFiles = Array.isArray(midiFileName) ? (midiFileName.length - 1) || 0 : 0;
    const numberVideoFiles = Array.isArray(videoFileName) ? (videoFileName.length - 1) || 0 : 0;
    const maxNumberMediaFiles = Math.max(numberMidiFiles, numberVideoFiles);
    if (maxNumberMediaFiles > 0 &&
        cursor.navigation.numberPiledPlayableMedia === 0 &&
        cursor.current.index !== cursor.navigation.indexPlayableMediaPile) {
        cursor.navigation.indexPlayableMediaPile = cursor.current.index;
        cursor.navigation.numberPiledPlayableMedia = maxNumberMediaFiles;
    }

    // Updating the next index
    // If the block is followed by the next block, we will necessarily go to the next block
    if (followedBy || false) {
        cursor.navigation.indexNext = cursor.current.index + 1;
    }
    // If there remains reptitions, we will loop back to the start of the loop
    else if (cursor.navigation.numberRepetition > 0) {
        cursor.navigation.indexNext = cursor.navigation.indexLoopStart;
        cursor.navigation.numberRepetition -= 1;
    }
    // If there remains playable media files to be played, we will loop back to that point
    else if (cursor.navigation.numberPiledPlayableMedia > 0) {
        cursor.navigation.indexNext = cursor.navigation.indexPlayableMediaPile;
        cursor.navigation.numberPiledPlayableMedia -= 1;
    }
    // By default, the next block is the following block
    else {
        cursor.navigation.indexNext = cursor.current.index + 1;
    }
}

const updateRoute = function (currentState, flow, cursor, isInitialized) {
    currentState.type = flow[cursor.current.index].type;
    router.push({ name: currentState.type });
    Object.assign(isInitialized, { route: true, state: false, media: false });
}

/**
 * Initializes the state of the experiment according to the block pointed by the cursor
 * @param {Object} state    Vuex state from a store (automatic argument)
 */
const updateStateSettings = function (currentState, flow, cursor, isInitialized, generalSettings) {
    // Parsing the current block's state settings
    const currentBlock = flow[cursor.current.index];
    const {
        anyPianoKey,
        enableSoundFlag,
        playingMode,
        progressBarFlag,
        timeoutInSeconds
    } = currentBlock;

    // TODO: Integrate progress Bar ?
    // Set the settings for the state. If no value is found, an appropreate default value is set
    currentState.settings = {
        anyPianoKey: (typeof anyPianoKey !== 'undefined') ? Boolean(anyPianoKey) : generalSettings.anyPianoKey,
        enableSoundFlag : (typeof enableSoundFlag !== 'undefined') ? Boolean(enableSoundFlag) : generalSettings.enableSoundFlag,
        playingMode: (typeof playingMode !== 'undefined') ? playingMode : generalSettings.playingMode,
        progressBarFlag: (typeof progressBarFlag !== 'undefined') ? Boolean(progressBarFlag) : true,
        timeoutInSeconds: (typeof timeoutInSeconds === 'number') ? timeoutInSeconds : 0
    };
    //(typeof VAR_NAME !== 'undefined') ? VAR_NAME : DEFAULT
    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(isInitialized, { state: true, media: false });
}

const updateStateMediaFiles = function (currentState, flow, cursor, isInitialized) {
    // Parsing the current block's media files
    const currentBlock = flow[cursor.current.index];
    const {
        pictureFileName,
        midiFileName,
        videoFileName
    } = currentBlock;

    // Update the media files
    // If no file is specified for the index searched, the previous file is returned.
    // For the picture file name, we start from index the index of inner steps
    // For the midi and video file name, we start from the index of playable media files
    const innerStepIndex = cursor.current.innerStepIndex;
    const playableMediaIndex = cursor.current.playableMediaIndex;
    const updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[innerStepIndex] || null) : null;
    const updatedMidiFileName = Array.isArray(midiFileName) ? (midiFileName[playableMediaIndex] || null) : null;
    const updatedVideoFileName = Array.isArray(videoFileName) ? (videoFileName[playableMediaIndex] || null) : null;

    // Set the media files name. If no new value is found, it is kept unchanged
    const oldMediaFile = currentState.mediaFile;
    currentState.mediaFile.pictureName = updatedPictureFileName || oldMediaFile.pictureName;
    currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
    currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;

    // Indicate that the media files is initialized 
    Object.assign(isInitialized, { media: true });
}

const moveCursorNext = function (flow, cursor, isInitialized) {
    moveCursorNextStep(flow, cursor, isInitialized);
    updateCursorNavigation(flow, cursor);
}

const updateState = function (currentState, flow, cursor, isInitialized, generalSettings) {
    if (!isInitialized.route) updateRoute(currentState, flow, cursor, isInitialized);
    if (!isInitialized.state) updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings);
    if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
}


export {
    updateState,
    moveCursorNext
}
// TODO: Instoring a break from the loop mechanism (end of loop parameter)