<template>
	<div id="question-type" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<text-after-question-area-component class="text-after-question-area state-section" ref="postQuestionText"/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import TextAfterQuestionAreaComponent from '@/components/experiment/visual-content/text-after-question-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		TextAfterQuestionAreaComponent,
		TextAreaComponent,
	},
// 	props: {
// 		isSpaceBarPressed: {
// 			type: Boolean,
// 			default() {
// 				return false;
// 			},
// 		},
// 	},
// 	data() {
// 		return {
// 			errorAutomaticTransitionSeconds: 5,
// 			playbackDelayInSeconds: 1,
// 			isSpacebarPressRecorded: false,
// 		};
// 	},
// 	computed: {
// 		...mapGetters('piano', ['isMidiFileLoaded']),
// 		...mapGetters('experiment', ['midiName', 'cueWaitForClick']),
// 	},
	methods: {
// 		...mapActions('piano', ['playMidiFile', 'addPlayerEndOfFileAction', 'removePlayerEndOfFileAction']),
		updateFootnote() {
			let footnoteMessage = '';
			footnoteMessage = this.$tc('views.experiment.question.midi-note.footnote-explaination');
			this.$emit('footnote', footnoteMessage);
		},
		revealQuestionTextAfterQuestion() {
			this.postQuestionText.reveal();
		}
// 		handleEndOfMidiFile() {
// 			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
// 		},
// 		manageHavingNoMidiFile() {
// 			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
// 		},
	},
	beforeMount() {
		this.updateFootnote();
	},
// 	mounted() {
// 		this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
// 	},
// 	beforeDestroy() {
// 		this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
// 	},
// 	watch: {
// 		isMidiFileLoaded: {
// 			immediate: true,
// 			handler: function (isReady) {
// 				if (!this.cueWaitForClick && isReady) setTimeout(() => this.playMidiFile(), this.playbackDelayInSeconds * 1000);
// 				else if (this.midiName === '') setTimeout(() => this.manageHavingNoMidiFile(), this.errorAutomaticTransitionSeconds * 1000);
// 			},
// 		},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 30%;
}

.text-after-question-area {
	flex-grow: 1;
	height: 10%;
}
</style>
