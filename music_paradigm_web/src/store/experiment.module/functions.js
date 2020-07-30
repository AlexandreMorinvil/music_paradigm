import { routerNavigation } from '@/_helpers'

const countStepsLeft = function (flow, startPointCursor) {

    // Deep copy the cursor (or initialize the cursor at the start by default)
    let stepTracerCursor = assignCursor(flow, startPointCursor);

    // Count the number of steps before being beyond the end of the experiment
    let stepsCounter = 0;
    while (!stepTracerCursor.current.isBeyondEnd) {
        moveCursorNext(flow, stepTracerCursor);
        stepsCounter += 1;
    }

    return Math.max(0, (stepsCounter - 1));
}

/**
 * Deep clone a cursor in parameter or assignes default initial values
 * @param {Objecy} cursorToCopy 
 */
const assignCursor = function (flow, cursorToCopy) {

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
                piledMediaIndex: 0,
                isBeyondEnd: false
            },
            navigation: {
                indexNext: 1,
                indexPileStart: -1,
                indexLoopStart: -1,
                indexGroupEnd: -1,
                totalInnerSteps: 0,
                numberRepetition: 1,
                numberPiledMedia: 0,
            }
        };
        // Adjust the navigation values so that it corresponds to the actual flow
        updateCursorNavigation(flow, defaultCursor);
        
        return defaultCursor;
    }
}

const moveCursorNextStep = function (flow, cursor, isInitialized = {}) {

    // Moving to the next inner step if there remains inner steps (only in instruction blocks)
    if (cursor.current.innerStepIndex < cursor.navigation.totalInnerSteps) {
        cursor.current.innerStepIndex += 1;
        Object.assign(isInitialized, { content: false });
    }

    // Moving to a new block
    else if (cursor.navigation.indexNext < flow.length) {

        // We systematically reset the inner step index to 0 when moving to a new block
        cursor.current.innerStepIndex = 0;

        // If the index of the next block is lower than or equal to the index of the current block, this means that we are looping
        if (cursor.navigation.indexNext <= cursor.current.index) {

            // If there remains reptitions: we loop back and substract a repetition
            if (cursor.navigation.numberRepetition > 1) {
                cursor.navigation.numberRepetition -= 1;
            }

            // If there remains media content to depile: we loop back and decrement the count of piled content
            else if (cursor.navigation.numberPiledMedia > 1) {
                cursor.navigation.numberPiledMedia -= 1;
                cursor.current.piledMediaIndex += 1;
            }
        }

        // Otherwise, if the next step is beyond a group of blocks, we reset the piled content index
        else if (cursor.navigation.indexNext > cursor.navigation.indexGroupEnd) {
            cursor.current.piledMediaIndex = 0;
        }

        // We move the current intdex to the next step
        cursor.current.index = cursor.navigation.indexNext;
        Object.assign(isInitialized, { route: false, state: false, media: false, content: false });
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
        textContent,
        pictureFileName,
        midiFileName,
        videoFileName,
        // Cursor parameters
        numberRepetition, maxNumBlock, numBlock, // Those three names are kept for backward compatibility
        followedBy,
    } = currentBlock;

    // Set all the navigation parameters
    setCursorInnerStepsTotal(cursor, type, textContent, pictureFileName);
    setCursorLoopStart(cursor, Math.max(numberRepetition || 0, maxNumBlock || 0, numBlock || 0));
    setCursorMediaDepilingStart(cursor, midiFileName, videoFileName);
    setCursorNextStep(cursor, followedBy);
}

