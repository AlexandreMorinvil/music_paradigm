<template>
	<div class="button-grid">
		<button v-on:click="emitAdvanceSignal" class="footnote-button"><footnote-message-component /></button>
		<skip-button-component class="footnote-button" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import FootnoteMessageComponent from '@/components/experiment/footnote/footnote-message.component.vue';
import SkipButtonComponent from '@/components/experiment/element/skip-button.component.vue';

export default {
	components: {
		FootnoteMessageComponent,
		SkipButtonComponent,
	},
	computed: {
		...mapGetters('experiment', ['skipStepButton', 'skipStepButtonMessage']),
	},
	methods: {
		emitAdvanceSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_ADVANCE_REQUEST);
		},
	},
};
</script>

<style scoped>
.button-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.footnote-button {
	font-size: calc(1vh + 1vw);
	color: black;
	background-color: rgb(200, 200, 200);
	border: 3px solid rgb(185, 185, 185);
	margin: 10px;
	width: initial;
	height: initial;
	padding: 15px;
}
</style>
