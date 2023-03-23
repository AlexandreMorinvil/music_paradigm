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
				placeholder: 'Number of additional days'
			}" />

		<TemplateFieldLabelComponent for="adjustmentConsiderCompleted" text="Consider session completed" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentConsiderCompleted"
			v-on:edit="editProgressionSessionEditionAdjustmentConsiderCompleted"
			:expectedValue="progressionSessionSelectionAdjustmentConsiderCompleted" name="adjustmentConsiderCompleted" />

		<TemplateFieldLabelComponent for="adjustmentImposeReadyToBeDone" text="Make session available" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentImposeReadyToBeDone"
			v-on:edit="editProgressionSessionEditionAdjustmentImposeReadyToBeDone"
			:expectedValue="progressionSessionSelectionAdjustmentImposeReadyToBeDone"
			name="adjustmentImposeReadyToBeDone" />

		<TemplateFieldLabelComponent for="adjustmentBlockAvailability" text="Block session availability" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentBlockAvailability"
			v-on:edit="editProgressionSessionEditionAdjustmentBlockAvailability"
			:expectedValue="progressionSessionSelectionAdjustmentBlockAvailability" name="adjustmentBlockAvailability" />

		<TemplateFieldLabelComponent for="adjustmentRemoveCompletionLimit" text="Ignore completion limits" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentRemoveCompletionLimit"
			v-on:edit="editProgressionSessionEditionAdjustmentRemoveCompletionLimit"
			:expectedValue="progressionSessionSelectionAdjustmentRemoveCompletionLimit"
			name="adjustmentRemoveCompletionLimit" />

		<TemplateFieldLabelComponent for="adjustmentPreponeAvailability" text="Ignore pre-availability delays" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentPreponeAvailability"
			v-on:edit="editProgressionSessionEditionAdjustmentPreponeAvailability"
			:expectedValue="progressionSessionSelectionAdjustmentPreponeAvailability"
			name="adjustmentPreponeAvailability" />

		<TemplateFieldLabelComponent for="adjustmentOverlookUniqueInDays" text="Ignore need to wait next day once done" />
		<TemplateFieldCheckboxInputComponent v-bind:value="progressionSessionEditionAdjustmentOverlookUniqueInDays"
			v-on:edit="editProgressionSessionEditionAdjustmentOverlookUniqueInDays"
			:expectedValue="progressionSessionSelectionAdjustmentOverlookUniqueInDays"
			name="adjustmentOverlookUniqueInDays" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateFieldCheckboxInputComponent from '@/components/admin/templates/template-field-checkbox-input.component.vue';
import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';

export default {
	components: {
		TemplateFieldCheckboxInputComponent,
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
