<template>
	<div class="widget-table-context dates-table">
		<!-- If there is data to be shown -->
		<table v-if="hasDatesToShow" class="widget-table">
			<thead>
				<tr>
					<th>Start Date</th>
					<th>Completion Date</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(startDatesDetails, completionDate, completionCount) in completionStartAssociation"
					v-bind:key="completionCount"
					:class="{ selected: isSelectedCompletionCount(completionCount) }"
					v-on:click="handleCompletionCountSelection(completionCount)"
				>
					<td>
						<div v-for="(startDateDetails, subIndex) in startDatesDetails" v-bind:key="subIndex">{{ makeStartDateDisplay(startDateDetails) }}</div>
					</td>
					<td class="completion-date">{{ makeCompletionDateDisplay(completionDate, completionCount) }}</td>
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
import { mapActions, mapGetters } from 'vuex';

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
		...mapGetters('managementUsers/progressions', ['sessionCompletionCountSelected']),
		selectedCompletionCount() {
			return this.sessionCompletionCountSelected;
		},
		hasDatesToShow() {
			return this.startDates.length > 0 || this.completionDates.length > 0;
		},
	},
	methods: {
		...mapActions('managementUsers/progressions', ['setSelectedSessionCompletionCount', 'unsetSelectedSessionCompletionCount']),
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
			let startCounter = 0;
			for (const completionDate of this.completionDates) this.completionStartAssociation[String(completionDate)] = [];
			this.completionStartAssociation[this.NO_COMPLETION_DATE] = [];

			// Fit the start dates to their associated completion date
			for (const startDate of this.startDates) {
				startCounter += 1;
				const foundCompletionDate = this.completionDates.find((completionDate) => startDate < completionDate);
				const associatedCompletionDate = foundCompletionDate || this.NO_COMPLETION_DATE;
				this.completionStartAssociation[String(associatedCompletionDate)].push({ startDate: startDate, startCount: startCounter });
			}

			// If there is no start date without a completion date, we remove the 'no completion date' entry
			if (this.completionStartAssociation[this.NO_COMPLETION_DATE].length < 1) delete this.completionStartAssociation[this.NO_COMPLETION_DATE];
		},
		makeStartDateDisplay(startDateDetails) {
			const { startDate, startCount } = startDateDetails;
			return `(${startCount}) ${this.makeDateDisplay(startDate)}`;
		},
		makeCompletionDateDisplay(completionDate, count) {
			const dateDisplay = this.makeDateDisplay(completionDate);
			return `(${count}) ${dateDisplay}`;
		},
		makeDateDisplay(date) {
			if (date === this.NO_COMPLETION_DATE) return this.NO_COMPLETION_DATE;
			else return new Date(date).toLocaleDateString(undefined, this.datesOptions);
		},
		handleCompletionCountSelection(count) {
			if (this.isSelectedCompletionCount(count)) this.unsetSelectedSessionCompletionCount();
			else this.setSelectedSessionCompletionCount(count);
		},
		isSelectedCompletionCount(count) {
			return count === this.selectedCompletionCount;
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
