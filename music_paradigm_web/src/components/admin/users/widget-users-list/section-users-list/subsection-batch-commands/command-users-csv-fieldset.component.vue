<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="batch-command-group" text="Csv file with users list" />
		<TemplateFieldInputFileComponent v-bind:file="usersBatchCommandCsvFile"
			v-on:edit="setUsersBatchCommandCsvFile" :inputAttributes="{
				name: 'users-creation-csv',
				accept: '.csv',
				placeholder: 'Insert csv file',
			}" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateFieldInputFileComponent from '@/components/admin/template/template-field-input-file.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';

export default {
	components: {
		TemplateFieldInputFileComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommandCsvFile']),
	},
	methods: {
		...mapActions('managementUsers/batchCommand', ['setUsersBatchCommandCsvFile']),
	},
};
</script>

<style scoped></style>
