<template>
	<div class="button-flex">
		<go-back-button-component v-if="isGoBackButtonInFootnote" class="task-button" />
		<button v-on:click="emitAdvanceSignal" class="task-button"><footnote-message-component /></button>
		<skip-button-component v-if="isSkipButtonInFootnote" class="task-button" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
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
</style>
