import noteAlgorithm from "./noteAlgorithm";

const evaluateSpeedType = function (midiFileNotes, playedNotes) {
    const sequenceCount = noteAlgorithm.getCorrectSequenceCount(
        midiFileNotes.midi,
        playedNotes.midi
    );

    const { durations, durationsAverage } = noteAlgorithm.getSequenceDurations(
        midiFileNotes.midi,
        playedNotes.midi,
        playedNotes.time
    );

    const { transitionSpeeds, transitionSpeedsAverage } = noteAlgorithm.getTransitionSpeeds(
        midiFileNotes.midi,
        playedNotes.midi,
        playedNotes.time
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
            sequenceDurationsAVG: durationsAverage,         // Average of the sequence durations (in ms)
            transitionSpeeds: transitionSpeeds,             // Intervals between successive key presses within the sequence (Array of array of ms)
            transitionSpeedAVG: transitionSpeedsAverage,    // Average of the intervals between successive key presses within the sequence (Array of ms)
            sequenceErrorCount: sequenceErrorCount,         // Number of icorrect note sequences >= 5 notes
        }
    }
}

const evaluateRhythmType = function (midiFileNotes, playedNotes) {

    const pitchAccuracy = noteAlgorithm.getPitchAccuracy(
        midiFileNotes.midi,
        playedNotes.midi
    );

    const rhythmTempoRelativeError = noteAlgorithm.getRhythmTempoRelativeError(
        midiFileNotes.duration,
        playedNotes.duration
    );

    const pitchErrorCount = noteAlgorithm.getPitchErrorCount(
        midiFileNotes.midi,
        playedNotes.midi
    );

    const { missedNotes, missedNotesCount } = noteAlgorithm.getMissedNotes(
        midiFileNotes.midi,
        playedNotes.midi
    );

    const {InterOnsetInterval, InterOnsetIntervalAVG, InterOnsetIntervalSD, InterOnsetIntervalCV } 
    = noteAlgorithm.getInterOnsetIntervals(
        midiFileNotes.midi,
        midiFileNotes.time,
        playedNotes.midi,
        playedNotes.time
    );

    // TODO: When I will have modified the way the durations are calculated, this will need to be modified
    const sequenceDuration = noteAlgorithm.getSequenceDuration(
        midiFileNotes.midi,
        playedNotes.midi,
        playedNotes.time,
        playedNotes.duration
    );

    return {
        type: "rhythm",
        results: {
            pitchAccuracy: pitchAccuracy,                       // Brown and Penhune: percentage of pitches performed in the correct order (%)
            rhythmTempoRelativeError: rhythmTempoRelativeError, // Average relative duration error (%)
            pitchErrorCount: pitchErrorCount,                   // Number of pitch errors per sequence (Number)
            missedNotes: missedNotes,                           // List of the missed notes (Array of midi number)
            missedNotesCount: missedNotesCount,                 // Number of missed notes (Number)
            InterOnsetInterval: InterOnsetInterval,             // Interval between onsets of stimuli (Array of ms)
            InterOnsetIntervalAVG: InterOnsetIntervalAVG,       // Average of the inter-onset interval (ms)
            InterOnsetIntervalSD: InterOnsetIntervalSD,         // Standard deviation of the inter-onset interval (ms)
            InterOnsetIntervalCV: InterOnsetIntervalCV,         // Coefficient of variation of the inter-onset interval
            sequenceDuration: sequenceDuration,                 // Duration of the corresponding sequence of notes played (ms)
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
            isPassing: evaluationResults.pitchAccuracy >= minNoteAccuracy,
            mark: evaluationResults.pitchAccuracy,
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