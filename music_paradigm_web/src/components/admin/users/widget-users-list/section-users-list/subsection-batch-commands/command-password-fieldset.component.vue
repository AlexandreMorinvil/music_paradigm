<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Password" for="batch-command-password" />
		<div class="password-input-area">
			<TemplateFieldInputComponent v-bind:value="usersBatchCommandPassword" v-on:edit="editUsersBatchCommandPassword"
				:inputAttributes="{
					type: usersBatchCommandIsPasswordSecret ? 'password' : 'text',
					name: 'batch-command-password',
					autocomplete: 'off',
					placeholder: 'No password'
				}" />
			<TemplateButtonComponent :color="usersBatchCommandIsPasswordSecret ? 'turquoise' : 'blue'" isSmall
				v-on:click="toogleIsPasswordSecret"
				:text="usersBatchCommandIsPasswordSecret ? 'Remove secrecy' : 'Make it secret'" />
		</div>
	</TemplateFieldsetComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';

export default {
	components: {
		TemplateButtonComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/batchCommand', [
			'usersBatchCommandIsPasswordSecret',
			'usersBatchCommandPassword',
		]),
	},
	methods: {
		...mapMutations('managementUsers/batchCommand', [
			'editUsersBatchCommandIsPasswordSecret',
			'editUsersBatchCommandPassword'
		]),
		toogleIsPasswordSecret() {
			this.editUsersBatchCommandIsPasswordSecret(!this.usersBatchCommandIsPasswordSecret);
		},
	},
};
</script>

<style scoped>
.password-input-area {
	display: grid;
	grid-template-columns: 250px 1fr;
}
</style>
