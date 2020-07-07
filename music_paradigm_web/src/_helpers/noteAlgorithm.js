// search for sub array
var findSubarray = (subarr, arr, from_index) => {
    from_index = from_index || 0;
    let found = [];

    if (arr.length < subarr.length) return [];
    const last_check_index = arr.length - subarr.length;
    const subarr_length = subarr.length;

    position_loop:
    for (let i = from_index; i <= last_check_index; ++i) {
        for (let j = 0; j < subarr_length; ++j) {
            if (arr[i + j] !== subarr[j]) {
                continue position_loop;
            } else if (j === subarr_length - 1) {
                found.push(i);
                i = i + j - 1; // Starts at the last index (the for loop will increment thus cancel the -1)
                continue position_loop;
            }
        }
    }

    return found; // return list of indices
};

// search for sub array
var findSubarraySegment = (subarr, arr, from_index) => {
    from_index = from_index || 0;

    let maxLength = 0;
    let startIndex = 0;
    let endIndex = 0;

    position_loop:
    for (let i = from_index; i <= arr.length - maxLength; i++) {
        for (let j = 0; j < subarr.length; j++) {
            if (arr[i + j] !== subarr[j]) {
                continue position_loop;
            } else if (j + 1 > maxLength) {
                maxLength = j + 1
                startIndex = i;
                endIndex = i + j;
            }
        }
    }

    return { startIndex: startIndex, endIndex: endIndex, length: maxLength };
};

// make sure arrays are defined and of same length
var arraysValid = (arr1, arr2) => {
    if (arr1 == undefined || arr2 == undefined) {
        // console.error('undefined array');
        return false;
    }
    if (arr1.length === 0 || arr2.length === 0) {
        // console.error('different-length or empty array');
        return false;
    }
    return true;
};

const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

// TODO: Put the research specific algorithms in a dedicated "algorithm.js"
// TODO: Then, the simplier functions (Mean, standard deviations, etc) in here, maybe

