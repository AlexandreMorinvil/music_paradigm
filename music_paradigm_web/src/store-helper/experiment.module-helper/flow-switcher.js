import cursorHandler from './cursor-handler';
// import defaultBlock from './default-block';
import defaultState from './default-state';

export default {
	moveToPreludeFlow,
	leavePreludeFlow,
	// moveToTimeoutFlow,
};

function moveToPreludeFlow(state) {
	// Moving the experiment flow, state and curdsor in a temporary memory to run the prelude flow
	state.tempMemory.flow = JSON.parse(JSON.stringify(state.flow));
	state.tempMemory.state = JSON.parse(JSON.stringify(state.state));
	state.tempMemory.cursor = JSON.parse(JSON.stringify(state.cursor));

	// Store information maintained from one flow to another
	const maintainedRecords = JSON.parse(JSON.stringify(state.state.record));

	// Set the prelude flow as the experiment to run
	state.flow = state.flowPrelude;
	state.state = defaultState.DEFAULT_EXPERIMENT_STATE_STATE_VALUES();
	state.cursor = cursorHandler.assignCursor(state.flow);

	// Turn off the "is in prelude flow" flag
	state.cursor.flag.isInPrelude = true;

	// Set the information maintained from one flow to another
	state.state.record = maintainedRecords;

	// Set the status so the state is fully reinitialized for the prelude
	state.isInitialized = defaultState.IS_FULLY_NOT_INITIALIZED_STATUS();
}

function leavePreludeFlow(state) {

	// Store information maintained from one flow to another
	const maintainedRecords = JSON.parse(JSON.stringify(state.state.record));

	// Set the real experiment as the experiment to run
	state.flow = JSON.parse(JSON.stringify(state.tempMemory.flow));
	state.state = JSON.parse(JSON.stringify(state.tempMemory.state));
	state.cursor = JSON.parse(JSON.stringify(state.tempMemory.cursor));

	// Set the information maintained from one flow to another
	state.state.record = maintainedRecords;

	// Turn off the "is in prelude flow" flag
	state.cursor.flag.isInPrelude = false;

	// Delete the prelude flow data (it shouldn't be needed anymore)
	delete state.tempMemory.flow;
	delete state.tempMemory.state;
	delete state.tempMemory.cursor;

	// Set the status so the state is fully reinitialized for the real flow
	state.isInitialized = defaultState.IS_FULLY_NOT_INITIALIZED_STATUS();
}

// function moveToTimeoutFlow() {
// 	const timeoutState = experimentStoreState.timeUpState; // TODO : Adjust that
// 	if (timeoutState) return timeoutState;
// 	else return defaultState.DEFAULT_TIME_UP();
// }
