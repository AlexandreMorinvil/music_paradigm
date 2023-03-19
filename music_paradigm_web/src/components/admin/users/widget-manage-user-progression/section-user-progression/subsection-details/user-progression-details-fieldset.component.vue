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
		...mapGetters('managementUsers/progressions/selection', [
			'hasSelectedUserProgression',
			'userProgressionSelectionDuration',
			'userProgressionSelectionLastProgressionDate',
			'userProgressionSelectionLastProgressionTimePassed',
			'userProgressionSelectionStartTime',
			'userProgressionSelectionStartTimePassed',
		]),
		duration() {
			return this.isValueDisplayable(this.userProgressionSelectionDuration) ?
				durationHandler.formatDurationWeekToSecondsFromLargerUnit(this.userProgressionSelectionDuration, 2) :
				null;
		},
		lastProgressionDate() {
			return this.isValueDisplayable(this.userProgressionSelectionLastProgressionDate) ?
				dateHandler.formatDateYearToMinutes(this.userProgressionSelectionLastProgressionDate) :
				null;
		},
		lastProgressionTimePassed() {
			return this.isValueDisplayable(this.userProgressionSelectionLastProgressionTimePassed) ?
				durationHandler.formatDurationWeekToSecondsFromLargerUnit(
					this.userProgressionSelectionLastProgressionTimePassed,
					2,
					true
				) :
				null;
		},
		startDate() {
			return this.isValueDisplayable(this.userProgressionSelectionStartTime) ?
				dateHandler.formatDateYearToMinutes(this.userProgressionSelectionStartTime) :
				null;
		},
		startTimePassed() {
			return this.isValueDisplayable(this.userProgressionSelectionLastProgressionTimePassed) ?
				durationHandler.formatDurationWeekToSecondsFromLargerUnit(
					this.userProgressionSelectionStartTimePassed,
					2,
					true
				) :
				null;
		},
	},
	methods: {
		isValueDisplayable(value) {
			return this.hasSelectedUserProgression && Boolean(value);
		},
	}
};
</script>

<style scoped></style>
