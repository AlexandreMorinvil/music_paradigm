<template>
	<div id="visual-clicker" class="clicker-container">
		<ul class="clicker-grid clicker-container-inner-space">
			<li class="button-1-area key">1</li>
			<li class="button-2-area key">2</li>
			<li class="button-3-area key">3</li>
			<li class="button-4-area key">4</li>
			<li class="button-5-area key">5</li>
		</ul>
	</div>
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
.clicker-container {
	position: static;
	height: 100%;
	width: 100%;
	max-width: 500px;
	max-height: 350px;
	background: linear-gradient(to bottom right, rgba(230, 230, 230, 0.3), rgba(230, 230, 230, 0)), rgb(215, 215, 200);
	box-shadow: 0 0 10px rgba(0, 0, 0, 1) inset, 0 1px rgba(125, 157, 212, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
	border-radius: 70px;
	padding: 22.5px;
}

.clicker-container-inner-space {
	box-shadow: 0 0 5px rgb(0, 0, 0, 0.3) inset, 0 0 5px rgba(10, 10, 0, 0.25);
	border-radius: 60px;
}

.clicker-grid {
	display: grid;
	height: 100%;
	width: 100%;
	grid-template:
		'.  .  .  .  .  .  .  . '
		'.  .  .  b3 .  .  .  . '
		'.  .  b2 .  b4 .  .  . '
		'.  b1 .  .  .  .  .  . '
		'.  .  .  .  .  b5 b5 . '
		'.  .  .  .  .  .  .  . ';
	grid-gap: 5px;
}

li {
	list-style: none;
}

.key {
	text-align: center;
	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.key {
	position: relative;
	color: rgb(209, 210, 212);
	background-color: rgb(40, 40, 40);
	border: 1px solid rgb(20, 20, 20);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.65) inset, 0 1px rgba(10, 10, 10, 0.7) inset, 1.5px 1.5px 1.5px rgba(0, 0, 0, 1),
		4px 4px 5px rgba(0, 0, 0, 0.5);
}

.button-1-area {
	grid-area: b1;
	transform: translateY(-50%);
}

.button-2-area {
	grid-area: b2;
	transform: translateY(-32%);
}

.button-3-area {
	grid-area: b3;
	transform: translateY(20%);
}

.button-4-area {
	grid-area: b4;
	transform: translateY(-58%);
}

.button-5-area {
	grid-area: b5;
	transform: translate(-20%, -38%);
	width: 120%;
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
