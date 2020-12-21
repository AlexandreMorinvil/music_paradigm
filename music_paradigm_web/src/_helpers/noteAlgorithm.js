export default {
	getCorrectSequenceCount,
	getSequenceDurations,
	getTransitionSpeeds,
	getSequenceErrorCount,
	getPitchAccuracy,
	getPitchErrorCount,
	getDurationsRelativeError,
	getRhythm,
	getMissedNotes,
	getInterOnsetIntervals,
	getInterOnsetIntervalsRelativeError,
	getSequenceDuration,
};

// TODO: This file is a mess...

// search for sub array
function findSubarray(subarr, arr, fromIndex = 0) {
	const found = [];

	if (arr.length < subarr.length) return [];
	const lastCheckIndex = arr.length - subarr.length;
	const subArrayLength = subarr.length;

	positionLoop: for (let i = fromIndex; i <= lastCheckIndex; ++i) {
		for (let j = 0; j < subArrayLength; ++j) {
			if (arr[i + j] !== subarr[j]) {
				continue positionLoop;
			} else if (j === subArrayLength - 1) {
				found.push(i);
				i = i + j - 1; // Starts at the last index (the for loop will increment thus cancel the -1)
				continue positionLoop;
			}
		}
	}

	return found; // Return list of indices
}

// Search for sub array
function findSubarraySegment(subarr, arr, fromIndex = 0) {
	let maxLength = 0;
	let startIndex = 0;
	let endIndex = 0;

	positionLoop: for (let i = fromIndex; i <= arr.length - maxLength; i++) {
		for (let j = 0; j < subarr.length; j++) {
			if (arr[i + j] !== subarr[j]) {
				continue positionLoop;
			} else if (j + 1 > maxLength) {
				maxLength = j + 1;
				startIndex = i;
				endIndex = i + j;
			}
		}
	}

	return { startIndex: startIndex, endIndex: endIndex, length: maxLength };
}

// Make sure arrays are defined and of same length
function arraysValid(arr1, arr2) {
	if (arr1 == undefined || arr2 == undefined) {
		// Console.error('undefined array');
		return false;
	}
	if (arr1.length === 0 || arr2.length === 0) {
		// Console.error('different-length or empty array');
		return false;
	}
	return true;
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
// incorrectly typed sequence. Count the number of icorrect note sequences >= sequenceLength notes
// Old name : getAccuracyW
// FIXME: This concept could be improved maybe
function getSequenceErrorCount(refNoteArr, noteArr, sequenceLength) {
	const idxArr = findSubarray(refNoteArr, noteArr);
	if (idxArr.length < 1) {
		return -1; // Exceptional case
	}

	sequenceLength = sequenceLength || refNoteArr.length;
	const noteLength = Math.min(sequenceLength, refNoteArr.length);
	let incorrect = 0;
	let tempIncorrect = 0;
	if (idxArr[0] !== 0) {
		tempIncorrect = idxArr[0] / noteLength;
		incorrect += tempIncorrect >= 1 ? Math.floor(tempIncorrect - 1) : Math.floor(tempIncorrect);
	}
	for (let idx = 1; idx < idxArr.length; idx++) {
		tempIncorrect = (idxArr[idx] - idxArr[idx - 1]) / noteLength;
		incorrect += tempIncorrect >= 1 ? Math.floor(tempIncorrect - 1) : Math.floor(tempIncorrect);
	}
	tempIncorrect = (noteArr.length - idxArr[idxArr.length - 1]) / noteLength;
	incorrect += tempIncorrect >= 1 ? Math.floor(tempIncorrect - 1) : Math.floor(tempIncorrect);

	return incorrect;
}

// Melody mode (task 2) performance measures
// Brown and Penhune: percentage of pitches performed in the correct order
// Old name : getAccuracyB_2
function getPitchAccuracy(refNoteArr, noteArr) {
	if (!arraysValid(noteArr, refNoteArr)) return -1;
	const { length } = findSubarraySegment(refNoteArr, noteArr);
	return (length / refNoteArr.length) * 100;
}

// (Duke: mean) number of pitch errors per sequence
// Old name : getAccuracyD_2
function getPitchErrorCount(refNoteArr, noteArr) {
	if (!arraysValid(noteArr, refNoteArr)) return -1;

	const { startIndex, length } = findSubarraySegment(refNoteArr, noteArr);
	const arrDiff = noteArr.length - length;
	return arrDiff + startIndex;
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

// FIXME: This is a function that Weiwei never finished implementing
// get rhythm, excluding tempo (not working yet)
function getRhythm(refDurArr, durArr) {
	if (!arraysValid(durArr, refDurArr)) return -1;

	let arrRatio = 0;
	let refArrRatio = 0;
	for (let i = 1; i < durArr.length; i++) {
		arrRatio += durArr[i] / durArr[0];
		refArrRatio += refDurArr[i] / refDurArr[0];
	}
	// Console.log(`arrRatio:${arrRatio}, refArrRatio:${refArrRatio}`);
	return Math.abs(arrRatio - refArrRatio) / (durArr.length - 1);
}

// Get array of missedNotes
function getMissedNotes(refNoteArr, noteArr) {
	if (!arraysValid(noteArr, refNoteArr)) return -1;
	let missedNotes = [];

	const { length } = findSubarraySegment(refNoteArr, noteArr);

	if (length < refNoteArr.length) {
		missedNotes = refNoteArr.slice(length, refNoteArr.length);
	}
	return { missedNotes: missedNotes, missedNotesCount: missedNotes.length };
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

function getInterOnsetIntervalsRelativeError(refTimeArr, timeArr) {
	if (!arraysValid(timeArr, refTimeArr)) return -1;
	const referenceIoi = getInterOnsetIntervals(refTimeArr);
	const experimentalIoi = getInterOnsetIntervals(timeArr);

	let arrDiff = 0;
	for (let i = 0; i < referenceIoi.length; i++) {
		arrDiff += Math.abs(experimentalIoi[i] - referenceIoi[i]) / referenceIoi[i];
	}

	return (arrDiff / experimentalIoi.length) * 100;
}

// Duration of the corresponding sequence of notes played (ms)
function getSequenceDuration(timeArr, durationArr) {
	const noteCount = timeArr.length;
	return timeArr[0] + durationArr[noteCount - 1] - timeArr[noteCount - 1];
}
