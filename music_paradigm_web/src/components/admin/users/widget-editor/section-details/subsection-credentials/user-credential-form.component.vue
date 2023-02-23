<template>
	<div class="form-area">
		<form @submit.prevent="" class="label-input-spacing">
			<label for="title">Username </label>
			<input type="text" v-model="username" name="title" autocomplete="new-username" placeholder="Insert username" />
		</form>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { mapGetters, mapMutations } from 'vuex';

export default {
	computed: {
		...mapGetters('managementUsers/edition', [
			'userEditionUsername',
		]),
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
			'editUserEditionUsername',
		]),
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

label {
	min-width: 250px;
	white-space: nowrap;
}

select {
	min-width: fit-content;
}
</style>
