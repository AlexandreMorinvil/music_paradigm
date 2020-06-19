export default {
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
    }
}
