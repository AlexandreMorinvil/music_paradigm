<template>
	<div class="widget-table-context">
		<table class="widget-table">

			<thead>
				<tr>
					<th>Start Date</th>
					<th>Completion Date</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(startDatesDetails, completionDate, completionCount) in startDatesListByEndDateMap"
					v-bind:key="completionCount" :class="{ selected: isSelectedCompletionCount(completionCount) }"
					v-on:click="handleCompletionCountSelection(completionCount)"
					class="clickable">

					<td>
						<div v-for="({ startDate, startCount }, subIndex) in startDatesDetails" v-bind:key="subIndex">
							<TemplateFieldOutputComponent :value="startDate" :formatValueFunction="formatDate"
								:complementaryValue="startCount" :formatComplementaryValueFunction="formatCount" />
						</div>
					</td>
					<td class="completion-date">
						<TemplateFieldOutputComponent :value="JSON.parse(completionDate)" :formatValueFunction="formatDate"
							:complementaryValue="completionCount" :formatComplementaryValueFunction="formatCount"
							:allowLoneComplementaryValue="true" />
					</td>
				</tr>
			</tbody>

		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import { sessionStartCompletionAssociator } from '@/modules/progressions';
import TemplateFieldOutputComponent from '@/components/admin/templates/template-field-output.component.vue';
import { dateHandler } from '@/_helpers';


export default {
	components: {
		TemplateFieldOutputComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/sessions/selection', [
			'progressionSessionSelectionCompletionDates',
			'progressionSessionSelectionStartDates',
			'sessionCompletionCountSelection',
		]),
		startDatesListByEndDateMap() {
			return sessionStartCompletionAssociator.generateStartDatesListByCompletionDateMap(
				this.progressionSessionSelectionCompletionDates,
				this.progressionSessionSelectionStartDates,
			);
		},
	},
	methods: {
		...mapActions('managementUsers/progressions/sessions/selection', [
			'setSessionCompletionCountSelection',
			'unsetSessionCompletionCountSelection'
		]),
		formatDate(date) {
			return dateHandler.formatDateYearToSeconds(date);
		},
		formatCount(count) {
			if (count === null || count === undefined) return null;
			return `(${count})`;
		},
		handleCompletionCountSelection(count) {
			if (this.isSelectedCompletionCount(count)) this.unsetSessionCompletionCountSelection();
			else this.setSessionCompletionCountSelection(count);
		},
		isSelectedCompletionCount(count) {
			return count === this.sessionCompletionCountSelection;
		},
	},
};
</script>

<style scoped>
table {
	table-layout: fixed;
}
.completion-date {
	vertical-align: bottom;
}

.clickable {
	cursor: pointer;
}
</style>
