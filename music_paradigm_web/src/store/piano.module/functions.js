// This code is put in a function as it is used in more than one mutation
export default{
	clearMidiFileNotes,
	multiplyMidiFileNotes
};

function clearMidiFileNotes(state) {
	state.midiFile.notes.midi = [];
	state.midiFile.notes.time = [];
	state.midiFile.notes.ticks = [];
	state.midiFile.notes.name = [];
	state.midiFile.notes.pitch = [];
	state.midiFile.notes.octave = [];
	state.midiFile.notes.velocity = [];
	state.midiFile.notes.duration = [];
}

function multiplyMidiFileNotes(state, multiplier) {
	const notes = JSON.parse(JSON.stringify(state.midiFile.notes));
	const timeOffset = notes.time[notes.time.length - 1] + notes.duration[notes.duration.length - 1];
	for(let i = 1; i < multiplier; i++) {
		notes.midi = notes.midi.concat(state.midiFile.notes.midi);
		notes.time = notes.time.concat(state.midiFile.notes.time + i * timeOffset);
		notes.name = notes.name.concat(state.midiFile.notes.name);
		notes.pitch = notes.pitch.concat(state.midiFile.notes.pitch);
		notes.octave = notes.octave.concat(state.midiFile.notes.octave);
		notes.velocity = notes.velocity.concat(state.midiFile.notes.velocity);
		notes.duration = notes.duration.concat(state.midiFile.notes.duration);
	}
	return notes;
}
