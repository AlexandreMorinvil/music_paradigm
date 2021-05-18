<template>
	<div class="button-flex">
		<go-back-button-component v-if="isGoBackButtonInFootnote" class="footnote-button" />
		<button v-on:click="emitAdvanceSignal" class="footnote-button"><footnote-message-component /></button>
		<skip-button-component v-if="isSkipButtonInFootnote" class="footnote-button" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';
import FootnoteMessageComponent from '@/components/experiment/footnote/footnote-message.component.vue';
import GoBackButtonComponent from '@/components/experiment/element/go-back-button.component.vue';
import SkipButtonComponent from '@/components/experiment/element/skip-button.component.vue';

export default {
	components: {
		FootnoteMessageComponent,
		GoBackButtonComponent,
		SkipButtonComponent,
	},
	computed: {
		...mapGetters('experiment', ['isSkipButtonInFootnote', 'isGoBackButtonInFootnote']),
	},
	methods: {
		emitAdvanceSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_ADVANCE_REQUEST);
		},
	},
};
</script>

<style scoped>
.button-flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	flex-wrap: nowrap;
}

.footnote-button {
	font-size: calc(1vh + 1vw);
	color: black;
	background-color: rgb(200, 200, 200);
	border: 3px solid rgb(185, 185, 185);
	margin: 10px;
	/* width: initial; */
	height: initial;
	padding: 15px;
	flex: 1;
}
</style>
