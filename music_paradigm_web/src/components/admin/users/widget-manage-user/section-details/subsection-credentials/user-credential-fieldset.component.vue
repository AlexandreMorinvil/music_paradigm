<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Username" for="username" />
		<TemplateFieldInputComponent v-bind:value="userEditionUsername" v-on:edit="editUserEditionUsername"
			:inputAttributes="{
				type: 'text',
				name: 'username',
				autocomplete: 'off',
				placeholder: 'Insert username'
			}" />

		<TemplateFieldLabelComponent text="Password" for="password" />
		<div class="password-input-area">
			<TemplateFieldInputComponent v-bind:value="userEditionPassword" v-on:edit="editUserEditionPassword"
				:inputAttributes="{
					type: isPasswordSecret ? 'password' : 'text',
					name: 'password',
					autocomplete: 'off',
					placeholder: 'Insert password'
				}" />
			<TemplateButtonComponent :color="isPasswordSecret ? 'turquoise' : 'blue'" isSmall
				v-on:click="toogleIsPasswordSecret" :text="isPasswordSecret ? 'Remove secrecy' : 'Make it secret'" />
		</div>
	</TemplateFieldsetComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';

export default {
	components: {
		TemplateButtonComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
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
</style>
