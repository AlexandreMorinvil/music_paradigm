<template>
	<!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
	<div id="keyboard-container">
		<ul id="keyboard">
			<li>
				<ul class="keyboard-row">
					<li class="key symbol"><span class="off">`</span><span class="on">~</span></li>
					<li class="key symbol"><span class="off">1</span><span class="on">!</span></li>
					<li class="key symbol"><span class="off">2</span><span class="on">@</span></li>
					<li class="key symbol"><span class="off">3</span><span class="on">#</span></li>
					<li class="key symbol"><span class="off">4</span><span class="on">$</span></li>
					<li class="key symbol"><span class="off">5</span><span class="on">%</span></li>
					<li class="key symbol"><span class="off">6</span><span class="on">^</span></li>
					<li class="key symbol"><span class="off">7</span><span class="on">&amp;</span></li>
					<li class="key symbol"><span class="off">8</span><span class="on">*</span></li>
					<li class="key symbol"><span class="off">9</span><span class="on">(</span></li>
					<li class="key symbol"><span class="off">0</span><span class="on">)</span></li>
					<li class="key symbol"><span class="off">-</span><span class="on">_</span></li>
					<li class="key symbol"><span class="off">=</span><span class="on">+</span></li>
					<li class="key delete lastitem">delete</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key tab">tab</li>
					<li class="key letter">q</li>
					<li class="key letter">w</li>
					<li class="key letter">e</li>
					<li class="key letter">r</li>
					<li class="key letter">t</li>
					<li class="key letter">y</li>
					<li class="key letter">u</li>
					<li class="key letter">i</li>
					<li class="key letter">o</li>
					<li class="key letter">p</li>
					<li class="key symbol"><span class="off">[</span><span class="on">{</span></li>
					<li class="key symbol"><span class="off">]</span><span class="on">}</span></li>
					<li class="key symbol lastitem"><span class="off">\</span><span class="on">|</span></li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key capslock">caps</li>
					<li class="key letter">a</li>
					<li class="key letter">s</li>
					<li class="key letter">d</li>
					<li class="key letter">f</li>
					<li class="key letter">g</li>
					<li class="key letter">h</li>
					<li class="key letter">j</li>
					<li class="key letter">k</li>
					<li class="key letter">l</li>
					<li class="key symbol"><span class="off">;</span><span class="on">:</span></li>
					<li class="key symbol"><span class="off">'</span><span class="on">&quot;</span></li>
					<li class="key return lastitem">return</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key left-shift">shift</li>
					<li class="key letter">z</li>
					<li class="key letter">x</li>
					<li class="key letter">c</li>
					<li class="key letter">v</li>
					<li class="key letter">b</li>
					<li class="key letter">n</li>
					<li class="key letter">m</li>
					<li class="key symbol"><span class="off">,</span><span class="on">&lt;</span></li>
					<li class="key symbol"><span class="off">.</span><span class="on">&gt;</span></li>
					<li class="key symbol"><span class="off">/</span><span class="on">?</span></li>
					<li class="key right-shift lastitem">shift</li>
				</ul>
			</li>
			<li>
				<ul class="keyboard-row">
					<li class="key space lastitem">&nbsp;</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	// components: {},
	// data() {
	// 	return {
	// 		highlightedDesignatedKeys: [],
	// 		NOTE_COUNT: 24,
	// 		OFFSET_STEP: 12,
	// 	};
	// },
	// computed: {
	// 	...mapGetters('experiment', ['interactivePiano', 'interactivePianoFirstOctave']),
	// 	...mapGetters('piano', ['pressedKeys', 'midiFileTriggeredKeys', 'midiFileNotesMidi']),
	// 	midiOffset() {
	// 		return this.interactivePianoFirstOctave * this.OFFSET_STEP;
	// 	},
	// 	firstNote() {
	// 		return this.midiOffset;
	// 	},
	// 	lastNote() {
	// 		return this.midiOffset + this.NOTE_COUNT;
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
	// 			if (list.includes(note)) this.$refs[note.toString()].classList.add('user-triggered');
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
	// 			if (this.interactivePiano === 'first') this.hintFirstNote();
	// 			if (this.interactivePiano === 'all') this.hintAllNotes();
	// 		},
	// 	},
	// },
};
</script>

<style scoped>
li {
	list-style: none;
}

#keyboard-container {
	margin: auto;
	width: 850px;
	height: 300px;
	color: black;
	border: 1px solid #160801;
	border-radius: 0.5em;
	background: linear-gradient(to bottom right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)), rgb(51, 55, 80);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset, 0 1px rgba(125, 157, 212, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
	padding: 12px;
	border-radius: 10px;
}

#keyboard {
	height: 100%;
	min-height: 100px;
	display: grid;
	grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
}

.keyboard-row {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100%;
}

.key {
	float: left;
	margin: auto 2.5px;
	width: 5.813%;
	height: 95%;
	line-height: 40px;
	text-align: center;
	background: #fff;

	border-radius: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.key {
	color: rgb(209, 210, 212);
	background-color: rgb(50, 50, 50);
	border: 1px solid rgb(20, 20, 20);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.15) inset, 0 1px rgba(17, 17, 17, 0.2) inset, 0 5px 5px rgba(0, 0, 0, 0.35);
}

#keyboard > li {
	display: block;
	width: 100%;
	height: 100%;
}

.capslock,
.tab,
.left-shift {
	clear: left;
}
#keyboard .tab,
#keyboard .delete {
	width: 10.174%;
}
#keyboard .capslock {
	width: 11.627%;
}
#keyboard .return {
	width: 11.191%;
}
#keyboard .left-shift {
	width: 95px;
}
#keyboard .right-shift {
	width: 13.808%;
}
.lastitem {
	margin-right: 0;
}
.uppercase {
	text-transform: uppercase;
}
#keyboard .space {
	clear: left;
	width: 100%;
}
.on {
	display: none;
}
.key:hover {
	position: relative;
	top: 1px;
	left: 1px;
	cursor: pointer;
}
</style>
