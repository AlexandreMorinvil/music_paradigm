<template>
	<div id="users-editor" class="widget widget-bg">
		<users-curriculum-form-component class="editor-position inner-widget" ref="userCurriculumForm" />

		<div class="submission-buttons-position">
			<button v-on:click="assignSelectedToForm" class="widget-button blue" :class="{ inactive: !isRevertButtonActive }">Revert</button>
			<button v-on:click="submitCurriculumToAssign" class="widget-button green" :class="{ inactive: !isAssignButtonActive }">
				Assign Curriculum
			</button>
			<button v-on:click="submitParametersToUpdate" class="widget-button blue" :class="{ inactive: !isUpdateButtonActive }">Update Parameters</button>
			<button v-on:click="submitProgressionToReset" class="widget-button red" :class="{ inactive: !isResetButtonActive }">Reset Progression</button>
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
	data() {
		return {
			isRevertButtonActive: false,
			isAssignButtonActive: false,
			isUpdateButtonActive: false,
		};
	},
	computed: {
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId', 'hasCurriculumToSelectedUser']),
		isResetButtonActive() {
			return false; // this.hasSelectedUser && this.hasCurriculumToSelectedUser;
		},
	},
	methods: {
		...mapActions('curriculums', ['fetchAllCurriculumHeaders']),
		...mapActions('users', ['assignCurriculum', 'updateProgression', 'resetProgression']),
		bundleUserCurriculumInformation() {
			return this.$refs.userCurriculumForm.bundleCurriculumForm();
		},
		assignSelectedToForm() {
			if (!this.isRevertButtonActive) return;
			this.$refs.userCurriculumForm.assignSelectedToForm();
		},
		submitCurriculumToAssign() {
			if (!this.isAssignButtonActive) return;
			const curriculumParameters = this.bundleUserCurriculumInformation();
			this.assignCurriculum({ userId: this.userSelectedId, curriculumParameters: curriculumParameters });
		},
		submitParametersToUpdate() {
			if (!this.isUpdateButtonActive) return;
			console.log('update');
		},
		submitProgressionToReset() {
			const answer = window.confirm('Are your sure you want to reset the progression of the selected user(s)?');
			if (answer) this.resetProgression(this.userSelectedId);
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
		evaluateIsRevertButtonActive(wasFormModified) {
			this.isRevertButtonActive = this.hasSelectedUser && wasFormModified;
		},
		evaluateIsAssignButtonActive(wasCurriculumModified) {
			this.isAssignButtonActive = this.hasSelectedUser && wasCurriculumModified;
		},
	},
	beforeMount() {
		this.fetchAllCurriculumHeaders();
	},
	mounted() {
		this.$watch(() => this.$refs.userCurriculumForm.wasFormModified, this.evaluateIsRevertButtonActive, { immediate: true });
		this.$watch(() => this.$refs.userCurriculumForm.wasCurriculumModified, this.evaluateIsAssignButtonActive, { immediate: true });
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
