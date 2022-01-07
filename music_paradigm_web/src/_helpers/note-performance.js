import noteAlgorithm from './performance-algorithms';

export default {
	evaluateSpeedType,
	evaluateRhythmType,
	evaluateMelodyType,
	gradeSpeedType,
	gradeRhythmType,
	gradeMelodyType,
};

function evaluateSpeedType(midiFileNotes, playedNotes) {
	const sequenceCount = noteAlgorithm.getCorrectSequenceCount(midiFileNotes.midi, playedNotes.midi);

	const { durations, durationsAverage } = noteAlgorithm.getSequenceDurations(midiFileNotes.midi, playedNotes.midi, playedNotes.time);

	const { transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(midiFileNotes.midi, playedNotes.midi, playedNotes.time);

	const sequenceErrorCount = noteAlgorithm.getSequenceErrorCount(midiFileNotes.midi, playedNotes.midi);

	return {
		type: 'speed',
		results: {
			sequenceCount: sequenceCount, // Walker: Number of correctly typed sequence per block
			sequenceDurations: durations, // Duke: Sequence duration measured from the onset of the first note to the onset of the final tone in each sequence. (Array of ms)
			sequenceDurationsAVG: durationsAverage, // Average of the sequence durations (in ms)
			transitionSpeeds: transitionSpeeds, // Intervals between successive key presses within the sequence (Array of array of ms)
			transitionSpeedAVG: transitionSpeedsAverage, // Average of the intervals between successive key presses within the sequence (Array of ms)
			sequenceErrorCount: sequenceErrorCount, // Number of icorrect note sequences >= 5 notes
		},
	};
}

function evaluateRhythmType(midiFileNotes, playedNotes, errorMargin = 0, relativeErrorMargin = 0) {
	const { pitchAccuracy, levenshteinDistance } = noteAlgorithm.getPitchAccuracy(midiFileNotes.midi, playedNotes.midi);

	const durationsRelativeError = noteAlgorithm.getDurationsRelativeError(midiFileNotes.duration, playedNotes.duration);

	const interOnsetInterval = noteAlgorithm.getInterOnsetIntervals(playedNotes.time);

	const interOnsetIntervalsRelativeError = noteAlgorithm.getInterOnsetIntervalsRelativeError(
		midiFileNotes.time,
		playedNotes.time,
		errorMargin,
		relativeErrorMargin,
	);
	const relativeInterOnsetIntervalsRelativeError = noteAlgorithm.getRelativeInterOnsetIntervalsRelativeError(
		midiFileNotes.time,
		playedNotes.time,
		relativeErrorMargin,
	);

	const sequenceDuration = noteAlgorithm.getSequenceDuration(playedNotes.time, playedNotes.duration);

	return {
		type: 'rhythm',
		results: {
			pitchAccuracy: pitchAccuracy, // Brown and Penhune: percentage of pitches performed in the correct order (%)
			durationsRelativeError: durationsRelativeError, // Average relative duration error (%)
			levenshteinDistance: levenshteinDistance, // Gives an indication on the number of missed notes (Number)
			interOnsetInterval: interOnsetInterval, // Interval between onsets of stimuli (Array of ms)
			interOnsetIntervalsRelativeError: interOnsetIntervalsRelativeError, // Relative error of the inter-onset intervals
			relativeInterOnsetIntervalsRelativeError: relativeInterOnsetIntervalsRelativeError, // Relative error of the relative inter-onset intervals
			sequenceDuration: sequenceDuration, // Duration of the corresponding sequence of notes played (ms)
			errorMarginInMilliseconds: errorMargin, // Uncertainty applied on the inter onset interval's error
			relativeErrorMarginInFloat: relativeErrorMargin, // Relative uncertainty applied on the inter onset ineterval's error
		},
	};
}

function evaluateMelodyType(midiFileNotes, playedNotes) {
	const { pitchAccuracy, levenshteinDistance } = noteAlgorithm.getPitchAccuracy(midiFileNotes.midi, playedNotes.midi);

	const durationsRelativeError = noteAlgorithm.getDurationsRelativeError(midiFileNotes.duration, playedNotes.duration);

	const interOnsetInterval = noteAlgorithm.getInterOnsetIntervals(playedNotes.time);

	const interOnsetIntervalsRelativeError = noteAlgorithm.getInterOnsetIntervalsRelativeError(midiFileNotes.time, playedNotes.time);

	const sequenceDuration = noteAlgorithm.getSequenceDuration(playedNotes.time, playedNotes.duration);

	return {
		type: 'melody',
		results: {
			pitchAccuracy: pitchAccuracy, // Brown and Penhune: percentage of pitches performed in the correct order (%)
			levenshteinDistance: levenshteinDistance, // Gives an indication on the number of missed notes (Number)
			durationsRelativeError: durationsRelativeError, // Average relative duration error (%)
			interOnsetInterval: interOnsetInterval, // Interval between onsets of stimuli (Array of ms)
			interOnsetIntervalsRelativeError: interOnsetIntervalsRelativeError, // Relative
			sequenceDuration: sequenceDuration, // Duration of the corresponding sequence of notes played (ms)
		},
	};
}

// The "type" field was added to be a consistent marker accros different languages in the log (since a version in Sweedish of the platform was also developped)

function gradeSpeedType(evaluationResults, { minSequencePlayed }) {
	const ADDITIONAL_SEQUENCES = 5;
	const grades = [
		{
			type: 'sequence',
			criteria: 'Sequences Played',
			mark: evaluationResults.sequenceCount,
			passMark: 1,
			topMark: Math.ceil((minSequencePlayed + ADDITIONAL_SEQUENCES) / 10) * 10,
		},
	];
	return grades;
}

function gradeRhythmType(evaluationResults,
	{ minNoteAccuracy, maxRhythmError },
	{ relativeRhythmImportance, rhythmErrorMarginInMilliseconds, rhythmRelativeErrorMarginInFloat }) {
	// Give weighted importance to IOI error and relative IOI error
	const rythmRelativeErrorMeasure =
		relativeRhythmImportance * evaluationResults.relativeInterOnsetIntervalsRelativeError +
		Number(1 - relativeRhythmImportance) * evaluationResults.interOnsetIntervalsRelativeError;

	// Compute the grades
	const grades = [
		{
			type: 'melody',
			criteria: 'Melody Accuracy',
			mark: Math.max(evaluationResults.pitchAccuracy, 0),
			passMark: Math.min(Math.max(minNoteAccuracy, 0), 100),
			topMark: 100,
		},
		{
			type: 'inter-onset',
			criteria: 'Rhythm Accuracy',
			mark: rythmRelativeErrorMeasure >= 0 ? Math.max(100 - rythmRelativeErrorMeasure, 0) : 0,
			passMark: Math.min(Math.max(100 - maxRhythmError, 0), 100),
			topMark: 100,
			relativeRhythmImportance: relativeRhythmImportance,
			rhythmErrorMarginInMilliseconds: rhythmErrorMarginInMilliseconds,
			rhythmRelativeErrorMarginInFloat: rhythmRelativeErrorMarginInFloat,
		},
	];
	return grades;
}

function gradeMelodyType(evaluationResults, { minNoteAccuracy }) {
	const grades = [
		{
			type: 'melody',
			criteria: 'Melody Accuracy',
			mark: Math.max(evaluationResults.pitchAccuracy, 0),
			passMark: Math.min(Math.max(minNoteAccuracy, 0), 100),
			topMark: 100,
		},
	];
	return grades;
}
