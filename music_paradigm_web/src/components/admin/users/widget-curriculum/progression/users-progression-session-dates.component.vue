<template>
	<div class="widget-table-context dates-table">
		<!-- If there is data to be shown -->
		<table v-if="hasDatesToShow" class="widget-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Start Date</th>
					<th>Completion Date</th>
				</tr>
			</thead>
			<tbody v-for="(startDates, completionDate, index) in completionStartAssociation" v-bind:key="index">
				<tr v-for="(startDate, subIndex) in startDates" v-bind:key="subIndex">
					<td v-if="subIndex == 0" :rowspan="startDates.length">{{ index + 1 }}</td>
					<td>{{ makeDateDisplay(startDate) }}</td>
					<td v-if="subIndex == 0" :rowspan="startDates.length" class="completion-date">{{ makeDateDisplay(completionDate) }}</td>
				</tr>
			</tbody>
		</table>

		<!-- If there is no data to show -->
		<table v-else class="widget-table">
			<thead>
				<tr>
					<th>No Date To Show</th>
				</tr>
			</thead>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

export default {
	data() {
		return {
			NO_COMPLETION_DATE: 'No Date',
			associativeId: null,
			associativeIdOrdinalNumber: null,
			startDates: [],
			completionDates: [],
			completionStartAssociation: {},
			datesOptions: { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
		};
	},
	computed: {
		hasDatesToShow() {
			return this.startDates.length > 0 || this.completionDates.length > 0;
		},
	},
	methods: {
		takeSession(session) {
			if (!session || !session.associativeId) {
				this.unsetSession();
				return;
			}
			this.associativeId = session.associativeId;
			this.associativeIdOrdinalNumber = session.associativeIdOrdinalNumber;
			this.startDates = session.startDates || [];
			this.completionDates = session.completionDates || [];
			this.generateEndStartCoupleStructure();
		},
		unsetSession() {
			this.associativeId = null;
			this.associativeIdOrdinalNumber = null;
			this.startDates = [];
			this.completionDates = [];
			this.completionStartAssociation = {};
		},
		generateEndStartCoupleStructure() {
			// Initialize an object where each attribute is a completion date
			this.completionStartAssociation = {};
			for (const completionDate of this.completionDates) this.completionStartAssociation[String(completionDate)] = [];
			this.completionStartAssociation[this.NO_COMPLETION_DATE] = [];

			// Fit the start dates to their associated completion date
			for (const startDate of this.startDates) {
				const foundCompletionDate = this.completionDates.find((completionDate) => startDate < completionDate);
				const associatedCompletionDate = foundCompletionDate || this.NO_COMPLETION_DATE;
				this.completionStartAssociation[String(associatedCompletionDate)].push(startDate);
			}

			// If there is no start date without a completion date, we remove the 'no completion date' entry
			if (this.completionStartAssociation[this.NO_COMPLETION_DATE].length < 1) delete this.completionStartAssociation[this.NO_COMPLETION_DATE];
		},
		makeDateDisplay(date) {
			if (date === this.NO_COMPLETION_DATE) return this.NO_COMPLETION_DATE;
			else return new Date(date).toLocaleDateString(undefined, this.datesOptions);
		},
	},
	watch: {},
};
</script>

<style scoped>
.dates-table {
	padding: 25px 25px 0;
}

.completion-date {
	vertical-align: bottom;
}
</style>
