const midiNumberToPitch = function (midiNumber) {
    return "C C#D D#E F F#G G#A A#B ".substr((midiNumber % 12) * 2, 2).replace(/\s+/g, '');
}
const midiNumberToOctave = function (midiNumber) {
    return ((midiNumber / 12) | 0) - 1;
}
const midiNumberToName = function (midiNumber) {
    return midiNumberToPitch(midiNumber).concat(midiNumberToOctave(midiNumber));
}
export default {
    midiNumberToPitch,
    midiNumberToOctave,
    midiNumberToName
}
