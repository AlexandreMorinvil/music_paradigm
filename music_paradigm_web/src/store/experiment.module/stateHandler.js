import { routerNavigation } from '@/_helpers'
import { UNSET_INDEX } from './constants';

function updateRoute(currentState, flow, cursor, isInitialized) {
    currentState.type = flow[cursor.current.index].type;
    routerNavigation.moveToState(currentState.type);
    Object.assign(isInitialized, { route: true, record: false, state: false, media: false, content: false });
}

function updateRecords(currentState, cursor, isInitialized) {
    if (cursor.navigation.indexLoopStart === UNSET_INDEX)
        currentState.record.successesInLoop = 0;
    Object.assign(isInitialized, { record: true });
}

function updateStateSettings(currentState, flow, cursor, isInitialized, generalSettings) {

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
        footnoteMessage,
        melodyRepetition,
        successesForSkipLoop,
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
        footnoteMessage: (typeof footnoteMessage === 'string') ? footnoteMessage : "",
        melodyRepetition: (typeof melodyRepetition === 'number') ? melodyRepetition : 1,
        successesForSkipLoop: (typeof successesForSkipLoop === 'number') ? successesForSkipLoop : generalSettings.successesForSkipLoop,
    };

    // Indicate that the state (current block's settings) was already initialized 
    Object.assign(isInitialized, { state: true });
}

function updateStateMediaFiles(currentState, flow, cursor, isInitialized) {

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
    Object.assign(isInitialized, { media: true });
}

function updateStateContent(currentState, flow, cursor, isInitialized) {

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

function forceEndState(currentState, isInitialized, message) {

    // We update the route
    routerNavigation.moveToState("end");

    // We render the state display as empty
    currentState.content.text = message || "";
    currentState.content.pictureName = "";
    currentState.content.interactivePiano = false;

    // We set the initialization status to true
    Object.assign(isInitialized, { route: true, record: true, state: true, media: true, content: true });
}

function updateStateOnSkip(currentState, flow, cursor, isInitialized) {
    if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
    else if (!isInitialized.media) updateStateMediaFiles(currentState, flow, cursor, isInitialized);
}

function updateState(currentState, flow, cursor, isInitialized, generalSettings) {
    if (cursor.current.isBeyondEnd) forceEndState(currentState, isInitialized);
    else {
        if (!isInitialized.route) updateRoute(currentState, flow, cursor, isInitialized);
        if (!isInitialized.record) updateRecords(currentState, cursor, isInitialized);
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