<template>
  <div id="playing-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />

    <skip-button v-if="hasSkipOption" class="skip-button" v-on:skip-request="emitSkipSignal" />

    <start-signal-timer v-if="isWaitingStartSignal" class="experiment-state-division state-division-text" />
    <div v-if="!isWaitingStartSignal && hasText" id="text-area" class="experiment-state-division state-division-text">
      {{ textContent }}
    </div>

    <div id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <component
        :is="playingMode"
        v-on:footnote="handleFootnote"
        v-on:finishedPlaying="handdleEndOfPlaying"
        ref="playingMode"
      />
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">{{ footnote }}</div>
  </div>
</template>

<script>
import'@/styles/experimentStateTemplate.css';
import{ mapActions, mapGetters } from'vuex';
import{ ExperimentEventBus } from'@/_services/eventBus.service.js';

import PlayingSpeedComponent from'./PlayingSpeed';
import PlayingRhythmComponent from'./PlayingRhythm';
import PlayingMelodyComponent from'./PlayingMelody';
import SkipButton from'@/components/experiment/SkipButton.vue';
import StartSignalTimer from'@/components/experiment/StartSignalTimer.vue';

export default{
	name: 'Playing',
	components: {
		skipButton: SkipButton,
		speed: PlayingSpeedComponent,
		rhythm: PlayingRhythmComponent,
		melody: PlayingMelodyComponent,
		startSignalTimer: StartSignalTimer
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return'';
			}
		}
	},
	data() {
		return{
			footnote: 'The experiment will go to the next step after your performance',
			hasReceivedStartSignal: false
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['hasSuccess']),
		...mapGetters('experiment', [
			'hasText',
			'hasFootnote',
			'hasHelperImage',
			'hasSkipOption',
			'textContent',
			'helperImageName',
			'playingMode',
			'skipStepButton',
			'footnoteMessage',
			'startSignal'
		]),
		gridClass() {
			if(this.hasFootnote) {
				if(this.hasText) return'grid-small-area-big-area-note';
				else return'grid-area-note';
			} else if(this.hasText) return'grid-small-area-big-area';
			else return'grid-single-area';
		},
		isWaitingStartSignal() {
			return this.startSignal > 0 && !this.hasReceivedStartSignal;
		}
	},
	methods: {
		...mapActions('experiment', ['addSuccess']),
		...mapActions('log', ['createSimpleLog']),
		handleFootnote(footNote) {
			if(this.footnoteMessage) this.footnote = this.footnoteMessage;
			else this.footnote = footNote;
		},
		handdleEndOfPlaying() {
			this.evaluatePlayedNotes();
			this.createSimpleLog();
			this.$emit('state-ended');
		},
		evaluatePlayedNotes() {
			this.$refs.playingMode.evaluate();
			if(this.hasSuccess) this.addSuccess();
		},
		startPerformance() {
			this.hasReceivedStartSignal = true;
			this.$refs.playingMode.start();
		},
		emitSkipSignal() {
			this.$emit('skip-request');
		}
	},
	mounted() {
		ExperimentEventBus.$on('start-signal-ready', this.startPerformance);
	},
	beforeDestroy() {
		ExperimentEventBus.$off('start-signal-ready', this.startPerformance);
	},
	watch: {
		lastPressedKey(lastPressedKey) {
			if(this.hasSkipOption && lastPressedKey === this.skipStepButton) this.emitSkipSignal();
		}
	}
};
</script>

<style scoped></style>
