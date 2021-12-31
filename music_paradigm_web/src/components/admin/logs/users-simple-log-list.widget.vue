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
					<tr v-for="(user, index) in usersSummaryList" :key="user._id" :class="{ selected: isSelectedUser(user) }">
						<td>{{ index + 1 }}</td>
						<td>{{ makeUsernameDisplay(user) }}</td>
						<td>{{ makeFullNameDisplay(user) }}</td>
						<td style="white-space: pre-line">{{ makeTagsDisplay(user) }}</td>
						<td>{{ makeCurriculumTitleDisplay(user) }}</td>
						<td>{{ makeProgressionStartTimeDisplay(user) }}</td>
						<td>{{ makeProgressionLastAdvanceTimeDisplay(user) }}</td>
						<td>{{ makeProgressionDisplay(user) }}</td>
						<td class="widget-table-actions-buttons">
							<button v-on:click="handleSelectUser(user._id)" class="widget-button button small" :class="isSelectedUser(user) ? 'turquoise' : 'blue'">
								{{ makeSelectButtonText(user) }}
							</button>
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
		...mapActions('users', ['fetchAllUsersSummary', 'setSelectedUser', 'unsetSelectedUser']),
		handleRefresh() {
			this.fetchAllUsersSummary();
		},
		handleSelectUser(id) {
			if (this.userSelectedId === id) this.unsetSelectedUser();
			else this.setSelectedUser(id);
		},
		makeUsernameDisplay(user) {
			return user ? user.username : '';
		},
		makeFullNameDisplay(user) {
			const { firstName, middleName, lastName } = user;
			if (!(firstName || middleName || lastName)) return '---';
			return firstName + ' ' + middleName + ' ' + lastName;
		},
		makeTagsDisplay(user) {
			const { tags } = user;
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
		makeCurriculumTitleDisplay(user) {
			const { curriculumTitle } = user;
			if (!curriculumTitle) return '---';
			else return curriculumTitle;
		},
		makeProgressionStartTimeDisplay(user) {
			const { progressionStartDate, progressionStartTime } = user;
			return this.makeDateTimeLapsedDisplay(progressionStartDate, progressionStartTime);
		},
		makeProgressionLastAdvanceTimeDisplay(user) {
			const { progressionLastAdvancedDate, progressionLastAdvancedTime } = user;
			return this.makeDateTimeLapsedDisplay(progressionLastAdvancedDate, progressionLastAdvancedTime);
		},
		makeProgressionDisplay(user) {
			const { curriculumTotalNumber, progressionTotalNumber, reachedExperimentTitle, wasProgressionTotalNumberAdjusted, isProgressionBlocked, inAdvanceCount } = user;
			if (!curriculumTotalNumber) return '---';

			const adjustmentSign = wasProgressionTotalNumberAdjusted ? ' adjusted' : '';
			const inAdvanceSign = inAdvanceCount > 0 ? ` (+ ${inAdvanceCount} in adv.)` : '';
			const blockingSign = isProgressionBlocked ? ' BLOCKED' : '';
			const experimentTitle = (curriculumTotalNumber === progressionTotalNumber) ? '✓ COMPLETED' : `"${reachedExperimentTitle}"`;

			return String(progressionTotalNumber) + inAdvanceSign + '/' + curriculumTotalNumber + adjustmentSign + blockingSign + '\n' + experimentTitle;
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
		makeSelectButtonText(user) {
			return this.isSelectedUser(user) ? 'Unselect' : 'Select';
		},
		isSelectedUser(user) {
			return user && user._id === this.userSelectedId;
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

.button {
	white-space: nowrap;
}
</style>
