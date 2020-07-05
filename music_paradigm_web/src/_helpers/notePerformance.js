import noteAlgorithm from "./noteAlgorithm";

const evaluateSpeedType = function (midiFileNotes, playedNotes) {
    const sequenceCount = noteAlgorithm.getCorrectSequenceCount(
        midiFileNotes.midi,
        playedNotes.midi
    );
    
    const { durations, durationsAverage } = noteAlgorithm.getSequenceDurations(
        midiFileNotes.midi,
        playedNotes.midi,
        playedNotes.duration
    );

    const { transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(
        midiFileNotes.midi,
        playedNotes.midi,
        playedNotes.duration
    );

    const sequenceErrorCount = noteAlgorithm.getSequenceErrorCount(
        midiFileNotes.midi,
        playedNotes.midi,
        5
    );

    return {
        type: "speed",
        results: {
            sequenceCount: sequenceCount,                   // Walker: Number of correctly typed sequence per block
            sequenceDurations: durations,                   // Duke: Sequence duration measured from the onset of the first note to the onset of the final tone in each sequence. (Array of ms)
            sequenceDurationsAverage: durationsAverage,     // Average of the sequence durations (in ms)
            transitionSpeeds: transitionSpeeds,             // Array of array of ms
            transitionSpeedMean: transitionSpeedsAverage,   // Array of ms
            sequenceErrorCount: sequenceErrorCount,         // Number of icorrect note sequences >= 5 notes
        }
    }
}

const evaluateRhythmType = function (midiFileNotes, playedNotes) {
    // TODO : Put those methods in the noteAlgorithm file or otherwise use a built in Javascript function for computing the Mean and standard deviation of an Array
    const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
    const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

    const pitchAcc = noteAlgorithm.getAccuracyB_2(
        playedNotes.midi,
        midiFileNotes.midi
    );
    const rhythmDiff = noteAlgorithm.getRhythmTempo(
        playedNotes.duration,
        midiFileNotes.duration
    );

    // TODO: See if there is a way to solve this function which Weiwei couldn't implement
    // const rhythmDiff = noteAlgorithm.getRhythm(playedNotes.duration, midiFileNotes.duration);

    const pitchErrorNum = noteAlgorithm.getAccuracyD_2(
        playedNotes.midi,
        midiFileNotes.midi
    );

    // TODO: Missed notes and Missed notes length could be returned by the same function
    const missedNotes = noteAlgorithm.getMissedNotes(
        playedNotes.midi,
        midiFileNotes.midi
    );
    const missedNoteNum = missedNotes.length;
    const IOIs = noteAlgorithm.getIOIs(
        playedNotes.duration,
        midiFileNotes.duration
    );
    // TODO: When I will have modified the way the durations are calculated, this will need to be modified
    const sequenceDuration = missedNoteNum
        ? 0
        : playedNotes.duration[playedNotes.duration.length - 1] -
        playedNotes.duration[0];

    // TODO: Give more explicit names to those elements
    const meanIOI = average(IOIs);
    const sdIOI = standardDeviation(IOIs);
    const cvIOI = sdIOI / meanIOI;

    return {
        type: "rhythm",
        results: {
            pitchErrorNum: pitchErrorNum,           // errors
            missedNotes: missedNotes,               // array of number
            missedNoteNum: missedNoteNum,           // notes
            IOIs: IOIs,                             // array of ms
            IOImean: meanIOI,                       // ms
            IOIsd: sdIOI,
            IOIcv: cvIOI,
            sequenceDuration: sequenceDuration,     // ms
            above50sFlag: sequenceDuration > 50000,
            pitchAcc: pitchAcc,                     // %
            rhythmDiff: rhythmDiff                  // proportion
        }
    };
}

// TODO: Make the grade function gradeSpeedType
const gradeSpeedType = function (evaluationResults, { minSequencePlayed }) {
    const grades = [
        {
            criteria: "Sequence Played",
            isPassing: evaluationResults.sequenceCount >= minSequencePlayed,
            mark: evaluationResults.sequenceCount,
            passMark: 1,
            topMark: Math.ceil((minSequencePlayed + 5)/10)*10
        }
    ];
    return grades;
}

// TODO: Make the grade function gradeRhythmType
const gradeRhythmType = function (evaluationResults, { minNoteAccuracy, maxRhythmError}) {
    const grades = [
        {
            criteria: "Notes",
            isPassing: evaluationResults.pitchAcc >= minNoteAccuracy,
            mark: evaluationResults.pitchAcc,
            passMark: minNoteAccuracy,
            topMark: 100
        },
        {
            criteria: "Rhythm",
            isPassing: evaluationResults.rhythmDiff <= maxRhythmError,
            mark: evaluationResults.rhythmDiff,
            passMark: 100 * (1 - maxRhythmError),
            topMark: 100
        }
    ];
    return grades;
}

export default {
    evaluateSpeedType,
    evaluateRhythmType,
    gradeSpeedType,
    gradeRhythmType
}