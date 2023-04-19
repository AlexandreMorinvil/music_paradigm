<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="batch-command-tag" text="Tag" />
		<TemplateFieldInputComponent v-bind:value="usersBatchCommandTag" :datalist="usersListTableSelectionAllTagsList"
			v-on:edit="editUsersBatchCommandTag" :inputAttributes="{
				type: 'text',
				name: 'batch-command-tag',
				autocomplete: 'off',
				placeholder: 'Insert tag'
			}" />

	</TemplateFieldsetComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

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
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommandTag']),
		...mapGetters('managementUsers/listTableSelection', ['usersListTableSelectionAllTagsList']),
	},
	methods: {
		...mapMutations('managementUsers/batchCommand', ['editUsersBatchCommandTag']),
	},
};
</script>

<style scoped></style>
