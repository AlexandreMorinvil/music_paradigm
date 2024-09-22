<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent for="title" text="Curriculum title" />
		<TemplateFieldInputComponent v-bind:value="curriculumEditionTitle" v-on:edit="editCurriculumEditionTitle"
			:expectedValue="curriculumSelectionTitle" :isNullValid="false" :mustHighlightIfChanged="hasSelectedCurriculum"
			:inputAttributes="{
					type: 'text',
					name: 'title',
					autocomplete: 'off',
					placeholder: 'Insert new title',
				}" />

		<TemplateFieldLabelComponent for="isSequential" text="Delays start after sessions" />
		<TemplateFieldCheckboxInputComponent v-bind:value="curriculumEditionIsSequential"
			v-on:edit="editCurriculumEditionIsSequential" :expectedValue="curriculumSelectionIsSequential"
			:mustHighlightIfChanged="hasSelectedCurriculum" name="isSequential" />
		<TemplateFieldLabelComponent for="usesCdn" text="Curriculum uses CDN" />
		<TemplateFieldCheckboxInputComponent v-bind:value="curriculumEditionUsesCdn"
			v-on:edit="editCurriculumEditionUsesCdn" :expectedValue="curriculumSelectionUsesCdn"
			:mustHighlightIfChanged="hasSelectedCurriculum" name="usesCdn" />

		<TemplateFieldLabelComponent for="cdnUrl" text="CDN URL" />
		<TemplateFieldInputComponent v-bind:value="curriculumEditionCdnUrl" v-on:edit="editCurriculumEditionCdnUrl"
			:expectedValue="curriculumSelectionCdnUrl" :isNullValid="true" :mustHighlightIfChanged="hasSelectedCurriculum"
			:inputAttributes="{
					type: 'text',
					name: 'cdnUrl',
					autocomplete: 'off',
					placeholder: 'Insert CDN URL',
				}" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import TemplateFieldCheckboxInputComponent from '@/components/admin/template/template-field-checkbox-input.component.vue';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';


export default {
	components: {
		TemplateFieldCheckboxInputComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('managementCurriculums/edition', [
			'curriculumEditionIsSequential',
			'curriculumEditionTitle',
			'curriculumEditionUsesCdn',
			'curriculumEditionCdnUrl',
		]),
		...mapGetters('managementCurriculums/selection', [
			'curriculumSelectionIsSequential',
			'curriculumSelectionTitle',
			'curriculumSelectionUsesCdn',
			'curriculumSelectionCdnUrl',
			'hasSelectedCurriculum',
		]),
	},
	methods: {
		...mapMutations('managementCurriculums/edition', [
			'editCurriculumEditionIsSequential',
			'editCurriculumEditionTitle',
			'editCurriculumEditionUsesCdn',
			'editCurriculumEditionCdnUrl',
		]),
	},
};
</script>

<style scoped></style>
