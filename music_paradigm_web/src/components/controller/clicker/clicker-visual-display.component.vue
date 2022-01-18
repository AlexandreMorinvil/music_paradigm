<template>
	<!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
	<div id="visual-clicker" class="visual-clicker">Here is gonna come the content</div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
	// components: {},
	// data() {
	// 	return {
	// 		highlightedDesignatedKeys: [],
	// 		NOTE_COUNT: 25,
	// 		OFFSET_STEP: 12,
	// 		textKey0: '',
	// 	};
	// },
	// computed: {
	// 	...mapGetters('experiment', ['interactivePiano', 'interactivePianoFirstOctave', 'interactiveKeyboardTextMapping']),
	// 	...mapGetters('piano', ['pressedKeys', 'midiFileTriggeredKeys', 'midiFileNotesMidi']),
	// 	mustDisplayPressedKeys() {
	// 		return !String(this.interactivePiano).includes('#');
	// 	},
	// 	mustDisplayLoadedMidiFirstNote() {
	// 		return String(this.interactivePiano).includes('first');
	// 	},
	// 	mustDisplayLoadedMidiAllNotes() {
	// 		return String(this.interactivePiano).includes('midi');
	// 	},
	// 	midiOffset() {
	// 		return this.interactivePianoFirstOctave * this.OFFSET_STEP;
	// 	},
	// 	firstNote() {
	// 		return this.midiOffset;
	// 	},
	// 	lastNote() {
	// 		return this.midiOffset + this.NOTE_COUNT - 1;
	// 	},
	// 	textMapping() {
	// 		const textMapping = [];
	// 		if (Array.isArray(this.interactiveKeyboardTextMapping))
	// 			for (const index in this.interactiveKeyboardTextMapping) {
	// 				// Get the index of the key, if it is within the range to the displayed keys
	// 				const currentMidiKeyNumber = this.midiFileNotesMidi[index];
	// 				const correspondingKeyIndex = currentMidiKeyNumber - this.midiOffset;
	// 				if (correspondingKeyIndex < 0 || correspondingKeyIndex > this.NOTE_COUNT - 1) continue;
	// 				// Get the text to assign to the key
	// 				const keyTextAssignation = this.interactiveKeyboardTextMapping[index];
	// 				textMapping[correspondingKeyIndex] = keyTextAssignation;
	// 			}
	// 		else if (typeof this.interactiveKeyboardTextMapping === 'object') {
	// 			for (const key in this.interactiveKeyboardTextMapping) {
	// 				// Get the index of the key, if it is within the range to the displayed keys
	// 				if (key < 0 || key > this.NOTE_COUNT - 1) continue;
	// 				// Get the text to assign to the key
	// 				const keyTextAssignation = this.interactiveKeyboardTextMapping[key];
	// 				textMapping[key] = keyTextAssignation;
	// 			}
	// 		} else {
	// 			// Get the index of the key, if it is within the range to the displayed keys
	// 			const currentMidiKeyNumber = this.midiFileNotesMidi[0];
	// 			const correspondingKeyIndex = currentMidiKeyNumber - this.midiOffset;
	// 			if (correspondingKeyIndex < 0 || correspondingKeyIndex > this.NOTE_COUNT - 1) return [];
	// 			// Get the text to assign to the key
	// 			const keyTextAssignation = this.interactiveKeyboardTextMapping;
	// 			textMapping[correspondingKeyIndex] = keyTextAssignation;
	// 		}
	// 		return textMapping;
	// 	},
	// },
	// methods: {
	// 	designateKeys(keys) {
	// 		if (Array.isArray(keys)) this.highlightedDesignatedKeys = keys;
	// 		else if (typeof keys == 'number') this.highlightedDesignatedKeys = [keys];
	// 	},
	// 	clearDesignatedKeys() {
	// 		this.highlightedDesignatedKeys = [];
	// 	},
	// 	hintAllNotes() {
	// 		const designatedKeys = [];
	// 		for (let index = 0; index < this.midiFileNotesMidi.length; index++) designatedKeys.push(this.midiFileNotesMidi[index]);
	// 		this.designateKeys(designatedKeys);
	// 	},
	// 	hintFirstNote() {
	// 		this.designateKeys(this.midiFileNotesMidi[0]);
	// 	},
	// },
	// beforeDestroy() {
	// 	this.clearDesignatedKeys();
	// },
	// watch: {
	// 	pressedKeys(list) {
	// 		for (let note = this.firstNote; note <= this.lastNote; note++) {
	// 			if (this.mustDisplayPressedKeys && list.includes(note)) this.$refs[note.toString()].classList.add('user-triggered');
	// 			else this.$refs[note.toString()].classList.remove('user-triggered');
	// 		}
	// 	},
	// 	midiFileTriggeredKeys(list) {
	// 		for (let note = this.firstNote; note <= this.lastNote; note++) {
	// 			if (list.includes(note)) this.$refs[note.toString()].classList.add('midi-file-triggered');
	// 			else this.$refs[note.toString()].classList.remove('midi-file-triggered');
	// 		}
	// 	},
	// 	highlightedDesignatedKeys(list) {
	// 		for (let note = this.firstNote; note <= this.lastNote; note++) {
	// 			if (list.includes(note)) this.$refs[note.toString()].classList.add('designated');
	// 			else this.$refs[note.toString()].classList.remove('designated');
	// 		}
	// 	},
	// 	midiFileNotesMidi: {
	// 		immediate: true,
	// 		handler: function () {
	// 			this.clearDesignatedKeys();
	// 			if (this.mustDisplayLoadedMidiFirstNote) this.hintFirstNote();
	// 			if (this.mustDisplayLoadedMidiAllNotes) this.hintAllNotes();
	// 		},
	// 	},
	// },
};
</script>

<style scoped>
.visual-clicker {
	display: grid;
	height: 100%;
	width: 100%;
	max-width: 500px;
	max-height: 350px;

	border-radius: 0.5em;
	background: linear-gradient(to bottom right, rgba(230, 230, 230, 0.3), rgba(230, 230, 230, 0)), rgb(201, 205, 210);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset, 0 1px rgba(125, 157, 212, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
	padding: 12px;
	border-radius: 10px;
}

.visual-clicker {
	grid-template:
		'b b b b b b b b b b b b b b b b'
		'b b b b b b b b b b b b b b b b'

		'b b b b b b 3 3 b b b b b b b b'
		'b b b b 2 2 3 3 4 4 b b b b b b'

		'b b b b 2 2 b b 4 4 b b b b b b'
		'b b 1 1 b b b b b b b b b b b b'

		'b b 1 1 b b b b b b b b b b b b'
		'b b b b b b b b b b 5 5 5 5 b b'

		'b b b b b b b b b b 5 5 5 5 b b'
		'b b b b b b b b b b b b b b b b'

		'b b b b b b b b b b b b b b b b'
		'b b b b b b b b b b b b b b b b'
}

ul .designated {
	color: black;
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(255, 252, 81) 0%, rgb(222, 219, 0) 100%);
}

ul .user-triggered {
	color: white;
	border: 1px solid rgb(4, 19, 117);
	background: linear-gradient(to bottom, rgb(0, 187, 255) 0%, rgb(2, 48, 139) 100%);
}

ul .midi-file-triggered {
	color: white;
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(21, 255, 0) 0%, rgb(9, 139, 2) 100%);
}
</style>
