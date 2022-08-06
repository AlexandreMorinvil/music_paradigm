<template>
	<div id="experiment-launcher" class="widget widget-bg">
		<session-data-form-component class="inner-widget inner-widget-bg" />
		<session-parameters-form-component v-show="needsParameterForm" class="inner-widget inner-widget-bg" />

		<div class="action-buttons-position">
			<button v-on:click="handleExperimentStart" class="widget-button green run-button" :class="isRunSelectionButtonActive || 'inactive'">
				Run Selected Experiment
			</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import SessionDataFormComponent from './session-data-form.component.vue';
import SessionParametersFormComponent from './session-parameters-form.component.vue';

export default {
	components: {
		SessionDataFormComponent,
		SessionParametersFormComponent,
	},
	computed: {
		...mapGetters('management/tasks', ['hasExperimentSelection', 'hasParameterInSelectedExperiment']),
		needsParameterForm() {
			return this.hasParameterInSelectedExperiment;
		},
		isRunSelectionButtonActive() {
			return this.hasExperimentSelection;
		},
	},
	methods: {
		...mapActions('management/tasks', ['startSelectedExperiment']),
		handleExperimentStart() {
			if (this.isRunSelectionButtonActive) this.startSelectedExperiment();
		},
	},
};
</script>

<style scoped>
.widget {
	display: flex;
	flex-direction: column;
}

.action-buttons-position {
	grid-area: action-btn;
	display: grid;
	grid-gap: 15px;
	grid-auto-columns: 1fr;
}

.run-button {
	width: 50%;
	margin: auto;
}
</style>
