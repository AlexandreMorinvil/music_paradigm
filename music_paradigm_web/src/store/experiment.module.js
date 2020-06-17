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
        currentBlock: {},       // Entire block of the section
        currentBlockIndex: -1,  // Index of the current block of the flow
        nextBlockIndex: 0,      // 

        currentBlockInnerStepNumber: -1,    // Index of the current inner element of the block

        totalBlockNum: 0
    },
    state: {
        picName: "",
        videoName: ""
    },

    experiment: {
        innerBlockNum: 0,
        totalBlockNum: 0,
        totalInnerBlockNum: 0,
    },
    
};

const getters = {
    getStarteds: (state) => {
        return state.starteds;
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
    },
}

const mutations = {
    setExperiment(state, experiment) {
        // Verification of the minimal required properties
        if (!experiment.hasOwnProperty("name")) throw new Error("No name was found in the experiment");
        if (!experiment.hasOwnProperty("folder")) throw new Error("No folder was found in the experiment");
        if (!experiment.hasOwnProperty("flow")) throw new Error("No flow was found in the experiment");

        // Setting the description (mandatory)
        state.description = {
            name: experiment.name,
            folder: experiment.folder
        };

        // Setting the flow (mandatory)
        state.flow = experiment.flow;

        // Setting the settings (optionals, default values if not set)
        state.settings = {
            anyPianoKey: experiment.anyPianoKey || DEFAULT_ANY_PIANO_KEY,
            mode: experiment.mode || DEFAULT_MODE,
            timbreFile: experiment.timbreFile || DEFAULT_TIMBRE_FILE 
        };

        // Toggling the boolean value indicating that an experiment is mounted
        state.experimentSet = true;
    },
    initExperiment(state) {
        state.cursor.currentBlockIndex = -1;
        state.cursor.nextBlockIndex = 0;
        state.cursor.currentBlockInnerStepNumber = -1;
    },
    initState(state) {
        // set this.picName after initState
        if (state.flow === []) return;

        if (state.cursor.currentBlockInnerStepNumber == -1) {
            // new sets of trials
            state.cursor.currentBlock = state.flow[state.cursor.nextBlockIndex]; //the first comp for a block of trials
            state.cursor.currentBlockIndex = state.cursor.nextBlockIndex;
            state.cursor.currentBlockInnerStepNumber = 0;
            state.experiment.picName = state.cursor.currentBlock.pictureFileName[state.cursor.currentBlockInnerStepNumber];


            // Video
            if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("videoFileName")) {
                if (state.cursor.currentBlockInnerStepNumber >= state.flow[state.cursor.nextBlockIndex].videoFileName.length) {
                    state.experiment.videoName = state.flow[state.cursor.nextBlockIndex].videoFileName[0];
                } else {
                    state.experiment.videoName = state.flow[state.cursor.nextBlockIndex].videoFileName[state.cursor.currentBlockInnerStepNumber];
                }
            }



            // to limit number of trials for melody task
            state.experiment.totalInnerBlockNum = 0;
            state.experiment.innerBlockNum = 0;

            let tempTotal = 0
            if (state.cursor.currentBlock.pictureFileName.length > 0) {
                tempTotal = state.cursor.currentBlock.pictureFileName.length - 1;
            }

            // if (state.cursor.currentBlock.videoFileName) {
            //     tempTotal = state.cursor.currentBlock.videoFileName.length - 1;
            // }

            if (state.cursor.currentBlock.hasOwnProperty("numBlock")) {
                state.experiment.totalBlockNum = state.cursor.currentBlock.numBlock - 1;
            } else if (state.cursor.currentBlock.hasOwnProperty("maxNumBlock")) { // to limit number of trials for melody task
                state.experiment.totalBlockNum = tempTotal;
                state.experiment.totalInnerBlockNum = state.cursor.currentBlock.maxNumBlock - 1;
                state.experiment.innerBlockNum = 0;
            } else {
                state.experiment.totalBlockNum = tempTotal;
            }
        } else {
            // within same sets of trials
            if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("pictureFileName")) {
                if (state.cursor.currentBlockInnerStepNumber >= state.flow[state.cursor.nextBlockIndex].pictureFileName.length) {
                    state.experiment.picName = state.flow[state.cursor.nextBlockIndex].pictureFileName[0];
                } else {
                    state.experiment.picName = state.flow[state.cursor.nextBlockIndex].pictureFileName[state.cursor.currentBlockInnerStepNumber];
                }
            }
        }
        state.experiment.picName = `${state.description.folder}/${state.experiment.picName}`;
        state.experiment.videoName = `${state.description.folder}/${state.experiment.videoName}`;
        // console.log(`${state.flow[state.cursor.nextBlockIndex].type} initedState: currentBlockInnerStepNumber=${state.cursor.currentBlockInnerStepNumber} totalBlockNum=${state.experiment.totalBlockNum}`);
    },
    onNext(state) {

        if (state.flow === undefined) throw new Error("No flow was found for the experiment");

        if (state.cursor.currentBlockInnerStepNumber == -1) {
            router.push({ name: state.flow[0].type });
        }

        else if (state.flow[state.cursor.nextBlockIndex].hasOwnProperty("followedBy")) {
            state.cursor.nextBlockIndex += 1;
            router.push({ name: state.flow[state.cursor.nextBlockIndex].type });
        }

        else {
            if (state.cursor.currentBlockInnerStepNumber === state.experiment.totalBlockNum) {
                state.cursor.nextBlockIndex += 1;
                state.cursor.currentBlockInnerStepNumber = -1;
                router.push({ name: state.flow[state.cursor.nextBlockIndex].type });
            } else {
                state.cursor.currentBlockInnerStepNumber += 1;

                if (state.cursor.currentBlock.type != state.flow[state.cursor.nextBlockIndex].type) {
                    state.cursor.nextBlockIndex =
                        state.cursor.currentBlockIndex;
                    // state.flow.findIndex((arr) => {return arr.type == state.cursor.currentBlock.type});
                    router.push({ name: state.cursor.currentBlock.type });
                } else {
                    state.experiment.picName = state.cursor.currentBlock.pictureFileName[state.cursor.currentBlockInnerStepNumber];
                    state.experiment.picName = `${state.experiment.folder}/${state.experiment.picName}`;
                }
            }
        }
        // console.log(`${state.flow[state.cursor.nextBlockIndex].type} onNexted: currentBlockInnerStepNumber=${state.cursor.currentBlockInnerStepNumber} totalBlockNum=${state.experiment.totalBlockNum}`);
    }
}

export const experiment = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};