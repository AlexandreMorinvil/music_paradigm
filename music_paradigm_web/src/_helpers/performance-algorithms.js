export default {
	getCorrectSequenceCount,
	getSequenceDurations,
	getTransitionSpeeds,
	getSequenceErrorCount,
	getPitchAccuracy,
	getDurationsRelativeError,
	getInterOnsetIntervals,
	getInterOnsetIntervalsRelativeError,
	getRelativeInterOnsetIntervalsRelativeError,
	getSequenceDuration,
};

// TODO: This file is a mess...

// search for sub array
function findSubarray(subarr, arr, fromIndex = 0) {
	const found = [];

	if (arr.length < subarr.length) return [];
	const lastCheckIndex = arr.length - subarr.length;
	const subArrayLength = subarr.length;

	for (let i = fromIndex; i <= lastCheckIndex; ++i) {
		for (let j = 0; j < subArrayLength; ++j) {
			if (arr[i + j] !== subarr[j]) {
				break;
			} else if (j === subArrayLength - 1) {
				found.push(i);
				i += j;
				break;
			}
		}
	}
	return found; // Return list of indices
}

function computeLevenshteinDistance(reference, played) {
	if (reference.length === 0) return played.length;
	if (played.length === 0) return reference.length;

	const matrix = [];

	// increment along the first column of each row
	let i = 0;
	for (i = 0; i <= played.length; i++) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	let j = 0;
	for (j = 0; j <= reference.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= played.length; i++) {
		for (j = 1; j <= reference.length; j++) {
			if (played[i - 1] == reference[j - 1]) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1, // deletion
					),
				);
			}
		}
	}
	return matrix[played.length][reference.length];
}

// Make sure arrays are defined
function arraysValid(arr1, arr2) {
	if (!arr1 || !arr2) return false;
	else if (arr1.length === 0 || arr2.length === 0) return false;
	else return true;
}

// Const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
// const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

// speed mode (task 1) perfaaormance measures
// Walker: number of correctly typed sequence per block
// Old name : getSpeedW
function getCorrectSequenceCount(refNoteArr, noteArr) {
	const idxArr = findSubarray(refNoteArr, noteArr);
	return idxArr.length;
}

// Duke: mean sequence duration measured from the onset of the first note to the onset of the final tone in each sequence.
// Old name : getSpeedD
function getSequenceDurations(refNoteArr, noteArr, timeArr) {
	const idxArr = findSubarray(refNoteArr, noteArr);
	if (idxArr.length < 1) {
		return { durations: [], speedD: 0 };
	}
	const noteLength = refNoteArr.length - 1;
	let duration = 0;
	const durations = [];
	idxArr.forEach((idx) => {
		const temp = timeArr[idx + noteLength] - timeArr[idx];
		duration += temp;
		durations.push(temp);
	});
	return { durations: durations, durationsAverage: duration / idxArr.length };
}

// Within-sequence measure assessed the time intervals between successive key presses within the sequence
// for correct sequences only
function getTransitionSpeeds(refNoteArr, noteArr, timeArr) {
	const idxArr = findSubarray(refNoteArr, noteArr);
	const sequenceCount = idxArr.length;
	if (sequenceCount <= 0) return { transitionSpeeds: [], transitionSpeedsAverage: [] };

	const transitionSpeeds = [];
	const noteLength = refNoteArr.length - 1;
	for (let i = 0; i < noteLength; i++) {
		const subDurations = [];
		idxArr.forEach((idx) => {
			subDurations.push(timeArr[idx + i + 1] - timeArr[idx + i]);
		});
		transitionSpeeds.push(subDurations);
	}

	// Computing the average
	const transitionSpeedsAverage = [];
	if (transitionSpeeds.length != 0) {
		transitionSpeeds.forEach((element) => {
			transitionSpeedsAverage.push(element.reduce((a, b) => a + b, 0) / sequenceCount);
		});
	}

	// Return [[a],[b],[c],[d]]
	return {
		transitionSpeeds: transitionSpeeds,
		transitionSpeedsAverage: transitionSpeedsAverage,
	};
}

// The number of errors made relative to the number of correctly typed sequences per 30-sec trial
function getSequenceErrorCount(referenceNotes, playedNotes) {
	const perfectSequence = [];
	const referenceNotesCount = referenceNotes.length;
	const playedNotesCount = playedNotes.length;
	for (let i = 0; i < playedNotesCount; i++) perfectSequence.push(referenceNotes[i % referenceNotesCount]);
	const levenshteinDistance = computeLevenshteinDistance(perfectSequence, playedNotes);

	return levenshteinDistance;
}

