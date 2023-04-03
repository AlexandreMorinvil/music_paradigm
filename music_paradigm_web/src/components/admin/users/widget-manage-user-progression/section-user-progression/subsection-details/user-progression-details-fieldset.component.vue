<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Start Date" />
		<TemplateFieldOutputComponent :value="startDate" :complementaryValue="startTimePassed" />

		<TemplateFieldLabelComponent text="Date of last advance" />
		<TemplateFieldOutputComponent :value="lastProgressionDate" :complementaryValue="lastProgressionTimePassed"/>

		<TemplateFieldLabelComponent text="Total duration" />
		<TemplateFieldOutputComponent :value="duration" />
	</TemplateFieldsetComponent>
</template>

<script>
import { dateHandler, durationHandler } from '@/_helpers';
import { mapGetters } from 'vuex';


import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldOutputComponent from '@/components/admin/template/template-field-output.component.vue';

export default {
	components: {
		TemplateFieldLabelComponent,
		TemplateFieldOutputComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/selection', [
			'hasSelectedUserProgression',
			'userProgressionSelectionDuration',
			'userProgressionSelectionLastProgressionDate',
			'userProgressionSelectionLastProgressionTimePassed',
			'userProgressionSelectionStartTime',
			'userProgressionSelectionStartTimePassed',
		]),
		duration() {
			return durationHandler.formatDurationWeekToSecondsFromLargerUnit(this.userProgressionSelectionDuration, 2);
		},
		lastProgressionDate() {
			return dateHandler.formatDateYearToMinutes(this.userProgressionSelectionLastProgressionDate);
		},
		lastProgressionTimePassed() {
			return durationHandler.formatDurationWeekToSecondsFromLargerUnit(
					this.userProgressionSelectionLastProgressionTimePassed,
					2,
					true
				);
		},
		startDate() {
			return dateHandler.formatDateYearToMinutes(this.userProgressionSelectionStartTime);
		},
		startTimePassed() {
			return durationHandler.formatDurationWeekToSecondsFromLargerUnit(
					this.userProgressionSelectionStartTimePassed,
					2,
					true
				);
		},
	},
};
</script>

<style scoped></style>
