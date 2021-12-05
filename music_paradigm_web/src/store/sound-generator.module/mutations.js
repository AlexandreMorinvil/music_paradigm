import { Midi } from '@tonejs/midi';

export default {
	setRessourceName: (state, { assignation, fileName }) => {
		// Set file name 
		state[assignation].fileName = fileName;

		// Set extension name
		const extension = fileName.split('.').pop();
		state[assignation].extension = extension ? extension.toLowerCase() : '';
	},

	loadRessourceArrayStream: (state, { assignation, arrayStream }) => {
		state[assignation].arrayStream = arrayStream;
	},

	processArrayStream: (state, assignation) => {
		// If the file is a MIDI file, we parse it
		if (!['mid', 'midi'].includes(state[assignation].extension)) return;
		const jsonMidi = new Midi(state[assignation].arrayStream);
		const notes = jsonMidi.tracks[0].notes;
		state[assignation].parsedMidi = notes;
	},
};
