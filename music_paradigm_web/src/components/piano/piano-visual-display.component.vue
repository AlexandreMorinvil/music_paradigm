<template>
	<!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
	<div id="visual-piano">
		<ul class="set">
			<li id="note-48" :ref="'' + (0 + midiOffset)" class="white c"></li>
			<li id="note-49" :ref="'' + (1 + midiOffset)" class="black cs"></li>
			<li id="note-50" :ref="'' + (2 + midiOffset)" class="white d"></li>
			<li id="note-51" :ref="'' + (3 + midiOffset)" class="black ds"></li>
			<li id="note-52" :ref="'' + (4 + midiOffset)" class="white e"></li>
			<li id="note-53" :ref="'' + (5 + midiOffset)" class="white f"></li>
			<li id="note-54" :ref="'' + (6 + midiOffset)" class="black fs"></li>
			<li id="note-55" :ref="'' + (7 + midiOffset)" class="white g"></li>
			<li id="note-56" :ref="'' + (8 + midiOffset)" class="black gs"></li>
			<li id="note-57" :ref="'' + (9 + midiOffset)" class="white a"></li>
			<li id="note-58" :ref="'' + (10 + midiOffset)" class="black as"></li>
			<li id="note-59" :ref="'' + (11 + midiOffset)" class="white b"></li>
			<li id="note-60" :ref="'' + (12 + midiOffset)" class="white c"></li>
			<li id="note-61" :ref="'' + (13 + midiOffset)" class="black cs"></li>
			<li id="note-62" :ref="'' + (14 + midiOffset)" class="white d"></li>
			<li id="note-63" :ref="'' + (15 + midiOffset)" class="black ds"></li>
			<li id="note-64" :ref="'' + (16 + midiOffset)" class="white e"></li>
			<li id="note-65" :ref="'' + (17 + midiOffset)" class="white f"></li>
			<li id="note-66" :ref="'' + (18 + midiOffset)" class="black fs"></li>
			<li id="note-67" :ref="'' + (19 + midiOffset)" class="white g"></li>
			<li id="note-68" :ref="'' + (20 + midiOffset)" class="black gs"></li>
			<li id="note-69" :ref="'' + (21 + midiOffset)" class="white a"></li>
			<li id="note-70" :ref="'' + (22 + midiOffset)" class="black as"></li>
			<li id="note-71" :ref="'' + (23 + midiOffset)" class="white b"></li>
			<li id="note-72" :ref="'' + (24 + midiOffset)" class="white c"></li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	components: {},
	data() {
		return {
			highlightedDesignatedKeys: [],
			NOTE_COUNT: 24,
			OFFSET_STEP: 12,
		};
	},
	computed: {
		...mapGetters('experiment', ['interactivePiano', 'interactivePianoFirstOctave']),
		...mapGetters('piano', ['pressedKeys', 'midiFileTriggeredKeys', 'midiFileNotesMidi']),
		midiOffset() {
			return this.interactivePianoFirstOctave * this.OFFSET_STEP;
		},
		firstNote() {
			return this.midiOffset;
		},
		lastNote() {
			return this.midiOffset + this.NOTE_COUNT;
		},
	},
	methods: {
		designateKeys(keys) {
			if (Array.isArray(keys)) this.highlightedDesignatedKeys = keys;
			else if (typeof keys == 'number') this.highlightedDesignatedKeys = [keys];
		},
		clearDesignatedKeys() {
			this.highlightedDesignatedKeys = [];
		},
		hintAllNotes() {
			const designatedKeys = [];
			for (let index = 0; index < this.midiFileNotesMidi.length; index++) designatedKeys.push(this.midiFileNotesMidi[index]);
			this.designateKeys(designatedKeys);
		},
		hintFirstNote() {
			this.designateKeys(this.midiFileNotesMidi[0]);
		},
	},
	beforeDestroy() {
		this.clearDesignatedKeys();
	},
	watch: {
		pressedKeys(list) {
			for (let note = this.firstNote; note <= this.lastNote; note++) {
				if (list.includes(note)) this.$refs[note.toString()].classList.add('user-triggered');
				else this.$refs[note.toString()].classList.remove('user-triggered');
			}
		},
		midiFileTriggeredKeys(list) {
			for (let note = this.firstNote; note <= this.lastNote; note++) {
				if (list.includes(note)) this.$refs[note.toString()].classList.add('midi-file-triggered');
				else this.$refs[note.toString()].classList.remove('midi-file-triggered');
			}
		},
		highlightedDesignatedKeys(list) {
			for (let note = this.firstNote; note <= this.lastNote; note++) {
				if (list.includes(note)) this.$refs[note.toString()].classList.add('designated');
				else this.$refs[note.toString()].classList.remove('designated');
			}
		},
		midiFileNotesMidi: {
			immediate: true,
			handler: function () {
				this.clearDesignatedKeys();
				if (this.interactivePiano === 'first') this.hintFirstNote();
				if (this.interactivePiano === 'midi') this.hintAllNotes();
			},
		},
	},
};
</script>

<style scoped>
/* The CSS definition of this piano adapted from the open
source project : https://codepen.io/zastrow/pen/oDBki */
#visual-piano {
	display: flex;
	justify-content: center;
	align-items: flex-start;
	height: 100%;
	width: 100%;
	max-width: 1000px;
	max-height: 350px;
}

ul {
	display: flex;
	justify-content: center;
	height: 97.5%;
	width: 100%;
	margin-bottom: 2.5%;
	padding: 5% 0 0 0;
	position: relative;
	border: 1px solid #160801;
	border-radius: 0.5em;
	background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), rgb(102, 44, 18);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset, 0 1px rgba(212, 152, 125, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
}

li {
	margin: 0;
	padding: 0;
	list-style: none;
	position: relative;
	float: left;
}

ul .white {
	height: 103%;
	width: 6.25%;
	z-index: 1;
	border-left: 1px solid #bbb;
	border-bottom: 1px solid #bbb;
	border-radius: 0 0 5px 5px;
	box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
	background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}

ul .white:active,
.triggered {
	border-top: 1px solid #777;
	border-left: 1px solid #999;
	border-bottom: 1px solid #999;
	box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
	background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);
}

.black,
.triggered {
	height: 60%;
	width: 3.6%;
	margin: 0 0 0 -1.8%;
	z-index: 2;
	border: 1px solid #000;
	border-radius: 0 0 3px 3px;
	box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
	background: linear-gradient(45deg, #222 0%, #555 100%);
}

.black:active {
	box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
	background: linear-gradient(to right, #444 0%, #222 100%);
}

.d,
.e,
.g,
.a,
.b {
	margin: 0 0 0 -1.8%;
}

ul li:first-child {
	border-radius: 5px 0 5px 5px;
}

ul li:last-child {
	border-radius: 0 5px 5px 5px;
}

ul .designated {
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(255, 252, 81) 0%, rgb(222, 219, 0) 100%);
}

ul .user-triggered {
	border: 1px solid rgb(4, 19, 117);
	background: linear-gradient(to bottom, rgb(0, 187, 255) 0%, rgb(2, 48, 139) 100%);
}

ul .midi-file-triggered {
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(21, 255, 0) 0%, rgb(9, 139, 2) 100%);
}
</style>
