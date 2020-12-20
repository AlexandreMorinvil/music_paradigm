import noteAlgorithm from'./noteAlgorithm';

const evaluateSpeedType = function(midiFileNotes, playedNotes) {
	const sequenceCount = noteAlgorithm.getCorrectSequenceCount(
		midiFileNotes.midi,
		playedNotes.midi
	);

	const{ durations, durationsAverage } = noteAlgorithm.getSequenceDurations(
		midiFileNotes.midi,
		playedNotes.midi,
		playedNotes.time
	);

	const{ transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(
		midiFileNotes.midi,
		playedNotes.midi,
		playedNotes.time
	);

	const sequenceErrorCount = noteAlgorithm.getSequenceErrorCount(
		midiFileNotes.midi,
		playedNotes.midi,
		5
	);

	return{
		'type': 'speed',
		'results': {
			'sequenceCount': sequenceCount, // Walker: Number of correctly typed sequence per block
			'sequenceDurations': durations, // Duke: Sequence duration measured from the onset of the first note to the onset of the final tone in each sequence. (Array of ms)
			'sequenceDurationsAVG': durationsAverage, // Average of the sequence durations (in ms)
			'transitionSpeeds': transitionSpeeds, // Intervals between successive key presses within the sequence (Array of array of ms)
			'transitionSpeedAVG': transitionSpeedsAverage, // Average of the intervals between successive key presses within the sequence (Array of ms)
			'sequenceErrorCount': sequenceErrorCount // Number of icorrect note sequences >= 5 notes
		}
	};
};

const evaluateRhythmType = function(midiFileNotes, playedNotes) {
	const pitchAccuracy = noteAlgorithm.getPitchAccuracy(
		midiFileNotes.midi,
		playedNotes.midi
	);

	const durationsRelativeError = noteAlgorithm.getDurationsRelativeError(
		midiFileNotes.duration,
		playedNotes.duration
	);

	const pitchErrorCount = noteAlgorithm.getPitchErrorCount(
		midiFileNotes.midi,
		playedNotes.midi
	);

	const{ missedNotes, missedNotesCount } = noteAlgorithm.getMissedNotes(
		midiFileNotes.midi,
		playedNotes.midi
	);

	const interOnsetInterval = noteAlgorithm.getInterOnsetIntervals(
		playedNotes.time
	);

	const interOnsetIntervalsRelativeError = noteAlgorithm.getInterOnsetIntervalsRelativeError(
		midiFileNotes.time,
		playedNotes.time
	);

	const sequenceDuration = noteAlgorithm.getSequenceDuration(
		playedNotes.time,
		playedNotes.duration
	);

	return{
		'type': 'rhythm',
		'results': {
			'pitchAccuracy': pitchAccuracy, // Brown and Penhune: percentage of pitches performed in the correct order (%)
			'durationsRelativeError': durationsRelativeError, // Average relative duration error (%)
			'pitchErrorCount': pitchErrorCount, // Number of pitch errors per sequence (Number)
			'missedNotes': missedNotes, // List of the missed notes (Array of midi number)
			'missedNotesCount': missedNotesCount, // Number of missed notes (Number)
			'interOnsetInterval': interOnsetInterval, // Interval between onsets of stimuli (Array of ms)
			'interOnsetIntervalsRelativeError': interOnsetIntervalsRelativeError, // Relative
			'sequenceDuration': sequenceDuration // Duration of the corresponding sequence of notes played (ms)
		}
	};
};

const evaluateMelodyType = function(midiFileNotes, playedNotes) {
	const pitchAccuracy = noteAlgorithm.getPitchAccuracy(
		midiFileNotes.midi,
		playedNotes.midi
	);

	const durationsRelativeError = noteAlgorithm.getDurationsRelativeError(
		midiFileNotes.duration,
		playedNotes.duration
	);

	const interOnsetInterval = noteAlgorithm.getInterOnsetIntervals(
		playedNotes.time
	);

	const interOnsetIntervalsRelativeError = noteAlgorithm.getInterOnsetIntervalsRelativeError(
		midiFileNotes.time,
		playedNotes.time
	);

	const sequenceDuration = noteAlgorithm.getSequenceDuration(
		playedNotes.time,
		playedNotes.duration
	);

	return{
		'type': 'melody',
		'results': {
			'pitchAccuracy': pitchAccuracy, // Brown and Penhune: percentage of pitches performed in the correct order (%)
			'durationsRelativeError': durationsRelativeError, // Average relative duration error (%)
			'interOnsetInterval': interOnsetInterval, // Interval between onsets of stimuli (Array of ms)
			'interOnsetIntervalsRelativeError': interOnsetIntervalsRelativeError, // Relative
			'sequenceDuration': sequenceDuration // Duration of the corresponding sequence of notes played (ms)
		}
	};
};


const gradeSpeedType = function(evaluationResults, { minSequencePlayed }) {
	const grades = [
		{
			'criteria': 'Sequence Played',
			'mark': evaluationResults.sequenceCount,
			'passMark': 1,
			'topMark': Math.ceil((minSequencePlayed + 5) / 10) * 10
		}
	];
	return grades;
};

const gradeRhythmType = function(evaluationResults, { minNoteAccuracy, maxRhythmError }) {
	const grades = [
		{
			'criteria': 'Melody Accuracy',
			'mark': Math.max(evaluationResults.pitchAccuracy, 0),
			'passMark': Math.min(Math.max(minNoteAccuracy, 0), 100),
			'topMark': 100
		},
		{
			'criteria': 'Rhythm Accuracy',
			'mark': (evaluationResults.interOnsetIntervalsRelativeError >= 0)
				? Math.max(100 - evaluationResults.interOnsetIntervalsRelativeError, 0) : 0,
			'passMark': Math.min(Math.max(100 - maxRhythmError, 0), 100),
			'topMark': 100
		}
	];
	return grades;
};

const gradeMelodyType = function(evaluationResults, { minNoteAccuracy }) {
	const grades = [
		{
			'criteria': 'Melody Accuracy',
			'mark': Math.max(evaluationResults.pitchAccuracy, 0),
			'passMark': Math.min(Math.max(minNoteAccuracy, 0), 100),
			'topMark': 100
		}
	];
	return grades;
};

export default{
	evaluateSpeedType,
	evaluateRhythmType,
	evaluateMelodyType,
	gradeSpeedType,
	gradeRhythmType,
	gradeMelodyType
};
