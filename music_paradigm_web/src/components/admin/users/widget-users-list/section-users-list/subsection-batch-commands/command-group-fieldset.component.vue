<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="batch-command-group" text="Group" />
		<TemplateFieldInputComponent v-bind:value="usersBatchCommandGroup" v-on:edit="editUsersBatchCommandGroup"
			:datalist="usersExistingUserGroupsList" :inputAttributes="{
				type: 'text',
				name: 'batch-command-group',
				autocomplete: 'off',
				placeholder: 'No group',
			}" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';

export default {
	components: {
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers', ['usersExistingUserGroupsList']),
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommandGroup']),
	},
	methods: {
		...mapActions('managementUsers', ['getExistingUserGroupsList']),
		...mapMutations('managementUsers/batchCommand', ['editUsersBatchCommandGroup']),
	},
	beforeMount() {
		this.getExistingUserGroupsList();
	},
};
</script>

<style scoped></style>
