import { Midi } from '@tonejs/midi'
import performanceEvaluation from "@/_helpers/performanceEvaluation.js";

export default {
    setPlayer: (state, key) => {
        state.player = key;
    },
    addStarted: (state, key) => {
        state.starteds.push(key);
    },
    deleteStarted: (state, key) => {
        const selectedIndex = state.starteds.indexOf(key);
        if (selectedIndex !== -1) state.starteds.splice(selectedIndex, 1);
        // delete state.started[key]
    },

    // Mutations on the data from the notes played
    addPlayedNotes: (state, key) => {
        state.played.notes.midi.push(key);
    },
    addPlayedDurations: (state, key) => {
        state.played.notes.duration.push(key);
    },
    addPlayedOffsets: (state, key) => {
        state.played.notes.time.push(key);
    },
    addPlayedVelocities: (state, key) => {
        state.played.notes.velocity.push(key);
    },
    resetPlayedNotesLogs: (state) => {
        // Resetting the notes
        state.played.notes.midi = [];
        state.played.notes.duration = [];
        state.played.notes.time = [];
        state.played.notes.velocity = [];
        
        // Resetting the evaluation
        state.played.evaluation.type = "";
        state.played.evaluation.results = null;
    },

    // Mutations on the midi files data
    setMidiFileName: (state, midiFileName) => {
        state.midiFile.name = midiFileName;
    },
    loadMidiArrayStream: (state, midiFile) => {
        state.player.loadArrayBuffer(midiFile);
    },
    parseMidiNotes: (state, midiFile) => {
        const jsonMidi = new Midi(midiFile);
        const notes = jsonMidi.tracks[0].notes;
        for (let i in notes) {
            state.midiFile.notes.midi.push(notes[i].midi);
            state.midiFile.notes.time.push(notes[i].time);
            state.midiFile.notes.ticks.push(notes[i].ticks);
            state.midiFile.notes.name.push(notes[i].name);
            state.midiFile.notes.pitch.push(notes[i].pitch);
            state.midiFile.notes.octave.push(notes[i].octave);
            state.midiFile.notes.velocity.push(notes[i].velocity);
            state.midiFile.notes.duration.push(notes[i].duration);
        }
    },
    eraseMidiNotes: (state) => {
        state.midiFile.notes.midi = [];
        state.midiFile.notes.time = [];
        state.midiFile.notes.ticks = [];
        state.midiFile.notes.name = [];
        state.midiFile.notes.pitch = [];
        state.midiFile.notes.octave = [];
        state.midiFile.notes.velocity = [];
        state.midiFile.notes.duration = [];
    },
    playMidiFile: (state) => {
        state.player.play();
    },

    // Mutations for performance evaluation
    // TODO: Ensure those functions work properly
    evaluateSpeedType: (state, { midiFileNotes, playedNotes }) => {
        const speedW = performanceEvaluation.getSpeedW(
            playedNotes.midi,
            midiFileNotes.midi
        );
        const { durations, speedD } = performanceEvaluation.getSpeedD(
            playedNotes.midi,
            midiFileNotes.midi,
            midiFileNotes.duration
        );
        const transitionSpeeds = performanceEvaluation.getTransitionSpeeds(
            playedNotes.midi,
            midiFileNotes.midi,
            midiFileNotes.duration
        );
        // TODO: Put this in a dedicated function
        let meanTransitionSpeeds = [];
        if (transitionSpeeds.length != 0) {
            transitionSpeeds.forEach(element => {
                meanTransitionSpeeds.push(element.reduce((a, b) => a + b, 0));
            });
        }
        const accuracyW = performanceEvaluation.getAccuracyW(
            playedNotes.midi,
            midiFileNotes.midi
        );

        state.played.evaluation = {
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
        console.log(state.played);
    },
    evaluateRhythmType: (state, { midiFileNotes, playedNotes }) => {
        // TODO : Put those methods in the performanceEvaluation file or otherwise use a built in Javascript function for computing the Mean and standard deviation of an Array
        const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
        const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

        const pitchAcc = performanceEvaluation.getAccuracyB_2(
            playedNotes.midi,
            midiFileNotes.midi
        );
        const rhythmDiff = performanceEvaluation.getRhythmTempo(
            playedNotes.duration,
            midiFileNotes.duration
        );

        // TODO: See if there is a way to solve this function which Weiwei couldn't implement
        // const rhythmDiff = performanceEvaluation.getRhythm(playedNotes.duration, midiFileNotes.duration);

        const pitchErrorNum = performanceEvaluation.getAccuracyD_2(
            playedNotes.midi,
            midiFileNotes.midi
        );

        // TODO: Missed notes and Missed notes length could be returned by the same function
        const missedNotes = performanceEvaluation.getMissedNotes(
            playedNotes.midi,
            midiFileNotes.midi
        );
        const missedNoteNum = missedNotes.length;
        const IOIs = performanceEvaluation.getIOIs(
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

        state.played.evaluation = {
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
        console.log(state.played.evaluation);
    }
}