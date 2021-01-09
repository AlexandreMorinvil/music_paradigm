import noteAlgorithm from './noteAlgorithm';

export default {
	evaluateSpeedType,
	gradeSpeedType,
};

function evaluateSpeedType(referenceKeys, pressedKeys) {
	const sequenceCount = noteAlgorithm.getCorrectSequenceCount(referenceKeys.keys, pressedKeys.keys);
	const { durations, durationsAverage } = noteAlgorithm.getSequenceDurations(referenceKeys.keys, pressedKeys.keys, pressedKeys.time);
	const { transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(referenceKeys.keys, pressedKeys.keys, pressedKeys.time);
	const sequenceErrorCount = noteAlgorithm.getSequenceErrorCount(referenceKeys.keys, pressedKeys.keys, 5);

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
			criteria: 'Sequence Played',
			mark: evaluationResults.sequenceCount,
			passMark: 1,
			topMark: Math.ceil((minSequencePlayed + 5) / 10) * 10,
		},
	];
	return grades;
}