// TODO: Give more clear names to the parameters, maybe
export default {

    // speed mode (task 1) performance measures
    // Walker: number of correctly typed sequence per block
    // Old name : getSpeedW
    getCorrectSequenceCount: (refNoteArr, noteArr) => {
        const idxArr = findSubarray(refNoteArr, noteArr);
        return idxArr.length;
    },

    // Duke: mean sequence duration measured from the onset of the first note to the onset of the final tone in each sequence. 
    // Old name : getSpeedD
    getSequenceDurations: (refNoteArr, noteArr, timeArr) => {
        const idxArr = findSubarray(refNoteArr, noteArr);
        if (idxArr.length < 1) {
            return { durations: [], speedD: 0 };
        }
        const noteLength = refNoteArr.length - 1;
        let duration = 0;
        let durations = [];
        idxArr.forEach(idx => {
            const temp = timeArr[idx + noteLength] - timeArr[idx];
            duration += temp;
            durations.push(temp);
        });
        return { durations: durations, durationsAverage: duration / idxArr.length };
    },

    // within-sequence measure assessed the time intervals between successive key presses within the sequence
    // for correct sequences only
    getTransitionSpeeds: (refNoteArr, noteArr, timeArr) => {
        const idxArr = findSubarray(refNoteArr, noteArr);
        const sequenceCount = idxArr.length;
        if (sequenceCount <= 0) return { transitionSpeeds: [], transitionSpeedsAverage: [] };

        let transitionSpeeds = [];
        const noteLength = refNoteArr.length - 1;
        for (let i = 0; i < noteLength; i++) {
            let subDurations = [];
            idxArr.forEach(idx => {
                subDurations.push(timeArr[idx + i + 1] - timeArr[idx + i]);
            });
            transitionSpeeds.push(subDurations);
        }

        // Computing the average
        let transitionSpeedsAverage = [];
        if (transitionSpeeds.length != 0) {
            transitionSpeeds.forEach(element => {
                transitionSpeedsAverage.push(element.reduce((a, b) => a + b, 0) / sequenceCount);
            });
        }

        // return [[a],[b],[c],[d]]
        return { transitionSpeeds: transitionSpeeds, transitionSpeedsAverage: transitionSpeedsAverage };
    },

    // the number of errors made relative to the number of correctly typed sequences per 30-sec trial
    // incorrectly typed sequence. Count the number of icorrect note sequences >= sequenceLength notes
    // Old name : getAccuracyW
    // FIXME: This concept could be improved maybe
    getSequenceErrorCount: (refNoteArr, noteArr, sequenceLength) => {
        const idxArr = findSubarray(refNoteArr, noteArr);
        if (idxArr.length < 1) {
            return -1; // exceptional case    
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
    },

    // melody mode (task 2) performance measures
    // Brown and Penhune: percentage of pitches performed in the correct order
    // Old name : getAccuracyB_2
    getPitchAccuracy: (refNoteArr, noteArr) => {
        if (!arraysValid(noteArr, refNoteArr)) return -1;
        const { length } = findSubarraySegment(refNoteArr, noteArr);
        return length / noteArr.length * 100;
    },

    // (Duke: mean) number of pitch errors per sequence
    // Old name : getAccuracyD_2
    getPitchErrorCount: (refNoteArr, noteArr) => {
        if (!arraysValid(noteArr, refNoteArr)) {
            return -1; // exceptional case
        }
        const arrLength = noteArr.length;
        const { startIndex, length } = findSubarraySegment(refNoteArr, noteArr);
        let arrDiff = noteArr.length - length;
        return arrDiff + startIndex;
    },

    // (percentage of IOI durations performed in the correct order)
    // averaeg IOI duration difference over their reference IOI duration
    // (diff_a/a + diff_b/b+.......) / 2 - rhythm + tempo
    // Old name : getRhythmTempo
    // Average relative duration error
    getRhythmTempoRelativeError: (refDurArr, durArr) => {
        let arrDiff = 0;
        for (let i = 0; i < durArr.length; i++) {
            arrDiff += Math.abs(durArr[i] - refDurArr[i]) / refDurArr[i];
        }

        return arrDiff / durArr.length * 100;
    },

    // FIXME: This is a function that Weiwei never finished implementing
    // get rhythm, excluding tempo (not working yet)
    getRhythm: (refDurArr, durArr) => {
        let arrRatio = 0;
        let refArrRatio = 0;
        for (let i = 1; i < durArr.length; i++) {
            arrRatio += durArr[i] / durArr[0];
            refArrRatio += refDurArr[i] / refDurArr[0];
        }
        // console.log(`arrRatio:${arrRatio}, refArrRatio:${refArrRatio}`);
        return Math.abs(arrRatio - refArrRatio) / (durArr.length - 1);
    },

    // get array of missedNotes
    getMissedNotes: (refNoteArr, noteArr) => {
        let missedNotes = [];

        const { length } = findSubarraySegment(refNoteArr, noteArr);

        if (length < refNoteArr.length) {
            missedNotes = refNoteArr.slice(length, refNoteArr.length);
        }
        return { missedNotes: missedNotes, missedNotesCount: missedNotes.length };
    },

    // Old name : getIOIs
    // InterOnsetInterval : The interonset interval, or IOI, is the interval between onsets of stimuli
    getInterOnsetIntervals: (refNoteArr, refTimeArr, noteArr,  timeArr) => {
        const { startIndex, endIndex } = findSubarraySegment(refNoteArr, noteArr);
        let IOIs = [];
        if (timeArr.length > 0) {
            for (let i = startIndex; i < endIndex; i++) {
                IOIs.push(timeArr[i + 1] - timeArr[i]);
            }
        }
        const meanIOI = average(IOIs);
        const sdIOI = standardDeviation(IOIs);
        const cvIOI = sdIOI / meanIOI;

        return {
            InterOnsetInterval : IOIs, 
            InterOnsetIntervalAVG : meanIOI, 
            InterOnsetIntervalSD : sdIOI, 
            InterOnsetIntervalCV : cvIOI
        }; // return [a,b,c,d]
    },

    // Duration of the corresponding sequence of notes played (ms)
    getSequenceDuration: (refNoteArr, noteArr, timeArr, durationArr) => {
        const { startIndex, endIndex } = findSubarraySegment(refNoteArr, noteArr);
        return (timeArr[endIndex] + durationArr[endIndex]) - timeArr[startIndex];
    }
}
