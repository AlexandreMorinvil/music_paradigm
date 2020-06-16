import router from '@/router'

const state = {
    flow: [], // The sequence of the experiment
    description: {
        name: "",
        folder: "",
        mode: ""
    },

    cursor: {
        currentFlowState: {},  // Entire block of the section
        currentBlockIndex: -1, // Index of the current block of the flow
        currentBlockNum: -1,   // Index of the current inner element of the block

        totalBlockNum: 0,

        nextFlowIndex: 0
    },

    experiment: {

        // Cursor
        currentFlowState: {},  // Entire block of the section
        currentBlockIndex: -1, // Index of the current block of the flow
        currentBlockNum: -1,   // Index of the current inner element of the block

        anyPianoKey: 0,

        nextFlowIndex: 0,

        picName: "",
        videoName: "",

        innerBlockNum: 0,
        totalBlockNum: 0,
        totalInnerBlockNum: 0,
    },
    timbreFile: "" // TODO: Put this pieace of logic in a piano module
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
        state.flow = experiment.flow;
        state.description = {
            name: experiment.name,
            folder: experiment.folder,
            mode: experiment.mode
        };
    },
    initExperiment(state) {
        state.experiment.nextFlowIndex = 0;
        state.experiment.currentBlockNum = -1;
    },
    initState(state) {
        // set this.picName after initState
        if (state.flow === []) return;

        if (state.experiment.currentBlockNum == -1) {
            // new sets of trials
            state.experiment.currentFlowState = state.flow[state.experiment.nextFlowIndex]; //the first comp for a block of trials
            state.experiment.currentBlockIndex = state.experiment.nextFlowIndex;
            state.experiment.currentBlockNum = 0;
            state.experiment.picName = state.experiment.currentFlowState.pictureFileName[state.experiment.currentBlockNum];


            // Video
            if (state.flow[state.experiment.nextFlowIndex].hasOwnProperty("videoFileName")) {
                if (state.experiment.currentBlockNum >= state.flow[state.experiment.nextFlowIndex].videoFileName.length) {
                    state.experiment.videoName = state.flow[state.experiment.nextFlowIndex].videoFileName[0];
                } else {
                    state.experiment.videoName = state.flow[state.experiment.nextFlowIndex].videoFileName[state.experiment.currentBlockNum];
                }
            }



            // to limit number of trials for melody task
            state.experiment.totalInnerBlockNum = 0;
            state.experiment.innerBlockNum = 0;

            let tempTotal = 0
            if (state.experiment.currentFlowState.pictureFileName.length > 0) {
                tempTotal = state.experiment.currentFlowState.pictureFileName.length - 1;
            }

            // if (state.experiment.currentFlowState.videoFileName) {
            //     tempTotal = state.experiment.currentFlowState.videoFileName.length - 1;
            // }

            if (state.experiment.currentFlowState.hasOwnProperty("numBlock")) {
                state.experiment.totalBlockNum = state.experiment.currentFlowState.numBlock - 1;
            } else if (state.experiment.currentFlowState.hasOwnProperty("maxNumBlock")) { // to limit number of trials for melody task
                state.experiment.totalBlockNum = tempTotal;
                state.experiment.totalInnerBlockNum = state.experiment.currentFlowState.maxNumBlock - 1;
                state.experiment.innerBlockNum = 0;
            } else {
                state.experiment.totalBlockNum = tempTotal;
            }
        } else {
            // within same sets of trials
            if (state.flow[state.experiment.nextFlowIndex].hasOwnProperty("pictureFileName")) {
                if (state.experiment.currentBlockNum >= state.flow[state.experiment.nextFlowIndex].pictureFileName.length) {
                    state.experiment.picName = state.flow[state.experiment.nextFlowIndex].pictureFileName[0];
                } else {
                    state.experiment.picName = state.flow[state.experiment.nextFlowIndex].pictureFileName[state.experiment.currentBlockNum];
                }
            }
        }
        state.experiment.picName = `${state.experiment.folder}/${state.experiment.picName}`;
        state.experiment.videoName = `${state.experiment.folder}/${state.experiment.videoName}`;
        // console.log(`${state.flow[state.experiment.nextFlowIndex].type} initedState: currentBlockNum=${state.experiment.currentBlockNum} totalBlockNum=${state.experiment.totalBlockNum}`);
    },
    onNext(state) {
        
        if (state.flow === undefined) throw new Error("No flow was found for the experiment");

        if (state.cursor) {
            state.experiment.nextFlowIndex += 1;
            router.push({ name: state.flow[0].type });
        }
        else if (state.flow[state.experiment.nextFlowIndex].hasOwnProperty("followedBy")) {
            state.experiment.nextFlowIndex += 1;
            router.push({ name: state.flow[state.experiment.nextFlowIndex].type });
        }
        else {
            if (state.experiment.currentBlockNum === state.experiment.totalBlockNum) {
                state.experiment.nextFlowIndex += 1;
                state.experiment.currentBlockNum = -1;
                router.push({ name: state.flow[state.experiment.nextFlowIndex].type });
            } else {
                state.experiment.currentBlockNum += 1;

                if (state.experiment.currentFlowState.type != state.flow[state.experiment.nextFlowIndex].type) {
                    state.experiment.nextFlowIndex =
                        state.experiment.currentBlockIndex;
                    // state.flow.findIndex((arr) => {return arr.type == state.experiment.currentFlowState.type});
                    router.push({ name: state.experiment.currentFlowState.type });
                } else {
                    state.experiment.picName = state.experiment.currentFlowState.pictureFileName[state.experiment.currentBlockNum];
                    state.experiment.picName = `${state.experiment.folder}/${state.experiment.picName}`;
                }
            }
        }
        // console.log(`${state.flow[state.experiment.nextFlowIndex].type} onNexted: currentBlockNum=${state.experiment.currentBlockNum} totalBlockNum=${state.experiment.totalBlockNum}`);
    }
}

export const experiment = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};