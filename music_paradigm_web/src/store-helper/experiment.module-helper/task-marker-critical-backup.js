
export default {
	performCriticalAdjustment,
	updateCriticalBackup,
};


function performCriticalAdjustment(state) {

    // Retrieve needed variables
    const { cursor, criticalBackup } = state;
    const { cursor: criticalCursor, state: criticalState } = criticalBackup ?? {};

    // Verify if the critical checkpoints must be used
    const useCriticalCheckpoints = state.settings.useCriticalCheckpoints;
    if (!useCriticalCheckpoints)
        return;

    // Verify if the current cursor is in the main flow
    if (cursor.flag.isInPrelude || cursor.flag.isInConclusion || state.state.record.isInTimeUp)
        return;

    // Verify is the index of the current cursor is behind the index.
    // If it is, we force the session to return to the critical position in the task.
    const currentIndex = cursor.current.index;
    const criticalIndex = criticalCursor?.current?.index;
    if (criticalIndex && currentIndex < criticalIndex) {
        state.state = JSON.parse(JSON.stringify(criticalState));
        state.cursor = JSON.parse(JSON.stringify(criticalCursor));
    }
}

function updateCriticalBackup(state) {

    // Retrieve needed variables
    const { cursor, state: currentState, criticalBackup } = state;
    const { cursor: criticalCursor } = criticalBackup  ?? {};

    // If the index of the cursor is ahead or eaqual to the critical cursor, we update the critical
    // backup
    const currentIndex = cursor.current.index;
    const criticalIndex = criticalCursor?.current?.index;
    if (!criticalIndex || currentIndex >= criticalIndex) {
        state.criticalBackup = { state: currentState, cursor: cursor };
    }

}