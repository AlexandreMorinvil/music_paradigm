import { routerNavigation } from '@/_helpers'

const updateRoute = function (currentState, flow, cursor, isInitialized) {

    // We update the route
    currentState.type = flow[cursor.current.index].type;
    routerNavigation.moveToState(currentState.type);
    Object.assign(isInitialized, { route: true, state: false, media: false, content: false });
}

/**
 * Initializes the state of the experiment according to the block pointed by the cursor
 */
const updateStateSettings = function (currentState, flow, cursor, isInitialized, generalSettings) {

    // Parsing the current block's state settings
    const currentBlock = flow[cursor.current.index];
    const {
        anyPianoKey,
        enableSoundFlag,
        playingMode,
        timeoutInSeconds,
        footnote,
        logFlag,
        hideFeedbackSmiley,
        skipStepButton,
        skipStepButtonMessage,
        successFeedbackMessage,
        failureFeedbackMessage,
        melodyRepetition,
        successesForSkip,
    } = currentBlock;

    // Set the settings for the state. If no value is found, an appropreate default value is set
    currentState.settings = {
        anyPianoKey: (typeof anyPianoKey !== 'undefined') ? Boolean(anyPianoKey) : generalSettings.anyPianoKey,
        enableSoundFlag: (typeof enableSoundFlag !== 'undefined') ? Boolean(enableSoundFlag) : generalSettings.enableSoundFlag,
        playingMode: (typeof playingMode === 'string') ? playingMode : generalSettings.playingMode,
        timeoutInSeconds: (typeof timeoutInSeconds === 'number') ? timeoutInSeconds : 0,
        footnote: (typeof footnote !== 'undefined') ? Boolean(footnote) : generalSettings.footnote,
        logFlag: (typeof logFlag === 'boolean') ? logFlag : generalSettings.logFlag,
        hideFeedbackSmiley: (typeof hideFeedbackSmiley === 'boolean') ? hideFeedbackSmiley : generalSettings.hideFeedbackSmiley,
        skipStepButton: (typeof skipStepButton === 'string') ? skipStepButton : "",
        skipStepButtonMessage: (typeof skipStepButtonMessage === 'string') ? skipStepButtonMessage : "",
        successFeedbackMessage: (typeof successFeedbackMessage === 'string') ? successFeedbackMessage : "",
        failureFeedbackMessage: (typeof failureFeedbackMessage === 'string') ? failureFeedbackMessage : "",
        melodyRepetition: (typeof melodyRepetition === 'number') ? melodyRepetition : 1,
        successesForSkip: (typeof successesForSkip === 'number') ? successesForSkip : generalSettings.successesForSkip,
    };

    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(isInitialized, { state: true, media: false, content: false });
}

const updateStateMediaFiles = function (currentState, flow, cursor, isInitialized) {

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

    // Parsing the current block
    const currentBlock = flow[cursor.current.index];
    const {
        // Type of block
        type,
        // Content elements
        textContent,
        pictureFileName,
        helperImageFileName,
        interactivePiano
    } = currentBlock;

    // Parsing the cursor
    const innerStepIndex = cursor.current.innerStepIndex;
    const piledMediaIndex = cursor.current.piledMediaIndex;

    // Update the content. If no value is found, no value is set
    const contentIndex = (type === "instruction") ? innerStepIndex : piledMediaIndex;

    const updatedTextContent = Array.isArray(textContent) ? (textContent[contentIndex] || null) : null;
    const updatedPictureFileName = Array.isArray(pictureFileName) ? (pictureFileName[contentIndex] || null) : null;
    const updatedHelperImageFileName = Array.isArray(helperImageFileName) ? (helperImageFileName[contentIndex] || null) : null;
    const updatedInteractivePiano = Array.isArray(interactivePiano) ? (interactivePiano[contentIndex] || false) : false;

    currentState.content.text = updatedTextContent || "";
    currentState.content.pictureName = updatedPictureFileName || "";
    currentState.content.helperImageName = updatedHelperImageFileName || "";
    currentState.content.interactivePiano = updatedInteractivePiano || false;

    // Indicate that the media files is initialized 
    Object.assign(isInitialized, { content: false });
}

const forceEndState = function (currentState, isInitialized, message) {

    // We update the route
    routerNavigation.moveToState("end");

    // We render the state display as empty
    currentState.content.text = message || "";
    currentState.content.pictureName = "";
    currentState.content.interactivePiano = false;

    // We set the initialization status to true
    Object.assign(isInitialized, { route: true, state: true, media: true, content: true });
}

const updateStateOnSkip = function (currentState, flow, cursor, isInitialized) {
    if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
    else if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
}

const updateState = function (currentState, flow, cursor, isInitialized, generalSettings) {
    if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
    else {
        if (!isInitialized.route) updateRoute(currentState, flow, cursor, isInitialized);
        if (!isInitialized.state) updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings);
        if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
        if (!isInitialized.content) updateStateContent(currentState, flow, cursor, isInitialized);
    }
}

export default {
    updateState,
    updateStateOnSkip,
    forceEndState
}