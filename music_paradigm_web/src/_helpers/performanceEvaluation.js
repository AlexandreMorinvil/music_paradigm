// search for sub array
var findSubarray = (arr, subarr, from_index) => {
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
                i = i + j; // starts from the last index
                continue position_loop;
            }
        }
    }
    // console.log(`found ${found}`);
    return found; // return list of indices
};

// make sure arrays are defined and of same length
var compareArray = (arr1, arr2) => {
    if (arr1 == undefined || arr2 == undefined) {
        // console.error('undefined array');
        return false;            
    }
    if (arr1.length === 0 || arr1.length !== arr2.length) {
        // console.error('different-length or empty array');
        return false;            
    }
    return true;
};

// get duration array from time array
var getDurationArray = (timeArr, refTimeArr) => {
    let durArr = [];
    let refDurArr = [];
    if (compareArray(timeArr, refTimeArr)) {        
        const arrLength = timeArr.length;

        for (let i = 1; i < arrLength; i++) {
            durArr.push(timeArr[i] - timeArr[i-1]);
            refDurArr.push(refTimeArr[i] - refTimeArr[i-1]);
        }
    }

    // console.log(`getDurationArray: play: ${durArr}, ref: ${refDurArr}`);
    return {durArr, refDurArr};
};

// TODO: Put the research specific algorithms in a dedicated "algorithm.js"
// TODO: Then, the simplier functions (Mean, standard deviations, etc) in here, maybe

// TODO: Give more clear names to the parameters, maybe
export default {
    // speed mode (task 1) performance measures
    // Walker: number of correctly typed sequence per block
    getSpeedW: (noteArr, refNoteArr) => {
        const idxArr = findSubarray(noteArr, refNoteArr);
        // console.log(`getSpeedW ${idxArr.length}`);
        return idxArr.length;
    },
    // Duke: mean sequence duration measured from the onset of the first note to the onset of the final tone in each sequence. 
    getSpeedD: (noteArr, refNoteArr, timeArr) => {
        const idxArr = findSubarray(noteArr, refNoteArr);
        if (idxArr.length < 1) {
            return {durations: [], speedD: 0};   
        }
        const noteLength = refNoteArr.length - 1;
        let duration = 0;
        let durations = [];
        idxArr.forEach(idx => {
            const temp = timeArr[idx+noteLength] - timeArr[idx]; 
            duration += temp;
            durations.push(temp);
        });
        // console.log(`getSpeedD ${durations} ${duration}`);
        return {durations: durations, speedD: duration/idxArr.length};
    },
    // the number of errors made relative to the number of correctly typed sequences per 30-sec trial
    // incorrectly typed sequence/basically all sequences that are not equal to 25342
    // for any length of signals? currently >=5-notes considered as a sequence
    getAccuracyW: (noteArr, refNoteArr) => {
        const idxArr = findSubarray(noteArr, refNoteArr);
        if (idxArr.length < 1) {
            return -1; // exceptional case    
        }
        const noteLength = refNoteArr.length;
        let incorrect = 0;
        let tempIncorrect = 0;
        if (idxArr[0] !== 0) {
            tempIncorrect = idxArr[0] / noteLength;
            incorrect += tempIncorrect >= 1? Math.floor(tempIncorrect-1): Math.floor(tempIncorrect);
            // console.log(`at 0 tempIncorrect=${tempIncorrect} incorrect=${incorrect}`);
        }
        for(let idx = 1; idx < idxArr.length; idx++) {
            tempIncorrect = (idxArr[idx] - idxArr[idx-1]) / noteLength;
            incorrect += tempIncorrect >= 1? Math.floor(tempIncorrect-1): Math.floor(tempIncorrect);
            // console.log(`at ${idx} tempIncorrect=${tempIncorrect} incorrect=${incorrect}`);
        }
        tempIncorrect = (noteArr.length - idxArr[idxArr.length - 1]) / noteLength;
        incorrect += tempIncorrect >= 1? Math.floor(tempIncorrect-1): Math.floor(tempIncorrect);
        // console.log(`at last tempIncorrect=${tempIncorrect} incorrect=${incorrect}`);

        // console.log(`getAccuracyW ${incorrect}`);
        return incorrect;
    },
    // mean number of errors per sequence
    // for 5-notes sequence only? if not, compare front part only?
    getAccuracyD: () => {
        return 0;
    },
    // within-sequence measure assessed the time intervals between successive key presses within the sequence
    // for correct sequences only
    getTransitionSpeeds: (noteArr, refNoteArr, timeArr) => {
        const idxArr = findSubarray(noteArr, refNoteArr);
        let durations = [];
        if (idxArr.length > 0) {
            const noteLength = refNoteArr.length - 1;
            for (let i = 0; i < noteLength; i++) {
                let subDurations = [];
                idxArr.forEach(idx => {
                    subDurations.push(timeArr[idx+i+1] - timeArr[idx+i]);
                });
                durations.push(subDurations);
            }
        }
        // console.log(`getTransitionSpeeds ${durations}`);
        return durations; // return [[a],[b],[c],[d]]
    },

    // melody mode (task 2) performance measures
    // Brown and Penhune: percentage of pitches performed in the correct order
    getAccuracyB_2: (noteArr, refNoteArr) => {
        if (!compareArray(noteArr, refNoteArr)) {
            return -1; // exceptional case
        }
        let arrSame = 0;
        let arrLength = noteArr.length;
        for (let i = 0; i < arrLength; i++) {
            if (noteArr[i] == refNoteArr[i]) {
                arrSame++;
            }
        }
        return arrSame / arrLength * 100;
    },
    // (Duke: mean) number of pitch errors per sequence
    getAccuracyD_2: (noteArr, refNoteArr) => {
        if (!compareArray(noteArr, refNoteArr)) {
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
        const {durArr, refDurArr} = getDurationArray(timeArray, refTimeArray);

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
        const {durArr, refDurArr} = getDurationArray(timeArray, refTimeArray);

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
            const noteLength = refTimeArr.length - 1;
            for (let i = 0; i < noteLength; i++) {
                durations.push(timeArr[i+1] - timeArr[i]);
            }
        }
        // console.log(`getIOIs ${durations}`);
        return durations; // return [a,b,c,d]
    },
}
