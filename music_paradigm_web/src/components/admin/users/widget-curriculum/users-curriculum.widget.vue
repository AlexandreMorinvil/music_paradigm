<template>
	<div id="users-editor" class="widget widget-bg">
		<users-curriculum-form-component class="editor-position inner-widget" ref="curriculumForm" />

		<div class="submission-buttons-position">
			<button v-on:click="assignSelectedToForm" class="widget-button blue" :class="{ isRevertButtonActive: 'inactive' }">Revert</button>
			<button v-on:click="submitCurriculumToAssign" class="widget-button green" :class="{ isRevertButtonActive: 'inactive' }">Assign</button>
			<button v-on:click="submitParametersToUpdate" class="widget-button blue">Update Program</button>
			<button v-on:click="submitProgressionToReset" class="widget-button red">Reset Progression</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import UsersCurriculumFormComponent from './users-curriculum-form.component.vue';

export default {
	components: {
		UsersCurriculumFormComponent,
	},
	computed: {
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId']),
		isRevertButtonActive() {
			return this.$refs.curriculumForm.wasCurriculumModified;
		},
		isAssignButtonActive() {
			return this.$refs.curriculumForm.wasCurriculumModified;
		},
	},
	methods: {
		...mapActions('curriculums', ['fetchAllCurriculumHeaders']),
		...mapActions('users', ['assignCurriculum', 'updateProgression', 'resetProgression']),
		bundleUserCurriculumInformation() {
			return this.$refs.curriculumForm.bundleCurriculumForm();
		},
		assignSelectedToForm() {
			if (!this.isRevertButtonActive) return;
			this.$refs.editorForm.assignSelectedToForm();
		},
		submitCurriculumToAssign() {
			if (!this.isAssignButtonActive) return;
			const curriculumParameters = this.bundleUserCurriculumInformation();
			this.assignCurriculum(curriculumParameters);
		},
		// submitUserToUpdate() {
		// 	const answer = window.confirm('Are your sure you want to edit the user(s)?');
		// 	if (answer) {
		// 		const userToCreate = this.bundleUserCurriculumInformation();
		// 		this.updateUser({
		// 			id: this.userSelectedId,
		// 			user: userToCreate,
		// 		});
		// 	}
		// },
		// submitProgressionToReset() {
		// 	const answer = window.confirm('Are your sure you want to reset the progression of this user?');
		// 	// if (answer) this.deleteUser(this.userSelectedId);
		// },
		// handleRevert() {
		// 	this.assignSelectedToForm();
		// },
		// handleUnselection() {
		// 	this.unsetSelectedUser();
		// },
	},
	beforeMount() {
		this.fetchAllCurriculumHeaders();
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
		'editor'
		'submission-btn';
}
</style>
