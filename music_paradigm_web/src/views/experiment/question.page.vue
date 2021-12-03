<template>
	<component :is="questionType" class="question-area state-section" v-on:responded="handdleResponded" ref="playingMode" />
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapActions, mapGetters } from 'vuex';

// import SimpleQuestionComponent from '@/components/experiment/question-type/playing-melody.component';
// import ImageQuestionComponent from '@/components/experiment/question-type/playing-rhythm.component';
// import AudioQuestionComponent  from '@/components/experiment/question-type/playing-speed.component';
import MidiNoteQuestionComponent  from '@/components/experiment/question-type/question-midi-note.component';

export default {
	components: {
		// simple: SimpleQuestionComponent,
		// image: ImageQuestionComponent,
		// audio: AudioQuestionComponent,
		'midi-note': MidiNoteQuestionComponent,
	},
	data() {
		return {
			hasReceivedStartSignal: false,
		};
	},
	computed: {
		...mapGetters('experiment', []),
	},
	methods: {
		...mapActions('experiment', ['questionType']),
		// updateFootnote() {
		// 	const footnoteMessage = this.$t('views.experiment.question.footnote-after-performance');
		// 	ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		// },
		handdleResponded() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		startAsking() {
			this.hasReceivedStartSignal = true;
			this.$refs.playingMode.start();
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_START_SIGNAL_READY, this.startAsking);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_START_SIGNAL_READY, this.startAsking);
	},
};
</script>

<style scoped></style>
