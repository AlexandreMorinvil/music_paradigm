<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Curriculum" />
		<TemplateFieldSelectComponent :value="usersBatchCommandCurriculum" v-on:edit="setUsersBatchCommandCurriculum"
			isEmptyAccepted :isForcedDisabled="isFrozen" :isLoading="isFetchingCurriculumSummariesList"
			:getDisplayedValueFromElement="(curriculumSummary) => curriculumSummary.title"
			:getOptionValueFromElement="(curriculumSummary) => curriculumSummary._id" :options="curriculumSummariesList"
			placeholder="No Curriculum" />
	</TemplateFieldsetComponent>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';

export default {
	components: {
		TemplateFieldsetComponent,
		TemplateFieldLabelComponent,
		TemplateFieldSelectComponent,
	},
	props: {
		isFrozen: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		...mapGetters('managementCurriculums', [
			'curriculumSummariesList',
			'isFetchingCurriculumSummariesList',
		]),
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommandCurriculum']),
	},
	methods: {
		...mapActions('managementCurriculums', ['fetchCurriculumSummariesList']),
		...mapActions('managementUsers/batchCommand', ['setUsersBatchCommandCurriculum']),
	},
	beforeMount() {
		this.fetchCurriculumSummariesList();
	},
};
</script>

<style scoped></style>
