export default {
    // Experiment
    experimentName: (state) => {
        return state.description.name || "UNKNOWN_NAME";
    },
    
    // Media file names
    midiName: (state) => {
        // Fetch the picture name
        const midiName = state.state.midiName;

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
        const pictureName = state.state.pictureName;

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
        return state.state.videoName;
    },

    // State attributes
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

    timeoutInSeconds: (state) => {
        // Return the the timeout time specified by the block if it exists,
        // otherwise, return a value of 0 to be interpreted as "There is no timeout"
        return state.state.settings.timeoutInSeconds || 0;
    }
}
