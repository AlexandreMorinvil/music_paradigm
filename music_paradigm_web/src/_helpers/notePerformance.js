import noteAlgorithm from "./noteAlgorithm";

const evaluateSpeedType = function (midiFileNotes, playedNotes) {
    const speedW = noteAlgorithm.getSpeedW(
        playedNotes.midi,
        midiFileNotes.midi
    );
    const { durations, speedD } = noteAlgorithm.getSpeedD(
        playedNotes.midi,
        midiFileNotes.midi,
        playedNotes.duration
    );
    const transitionSpeeds = noteAlgorithm.getTransitionSpeeds(
        playedNotes.midi,
        midiFileNotes.midi,
        playedNotes.duration
    );
    // TODO: Put this in a dedicated function
    let meanTransitionSpeeds = [];
    if (transitionSpeeds.length != 0) {
        transitionSpeeds.forEach(element => {
            meanTransitionSpeeds.push(element.reduce((a, b) => a + b, 0));
        });
    }
    const accuracyW = noteAlgorithm.getAccuracyW(
        playedNotes.midi,
        midiFileNotes.midi
    );

    return {
        type: "speed",
        results: {
            speedW: speedW,                           // corrects
            sequenceDurations: durations,             // array of ms // TODO: Take that out for a more accruate duration calculation based on the time of press and release of a key on the keyboard
            speedD: speedD,                           // ms
            accuracyW: accuracyW,                     // incorrects
            transitionSpeeds: transitionSpeeds,       // array of array of ms
            transitionSpeedMean: meanTransitionSpeeds // array of ms
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
            criteria: "Notes",
            isPassing: evaluationResults.speedW >= minSequencePlayed
        }
    ];
    return grades;
}

// TODO: Make the grade function gradeRhythmType
const gradeRhythmType = function (evaluationResults, { minNoteAccuracy, maxRhythmError}) {
    const grades = [
        {
            criteria: "Notes",
            passingMark: evaluationResults.pitchAcc >= minNoteAccuracy
        },
        {
            criteria: "Rhythm",
            isPassing: evaluationResults.rhythmDiff <= maxRhythmError,
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