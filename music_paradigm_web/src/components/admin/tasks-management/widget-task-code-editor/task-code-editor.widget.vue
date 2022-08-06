<template>
	<div id="experiments-workshop" class="widget widget-bg">
		<div class="edition-buttons-position">
			<button v-on:click="handleCompilation" class="widget-button blue">Compile</button>
			<button v-on:click="handleReversion" class="widget-button blue">Revert</button>
			<button v-on:click="handleClearance" class="widget-button blue">Clear</button>
			<button v-on:click="handleUnselection" class="widget-button turquoise">Unselect</button>
		</div>

		<div class="editor-position code-context">
			<div class="editor-size-fix">
				<code-editor v-on:ready="writeEditionToEditorChanges" :readOnly="false" ref="codeEditor" />
			</div>
		</div>

		<div class="create-position">
			<button v-on:click="submitExperimentToCreate" class="widget-button green">Create</button>
			<button v-on:click="submitExperimentToUpdate" class="widget-button blue">Update</button>
			<button v-on:click="submitExperimentToDelete" class="widget-button red">Delete</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import CodeEditor from '@/components/admin/TextEditor.vue';
import { validator } from '@/_helpers';

export default {
	components: {
		codeEditor: CodeEditor,
	},
	data() {
		return {
			isEditorModified: false,
		};
	},
	computed: {
		...mapGetters('management/tasks', [
			'experimentEdited',
			'selectedId',
			'hasCompiledEdition'
		]),
		editionContent() {
			return this.$refs.codeEditor.code;
		},
	},
	methods: {
		...mapActions('alert', ['setErrorAlert', 'setInformationAlert']),
		...mapActions('management/tasks', [
			'compileExperiment',
			'attemptExperimentCompilation',
			'unsetSelectionExperiment',
			'createExperiment',
			'updateExperiment',
			'deleteExperiment',
		]),
		setEditorContent(textContent) {
			this.$refs.codeEditor.setValue(textContent);
		},
		submitExperimentToCreate() {
			this.createExperiment(this.experimentEdited);
		},
		submitExperimentToUpdate() {
			const answer = window.confirm(
				'Changing this experiment will affect all the users who will do this experiment in the future. Are your sure you want to modify the experiment?',
			);
			if (answer) {
				this.updateExperiment({
					id: this.selectedId,
					experiment: this.experimentEdited,
				});
			}
		},
		submitExperimentToDelete() {
			const answer = window.confirm(
				'Erasing this experiment will affect all the curriculums that might be including it. Are your sure you want to delete the experiment?',
			);
			if (answer) {
				this.deleteExperiment(this.selectedId);
			}
		},
		handleCompilation() {
			const experimentObject = this.convertEditorTextToObject();
			this.compileExperiment(experimentObject);
		},
		handleReversion() {
			this.setEditorContent(JSON.stringify(this.experimentEdited, null, '\t'));
		},
		handleClearance() {
			this.setEditorContent(JSON.stringify(validator.getMinimalValidExperimentStructure(), null, '\t'));
		},
		handleUnselection() {
			this.unsetSelectionExperiment();
		},
		convertEditorTextToObject() {
			try {
				return JSON.parse(this.editionContent);
			} catch (e) {
				this.setErrorAlert('The JSON syntax of the experiment definition is not valid');
				return {};
			}
		},
		writeEditionToEditorChanges() {
			this.$watch(
				'experimentEdited',
				(newValue) => {
					this.setEditorContent(JSON.stringify(newValue, null, '\t'));
				},
				{ immediate: true },
			);
		},
	},
};
</script>

<style scoped>
.edition-buttons-position {
	grid-area: edition;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
}

.editor-position {
	grid-area: editor;
	background-color: rgb(225, 225, 225);
	color: black;
	display: grid;
}

.create-position {
	grid-area: submission;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
}

.widget {
	grid-template-areas:
		'edition   '
		'editor    '
		'submission';
}

.text-editor-label {
	padding: 10px;
}
</style>
