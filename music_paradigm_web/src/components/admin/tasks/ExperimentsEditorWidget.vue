<template>
	<div id="experiments-workshop" class="widget widget-bg">
		<div class="edition-buttons-position">
			<button v-on:click="handleCompilation" class="widget-button blue">Compile</button>
			<button v-on:click="handleReversion" class="widget-button blue">Revert</button>
			<button v-on:click="handleClearance" class="widget-button blue">Clear</button>
		</div>

		<div class="selection-buttons-position">
			<button v-on:click="handleCopying" class="widget-button blue">Copy to Editor</button>
			<button v-on:click="handleDeselection" class="widget-button turquoise">Deselect</button>
		</div>

		<div class="editor-position code-context">
			<div class="text-editor-label">Editor : {{ editionStatus }}</div>
			<div class="editor-size-fix">
				<code-editor v-on:ready="writeEditionToEditorChanges" :readOnly="false" ref="codeEditor" />
			</div>
		</div>

		<div class="reference-position code-context">
			<div class="text-editor-label">Selection : {{ selectionStatus }}</div>
			<div class="editor-size-fix">
				<code-editor v-on:ready="writeSelectionToReferenceChanges" :readOnly="true" ref="codeReference" />
			</div>
		</div>

		<div class="create-position">
			<form v-on:submit.prevent="handleSubmit" ref="upload" style="display: none">
				<input type="file" id="myfile" name="myfile" v-on:change="handleUploadExperiment" ref="fileInput" />
			</form>
			<button v-on:click="$refs.fileInput.click()" class="widget-button blue">Upload</button>
			<button v-on:click="submitExperimentToCreate" class="widget-button green">Create</button>
		</div>

		<div class="update-position">
			<button v-on:click="submitExperimentToUpdate" class="widget-button blue">Update</button>
			<button v-on:click="submitExperimentToDelete" class="widget-button red">Delete</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import CodeEditor from '@/components/admin/template/template-code-editor.vue';
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
		...mapGetters('experiments', ['experimentEdited', 'experimentSelected', 'selectedId', 'hasCompiledEdition']),
		editionContent() {
			return this.$refs.codeEditor.code;
		},
		editionStatus() {
			let status = 'EMPTY';
			if (this.hasCompiledEdition) status = 'COMPILED';
			if (this.isEditorModified) status = 'EDITED';
			return status;
		},
		selectionStatus() {
			return 'DISPLAYED BELOW';
		},
	},
	methods: {
		...mapActions('alert', ['setErrorAlert', 'setInformationAlert']),
		...mapActions('experiments', [
			'compileExperiment',
			'attemptExperimentCompilation',
			'clearCompiledExperiment',
			'copySelectionToEdition',
			'unsetSelectionExperiment',
			'createExperiment',
			'updateExperiment',
			'deleteExperiment',
		]),
		setEditorContent(textContent) {
			this.$refs.codeEditor.setValue(textContent);
		},
		setReferenceContent(textContent) {
			this.$refs.codeReference.setValue(textContent);
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
		handleCopying() {
			this.copySelectionToEdition();
		},
		handleDeselection() {
			this.unsetSelectionExperiment();
		},
		handleUploadExperiment(event) {
			const input = event.target;

			function readFileContent(file) {
				const reader = new FileReader();
				return new Promise((resolve, reject) => {
					reader.onload = (loadEvent) => resolve(loadEvent.target.result);
					reader.onerror = (error) => reject(error);
					reader.readAsText(file);
				});
			}

			if (!('files' in input) || !(input.files.length === 1)) {
				this.setErrorAlert('A file must be selected');
				return;
			}

			readFileContent(input.files[0])
				.then((content) => {
					this.$refs.codeEditor.setValue(content);
					this.attemptExperimentCompilation(this.convertEditorTextToObject(content));
				})
				.catch((error) => {
					this.setErrorAlert(error.message);
				})
				.finally(() => {
					this.$refs.upload.reset();
				});
		},
		convertEditorTextToObject() {
			try {
				return JSON.parse(this.editionContent);
			} catch (e) {
				this.setErrorAlert('The JSON syntax of the experiment definition is not valid');
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
		writeSelectionToReferenceChanges() {
			this.$watch(
				'experimentSelected',
				(newValue) => {
					this.setReferenceContent(JSON.stringify(newValue, null, '\t'));
				},
				{ immediate: true },
			);
		},
		notEmplementedYet() {
			this.setInformationAlert('TODO');
			console.log('Not yet ready');
		},
	},
};
</script>

<style scoped>
.edition-buttons-position {
	grid-area: edition-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
}

.selection-buttons-position {
	grid-area: selection-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
}

.editor-position {
	grid-area: editor;
	background-color: rgb(225, 225, 225);
	color: black;
	display: grid;
	/* grid-template-rows: auto; */
}

.reference-position {
	grid-area: reference;
	background-color: rgb(225, 225, 225);
	color: black;
	display: grid;
	/* grid-template-rows: auto; */
}

.create-position {
	grid-area: create;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
}

.update-position {
	grid-area: update;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
}

.widget {
	grid-template-columns: 1fr 1fr;
	/* grid-template-rows: 64pxx; */
	grid-template-areas:
		'edition-btn selection-btn'
		'editor reference'
		'create update';
}

.text-editor-label {
	padding: 10px;
}
</style>
