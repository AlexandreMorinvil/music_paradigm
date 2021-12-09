<template>
	<div>
		<component
			:is="type"
			class="question-area state-section"
			v-on:responded="handdleResponded"
			v-on:footnote="updateFootnote"
			ref="question"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapGetters } from 'vuex';

// import SimpleQuestionComponent from '@/components/experiment/question-type/playing-melody.component';
import AudioQuestionComponent  from '@/components/experiment/question-type/question-audio-first.component';
import ImageQuestionComponent from '@/components/experiment/question-type/question-image-choices.component';
import MidiNoteQuestionComponent from '@/components/experiment/question-type/question-midi-note.component';

export default {
	components: {
		// simple: SimpleQuestionComponent,
		'audio-start': AudioQuestionComponent,
		'image-choices': ImageQuestionComponent,
		'midi-note': MidiNoteQuestionComponent,
	},
	data() {
		return {
			allowedTypes: ['simple', 'image-choices', 'audio-start', 'midi-note'],
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
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handdleResponded() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		startAsking() {
			this.hasReceivedStartSignal = true;
			this.$refs.question.start();
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
