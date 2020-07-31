import constants from "./constants"
import functions from "./functions"

export default {
    // Getters for the experiment flow's information
    stepsTotalCount: (state) => {
        return functions.countStepsLeft(state.flow);
    },

    stepsLeftCount: (state) => {
        return functions.countStepsLeft(state.flow, state.cursor);
    },

    // Getters for the experiment settings
    experimentName: (state) => {
        return state.description.name || "UNKNOWN_NAME";
    },

    timbreFile: (state) => {
        return state.settings.timbreFile || constants.DEFAULT_TIMBRE_FILE;
    },

    timeLimitInSeconds: (state) => {
        return state.settings.timeLimitInSeconds || constants.DEFAULT_TIME_LIMIT;
    },

    // Getters for the state content
    // Texts
    textContent: (state) => {
        return state.state.content.text;
    },

    // Image files
    pictureName: (state) => {
        // Fetch the picture name
        const pictureName = state.state.content.pictureName;
        if (pictureName === "") return "";

        // Verify that the file name describes a supported file format
        const pictureNameExtension = pictureName.split(".").pop();
        if (!["jpg", "png", "bmp"].includes(pictureNameExtension)) {
            throw new Error(`
                Incompatible image format for the "${pictureName}" image file.\n
                The "${pictureNameExtension}" file format is not supported.
            `);
        }

        // Return the picture name
        return `${state.description.folder}/${pictureName}`;
    },

    // Interactive piano
    interactivePiano: (state) => {
        return state.state.content.interactivePiano || false;
    },

    // Getters for the state media
    // Playable Media file names
    midiName: (state) => {
        // Fetch the picture name
        const midiName = state.state.mediaFile.midiName;
        if (midiName === "") return "";

        // Verify that the file name describes a supported file format
        const midiNameExtension = midiName.split(".").pop();
        if (!["mid"].includes(midiNameExtension)) {
            throw new Error(`
                Incompatible MIDI format for the "${midiName}" MIDI file.\n
                The "${midiNameExtension}" file format is not supported.
            `);
        }

        // Return the picture name
        return `${state.description.folder}/${midiName}`;

    },

    videoName: (state) => {
        // Fetch the video name
        const videoName = state.state.mediaFile.videoName;
        if (videoName === "") return "";

        // Verify that the file name describes a supported file format
        const videoNameExtension = videoName.split(".").pop();
        if (!["mp4"].includes(videoNameExtension)) {
            throw new Error(`
                        Incompatible video format for the "${videoName}" MIDI file.\n
                        The "${videoNameExtension}" file format is not supported.
                    `);
        }

        // Return the video name
        return `${state.description.folder}/${videoName}`;
    },

    // Geters for the state attributes
    currentStateType: (state) => {
        // Return the type of the current state
        if (state.cursor.current.isBeyondEnd) {
            return "end";
        }
        return state.state.type || "";
    },

    nextStateType: (state) => {
        // Return the type of the next state
        // If we are currently beyond the last block of the flow or if there is
        // no current state type step, we return no next step
        if (state.cursor.current.isBeyondEnd || !state.state.type) {
            return "";
        }

        // If the current block is an end block, regardless of whether or not there exists another 
        // block in the flow description flow, there is no next step to be indicated
        else if (state.state.type === "end") {
            return "";
        }

        // If the next step is beyond the last block of the flow, we return "end"
        else if (state.cursor.navigation.indexNext > (state.flow.length - 1)) {
            return "end";
        }

        // If There remains inner steps in the current block, the next step is of the same type as the current step
        else if (state.cursor.current.innerStepIndex < state.cursor.navigation.totalInnerSteps) {
            return state.flow[state.cursor.current.index].type;
        }

        // Otherwise, if it is none of the edge casess, the type of the next step is the type of the following block
        else
            return state.flow[state.cursor.navigation.indexNext].type;
    },

    anyPianoKey: (state) => {
        // Return the "anyPianoKey" value specified by the block if it exists,
        // otherwise, the default "anyPianoKey" of the experiment is returned.
        // The "anyPianoKey" parameter indicates whether the user of the experiment
        // can move to the next step by pressing any piano key (if the value is "true"),
        // otherwise the experiment will move to the next step only by pressing the
        // space bar key (if the value is false).
        let anyPianoKey;

        if (typeof state.state.settings.anyPianoKey === "boolean")
            anyPianoKey = state.state.settings.anyPianoKey;

        else if (typeof state.settings.anyPianoKey === "boolean")
            anyPianoKey = state.settings.anyPianoKey

        else
            anyPianoKey = constants.DEFAULT_ANY_PIANO_KEY

        return anyPianoKey;
    },

    playingMode: (state) => {
        // Return the playing mode specified by the block if it exists,
        // otherwise, the default playing mode of the experiment is returned.
        let playingMode;

        if (typeof state.state.settings.playingMode === "string")
            playingMode = state.state.settings.playingMode;

        else if (typeof state.settings.playingMode === "string")
            playingMode = state.settings.playingMode

        else
            playingMode = constants.DEFAULT_PLAYING_MODE

        return playingMode;
    },

    enableSoundFlag: (state) => {
        // Return whether or not the piano output is enabled. The priority order is as follows :
        // 1. In the playing state, it is necessarily on
        // 2. The Block setting is the top priority
        // 3. The experiment setting
        // 4. Otherwise, it is turned off
        let enableSoundFlag;

        if (state.state.type === "playing")
            enableSoundFlag = true;

        else if (typeof state.state.settings.enableSoundFlag === "boolean")
            enableSoundFlag = state.state.settings.enableSoundFlag;

        else if (typeof state.settings.enableSoundFlag === "boolean")
            enableSoundFlag = state.settings.enableSoundFlag;

        else
            enableSoundFlag = constants.DEFAULT_ENABLE_SOUND_FLAG

        return enableSoundFlag;
    },

    timeoutInSeconds: (state) => {
        // Return the the timeout time specified by the block if it exists,
        // otherwise, return a value of 0 to be interpreted as "There is no timeout"
        return state.state.settings.timeoutInSeconds || 0;
    },

    hasFootnote: (state) => {
        let hasFootNote;

        if (typeof state.state.settings.footnote === "boolean")
            hasFootNote = state.state.settings.footnote;

        if (typeof state.settings.footnote === "boolean")
            hasFootNote = state.settings.footnote;

        else
            hasFootNote = constants.DEFAULT_FOOTNOTE;

        return hasFootNote;
    },

    // Getters used for the content disposition on the screen
    hasText: (state) => {
        return Boolean(state.state.content.text);
    },

    hasInteractivePiano: (state) => {
        return Boolean(state.state.content.interactivePiano);
    },

    hasPicture: (state) => {
        return Boolean(state.state.content.pictureName);
    },

    hasVisualMedia: (state) => {
        return Boolean(state.state.content.pictureName) || Boolean(state.state.content.interactivePiano);
    },

    hasNoContent: (state) => {
        return !(state.state.content.text) && !(Boolean(state.state.content.pictureName) || Boolean(state.state.content.interactivePiano));
    }
}
