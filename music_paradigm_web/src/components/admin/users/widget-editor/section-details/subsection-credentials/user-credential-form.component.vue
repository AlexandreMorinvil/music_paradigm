<template>
	<div class="form-area">
		<form @submit.prevent="" class="label-input-spacing">
			<label for="user">Username </label>
			<input type="text" v-model="username" name="user" autocomplete="new-username" placeholder="Insert username" />

			<label for="password">Password </label>
			<div class="password-input-area">
				<input :type="isPasswordSecret ? 'password' : 'text'" v-model="password" name="password"
					autocomplete="new-password" placeholder="Insert password" />
				<button class="widget-button small" :class="isPasswordSecret ? 'turquoise' : 'blue'"
					v-on:click="toogleIsPasswordSecret">
					{{ isPasswordSecret ? 'Remove secrecy' : 'Make it secret' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { mapGetters, mapMutations } from 'vuex';

export default {
	computed: {
		...mapGetters('managementUsers/edition', [
			'userEditionIsPasswordSecret',
			'userEditionPassword',
			'userEditionUsername',
		]),
		isPasswordSecret: {
			get() {
				return this.userEditionIsPasswordSecret;
			},
			set(value) {
				this.editUserEditionIsPasswordSecret(value);
			},
		},
		password: {
			get() {
				return this.userEditionPassword;
			},
			set(value) {
				this.editUserEditionPassword(value);
			},
		},
		username: {
			get() {
				return this.userEditionUsername;
			},
			set(value) {
				this.editUserEditionUsername(value);
			},
		},
	},
	methods: {
		...mapMutations('managementUsers/edition', [
			'editUserEditionIsPasswordSecret',
			'editUserEditionPassword',
			'editUserEditionUsername',
		]),
		toogleIsPasswordSecret() {
			this.isPasswordSecret = !this.isPasswordSecret;
		}
	},
};
</script>

<style scoped>
.password-input-area {
	display: grid;
	grid-template-columns: 250px 1fr;
}


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
