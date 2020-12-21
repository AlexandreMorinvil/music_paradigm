function midiNumberToPitch(midiNumber) {
	return 'C C#D D#E F F#G G#A A#B '.substr((midiNumber % 12) * 2, 2).replace(/\s+/g, '');
}
function midiNumberToOctave(midiNumber) {
	return ((midiNumber / 12) | 0) - 1;
}
function midiNumberToName(midiNumber) {
	return midiNumberToPitch(midiNumber).concat(midiNumberToOctave(midiNumber));
}
export default {
	midiNumberToPitch,
	midiNumberToOctave,
	midiNumberToName,
};
