<template>
	<div id="login-box" class="login-box">
		<div id="login-box-title" class="login-box-title">
			<h1>{{ $t('application-component.login-prompt.login') }}</h1>
		</div>

		<div id="login-box-form" class="login-box-form">
			<loader-circular-component v-if="isLoggingIn" class="loader" />
			<form v-else @submit.prevent="handleSubmit">
				<div>
					<label for="username">{{ $t('application-component.login-prompt.username') }}</label>
					<input
						type="text"
						v-on:blur="setUsernameHadFocus"
						v-bind:class="{ 'input-text-danger': hasUsernameError }"
						v-model="username"
						name="username"
						:placeholder="$t('application-component.login-prompt.enterUsername')"
					/>
					<div v-if="hasUsernameError" class="invalid-input">
						{{ usernameValidityMessage }}
					</div>
				</div>
				<div>
					<label for="password">{{ $t('application-component.login-prompt.password') }}</label>
					<input type="password" v-model="password" name="password" :placeholder="$t('application-component.login-prompt.enterPassword')" />
				</div>
				<div>
					<button class="login-button">{{ $t('application-component.login-prompt.login') }}</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	components: {
		LoaderCircularComponent,
	},
	data() {
		return {
			username: '',
			password: '',
			hasFocusedOnUsername: false,
			hasAttemptedSubmit: false,
		};
	},
	computed: {
		...mapGetters('account', ['isLoggingIn']),
		hasUsernameError() {
			return (this.hasAttemptedSubmit || this.hasFocusedOnUsername) && !this.username;
		},
		usernameValidityMessage() {
			if (!this.username) return this.$t('application-component.login-prompt.username-required');
			else return '';
		},
	},
	methods: {
		...mapActions('account', ['login']),
		setUsernameHadFocus() {
			this.hasFocusedOnUsername = true;
		},
		handleSubmit() {
			this.hasAttemptedSubmit = true;
			const { username, password } = this;
			if (username) {
				this.login({ username, password });
			}
		},
	},
};
</script>

<style scoped>
#login-box {
	display: block;
	height: auto;
	width: 500px;
	box-sizing: border-box;
	background-color: rgb(20, 20, 20);

	border-collapse: collapse;
	border-color: rgb(35, 35, 35);
	border-width: 1px;
	border-style: solid;
	border-radius: 5px;

	color: rgb(200, 200, 200);
}

.login-box-title {
	background-color: rgb(35, 35, 35);
	height: auto;
	width: 100%;
	border-radius: 5px 5px 0 0;
	padding: 20px;
}

.login-box-form {
	display: block;
	justify-content: center;
	align-content: center;
	padding: 20px;
}

.login-box-form label {
	display: block;
	padding: 10px 0 10px;
	font-size: 1em;
}

.login-box-form input {
	display: block;
	width: 100%;
	padding: 0.4em 0;
	border-radius: 4px;
	padding-left: 10px;
	font-size: 0.8em;
}

.loader {
	width: 300px;
	height: 300px;
	margin: auto;
}

.form-note-text {
	text-align: right;
	font-size: 0.75rem;
	margin: 10px 0 10px;
}

.invalid-input {
	color: red;
	padding-top: 10px;
	font-size: 0.5em;
}

.input-text-danger {
	border-width: 3px;
	border-color: red;
	background-color: rgba(255, 200, 200, 1);
}

.login-button {
	background-color: rgb(0, 100, 255);
	border: 2px solid rgb(40, 126, 255);
	color: white;
	width: 100%;
	border-radius: 5px;
	padding: 10px 40px;
	margin-top: 30px;
	text-align: center;
	display: inline-block;
	font-size: 1em;
	cursor: pointer;
}

.login-button:hover {
	background-color: rgb(0, 80, 200);
	border: 2px solid rgb(0, 100, 255);
	color: white;
}

h1 {
	font-size: 1.5em;
}

input {
	background-color: white;
	border: 1px grey solid;
}
</style>
