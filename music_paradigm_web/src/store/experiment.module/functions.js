import router from '@/router'

const countStepsLeft = function (flow, startPointCursor) {

    // Deep copy the cursor (or initialize the cursor at the start by default)
    let stepTracerCursor = assignCursor(startPointCursor);

    // Count the number of steps before being beyond the end of the experiment
    let stepsCounter = 0;
    while (!stepTracerCursor.current.isBeyondEnd) {
        moveCursorNext(flow, stepTracerCursor);
        stepsCounter += 1;
    }
    return (stepsCounter - 1);
}

/**
 * Deep clone a cursor in parameter or assignes default initial values
 * @param {Objecy} cursorToCopy 
 */
const assignCursor = function (cursorToCopy) {

    // If no cursor is set to be cloned, 
    if (cursorToCopy) {
        // Deep copy the the cursor set in parameter
        return JSON.parse(JSON.stringify(cursorToCopy));
    }
    else {
        // Set the default values
        const defaultCursor = {
            current: {
                index: 0,
                innerStepIndex: 0,
                piledContentIndex: 0,
                isBeyondEnd: false
            },
            navigation: {
                indexNext: 1,
                indexPileStart: -1,
                indexLoopStart: -1,
                indexGroupEnd: -1,
                totalInnerSteps: 0,
                numberRepetition: 1,
                numberPiledContent: 0,
            }
        };
        return defaultCursor;
    }
}

const moveCursorNextStep = function (flow, cursor, isInitialized = {}) {

    // Moving to the next inner step if there remains inner steps (only in instruction blocks)
    if (cursor.current.innerStepIndex < cursor.navigation.totalInnerSteps) {
        cursor.current.innerStepIndex += 1;
        Object.assign(isInitialized, { media: false });
    }

    // Moving to a new block
    else if (cursor.navigation.indexNext < flow.length) {

        // We systematically reset the inner step index to 0 when moving to a new block
        cursor.current.innerStepIndex = 0;

        // If the index of the next block is lower than the index of the current block, this means that we are looping
        if (cursor.navigation.indexNext < cursor.current.index) {

            // If there remains reptitions: we loop back and substract a repetition
            if (cursor.navigation.numberRepetition > 1) {
                cursor.navigation.numberRepetition -= 1;
            }
            // If there remains content to depile: we loop back and decrement the count of piled content
            else if (cursor.navigation.numberPiledContent > 1) {
                cursor.navigation.numberPiledContent -= 1;
                cursor.current.piledContentIndex += 1;
            }
        }

        // Otherwise, if the next step is beyond a group of blocks, we reset the piled content index
        else if (cursor.navigation.indexNext > cursor.navigation.indexGroupEnd) {
            cursor.current.piledContentIndex = 0;
        }
            
        // We move the current intdex to the next step
        cursor.current.index = cursor.navigation.indexNext;
        Object.assign(isInitialized, { route: false, state: false, media: false });
    }

    // Moving beyond the last block of the flow
    else {
        cursor.current.isBeyondEnd = true;
    }
}

// Read the block for the index specific parameters
const updateCursorNavigation = function (flow, cursor) {

    // If the cursor is beyond the end, the flow is finished, we do not need to parse another block
    if (cursor.current.isBeyondEnd) return;

    // Parsing the block's flow navigation parameters
    const currentBlock = flow[cursor.current.index];
    const {
        // Type of block
        type,
        // Media files array
        pictureFileName,
        midiFileName,
        videoFileName,
        // Cursor parameters
        followedBy,
        numberRepetition, maxNumBlock, numBlock // Those three names are kept for backward compatibility
    } = currentBlock;

    // Variable use to differential the instruction blocks from the other types of blocks
    const isInstruction = (type === "instruction");

    // Set all the navigation parameters
    setCursorInnerStepsTotal(cursor, isInstruction, pictureFileName);
    setCursorLoopStart(cursor, Math.max(numberRepetition || 0, maxNumBlock || 0, numBlock || 0));
    setCursorContentDepilingStart(cursor, isInstruction, pictureFileName, midiFileName, videoFileName);
    setCursorNextStep(cursor, followedBy);
}



