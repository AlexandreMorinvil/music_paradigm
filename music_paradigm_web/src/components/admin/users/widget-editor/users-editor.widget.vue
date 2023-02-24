<template>
	<div id="users-editor" class="widget widget-bg">
		<!-- <div class="edition-buttons-position">
			<button v-on:click="handleRevert" class="widget-button blue" :class="{ inactive: !isRevertButtonActive }">Revert</button>
			<button v-on:click="handleUnselection" class="widget-button turquoise" :class="{ inactive: !isUnselectButtonActive }">Unselect</button>
		</div> -->

		<UserDetailsSection />

		<!-- <div class="submission-buttons-position">
			<button v-on:click="submitUserToCreate" class="widget-button green">Create</button>
			<button v-on:click="submitUserToUpdate" class="widget-button blue" :class="{ inactive: !isUpdateButtonActive }">Update</button>
			<button v-on:click="submitUserToDelete" class="widget-button red" :class="{ inactive: !isDeleteButtonActive }">Delete</button>
		</div> -->
	</div>
</template>

<script>
import '@/styles/widget-template.css';

// import { mapActions, mapGetters } from 'vuex';

import UserDetailsSection from './section-details/user-details.section.vue';

export default {
	components: {
		UserDetailsSection,
	},
	// data() {
	// 	return {
	// 		isRevertButtonActive: false,
	// 		isUpdateButtonActive: false,
	// 	};
	// },
	// computed: {
	// 	...mapGetters('managementCurriculums', ['curriculumsList']),
	// 	...mapGetters('managementUsers', ['hasSelectedUser', 'userSelectedId']),
	// 	isUnselectButtonActive() {
	// 		return this.hasSelectedUser;
	// 	},
	// 	isDeleteButtonActive() {
	// 		return this.hasSelectedUser;
	// 	},
	// },
	// methods: {
	// 	...mapActions('managementCurriculums', ['fetchAllCurriculumHeaders']),
	// 	...mapActions('managementUsers',['unsetSelectedUser', 'updateUser', 'deleteUser']),
	// 	bundleUserFromForm() {
	// 		return this.$refs.editorForm.bundleUserFromForm();
	// 	},
	// 	assignSelectedToForm() {
	// 		this.$refs.editorForm.assignSelectedToForm();
	// 	},
	// 	submitUserToCreate() {
	// 		this.$emit('create-user');
	// 	},
	// 	submitUserToUpdate() {
	// 		if (!this.isUpdateButtonActive) return;
	// 		const answer = window.confirm('Are your sure you want to edit the user(s)?');
	// 		if (answer) {
	// 			const userToCreate = this.bundleUserFromForm();
	// 			this.updateUser({
	// 				id: this.userSelectedId,
	// 				user: userToCreate,
	// 			});
	// 		}
	// 	},
	// 	submitUserToDelete() {
	// 		if (!this.isDeleteButtonActive) return;
	// 		const answer = window.confirm('Are your sure you want to delete the user(s)?');
	// 		if (answer) this.deleteUser(this.userSelectedId);
	// 	},
	// 	handleRevert() {
	// 		if (!this.isRevertButtonActive) return;
	// 		this.assignSelectedToForm();
	// 	},
	// 	handleUnselection() {
	// 		if (!this.isUnselectButtonActive) return;
	// 		this.unsetSelectedUser();
	// 	},
	// 	evaluateIsRevertButtonActive(wasFormModified) {
	// 		this.isRevertButtonActive = wasFormModified;
	// 		this.isUpdateButtonActive = this.hasSelectedUser && wasFormModified;
	// 	},
	// },
	// mounted() {
	// 	this.$watch(() => this.$refs.editorForm.wasFormModified, this.evaluateIsRevertButtonActive, { immediate: true });
	// },
};
</script>

<style scoped>
/* .edition-buttons-position {
	grid-area: edition-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
} */

/* .editor-position {
	grid-area: editor;
} */

/* .submission-buttons-position {
	grid-area: submission-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr;
} */

/* .widget {
	grid-template-columns: 100%;
	grid-template-areas:
		'edition-btn'
		'editor'
		'submission-btn';
} */
</style>
