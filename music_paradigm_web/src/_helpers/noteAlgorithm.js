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

// get duration array from time array
var getDurationArray = (timeArr, refTimeArr) => {
    let durArr = [];
    let refDurArr = [];
    if (arraysValid(timeArr, refTimeArr)) {
        const arrLength = timeArr.length;

        for (let i = 1; i < arrLength; i++) {
            durArr.push(timeArr[i] - timeArr[i - 1]);
            refDurArr.push(refTimeArr[i] - refTimeArr[i - 1]);
        }
    }

    // console.log(`getDurationArray: play: ${durArr}, ref: ${refDurArr}`);
    return { durArr, refDurArr };
};

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
    getPitchAccuracy: (noteArr, refNoteArr) => {
        if (!arraysValid(noteArr, refNoteArr)) return -1;
        const { length } = findSubarraySegment(refNoteArr, noteArr);
        return length / noteArr.length * 100;
    },
    // (Duke: mean) number of pitch errors per sequence
    getAccuracyD_2: (noteArr, refNoteArr) => {
        if (!arraysValid(noteArr, refNoteArr)) {
            return -1; // exceptional case
        }
        const arrLength = noteArr.length;
        let arrDiff = 0;
        for (let i = 0; i < arrLength; i++) {
            if (noteArr[i] !== refNoteArr[i]) {
                arrDiff++;
            }
        }
        return arrDiff;
    },
    // (percentage of IOI durations performed in the correct order)
    // averaeg IOI duration difference over their reference IOI duration
    // (diff_a/a + diff_b/b+.......) / 2 - rhythm + tempo
    getRhythmTempo: (timeArray, refTimeArray) => {
        const { durArr, refDurArr } = getDurationArray(timeArray, refTimeArray);

        let arrDiff = 0;
        for (let i = 0; i < durArr.length; i++) {
            arrDiff += Math.abs(durArr[i] - refDurArr[i]) / refDurArr[i];
        }
        // Count missing notes 
        //arrDiff += refDurArr.length - durArr.length;

        return arrDiff / durArr.length;
    },
    // get rhythm, excluding tempo (not working yet)
    getRhythm: (timeArray, refTimeArray) => {
        const { durArr, refDurArr } = getDurationArray(timeArray, refTimeArray);

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
    getMissedNotes: (noteArr, refNoteArr) => {
        let missedNotes = [];
        if (noteArr == undefined || noteArr == []) {
            missedNotes = refNoteArr;
        }
        if (noteArr.length < refNoteArr.length) {
            missedNotes = refNoteArr.slice(noteArr.length, refNoteArr.length);
        }
        return missedNotes;
    },
    getIOIs: (timeArr, refTimeArr) => {
        let durations = [];
        if (timeArr.length > 0) {
            const noteLength = refTimeArr.length - 1; // TODO: When the duration will have been fixed, we will be able to get the actual value for all notes (without needing to do a -1 to substract the last note)
            for (let i = 0; i < noteLength; i++) {
                durations.push(timeArr[i + 1] - timeArr[i]);
            }
        }
        // console.log(`getIOIs ${durations}`);
        return durations; // return [a,b,c,d]
    },
}