const setCursorInnerStepsTotal = function (cursor, isInstruction, pictureFileName) {

    // Initialize the total number of inner steps of the current block ONLY if it is an instruction block
    const numberPictureFiles = Array.isArray(pictureFileName) ? (pictureFileName.length - 1) : 0;
    if (isInstruction) cursor.navigation.totalInnerSteps = numberPictureFiles;
    else cursor.navigation.totalInnerSteps = 0;
}

const setCursorLoopStart = function (cursor, numberRepetition) {

    // Let A, B, C and D be three blocks, that are not instruction blocks.
    //
    //              A                           B                           C                           D
    //  -------------------------   -------------------------   -------------------------   -------------------------
    //  | type: XXX             |   | type: XXX             |   | type: XXX             |   | type: XXX             |
    //  |           ...         |   |           ...         |   |           ...         |   |           ...         |
    //  | numberRepetition: 3   |   |                       |   | numberRepetition: 3   |   |                       |
    //  | folloedBy: true       |   | folloedBy: true       |   |                       |   |                       |
    //  -------------------------   -------------------------   -------------------------   -------------------------
    //
    //  The execution order would be :
    //  A - B - C - A - B - C - A - B - C - C - C - D

    // Initialize a loop (loop start index & number of repetitions) if :
    // 1. A number of repetition greater than 1 is specified in the block's settings, 
    // 2. The cursor is not currently in a loop (thus the number of reptition left is <= 1)
    // 3. The current index is not the start index of a previous loop (to avoid resetting a loop twice)
    if (numberRepetition > 1 &&
        cursor.navigation.numberRepetition <= 1 &&
        cursor.current.index !== cursor.navigation.indexLoopStart) {
        cursor.navigation.indexLoopStart = cursor.current.index;
        cursor.navigation.numberRepetition = numberRepetition;
    }
}

const setCursorContentDepilingStart = function (cursor, isInstruction, pictureFileName, midiFileName, videoFileName) {

    // Let A, B, C and D be three blocks, that are not instruction blocks.
    //
    //              A                                   B                               C                               D
    //  ------------------------------  ------------------------------  ------------------------------  ------------------------------
    //  | type: XXX                  |  | type: XXX                  |  | type: XXX                  |  | type: XXX                  |
    //  |           ...              |  |           ...              |  |           ...              |  |           ...              |
    //  | pictureFileName: [0, 1]    |  | pictureFileName: [0]       |  | pictureFileName: [0, 1, 2] |  | pictureFileName: [0, 1, 2] |
    //  | midiFileName: [0, 1]       |  | midiFileName: [0]          |  | midiFileName: [0, 1, 2]    |  | midiFileName: [0, 1, 2]    |
    //  | videoFileName: [0, 1]      |  | videoFileName: [0]         |  | videoFileName: [0, 1, 2, 3]|  | videoFileName: [0, 1, 2]   |
    //  | folloedBy: true            |  | folloedBy: true            |  |                            |  |                            |
    //  ------------------------------  ------------------------------  ------------------------------  ------------------------------
    //
    //  The execution order would be :
    //  A[0] - B[0] - C[0] - A[1] - B[1] - C[1] - D[0] - D[1] - D[2]

    // Count the number of piled content elements of each type
    const numberMidiFiles = Array.isArray(midiFileName) ? (midiFileName.length) : 0;
    const numberVideoFiles = Array.isArray(videoFileName) ? (videoFileName.length) : 0;
    const numberPictureFiles = Array.isArray(pictureFileName) ? (pictureFileName.length) : 0;

    // Detemine the maximum number of piled content elements all types included.
    // The cursor will loop to the start of the pile and use the content corresponding to the index named "piledContentIndex"
    // If we are in an instruction block, the pictures and text content will be shown immeiately and they will not depend on 
    // the "piledContentIndex" so they are not considered.
    // If it is not an instruction block, the picture and text will be shown accordingly with the "piledContentIndex", so they
    // are considred in the maximum calculation.
    var maxNumberContentElement;
    if (isInstruction) {
        maxNumberContentElement = Math.max(numberMidiFiles, numberVideoFiles);
    } else {
        maxNumberContentElement = Math.max(numberMidiFiles, numberVideoFiles, numberPictureFiles);
    }

    // Initialize the number of piled content (playable media pile index & number of medias) if :
    // 1. There is more than one content element (midi/video/picture/text) (so the total index > 1), 
    // 2. The cursor is not currently depiling a content pile (thus the number of piled content left is 1 or 0)
    // 3. The current index is not the start index of a previous pile (to avoid depiling a pile twice)
    // 4. The current index is beyond the loop end (in order to not start a loop of depilement within 
    //    a group of blocks)
    if (maxNumberContentElement > 1 &&
        cursor.navigation.numberPiledContent <= 1 &&
        cursor.current.index !== cursor.navigation.indexPileStart &&
        cursor.current.index > cursor.navigation.indexGroupEnd) {
        cursor.navigation.indexPileStart = cursor.current.index;
        cursor.navigation.numberPiledContent = maxNumberContentElement;
    }
}

