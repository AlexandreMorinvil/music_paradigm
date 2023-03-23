<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Associative Id" />
		<TemplateFieldOutputComponent :value="progressionSessionSelectionAssociativeId"
			:complementaryValue="progressionSessionSelectionAssociativeIdOrdinalNumber" />

			<TemplateFieldLabelComponent text="Title" />
		<TemplateFieldOutputComponent :value="progressionSessionSelectionTitle" />

		<!-- TODO: Implement an optimized way to retrieve the full name of the task, if possible, so that we can 
			display it here. 
		<TemplateFieldLabelComponent text="Task" />
		<TemplateFieldOutputComponent :value="" /> -->
	</TemplateFieldsetComponent>
</template>

<script>
// import { dateHandler, durationHandler } from '@/_helpers';
import { mapGetters } from 'vuex';


import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';
import TemplateFieldOutputComponent from '@/components/admin/templates/template-field-output.component.vue';

export default {
	components: {
		TemplateFieldLabelComponent,
		TemplateFieldOutputComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/sessions/selection', [
			'progressionSessionSelectionAssociativeId',
			'progressionSessionSelectionAssociativeIdOrdinalNumber',
			'progressionSessionSelectionTitle',
		]),
	},
};
</script>

<style scoped></style>
