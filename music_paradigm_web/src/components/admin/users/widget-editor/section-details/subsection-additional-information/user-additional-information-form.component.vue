<template>
	<div class="form-area">
		<form @submit.prevent="" class="label-input-spacing">

			<label for="title">Group </label>
			<input list="user-group" type="text" v-model="group" name="title" autocomplete="new-group"
				placeholder="Insert group" />
			<datalist id="user-group">
				<option v-for="(group, index) in usersExistingUserGroupsList" :key="index" :value="group" />
			</datalist>

			<label for="text">Note</label>
			<textarea v-model="note" name="text" row="2" placeholder="Take notes about the user in this field" />

			<label for="title">Tags </label>
			<div v-for="(tag, index) in tags" :key="index" class="tag-input-area">
				<input type="text" v-on:change="() => editUserEditionTag(tag, index)" v-bind="userEditionTags"
					:name="`tag ${index + 1}`" autocomplete="new-tag" placeholder="Insert tag" />
				<button class="widget-button small red" v-on:click="() => deleteTag(index)"> Delete </button>
			</div>
			<button class="widget-button small blue grid-right-align" v-on:click="addTag"> Add Tag </button>
		</form>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
	computed: {
		...mapGetters('managementUsers', ['usersExistingUserGroupsList']),
		...mapGetters('managementUsers/edition', [
			'userEditionGroup',
			'userEditionNote',
			'userEditionTags',
		]),
		group: {
			get() {
				return this.userEditionGroup;
			},
			set(value) {
				this.editUserEditionGroup(value);
			},
		},
		note: {
			get() {
				return this.userEditionNote;
			},
			set(value) {
				this.editUserEditionNote(value);
			},
		},
		tags() {
			return this.userEditionTags;
		},
	},
	methods: {
		...mapActions('managementUsers', ['getExistingUserGroupsList']),
		...mapActions('managementUsers/edition', [
			'addUserEditionTag',
			'deleteUserEditionTag',
		]),
		...mapMutations('managementUsers/edition', [
			'editUserEditionGroup',
			'editUserEditionNote',
			'editUserEditionTag',
		]),
		addTag() {
			this.addUserEditionTag();
		},
		deleteTag(index) {
			this.deleteUserEditionTag(index);
		},
	},
	beforeMount() {
		this.getExistingUserGroupsList();
	},
};
</script>

<style scoped>
.form-area {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.label-input-spacing {
	display: grid;
	gap: 4px;
	grid-template-columns: 250px 400px;
}

.tag-input-area {
	display: grid;
	grid-template-columns: 4fr 1fr;
	grid-column: 2;
}

.grid-right-align {
	grid-column: 2;
}

label {
	min-width: 250px;
	padding-right: 20px;
	text-align: right;
	white-space: nowrap;
}

select {
	min-width: fit-content;
}
</style>
