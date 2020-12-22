<template>
	<div id="playing-speed-area" class="playing-area">
		<div id="playing-visual-media" v-if="hasVisualMedia" class="playing-visual-media-area">
			<visual-piano v-if="hasInteractivePiano" ref="piano" />
			<img id="playing-img" v-if="!hasInteractivePiano && hasPicture" :src="urlExperimentRessource(pictureName)" alt="Playing" />
		</div>

		<div id="playing-progress-bar" class="playing-progress-bar-area">
			<progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
		</div>
	</div>
</template>

<script>
import '@/styles/playingTemplate.css';
import { mapActions, mapGetters } from 'vuex';
import VisualPiano from '@/components/VisualPiano.vue';

export default {
	components: {
		visualPiano: VisualPiano,
	},
	data() {
		return {
			playingStarted: false,
			defaultTimeLimitInSeconds: 30,
			counterUniqueIdentifier: 0,
			referenceTime: 0,
			playProgress: 0,
			timeStepInMilliseconds: 100,
			timeLeftInMilliseconds: 0,
			minMelodyRepetitionDisplayed: 20,
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['hasVisualMedia', 'hasPicture', 'hasInteractivePiano', 'pictureName', 'timeoutInSeconds', 'melodyRepetition']),
		...mapGetters('piano', ['midiFileNotesMidi', 'playedNotesMidi']),
		timeLimit() {
			return this.timeoutInSeconds || this.defaultTimeLimitInSeconds;
		},
		maxPlayProgress() {
			const factor = Math.max(this.minMelodyRepetitionDisplayed, this.melodyRepetition);
			return this.midiFileNotesMidi.length * factor;
		},
		timeLimitInMiliseconds() {
			return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
		},
		timeLeftDisplay() {
			let display = '';
			const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
			const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
			if (minutes > 0) {
				display += `${minutes} minutes `;
			}
			display += `${seconds} seconds`;
			return display;
		},
	},
	methods: {
		...mapActions('piano', ['evaluateSpeedType']),
		start() {
			this.startCountdown();
			this.playingStarted = true;
		},
		startCountdown() {
			this.referenceTime = Date.parse(new Date());
			this.counterUniqueIdentifier = window.setInterval(this.countdown, this.timeStepInMilliseconds);
		},
		countdown() {
			this.timeLeftInMilliseconds = Math.max(this.timeLimitInMiliseconds - (Date.now() - this.referenceTime), 0);
		},
		updateFootnote(firstNotePressed) {
			let noteMessage = '';
			if (firstNotePressed) {
				noteMessage = `The experiment will go to the next step in ${this.timeLeftDisplay}`;
			} else {
				noteMessage = 'The time limit will start after the first key press';
			}
			this.$emit('footnote', noteMessage);
		},
		evaluate() {
			this.evaluateSpeedType();
		},
	},
	mounted() {
		this.updateFootnote(false);
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		playedNotesMidi() {
			if (!this.playingStarted) {
				this.start();
			}
			if (this.midiFileNotesMidi.includes(this.playedNotesMidi[this.playedNotesMidi.length - 1])) {
				this.playProgress += 1;
			}
		},
		timeLeftInMilliseconds(value) {
			// When the time is over we indicate the end of the playing state
			if (value <= 0) {
				this.$emit('finishedPlaying');
			} else {
				this.updateFootnote(true);
			}
		},
	},
};
</script>

<style scoped></style>
