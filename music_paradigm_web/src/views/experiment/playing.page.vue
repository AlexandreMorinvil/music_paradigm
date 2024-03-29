<template>
	<div id="playing-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<clicker-area-component class="virtual-controller-area state-section" />
		<piano-area-component class="virtual-controller-area state-section" />
		<keyboard-area-component class="virtual-controller-area state-section" />
		<component :is="playingMode" class="play-area state-section" v-on:finished-playing="handdleEndOfPlaying" ref="playingMode" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapActions, mapGetters } from 'vuex';

import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

import ClickerAreaComponent from '@/components/experiment/visual-content/clicker-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';

import KeyboardPressingSpeedComponent from '@/components/experiment/playing-mode/keyboard-pressing-speed.component';

import PlayingMelodyComponent from '@/components/experiment/playing-mode/playing-melody.component';
import PlayingRhythmComponent from '@/components/experiment/playing-mode/playing-rhythm.component';
import PlayingSpeedComponent from '@/components/experiment/playing-mode/playing-speed.component';

export default {
	components: {
		TextAreaComponent,
		ImageAreaComponent,

		ClickerAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,

		speed: PlayingSpeedComponent,
		rhythm: PlayingRhythmComponent,
		melody: PlayingMelodyComponent,
		'keyboard-speed': KeyboardPressingSpeedComponent,
	},
	data() {
		return {
			hasReceivedStartSignal: false,
		};
	},
	computed: {
		...mapGetters('evaluation', ['hasSuccess']),
		...mapGetters('experiment', ['playingMode']),
	},
	methods: {
		...mapActions('experiment', ['addSuccess']),
		updateFootnote() {
			const footnoteMessage = this.$t('views.experiment.playing.footnote-after-performance');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handdleEndOfPlaying() {
			this.evaluatePlayedNotes();
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		evaluatePlayedNotes() {
			this.$refs.playingMode.evaluate();
			if (this.hasSuccess) this.addSuccess();
		},
		startPerformance() {
			this.hasReceivedStartSignal = true;
			this.$refs.playingMode.start();
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_START_SIGNAL_READY, this.startPerformance);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_START_SIGNAL_READY, this.startPerformance);
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 30%;
}

.image-area {
	flex-grow: 1;
	height: 50%;
}

.virtual-controller-area {
	flex-grow: 1;
	height: 50%;
}

.play-area {
	flex-grow: 1;
	height: 20%;
}
</style>
