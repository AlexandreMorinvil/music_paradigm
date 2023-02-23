<template>
	<form class="form-grid" @submit.prevent>
		<div class="username-area input">
			<label for="username">
				Username : <span class="selected-element-text">{{ userSelectedUsernameDisplay }}</span>
			</label>
			<input type="text" v-model="username" name="username" autocomplete="new-username" placeholder="Insert new username" />
		</div>

		<div class="password-area input">
			<label for="password">
				Password : <span class="selected-element-text">{{ userSelectedPasswordDisplay }}</span>
			</label>
			<input type="password" v-model="password" name="password" autocomplete="new-password" placeholder="Insert new password" />
		</div>

		<div class="tags-area">
			<div class="tags-label-area">
				<button v-on:click="addTag" class="widget-button small blue">Add</button>
				<label style="display: inline" for="tags">
					Tag(s) : <span class="selected-element-text"> {{ userSelectedTagsDisplay }} </span>
				</label>
			</div>
			<div v-for="(tag, index) in tags" :key="index" class="tag-input">
				<button v-on:click="removeTag(index)" class="widget-button small red">Remove</button>
				<input type="text" v-model="tags[index]" name="tags" autocomplete="new-tags" placeholder="Insert new tag name" />
			</div>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			id: '',
			username: '',
			password: '',
			tags: [],
		};
	},
	computed: {
		...mapGetters('managementUsers', [
			'hasSelectedUser',
			'userSelectedId',
			'userSelectedUsername',
			'userSelectedTags',
		]),
		wasFormModified() {
			return (
				this.username !== this.userSelectedUsername ||
				this.password !== '' ||
				!this.areTagArraysEqual
			);
		},
		areTagArraysEqual() {
			if (!Array.isArray(this.tags) || !Array.isArray(this.userSelectedTags) || this.tags.length !== this.userSelectedTags.length) {
				return false;
			}

			const arr1 = this.tags.concat().sort();
			const arr2 = this.userSelectedTags.concat().sort();

			for (let i = 0; i < arr1.length; i++) {
				if (arr1[i] !== arr2[i]) {
					return false;
				}
			}

			return true;
		},
		userSelectedUsernameDisplay() {
			return this.hasSelectedUser ? this.userSelectedUsername || '---' : '';
		},
		userSelectedPasswordDisplay() {
			return this.hasSelectedUser ? '***' : '';
		},
		userSelectedTagsDisplay() {
			if (this.hasSelectedUser) {
				if (this.userSelectedTags.length > 0) {
					let display = '';
					this.userSelectedTags.forEach((element) => {
						display += element + ', ';
					});
					return display.slice(0, -2);
				} else return '---';
			} else return '';
		},
	},
	methods: {
		bundleUserFromForm() {
			return {
				username: this.username,
				password: this.password,
				tags: this.tags,
			};
		},
		addTag() {
			this.tags.push('');
		},
		removeTag(index) {
			this.tags.splice(index, 1);
		},
		assignFormId(id) {
			this.id = id || null;
		},
		assignFormUsername(username) {
			this.username = username || '';
		},

		assignFormPassword(password) {
			this.password = password || '';
		},
		assignFormTags(tags) {
			this.tags = Array.isArray(tags) ? JSON.parse(JSON.stringify(tags)) : [];
		},
		assignSelectedToForm() {
			this.assignFormId(this.userSelectedId);
			this.assignFormUsername(this.userSelectedUsername);
			this.assignFormPassword('');
			this.assignFormTags(this.userSelectedTags);
		},
		clearForm() {
			this.assignFormId('');
			this.assignFormUsername('');
			this.assignFormPassword('');
			this.assignFormTags([]);
		},
	},
	watch: {
		userSelectedId: {
			immediate: true,
			handler: function () {
				this.assignSelectedToForm();
			},
		},
	},
};
</script>

<style scoped>
.form-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-areas:
		'username username username'
		'password password password password password password'
		'tags tags tags tags tags tags';
}

.username-area {
	grid-area: username;
}


.password-area {
	grid-area: password;
}

.input {
	display: grid;
	grid-template-rows: 1fr 1fr;
}

.input > * {
	width: 100%;
}

.tags-area {
	grid-area: tags;
	display: grid;
	grid-gap: 10px;
	margin-top: 15px;
	grid-template-columns: 1fr 1fr;
	grid-template-areas: 'label label';
}

.tags-label-area {
	grid-area: label;
}

.tag-input button {
	min-width: auto;
	width: 100px;
}

.tag-input {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 100px auto;
}
</style>
