<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="batch-command-note" text="Note" />
		<TemplateFieldTextareaComponent v-bind:value="usersBatchCommandNote" v-on:edit="editUsersBatchCommandNote"
			:textAreaAttributes="{
				maxlength: 1000,
				name: 'batch-command-note',
				placeholder: 'No note',
				rows: 4
			}" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldTextareaComponent from '@/components/admin/template/template-field-textarea.component.vue';

export default {
	components: {
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
		TemplateFieldTextareaComponent,
	},
	computed: {
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommandNote']),
	},
	methods: {
		...mapMutations('managementUsers/batchCommand', ['editUsersBatchCommandNote']),
	},
};
</script>

<style scoped></style>
