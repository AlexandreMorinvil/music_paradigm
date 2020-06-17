import router from '@/router'

// Default settings values
const DEFAULT_ANY_PIANO_KEY = false;
const DEFAULT_MODE = "Mix";
const DEFAULT_TIMBRE_FILE = "https://raw.githubusercontent.com/gleitz/midi-js-soundfonts/gh-pages/MusyngKite/acoustic_grand_piano-ogg.js";

const state = {
    experimentSet: false,
    flow: [], // The sequence of the experiment
    description: {
        name: "",
        folder: ""
    },
    settings: {
        anyPianoKey: DEFAULT_ANY_PIANO_KEY,
        mode: DEFAULT_MODE,
        timbreFile: DEFAULT_TIMBRE_FILE
    },
    cursor: {
        current: {
            block: {},      // Entire block of the section
            index: -1,      // Index of the current block of the flow
            stepIndex: -1   // Index of the current step of the block
        },
        total: {
            block: 0,       // Total number of blocks in the flow
            stepIndex: 0    // Total number of steps in the current block
        },

        nextBlockIndex: 0,  // 
    },
    state: {
        midiName: "",
        pictureName: "",
        videoName: ""
    },

    experiment: {
        innerBlockNum: 0,
        totalInnerBlockNum: 0,
    },

};

const getters = {
    midiName: (state) => {
        return state.state.midiName;
    },
    pictureName: (state) => {
        // Fetch the picture name
        const pictureName = state.state.pictureName;

        // Verify that the file name describes a supported file format
        const pictureNameExtension = pictureName.split(".").pop();
        if (!["jpg", "png", "bmp"].includes(pictureNameExtension))
            throw new Error(`
                Incompatible image format for the "${pictureName}" image file.\n
                The "${pictureNameExtension}" file format is not supported.
            `);

        // Return the picture name
        return pictureName;
    },
    videoName: (state) => {
        return state.state.videoName;
    }
}

const actions = {
    setExperiment: ({ commit }, experiment) => {
        commit('setExperiment', experiment);
    },
    initExperiment: ({ commit }) => {
        commit('initExperiment');
    },
    initState: ({ commit }) => {
        commit('initState');
    },
    onNext: ({ commit }) => {
        commit('onNext');
    }
}

const mutations = {
    setExperiment(state, experiment) {
        // Verify the minimal required properties
        if (!experiment.hasOwnProperty("name")) throw new Error("No name was found in the experiment");
        if (!experiment.hasOwnProperty("folder")) throw new Error("No folder was found in the experiment");
        if (!experiment.hasOwnProperty("flow")) throw new Error("No flow was found in the experiment");

        // Set the description (mandatory)
        state.description = {
            name: experiment.name,
            folder: experiment.folder
        };

        // Set the flow (mandatory)
        state.flow = experiment.flow;

        // Set the settings (optionals, default values if not set)
        state.settings = {
            anyPianoKey: experiment.anyPianoKey || DEFAULT_ANY_PIANO_KEY,
            mode: experiment.mode || DEFAULT_MODE,
            timbreFile: experiment.timbreFile || DEFAULT_TIMBRE_FILE
        };

        // Toggle the boolean value indicating that an experiment is mounted
        state.experimentSet = true;
    },
    initExperiment(state) {
        state.cursor.current.index = -1;
        state.cursor.nextBlockIndex = 0;
        state.cursor.current.stepIndex = -1;
    },
    initState(state) {
        // set this.pictureName after initState
        if (state.flow === []) return;

        if (state.cursor.current.stepIndex == -1) {
            // new sets of trials
            state.cursor.current.block = state.flow[state.cursor.nextBlockIndex]; //the first comp for a block of trials
            state.cursor.current.index = state.cursor.nextBlockIndex;
            state.cursor.current.stepIndex = 0;
            state.state.pictureName = state.cursor.current.block.pictureFileName[state.cursor.current.stepIndex];


            // Video
            if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("videoFileName")) {
                if (state.cursor.current.stepIndex >= state.flow[state.cursor.nextBlockIndex].videoFileName.length) {
                    state.state.videoName = state.flow[state.cursor.nextBlockIndex].videoFileName[0];
                } else {
                    state.state.videoName = state.flow[state.cursor.nextBlockIndex].videoFileName[state.cursor.current.stepIndex];
                }
            }



            // to limit number of trials for melody task
            state.cursor.totalInnerBlockNum = 0;
            state.cursor.innerBlockNum = 0;

            let tempTotal = 0
            if (state.cursor.current.block.pictureFileName.length > 0) {
                tempTotal = state.cursor.current.block.pictureFileName.length - 1;
            }

            // if (state.cursor.current.block.videoFileName) {
            //     tempTotal = state.cursor.current.block.videoFileName.length - 1;
            // }

            if (state.cursor.current.block.hasOwnProperty("numBlock")) {
                state.cursor.total.block = state.cursor.current.block.numBlock - 1;
            } else if (state.cursor.current.block.hasOwnProperty("maxNumBlock")) { // to limit number of trials for melody task
                state.cursor.total.block = tempTotal;
                state.cursor.totalInnerBlockNum = state.cursor.current.block.maxNumBlock - 1;
                state.cursor.innerBlockNum = 0;
            } else {
                state.cursor.total.block = tempTotal;
            }
        } else {
            // within same sets of trials
            if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("pictureFileName")) {
                if (state.cursor.current.stepIndex >= state.flow[state.cursor.nextBlockIndex].pictureFileName.length) {
                    state.state.pictureName = state.flow[state.cursor.nextBlockIndex].pictureFileName[0];
                } else {
                    state.state.pictureName = state.flow[state.cursor.nextBlockIndex].pictureFileName[state.cursor.current.stepIndex];
                }
            }
        }
        state.state.pictureName = `${state.description.folder}/${state.state.pictureName}`;
        state.state.videoName = `${state.description.folder}/${state.state.videoName}`;
        // console.log(`${state.flow[state.cursor.nextBlockIndex].type} initedState: current.stepIndex=${state.cursor.current.stepIndex} total.block=${state.experiment.total.block}`);
    },
    onNext(state) {

        if (state.flow === undefined) throw new Error("No flow was found for the experiment");

        if (state.cursor.current.stepIndex == -1) {
            router.push({ name: state.flow[0].type });
        }

        else if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("followedBy")) {
            state.cursor.nextBlockIndex += 1;
            router.push({ name: state.flow[state.cursor.nextBlockIndex].type });
        }

        else {
            if (state.cursor.current.stepIndex === state.cursor.total.block) {
                state.cursor.nextBlockIndex += 1;
                state.cursor.current.stepIndex = -1;
                router.push({ name: state.flow[state.cursor.nextBlockIndex].type });
            } else {
                state.cursor.current.stepIndex += 1;

                if (state.cursor.current.block.type != state.flow[state.cursor.nextBlockIndex].type) {
                    state.cursor.nextBlockIndex = state.cursor.current.index;
                    // state.flow.findIndex((arr) => {return arr.type == state.cursor.current.block.type});
                    router.push({ name: state.cursor.current.block.type });
                } else {
                    const pictureName = state.cursor.current.block.pictureFileName[state.cursor.current.stepIndex];
                    state.state.pictureName = `${state.description.folder}/${pictureName}`;
                }
            }
        }
        // console.log(`${state.flow[state.cursor.nextBlockIndex].type} onNexted: current.stepIndex=${state.cursor.current.stepIndex} total.block=${state.experiment.total.block}`);
    }
}

export const experiment = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};