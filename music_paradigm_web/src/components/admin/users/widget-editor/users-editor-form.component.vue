<template>
	<form class="form-grid" @submit.prevent>
		<div class="username-area input">
			<label for="username">
				Username : <span class="selected-element-text">{{ userSelectedUsernameDisplay }}</span>
			</label>
			<input type="text" v-model="username" name="username" autocomplete="new-username" placeholder="Insert new username" />
		</div>
		<div class="email-area input">
			<label for="email">
				Email : <span class="selected-element-text">{{ userSelectedEmailDisplay }}</span>
			</label>
			<input type="email" v-model="email" name="email" autocomplete="new-email" placeholder="Insert new email" />
		</div>

		<div class="password-area input">
			<label for="password">
				Password : <span class="selected-element-text">{{ userSelectedPasswordDisplay }}</span>
			</label>
			<input type="password" v-model="password" name="password" autocomplete="new-password" placeholder="Insert new password" />
		</div>

		<div class="firstname-area input">
			<label for="firstName">
				First Name : <span class="selected-element-text">{{ userSelectedFirstNameDisplay }}</span>
			</label>
			<input type="text" v-model="firstName" name="firstName" autocomplete="new-first-name" placeholder="Insert new first name" />
		</div>
		<div class="middlename-area input">
			<label for="middleName">
				Middle Name : <span class="selected-element-text">{{ userSelectedMiddleNameDisplay }}</span>
			</label>
			<input type="text" v-model="middleName" name="middleName" autocomplete="new-middle-name" placeholder="Insert new middle name" />
		</div>
		<div class="lastname-area input">
			<label for="lastName">
				Last Name : <span class="selected-element-text">{{ userSelectedLastNameDisplay }} </span>
			</label>
			<input type="text" v-model="lastName" name="lastName" autocomplete="new-last-name" placeholder="Insert new last name" />
		</div>

		<div class="curriculum-area input">
			<label for="curriculum">
				Curriculum : <span class="selected-element-text">{{ userSelectedCurriculumDisplay }}</span>
			</label>
			<select name="curriculum-reference" v-model="curriculum">
				<option :value="null">-- No curriculum is assigned --</option>
				<option v-for="(reference, index) in curriculumsReferences" :key="index" :value="curriculumsReferences[index]._id">
					{{ curriculumsReferences[index].title }}
				</option>
			</select>
		</div>

		<div class="tags-area">
			<div class="tags-label-area">
				<button v-on:click="addTag()" class="widget-button small blue">Add</button>
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
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			id: '',
			username: '',
			password: '',
			email: '',
			firstName: '',
			middleName: '',
			lastName: '',
			tags: [],
			curriculum: null,
		};
	},
	computed: {
		...mapGetters('curriculums', ['curriculumsHeadersList']),
		...mapGetters('users', [
			'hasSelectedUser',
			'userSelectedId',
			'userSelectedUsername',
			'userSelectedEmail',
			'userSelectedFirstName',
			'userSelectedMiddleName',
			'userSelectedLastName',
			'userSelectedTags',
			'userSelectedCurriculum',
		]),
		curriculumsReferences() {
			return this.curriculumsHeadersList;
		},
		userSelectedUsernameDisplay() {
			return this.hasSelectedUser ? this.userSelectedUsername || '---' : '';
		},
		userSelectedEmailDisplay() {
			return this.hasSelectedUser ? this.userSelectedEmail || '---' : '';
		},
		userSelectedPasswordDisplay() {
			return this.hasSelectedUser ? '***' : '';
		},
		userSelectedFirstNameDisplay() {
			return this.hasSelectedUser ? this.userSelectedFirstName || '---' : '';
		},
		userSelectedMiddleNameDisplay() {
			return this.hasSelectedUser ? this.userSelectedMiddleName || '---' : '';
		},
		userSelectedLastNameDisplay() {
			return this.hasSelectedUser ? this.userSelectedLastName || '---' : '';
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
		userSelectedCurriculumDisplay() {
			return this.hasSelectedUser ? this.getCurriculumTitleFromList(this.userSelectedCurriculum) || '---' : '';
		},
	},
	methods: {
		...mapActions('curriculums', ['fetchAllCurriculumHeaders']),
		bundleUserFromForm() {
			return {
				username: this.username,
				password: this.password,
				email: this.email,
				firstName: this.firstName,
				middleName: this.middleName,
				lastName: this.lastName,
				tags: this.tags,
				curriculum: this.curriculum,
			};
		},
		getCurriculumTitleFromList(id) {
			const curriculum = this.curriculumsHeadersList.filter((obj) => {
				return obj._id === id;
			});
			if (curriculum[0]) return curriculum[0].title;
			else return '';
		},
		addTag() {
			this.tags.push('');
		},
		removeTag(index) {
			this.tags.splice(index, 1);
		},
		assignFormId(id) {
			this.id = id;
		},
		assignFormUsername(username) {
			this.username = username;
		},
		assignFormEmail(email) {
			this.email = email;
		},
		assignFormPassword(password) {
			this.password = password;
		},
		assignFormFirstName(firstName) {
			this.firstName = firstName;
		},
		assignFormMiddleName(middleName) {
			this.middleName = middleName;
		},
		assignFormLastName(lastName) {
			this.lastName = lastName;
		},
		assignFormTags(tags) {
			this.tags = Array.isArray(tags) ? JSON.parse(JSON.stringify(tags)) : [];
		},
		assignFormCurriculum(curriculum) {
			this.curriculum = curriculum;
		},
		assignSelectedToForm() {
			this.assignFormId(this.userSelectedId);
			this.assignFormUsername(this.userSelectedUsername);
			this.assignFormEmail(this.userSelectedEmail);
			this.assignFormFirstName(this.userSelectedFirstName);
			this.assignFormMiddleName(this.userSelectedMiddleName);
			this.assignFormLastName(this.userSelectedLastName);
			this.assignFormTags(this.userSelectedTags);
			this.assignFormCurriculum(this.userSelectedCurriculum);
		},
		clearForm() {
			this.assignFormId('');
			this.assignFormUsername('');
			this.assignFormEmail('');
			this.assignFormPassword('');
			this.assignFormFirstName('');
			this.assignFormMiddleName('');
			this.assignFormLastName('');
			this.assignFormTags([]);
			this.assignFormCurriculum(null);
		},
	},
	beforeMount() {
		this.fetchAllCurriculumHeaders();
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
		'username username username email email email'
		'password password password password password password'
		'firstname firstname middlename middlename lastname lastname'
		'curriculum curriculum curriculum curriculum curriculum curriculum'
		'tags tags tags tags tags tags';
}

.username-area {
	grid-area: username;
}

.email-area {
	grid-area: email;
}

.password-area {
	grid-area: password;
}

.firstname-area {
	grid-area: firstname;
}

.middlename-area {
	grid-area: middlename;
}

.lastname-area {
	grid-area: lastname;
}

.curriculum-area {
	grid-area: curriculum;
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
