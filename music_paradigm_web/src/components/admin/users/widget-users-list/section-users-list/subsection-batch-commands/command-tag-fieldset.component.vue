<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="batch-command-tag" text="Tags" />
		<TemplateFieldInputComponent v-bind:value="usersBatchCommandTag" v-on:edit="editUsersBatchCommandTag"
			:inputAttributes="{
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
	},
	methods: {
		...mapMutations('managementUsers/batchCommand', ['editUsersBatchCommandTag']),
	},
};
</script>

<style scoped></style>
