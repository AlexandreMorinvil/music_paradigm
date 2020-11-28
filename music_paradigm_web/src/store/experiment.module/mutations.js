import { routerNavigation } from '@/_helpers'
import constants from './constants'
import cursorHandler from './flowHelper/cursorHandler'
import experimentHandler from './flowHelper/experiment-handler'
import stateHandler from './flowHelper/stateHandler'

export default {
    clearState(state) {
        Object.assign(state, constants.DEFAULT_EXPERIMENT_STATE_VALUES());
    },

    setExperiment(state, experiment) {
        // Verify the minimal required properties
        if (!experiment.hasOwnProperty("name")) throw new Error("No name was found in the experiment");
        if (!experiment.hasOwnProperty("folder")) throw new Error("No folder was found in the experiment");
        if (!experiment.hasOwnProperty("flow")) throw new Error("No flow was found in the experiment");

        experimentHandler.setExperimentId(state, experiment);
        experimentHandler.setExperimentDescription(state, experiment);
        experimentHandler.setExperimentFlow(state, experiment);
        experimentHandler.setExperimentGeneralSettings(state, experiment);
        
        state.hasExperiment = true;
    },

    initCursor(state, presetCursor = null) {
        // If a cursor is provided, the experiment is resumed with the state of the cursor.
        // If no cursor is provided, the default values of the cursor is the start ofthe experiment.
        state.cursor = cursorHandler.assignCursor(state.flow, presetCursor);

        // Set the initialization indicators to false
        state.isInitialized = constants.IS_FULLY_NOT_INITIALIZED_STATUS();
    },

    initExperiment: () => {
        routerNavigation.moveToExperimentPrelude();
    },

    updateState: (state) => {
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    moveNextStep: (state) => {
        cursorHandler.advance(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkip: (state) => {
        cursorHandler.skip(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    movePostSkipRepetions: (state) => {
        cursorHandler.moveCursorPostSkipRepetions(state.state, state.flow, state.cursor, state.isInitialized);
        stateHandler.updateState(state.state, state.flow, state.cursor, state.isInitialized, state.settings);
    },

    endExperimentByTimeout: (state) => {
        const message = "The time limit was reached.\nThe experiment ends here.";
        stateHandler.forceEndState(state.state, state.isInitialized, message);
    },

    leaveExperiment: () => {
        routerNavigation.goToRootPage();
    },

    addSuccess: (state) => {
        state.state.record.sucesses += 1;
        state.state.record.successesInLoop += 1;
    }
}