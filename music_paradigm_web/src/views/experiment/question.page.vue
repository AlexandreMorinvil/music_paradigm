<template>
	<div>
		<component :is="type" class="question-area state-section" v-on:responded="handdleResponded" ref="playingMode" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapGetters } from 'vuex';

// import SimpleQuestionComponent from '@/components/experiment/question-type/playing-melody.component';
// import ImageQuestionComponent from '@/components/experiment/question-type/playing-rhythm.component';
// import AudioQuestionComponent  from '@/components/experiment/question-type/playing-speed.component';
import MidiNoteQuestionComponent from '@/components/experiment/question-type/question-midi-note.component';

export default {
	components: {
		// simple: SimpleQuestionComponent,
		// image: ImageQuestionComponent,
		// audio: AudioQuestionComponent,
		'midi-note': MidiNoteQuestionComponent,
	},
	data() {
		return {
			allowedTypes: ['simple', 'image', 'audio', 'midi-note'],
			hasReceivedStartSignal: false,
		};
	},
	computed: {
		...mapGetters('experiment', ['questionType']),
		type() {
			if (this.allowedTypes.includes(this.questionType)) return this.questionType;
			else return 'simple';
		}
	},
	methods: {
		updateFootnote(footnoteMessage) {
			// 	const footnoteMessage = this.$t('views.experiment.question.footnote-after-performance');
			// 	ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
			ExperimentEventBus.$emit(
				experimentEvents.EVENT_SET_FOOTNOTE,
				'Mark the note that differ by clicking on the sequence number or by pressing the corresponding key on the keyboard',
			);
		},
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
