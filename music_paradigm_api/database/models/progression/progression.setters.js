const _pick = require('lodash/pick');

const ProgressionSessionIdentifier = require('modules/progressions/class/progression-session-identifier.class');

module.exports = {
    setParameters,
    setSessionAdjustements,
};

function setParameters(progression, parameters = {}) {
    progression.assignedParameters = { ...parameters };
    return progression;
}

function setSessionAdjustements(progression, sessionIdentifier, sessionsAjustments) {
    
    ensureProgressionHasSessionEntry(progression, sessionIdentifier);
    const session = progression.experiments.find((session) => {
        return ProgressionSessionIdentifier.isCorresponding(session, sessionIdentifier);
    }) ?? null;
    if (!session) return;

    Object.assign(
        session,
        _pick(sessionsAjustments, [
            'adjustmentDelayInDays',
            'adjustmentConsiderCompleted',
            'adjustmentAdditionalCompletionsRequired',
            'adjustmentPreponeAvailability',
            'adjustmentOverlookUniqueInDays',
            'adjustmentImposeReadyToBeDone',
            'adjustmentBlockAvailability',
            'adjustmentRemoveCompletionLimit',
        ]));
}

function ensureProgressionHasSessionEntry(progression, sessionIdentifier) {
    const hasSessionEntry = !!progression.experiments.find((session) => {
        return ProgressionSessionIdentifier.isCorresponding(session, sessionIdentifier);
    })
    if (!hasSessionEntry) progression.experiments.push({ ...sessionIdentifier })

    return progression;
}
