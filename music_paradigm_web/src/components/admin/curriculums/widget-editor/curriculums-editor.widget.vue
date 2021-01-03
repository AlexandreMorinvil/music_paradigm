<template>
	<div id="users-editor" class="widget widget-bg">
		<div class="edition-buttons-position">
			<button v-on:click="handleRevert" class="widget-button blue">Revert</button>
			<button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
		</div>

		<curriculums-editor-form-component class="editor-position inner-widget" ref="editorForm" />

		<div class="submission-buttons-position">
			<form submit.prevent ref="upload" style="display: none">
				<input type="file" id="myfile" name="myfile" v-on:change="handleUploadCurriculum" ref="fileInput" />
			</form>
			<button v-on:click="$refs.fileInput.click()" class="widget-button blue">Upload</button>
			<button v-on:click="submitCurriculumToCreate" class="widget-button green">Create</button>
			<button v-on:click="submitCurriculumToUpdate" class="widget-button blue">Update</button>
			<button v-on:click="submitUserToDelete" class="widget-button red">Delete</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import CurriculumsEditorFormComponent from './curriculums-editor-form.component.vue';

export default {
	components: {
		CurriculumsEditorFormComponent,
	},
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('curriculums', ['hasSelectedCurriculum', 'curriculumSelectedId']),
	},
	methods: {
		...mapActions('experiments', ['fetchAllExperimentsHeaders']),
		...mapActions('curriculums', ['unsetSelectedCurriculum', 'createCurriculum', 'updateCurriculum', 'deleteCurriculum']),
		bundleUserFromForm() {
			return this.$refs.editorForm.bundleUserFromForm();
		},
		assignSelectedToForm() {
			this.$refs.editorForm.assignSelectedToForm();
		},
		submitCurriculumToCreate() {
			const curriculumToCreate = this.bundleCurrirulumFromForm();
			this.createCurriculum(curriculumToCreate);
		},
		submitCurriculumToUpdate() {
			const answer = window.confirm('Are your sure you want to edit the curriculum?');
			if (answer) {
				const curriculumUpdated = this.bundleCurrirulumFromForm();
				this.updateCurriculum({
					id: this.curriculumSelectedId,
					curriculum: curriculumUpdated,
				});
			}
		},
		submitUserToDelete() {
			const answer = window.confirm('Are your sure you want to delete the curriculum?');
			if (answer) this.deleteCurriculum(this.curriculumSelectedId);
		},
		handleRevert() {
			this.assignSelectedToForm();
		},
		handleUnselection() {
			this.unsetSelectedCurriculum();
		},
		handleUploadCurriculum() {
			console.log('To implement');
		},
	},
};
</script>

<style scoped>
.edition-buttons-position {
	grid-area: edition-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
}

.editor-position {
	grid-area: editor;
	max-height: 600px;
	overflow: auto;
}

.submission-buttons-position {
	grid-area: submission-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
}

.widget {
	grid-template-columns: 100%;
	grid-template-areas:
		'edition-btn'
		'editor'
		'submission-btn';
}
</style>
