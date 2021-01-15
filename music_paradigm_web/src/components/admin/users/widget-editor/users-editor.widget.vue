<template>
	<div id="users-editor" class="widget widget-bg">
		<div class="edition-buttons-position">
			<button v-on:click="handleRevert" class="widget-button blue">Revert</button>
			<button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
		</div>

		<users-editor-form-component class="editor-position inner-widget" ref="editorForm" />

		<div class="submission-buttons-position">
			<form submit.prevent ref="upload" style="display: none">
				<input type="file" id="myfile" name="myfile" v-on:change="handleUploadUsers" ref="fileInput" />
			</form>
			<button class="widget-button inactive">Upload</button>
			<button v-on:click="submitUserToCreate" class="widget-button green">Create</button>
			<button v-on:click="submitUserToUpdate" class="widget-button blue">Update</button>
			<button v-on:click="submitUserToDelete" class="widget-button red">Delete</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import UsersEditorFormComponent from './users-editor-form.component.vue';

export default {
	components: {
		UsersEditorFormComponent,
	},
	computed: {
		...mapGetters('curriculums', ['curriculumsHeadersList']),
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId']),
	},
	methods: {
		...mapActions('curriculums', ['fetchAllCurriculumHeaders']),
		...mapActions('users', ['unsetSelectedUser', 'updateUser', 'deleteUser']),
		bundleUserFromForm() {
			return this.$refs.editorForm.bundleUserFromForm();
		},
		assignSelectedToForm() {
			this.$refs.editorForm.assignSelectedToForm();
		},
		submitUserToCreate() {
			this.$emit('create-user');
		},
		submitUserToUpdate() {
			const answer = window.confirm('Are your sure you want to edit the user(s)?');
			if (answer) {
				const userToCreate = this.bundleUserFromForm();
				this.updateUser({
					id: this.userSelectedId,
					user: userToCreate,
				});
			}
		},
		submitUserToDelete() {
			const answer = window.confirm('Are your sure you want to delete the user(s)?');
			if (answer) this.deleteUser(this.userSelectedId);
		},
		handleRevert() {
			this.assignSelectedToForm();
		},
		handleUnselection() {
			this.unsetSelectedUser();
		},
		handleUploadUsers() {
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
