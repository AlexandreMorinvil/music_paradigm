<template>
  <div id="playing-rythm-area" class="playing-area">
    <div id="playing-visual-media" v-if="hasVisualMedia" class="playing-visual-media-area">
      <visual-piano v-if="hasInteractivePiano" ref="piano" />
      <img
        id="playing-img"
        v-if="!hasInteractivePiano && hasPicture"
        :src="urlExperimentRessource(pictureName)"
        alt="Playing"
      />
    </div>

    <div id="playing-progress-bar" class="playing-progress-bar-area">
      <progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
    </div>
  </div>
</template>

<script>
import'@/styles/playingTemplate.css';
import{ mapActions, mapGetters } from'vuex';
import VisualPiano from'@/components/VisualPiano.vue';

export default{
	name: 'PlayingRhythm',
	components: {
		visualPiano: VisualPiano
	},
	data() {
		return{
			maxInactivityALlowedInMilliSeconds: 3000,
			incativityUniqueIdentifier: 0,
			timeLimitUniqueIdentifier: 0,
			isFirstNotePressed: false
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', [
			'hasVisualMedia',
			'hasPicture',
			'hasInteractivePiano',
			'pictureName',
			'timeoutInSeconds',
			'melodyRepetition'
		]),
		...mapGetters('piano', ['midiFileNotesMidi', 'pressedKeys', 'midiFileNotesDuration', 'playedNotesMidi']),
		playProgress() {
			return this.playedNotesMidi.length;
		},
		maxPlayProgress() {
			return this.midiFileNotesMidi.length * this.melodyRepetition;
		},
		lastNoteDuration() {
			return this.midiFileNotesDuration[this.midiFileNotesDuration.length - 1];
		}
	},
	methods: {
		...mapActions('piano', ['evaluateMelodyType']),
		start() {},
		setTimeLimit() {
			if(this.timeoutInSeconds !== 0) {
				this.timeLimitUniqueIdentifier = window.setTimeout(() => {
					this.$emit('finishedPlaying');
				}, this.timeoutInSeconds * 1000);
			}
		},
		stopHint() {
			if(this.hasInteractivePiano) this.$refs.piano.clearDesignatedKeys();
		},
		updateFootnote() {
			let noteMessage = 'The experiment will go to the next step after your performance';
			if(this.timeoutInSeconds !== 0) noteMessage += ` or after ${this.timeoutInSeconds} seconds`;
			this.$emit('footnote', noteMessage);
		},
		evaluate() {
			this.evaluateMelodyType(this.melodyRepetition);
		}
	},
	mounted() {
		this.updateFootnote();
		this.setTimeLimit();
	},
	destroyed() {
		window.clearTimeout(this.timeLimitUniqueIdentifier);
		window.clearTimeout(this.incativityUniqueIdentifier);
	},
	watch: {
		playedNotesMidi: {
			deep: true,
			handler: function() {
				window.clearTimeout(this.incativityUniqueIdentifier);
				this.incativityUniqueIdentifier = setTimeout(() => {
					this.$emit('finishedPlaying');
				}, this.maxInactivityALlowedInMilliSeconds);

				const playedNoteIndex = this.playedNotesMidi.length - 1;
				const referenceIndex = playedNoteIndex % this.midiFileNotesMidi.length;
				const hasError = this.playedNotesMidi[playedNoteIndex] !== this.midiFileNotesMidi[referenceIndex];
				if(hasError) this.$emit('finishedPlaying');
			}
		},
		playProgress(value) {
			// When the last note was pressed, we wait the duration of the last note
			// plus a second before indicating the end of the playing state
			if(value >= this.maxPlayProgress) {
				this.timerUniqueIdentifier = setTimeout(() => {
					this.$emit('finishedPlaying');
				}, this.lastNoteDuration + 1000);
			}
		}
	}
};
</script>

<style scoped></style>
