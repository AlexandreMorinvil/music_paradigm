<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="adjustmentadditionalCompletionsRequired" text="Additional completions required" />
		<TemplateFieldInputComponent v-bind:value="progressionSessionEditionAdjustmentAdditionalCompletionsRequired"
			v-on:edit="editProgressionSessionEditionAdjustmentAdditionalCompletionsRequired"
			:expectedValue="progressionSessionSelectionAdjustmentAdditionalCompletionsRequired" :inputAttributes="{
				type: 'number',
				name: 'adjustmentadditionalCompletionsRequired',
				autocomplete: 'off',
				placeholder: 'Number of additional completions',
				min: 0
			}" />

		<TemplateFieldLabelComponent for="adjustmentDelayInDays" text="Delay pre-availability adjustment" />
		<TemplateFieldInputComponent v-bind:value="progressionSessionEditionAdjustmentDelayInDays"
			v-on:edit="editProgressionSessionEditionAdjustmentDelayInDays"
			:expectedValue="progressionSessionSelectionAdjustmentDelayInDays" :inputAttributes="{
				type: 'number',
				name: 'adjustmentDelayInDays',
				autocomplete: 'off',
				placeholder: 'Number of days to prepone or postpone'
			}" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';

export default {
	components: {
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/sessions/edition', [
			'progressionSessionEditionAdjustmentAdditionalCompletionsRequired',
			'progressionSessionEditionAdjustmentBlockAvailability',
			'progressionSessionEditionAdjustmentConsiderCompleted',
			'progressionSessionEditionAdjustmentDelayInDays',
			'progressionSessionEditionAdjustmentImposeReadyToBeDone',
			'progressionSessionEditionAdjustmentOverlookUniqueInDays',
			'progressionSessionEditionAdjustmentPreponeAvailability',
			'progressionSessionEditionAdjustmentRemoveCompletionLimit',
		]),
		...mapGetters('managementUsers/progressions/sessions/selection', [
			'progressionSessionSelectionAdjustmentAdditionalCompletionsRequired',
			'progressionSessionSelectionAdjustmentBlockAvailability',
			'progressionSessionSelectionAdjustmentConsiderCompleted',
			'progressionSessionSelectionAdjustmentDelayInDays',
			'progressionSessionSelectionAdjustmentImposeReadyToBeDone',
			'progressionSessionSelectionAdjustmentOverlookUniqueInDays',
			'progressionSessionSelectionAdjustmentPreponeAvailability',
			'progressionSessionSelectionAdjustmentRemoveCompletionLimit',
		]),
		startDate() {
			return dateHandler.formatDateYearToMinutes(this.userProgressionSelectionStartTime);
		},
	},
	methods: {
		...mapActions('managementUsers/progressions/sessions/edition', [
			'editProgressionSessionEditionAdjustmentAdditionalCompletionsRequired',
			'editProgressionSessionEditionAdjustmentBlockAvailability',
			'editProgressionSessionEditionAdjustmentConsiderCompleted',
			'editProgressionSessionEditionAdjustmentDelayInDays',
			'editProgressionSessionEditionAdjustmentImposeReadyToBeDone',
			'editProgressionSessionEditionAdjustmentOverlookUniqueInDays',
			'editProgressionSessionEditionAdjustmentPreponeAvailability',
			'editProgressionSessionEditionAdjustmentRemoveCompletionLimit',
		])
	}
};
</script>

<style scoped></style>
