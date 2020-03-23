import router from '@/router'

export default {
    // appendPet: (state, { species, pet }) => {
    //   state[species].push(pet)
    // }
    setSongNum: (state, key) => {
        state.songNum = key;
    },
    addStarted: (state, key) => {
        state.starteds.push(key);
    },
    deleteStarted: (state, key) => {
        const selectedIndex = state.starteds.indexOf(key);
        if (selectedIndex !== -1) state.starteds.splice(selectedIndex, 1);
        // delete state.started[key]
    },
    setPlayer: (state, key) => {
        state.player = key;
    },
    addSongNotes: (state, key) => {
        state.songNotes.push(key);
    },
    setSongNotes: (state, key) => {
        state.songNotes = key;
    },
    addSongDurations: (state, key) => {
        state.songDurations.push(key);
    },
    setSongDurations: (state, key) => {
        state.songDurations = key;
    },
    addPlayedNotes: (state, key) => {
        state.playedNotes.push(key);
    },
    setPlayedNotes: (state, key) => {
        state.playedNotes = key;
    },
    addPlayedDurations: (state, key) => {
        state.playedDurations.push(key);
    },
    setPlayedDurations: (state, key) => {
        state.playedDurations = key;
    },
    addPlayedOffsets: (state, key) => {
        state.playedOffsets.push(key);
    },
    setPlayedOffsets: (state, key) => {
        state.playedOffsets = key;
    },
    addPlayedVelocities: (state, key) => {
        state.playedVelocities.push(key);
    },
    setPlayedVelocities: (state, key) => {
        state.playedVelocities = key;
    },
    //settings
    initState: (state) => {
        // set this.picName after initState
        if (state.experiment.flow == undefined) return;
        
        if (state.experiment.currentBlockNum == -1) {
            // new sets of trials
            state.experiment.currentFlowState = state.experiment.flow[state.experiment.nextFlowIndex]; //the first comp for a block of trials
            state.experiment.currentBlockIndex = state.experiment.nextFlowIndex;
            state.experiment.currentBlockNum = 0;
            state.experiment.picName = state.experiment.currentFlowState.pictureFileName[state.experiment.currentBlockNum];
            // to limit number of trials for melody task
            state.experiment.totalInnerBlockNum = 0;
            state.experiment.innerBlockNum = 0;

            let tempTotal = 0
            if (state.experiment.currentFlowState.pictureFileName.length > 0) {
                tempTotal = state.experiment.currentFlowState.pictureFileName.length - 1;
            }

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
            if (state.experiment.flow[state.experiment.nextFlowIndex].hasOwnProperty("pictureFileName")) {
                if (state.experiment.currentBlockNum >= state.experiment.flow[state.experiment.nextFlowIndex].pictureFileName.length){
                    state.experiment.picName = state.experiment.flow[state.experiment.nextFlowIndex].pictureFileName[0];
                } else {
                    state.experiment.picName = state.experiment.flow[state.experiment.nextFlowIndex].pictureFileName[state.experiment.currentBlockNum];
                }
            }
        }
        state.experiment.picName = `${state.experiment.folder}/${state.experiment.picName}`;
        // console.log(`${state.experiment.flow[state.experiment.nextFlowIndex].type} initedState: currentBlockNum=${state.experiment.currentBlockNum} totalBlockNum=${state.experiment.totalBlockNum}`);
    },
    onNext: (state) => {
        // set this.picName after onNext
        if (state.experiment.flow == undefined) return;
        
        if (state.experiment.flow[state.experiment.nextFlowIndex].hasOwnProperty("followedBy")) {
            state.experiment.nextFlowIndex += 1;
            router.push({name: state.experiment.flow[state.experiment.nextFlowIndex].type});
        } 
        else {
            if (state.experiment.currentBlockNum === state.experiment.totalBlockNum) {
                state.experiment.nextFlowIndex += 1;
                state.experiment.currentBlockNum = -1;
                router.push({name: state.experiment.flow[state.experiment.nextFlowIndex].type});
            } else {        
                state.experiment.currentBlockNum += 1;
                        
                if (state.experiment.currentFlowState.type != state.experiment.flow[state.experiment.nextFlowIndex].type) {
                    state.experiment.nextFlowIndex = 
                        state.experiment.currentBlockIndex;
                        // state.experiment.flow.findIndex((arr) => {return arr.type == state.experiment.currentFlowState.type});
                    router.push({name: state.experiment.currentFlowState.type});
                } else {
                    state.experiment.picName = state.experiment.currentFlowState.pictureFileName[state.experiment.currentBlockNum];
                    state.experiment.picName = `${state.experiment.folder}/${state.experiment.picName}`;
                }
            }
        }
        // console.log(`${state.experiment.flow[state.experiment.nextFlowIndex].type} onNexted: currentBlockNum=${state.experiment.currentBlockNum} totalBlockNum=${state.experiment.totalBlockNum}`);
    }
}