const setCursorNextStep = function (cursor, followedBy) {

    // Updating the next index
    // If the block is followed by the next block, we will necessarily go to the next block
    // and we know that we are within a group of blocks
    if (followedBy) {
        cursor.navigation.indexNext = cursor.current.index + 1;
    }

    // If the block is not followed by another block, it is necesserily the end of a group of blocks
    else {
        cursor.navigation.indexGroupEnd = cursor.current.index;

        // If there remains reptitions: We loop back to the start of the loop
        if (cursor.navigation.numberRepetition > 1) {
            cursor.navigation.indexNext = cursor.navigation.indexLoopStart;
        }

        // If there remains content to depile:
        //  - We will loop back to that point
        //  - We reset the loop start in order to be able to loop again with the new content
        else if (cursor.navigation.numberPiledContent > 1) {
            cursor.navigation.indexNext = cursor.navigation.indexPileStart;
            cursor.navigation.indexLoopStart = -1;
        }

        // By default, the next block is the following block
        else {
            cursor.navigation.indexNext = cursor.current.index + 1;
        }
    }
}

const updateRoute = function (currentState, flow, cursor, isInitialized) {

    // XXX: If the cursor is beyond the end, the flow is finished, we go to the default end process
    if (cursor.current.isBeyondEnd) return;

    // We update the route
    currentState.type = flow[cursor.current.index].type;
    router.push({ name: currentState.type });
    Object.assign(isInitialized, { route: true, state: false, media: false });
}

/**
 * Initializes the state of the experiment according to the block pointed by the cursor
 */
const updateStateSettings = function (currentState, flow, cursor, isInitialized, generalSettings) {

    // If the cursor is beyond the end, the flow is finished, we do not need to parse another block
    if (cursor.current.isBeyondEnd) return;

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
        enableSoundFlag: (typeof enableSoundFlag !== 'undefined') ? Boolean(enableSoundFlag) : generalSettings.enableSoundFlag,
        playingMode: (typeof playingMode === 'string') ? playingMode : generalSettings.playingMode,
        progressBarFlag: (typeof progressBarFlag !== 'undefined') ? Boolean(progressBarFlag) : true,
        timeoutInSeconds: (typeof timeoutInSeconds === 'number') ? timeoutInSeconds : 0
    };

    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(isInitialized, { state: true, media: false });
}

const updateStateMediaFiles = function (currentState, flow, cursor, isInitialized) {
    
    // If the cursor is beyond the end, the flow is finished, we do not need to parse another block
    if (cursor.current.isBeyondEnd) return;

    // Parsing the current block's media files
    const currentBlock = flow[cursor.current.index];
    const {
        // Type of block
        type,
        // Media files
        pictureFileName,
        midiFileName,
        videoFileName
    } = currentBlock;

    // Update the media files
    // If no file is specified for the index searched, the previous file is returned.
    // For the picture file name, we start from the inner steps index if the block is an instruction block
    // For all other types of blocks, we the picture file name corresponds to the playable media file name
    // For the midi and video file name, we start from the index of playable media files
    const innerStepIndex = cursor.current.innerStepIndex;
    const piledContentIndex = cursor.current.piledContentIndex;

    var updatedPictureFileName;
    if (type === "instruction") updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[innerStepIndex] || null) : null;
    else updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[piledContentIndex] || null) : null;

    var updatedMidiFileName = Array.isArray(midiFileName) ? (midiFileName[piledContentIndex] || null) : null;
    var updatedVideoFileName = Array.isArray(videoFileName) ? (videoFileName[piledContentIndex] || null) : null;


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


export default {
    countStepsLeft,
    assignCursor,
    moveCursorNext,
    updateState,
}
// TODO: Instoring a break from the loop mechanism (end of loop parameter)