// Use the Levenshtein distance to get the percentage of the melody that was properly performed
function getPitchAccuracy(reference, played) {
	const levenshteinDistance = computeLevenshteinDistance(reference, played);
	const percentage = ((reference.length - levenshteinDistance) / reference.length) * 100;
	const pitchAccuracy = Math.max(0, percentage);

	return {
		pitchAccuracy: pitchAccuracy,
		levenshteinDistance: levenshteinDistance,
	};
}

// (percentage of IOI durations performed in the correct order)
// averaeg IOI duration difference over their reference IOI duration
// (diff_a/a + diff_b/b+.......) / 2 - rhythm + tempo
// Old name : getRhythmTempo
// Average relative duration error
function getDurationsRelativeError(refDurArr, durArr) {
	if (!arraysValid(durArr, refDurArr)) return -1;

	let arrDiff = 0;
	for (let i = 0; i < refDurArr.length; i++) {
		arrDiff += Math.abs(durArr[i] - refDurArr[i]) / refDurArr[i];
	}

	return (arrDiff / refDurArr.length) * 100;
}

// Old name : getIOIs
// InterOnsetInterval : The interonset interval, or IOI, is the interval between onsets of stimuli
function getInterOnsetIntervals(timeArr) {
	const IOIs = [];
	if (timeArr.length > 0) {
		for (let i = 1; i < timeArr.length; i++) {
			IOIs.push(timeArr[i] - timeArr[i - 1]);
		}
	}
	return IOIs; // Return [a,b,c,d]
}

function getInterOnsetIntervalsRelativeError(refTimeArr, timeArr, errorMargin = 0, relativeErrorMargin = 0) {
	if (!arraysValid(timeArr, refTimeArr)) return -1;
	const referenceIoi = getInterOnsetIntervals(refTimeArr);
	const experimentalIoi = getInterOnsetIntervals(timeArr);

	const useRelativeError = relativeErrorMargin > 0;

	let arrDiff = 0;
	const notesToConsiderCount = Math.min(referenceIoi.length, experimentalIoi.length);
	for (let i = 0; i < notesToConsiderCount; i++) {
		const differenceOutsideErrorMargin = useRelativeError
			? getDifferenceAdjustedWithRelativeError(refTimeArr[i], timeArr[i], relativeErrorMargin)
			: getDifferenceAdjustedWithAbsoluteError(refTimeArr[i], timeArr[i], errorMargin);
		arrDiff += differenceOutsideErrorMargin / referenceIoi[i];
	}

	return (arrDiff / notesToConsiderCount) * 100;
}

function getRelativeInterOnsetIntervalsRelativeError(refTimeArr, timeArr, relativeErrorMargin = 0) {
	if (!arraysValid(timeArr, refTimeArr)) return -1;
	const referenceIoi = getInterOnsetIntervals(refTimeArr);
	const experimentalIoi = getInterOnsetIntervals(timeArr);

	const referenceAvergageIOI = referenceIoi.reduce((a, b) => a + b, 0) / referenceIoi.length;
	const experimentalAvergageIOI = experimentalIoi.reduce((a, b) => a + b, 0) / experimentalIoi.length;

	let arrDiff = 0;
	const notesToConsiderCount = Math.min(referenceIoi.length, experimentalIoi.length);
	for (let i = 0; i < referenceIoi.length; i++) {
		const referenceRelativeIoi = referenceIoi[i] / referenceAvergageIOI;
		const experimentalRelativeIoi = experimentalIoi[i] / experimentalAvergageIOI;

		const differenceOutsideErrorMargin = getDifferenceAdjustedWithRelativeError(referenceRelativeIoi, experimentalRelativeIoi, relativeErrorMargin);
		arrDiff += differenceOutsideErrorMargin / referenceRelativeIoi;
	}

	return (arrDiff / notesToConsiderCount) * 100;
}

// Duration of the corresponding sequence of notes played (ms)
function getSequenceDuration(timeArr, durationArr) {
	const noteCount = timeArr.length;
	return timeArr[0] + durationArr[noteCount - 1] - timeArr[noteCount - 1];
}

function getDifferenceAdjustedWithAbsoluteError(target, value, errorMargin = 0) {
	const difference = Math.abs(value - target);
	const differenceAdjustedwithErrorMargin = Math.max(0, difference - errorMargin);
	return differenceAdjustedwithErrorMargin;
}

function getDifferenceAdjustedWithRelativeError(target, value, relativeErrorMargin = 0) {
	const difference = Math.abs(value - target);
	const absoluteErrorMargin = Math.abs(relativeErrorMargin * target);
	const differenceOutsideErrorMargin = Math.max(0, difference - absoluteErrorMargin);
	return differenceOutsideErrorMargin;
}
