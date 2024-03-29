import noteAlgorithm from './performance-algorithms';

export default {
	evaluateSpeedType,
	gradeSpeedType,
};

function evaluateSpeedType(referenceKeys, pressedKeys) {
	const sequenceCount = noteAlgorithm.getCorrectSequenceCount(referenceKeys, pressedKeys.keys);
	const { durations, durationsAverage } = noteAlgorithm.getSequenceDurations(referenceKeys, pressedKeys.keys, pressedKeys.time);
	const { transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(referenceKeys, pressedKeys.keys, pressedKeys.time);
	const sequenceErrorCount = noteAlgorithm.getSequenceErrorCount(referenceKeys, pressedKeys.keys);

	return {
		type: 'speed-keyboard',
		results: {
			sequenceCount: sequenceCount,
			sequenceDurations: durations,
			sequenceDurationsAVG: durationsAverage,
			transitionSpeeds: transitionSpeeds,
			transitionSpeedAVG: transitionSpeedsAverage,
			sequenceErrorCount: sequenceErrorCount,
		},
	};
}

function gradeSpeedType(evaluationResults, { minSequencePlayed }) {
	const grades = [
		{
			gradeCode: 'keyboardSequenceCount_',
			criteria: 'Sequence Played',
			mark: evaluationResults.sequenceCount,
			passMark: 1,
			topMark: Math.ceil((minSequencePlayed + 5) / 10) * 10,
		},
	];
	return grades;
}
