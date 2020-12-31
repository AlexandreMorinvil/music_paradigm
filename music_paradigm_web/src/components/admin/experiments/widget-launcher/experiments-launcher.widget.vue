<template>
	<div id="users-editor" class="widget widget-box widget-bg">
		<experiments-parameter-form-component class="editor-position inner-widget inner-widget-bg" ref="curriculumEdition" />

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

import ExperimentsParameterFormComponent from './experiments-parameter-form.component.vue';

export default {
	components: {
		ExperimentsParameterFormComponent,
	},
	computed: {
		...mapGetters('experiments', ['hasExperimentSelection']),
		isRunSelectionButtonActive() {
			return this.hasExperimentSelection;
		},
	},
	methods: {
		...mapActions('experiments', ['startSelectedExperiment']),
		handleExperimentStart() {
			if (this.isRunSelectionButtonActive) this.startSelectedExperiment();
		},
	},
};
</script>

<style scoped>
.edition-buttons-position {
	grid-area: edition-btn;
	display: flex;
	justify-content: center;
	grid-gap: 15px;
	grid-auto-columns: 1fr;
}

.editor-position {
	grid-area: editor;
}

.action-buttons-position {
	grid-area: action-btn;
	display: grid;
	grid-gap: 15px;
	grid-auto-columns: 1fr;
}

.widget {
	grid-template-columns: 100%;
	grid-template-areas:
		'editor'
		'action-btn';
}

.run-button {
	width: 50%;
	margin: auto;
}
</style>
