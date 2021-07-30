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
						<th>Reached Progresion</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(summary, index) in usersSummaryList" :key="summary._id" :class="summary._id === userSelectedId && 'selected'">
						<td>{{ index + 1 }}</td>
						<td>{{ summary.username }}</td>
						<td>{{ makeFullNameDisplay(summary.firstName, summary.middleName, summary.lastName) }}</td>
						<td style="white-space: pre-line">{{ makeTagsDisplay(summary.tags) }}</td>
						<td>{{ makeCurriculumTitleDisplay(summary.curriculumTitle) }}</td>
						<td>{{ makeProgressionDisplay(summary.curriculumTotalNumber, summary.progressionTotalNumber, summary.reachedExperimentTitle) }}</td>
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

export default {
	components: {
		loader: LoaderCircular,
	},
	data() {
		return {};
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
		makeFullNameDisplay(firstName, middleName, lastName) {
			if (!(firstName || middleName || lastName)) return '---';
			return firstName + ' ' + middleName + ' ' + lastName;
		},
		makeTagsDisplay(tagList) {
			if (tagList.length === 0) {
				return '---';
			} else {
				let display = '';
				for (const i in tagList) {
					if (i > 0) display += '\n';
					display += tagList[i];
				}
				return display;
			}
		},
		makeCurriculumTitleDisplay(curriculumName) {
			if (!curriculumName) return '---';
			else return curriculumName;
		},
		makeProgressionDisplay(totalNumber, reachedNumber, reachedName) {
			if (!totalNumber) return '---';
			else return String(reachedNumber) + '/' + totalNumber + '\n"' + reachedName + '"';
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
