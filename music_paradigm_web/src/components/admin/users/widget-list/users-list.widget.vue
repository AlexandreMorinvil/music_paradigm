<template>
	<div id="experiments-workshop" class="widget widget-bg">
		<div class="options-position">
			<button v-on:click="handleRefresh" class="widget-button blue">Refresh</button>
		</div>
		<div class="board-position widget-table-context">
			<loader v-if="isListLoading" class="loader"></loader>
			<table v-else class="widget-table">
				<thead>
					<tr>
						<th>#</th>
						<th>Username</th>
						<th>Full Name</th>
						<th>Tags</th>
						<th>Curriculum</th>
						<th>Start Date</th>
						<th>Last Advance</th>
						<th>Reached</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(summary, index) in usersSummaryList" :key="summary._id" :class="summary._id === userSelectedId && 'selected'">
						<td>{{ index + 1 }}</td>
						<td>{{ summary.username }}</td>
						<td>{{ makeFullNameDisplay(summary) }}</td>
						<td style="white-space: pre-line">{{ makeTagsDisplay(summary) }}</td>
						<td>{{ makeCurriculumTitleDisplay(summary) }}</td>
						<td>{{ makeProgressionStartTimeDisplay(summary) }}</td>
						<td>{{ makeProgressionLastAdvanceTimeDisplay(summary) }}</td>
						<td>{{ makeProgressionDisplay(summary) }}</td>
						<td class="widget-table-actions-buttons">
							<button v-on:click="handleSelectUser(summary._id)" class="widget-button small blue">Select</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';
import LoaderCircular from '@/components/visual-helpers/loader-circular.component.vue';

/* eslint-disable no-magic-numbers */
export default {
	components: {
		loader: LoaderCircular,
	},
	data() {
		return {
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric' },
		};
	},
	computed: {
		...mapGetters('users', ['isFetchingUsersSummaryList', 'usersSummaryList', 'userSelectedId']),
		isListLoading() {
			return this.isFetchingUsersSummaryList;
		},
	},
	methods: {
		...mapActions('users', ['fetchAllUsersSummary', 'setSelectedUser']),
		handleRefresh() {
			this.fetchAllUsersSummary();
		},
		handleSelectUser(id) {
			this.setSelectedUser(id);
		},
		makeFullNameDisplay(summary) {
			const { firstName, middleName, lastName } = summary;
			if (!(firstName || middleName || lastName)) return '---';
			return firstName + ' ' + middleName + ' ' + lastName;
		},
		makeTagsDisplay(summary) {
			const { tags } = summary;
			if (tags.length === 0) {
				return '---';
			} else {
				let display = '';
				for (const i in tags) {
					if (i > 0) display += '\n';
					display += tags[i];
				}
				return display;
			}
		},
		makeCurriculumTitleDisplay(summary) {
			const { curriculumTitle } = summary;
			if (!curriculumTitle) return '---';
			else return curriculumTitle;
		},
		makeProgressionStartTimeDisplay(summary) {
			const { progressionStartDate, progressionStartTime } = summary;
			return this.makeDateTimeLapsedDisplay(progressionStartDate, progressionStartTime);
		},
		makeProgressionLastAdvanceTimeDisplay(summary) {
			const { progressionLastAdvancedDate, progressionLastAdvancedTime } = summary;
			return this.makeDateTimeLapsedDisplay(progressionLastAdvancedDate, progressionLastAdvancedTime);
		},
		makeProgressionDisplay(summary) {
			const { curriculumTotalNumber, progressionTotalNumber, reachedExperimentTitle, wasProgressionTotalNumberAdjusted } = summary;
			if (!curriculumTotalNumber) return '---';

			const adjustmentSign = wasProgressionTotalNumberAdjusted ? ' adjusted' : '';
			if (curriculumTotalNumber === progressionTotalNumber)
				return String(progressionTotalNumber) + '/' + curriculumTotalNumber + adjustmentSign + '\n✓ COMPLETED';
			else return String(progressionTotalNumber) + '/' + curriculumTotalNumber + adjustmentSign + '\n"' + reachedExperimentTitle + '"';
		},
		getDurationInWeekAndDays(durationInMilliseconds) {
			const totalDays = Math.floor(durationInMilliseconds / (24 * 3600 * 1000));
			return { totalDays: totalDays, days: parseInt(totalDays % 7), weeks: parseInt(totalDays / 7) };
		},
		makeDateTimeLapsedDisplay(startDate, durationInMilliseconds) {
			if (!startDate) return '---';

			// Display of the date
			const date = new Date(startDate).toLocaleDateString(undefined, this.datesOptions);

			// Display of the time lapsed
			const { totalDays, days, weeks } = this.getDurationInWeekAndDays(durationInMilliseconds);
			let timeLapsed = '';
			if (totalDays < 1) timeLapsed = '< 24h';
			else {
				if (weeks > 0) timeLapsed += String(weeks) + 'w. ';
				timeLapsed += String(days) + 'd.';
			}
			return String(date) + '\n' + timeLapsed;
		},
	},
	mounted() {
		this.fetchAllUsersSummary();
	},
};
</script>

<style scoped>
.options-position {
	grid-area: options;
	display: flex;
	justify-content: space-between;
}

.board-position {
	grid-area: board;
	display: flex;
	justify-content: center;
	white-space: pre-line;
}

.widget {
	grid-template-areas:
		'options'
		'board';
}

.loader {
	width: 500px;
	height: 500px;
}
</style>