const setCursorInnerStepsTotal = function (cursor, type, textContent, pictureFileName) {

    // The only type of blocks to have inner steps is "intruction" blocks. All other block do not have inner steps
    if (type !== "instruction") {
        cursor.navigation.totalInnerSteps = 0;
    }

    // If we are in an instruction block, the total amount of inner steps the maximum number of content elements
    // (text or pictures) in the block to which we substract 1 in order to compare the inner index to the total indexes.
    else {
        // Count the number of piled content elements of each type and detemine the maximum number of content elements 
        const numberTextContent = Array.isArray(textContent) ? (textContent.length) : 0;
        const numberPictureFiles = Array.isArray(pictureFileName) ? (pictureFileName.length) : 0;

        const maxNumberContentElement = Math.max(numberTextContent, numberPictureFiles);
        cursor.navigation.totalInnerSteps = (maxNumberContentElement - 1);
    }
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

const setCursorMediaDepilingStart = function (cursor, midiFileName, videoFileName) {

    // The cursor will loop to the start of the pile and use the content corresponding to the index named "piledMediaIndex"
    // Let A, B, C and D be three blocks, that are not instruction blocks.
    //
    //              A                                   B                               C                               D
    //  ------------------------------  ------------------------------  ------------------------------  ------------------------------
    //  | type: XXX                  |  | type: XXX                  |  | type: XXX                  |  | type: XXX                  |
    //  |           ...              |  |           ...              |  |           ...              |  |           ...              |
    //  | midiFileName: [0, 1]       |  | midiFileName: [0, 1]       |  | midiFileName: [0, 1, 2]    |  | midiFileName: [0, 1, 2]    |
    //  | videoFileName: [0, 1]      |  | videoFileName: [0, 1]      |  | videoFileName: [0, 1, 2, 3]|  | videoFileName: [0, 1, 2]   |
    //  | folloedBy: true            |  | folloedBy: true            |  |                            |  |                            |
    //  ------------------------------  ------------------------------  ------------------------------  ------------------------------
    //
    //  The execution order would be :
    //  A[0] - B[0] - C[0] - A[1] - B[1] - C[1] - D[0] - D[1] - D[2]

    // Count the number of piled media elements of each type and detemine the maximum number of piled media content. 
    const numberMidiFiles = Array.isArray(midiFileName) ? (midiFileName.length) : 0;
    const numberVideoFiles = Array.isArray(videoFileName) ? (videoFileName.length) : 0;

    const maxNumberContentElement = Math.max(numberMidiFiles, numberVideoFiles);

    // Initialize the number of piled media content (playable media pile index & number of medias) if :
    // 1. There is more than one media content element (midi/video) (so the total index > 1), 
    // 2. The cursor is not currently depiling a content pile (thus the number of piled content left is 1 or 0)
    // 3. The current index is not the start index of a previous pile (to avoid depiling a pile twice)
    // 4. The current index is beyond the loop end (in order to not start a loop of depilement within 
    //    a group of blocks)
    if (maxNumberContentElement > 1 &&
        cursor.navigation.numberPiledMedia <= 1 &&
        cursor.current.index !== cursor.navigation.indexPileStart &&
        cursor.current.index > cursor.navigation.indexGroupEnd) {
        cursor.navigation.indexPileStart = cursor.current.index;
        cursor.navigation.numberPiledMedia = maxNumberContentElement;
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
        //  - We reset the loop start in order to be able to loop again with the new media content
        else if (cursor.navigation.numberPiledMedia > 1) {
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
    routerNavigation.moveToState(currentState.type);
    Object.assign(isInitialized, { route: true, state: false, media: false, content: false });
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
        timeoutInSeconds,
        footnote
    } = currentBlock;

    // Set the settings for the state. If no value is found, an appropreate default value is set
    currentState.settings = {
        anyPianoKey: (typeof anyPianoKey !== 'undefined') ? Boolean(anyPianoKey) : generalSettings.anyPianoKey,
        enableSoundFlag: (typeof enableSoundFlag !== 'undefined') ? Boolean(enableSoundFlag) : generalSettings.enableSoundFlag,
        playingMode: (typeof playingMode === 'string') ? playingMode : generalSettings.playingMode,
        timeoutInSeconds: (typeof timeoutInSeconds === 'number') ? timeoutInSeconds : 0,
        footnote: (typeof footnote !== 'undefined') ? Boolean(footnote) : generalSettings.footnote
    };

    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(isInitialized, { state: true, media: false, content: false });
}

const updateStateMediaFiles = function (currentState, flow, cursor, isInitialized) {

    // If the cursor is beyond the end, the flow is finished, we do not need to parse another block
    if (cursor.current.isBeyondEnd) return;

    // Parsing the current block
    const currentBlock = flow[cursor.current.index];
    const {
        // Media files
        midiFileName,
        videoFileName
    } = currentBlock;

    // Parsing the cursor
    const piledMediaIndex = cursor.current.piledMediaIndex;

    // Update the media files. If no new value is found, the previous value is used (it is kept unchanged)
    const mediaIndex = piledMediaIndex;

    const updatedMidiFileName = Array.isArray(midiFileName) ? (midiFileName[mediaIndex] || null) : null;
    const updatedVideoFileName = Array.isArray(videoFileName) ? (videoFileName[mediaIndex] || null) : null;

    const oldMediaFile = currentState.mediaFile;
    currentState.mediaFile.midiName = updatedMidiFileName || oldMediaFile.midiName;
    currentState.mediaFile.videoName = updatedVideoFileName || oldMediaFile.videoName;

    // Indicate that the media files is initialized 
    Object.assign(isInitialized, { media: true, content: false });
}

const updateStateContent = function (currentState, flow, cursor, isInitialized) {

    // If the cursor is beyond the end, the flow is finished, we do not need to parse another block
    if (cursor.current.isBeyondEnd) return;

    // Parsing the current block
    const currentBlock = flow[cursor.current.index];
    const {
        // Type of block
        type,
        // Content elements
        textContent,
        pictureFileName,
        interactivePiano
    } = currentBlock;

    // Parsing the cursor
    const innerStepIndex = cursor.current.innerStepIndex;
    const piledMediaIndex = cursor.current.piledMediaIndex;

    // Update the content. If no value is found, no value is set
    const contentIndex = (type === "instruction") ? innerStepIndex : piledMediaIndex;

    const updatedTextContent = Array.isArray(textContent) ? (textContent[contentIndex] || null) : null;
    const updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[contentIndex] || null) : null;
    const updatedInteractivePiano = Array.isArray(interactivePiano) ? (interactivePiano[contentIndex] || false) : false;

    currentState.content.text = updatedTextContent || "";
    currentState.content.pictureName = updatedPictureFileName || "";
    currentState.content.interactivePiano = updatedInteractivePiano || false;

    // Indicate that the media files is initialized 
    Object.assign(isInitialized, { content: false });
}

const moveCursorNext = function (flow, cursor, isInitialized) {
    moveCursorNextStep(flow, cursor, isInitialized);
    updateCursorNavigation(flow, cursor);
}

const updateState = function (currentState, flow, cursor, isInitialized, generalSettings) {
    if (!isInitialized.route) updateRoute(currentState, flow, cursor, isInitialized);
    if (!isInitialized.state) updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings);
    if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
    if (!isInitialized.content) updateStateContent(currentState, flow, cursor, isInitialized);
}


export default {
    countStepsLeft,
    assignCursor,
    moveCursorNext,
    updateCursorNavigation,
    updateState
}
// TODO: Instoring a break from the loop mechanism (end of loop parameter)