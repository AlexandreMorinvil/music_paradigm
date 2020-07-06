import constants from "./constants"

export default {
    // TODO: Set a getter for the number of steps left to the experiment

    // Getters for the experiment's settings
    experimentName: (state) => {
        return state.description.name || "UNKNOWN_NAME";
    },
    timbreFile: (state) => {
        return state.settings.timbreFile || constants.DEFAULT_TIMBRE_FILE;
    },

    // Media file names
    midiName: (state) => {
        // Fetch the picture name
        const midiName = state.state.mediaFile.midiName;

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

    pictureName: (state) => {
        // Fetch the picture name
        const pictureName = state.state.mediaFile.pictureName;

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

    videoName: (state) => {
        return state.state.mediaFile.videoName;
    },

    // State attributes
    // TODO : Make sure this works
    anyPianoKey: (state) => {
        // Return the "anyPianoKey" value specified by the block if it exists,
        // otherwise, the default "anyPianoKey" of the experiment is returned.
        // The "anyPianoKey" parameter indicates whether the user of the experiment
        // can move to the next step by pressing any piano key (if the value is "true"),
        // otherwise the experiment will move to the next step only by pressing the
        // space bar key (if the value is false).
        return state.state.settings.anyPianoKey || state.settings.anyPianoKey;
    },
    playingMode: (state) => {
        // Return the playing mode specified by the block if it exists,
        // otherwise, the default playing mode of the experiment is returned.
        return state.state.settings.playingMode || state.settings.playingMode;
    },

    enableSoundFlag: (state) => {
        // Return whether or not the piano output is enabled. The priority order is as follows :
        // 1. In the playing state, it is necessarily on
        // 2. The Block setting is the top priority
        // 3. The experiment setting
        // 4. Otherwise, it is turned off
        let enableSoundFlag;
        if (state.state.type === "playing") {
            enableSoundFlag = true;
        }
        else if (state.state.settings.enableSoundFlag !== undefined) {
            enableSoundFlag = state.state.settings.enableSoundFlag;
        }
        else if (state.settings.enableSoundFlag !== undefined) {
            enableSoundFlag = state.settings.enableSoundFlag;
        }
        else {
            enableSoundFlag = false;
        }
        return enableSoundFlag;
    },

    timeoutInSeconds: (state) => {
        // Return the the timeout time specified by the block if it exists,
        // otherwise, return a value of 0 to be interpreted as "There is no timeout"
        return state.state.settings.timeoutInSeconds || 0;
    }
}
