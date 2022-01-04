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
						<th>Title</th>
						<th>Sequential</th>
						<th>Log Type</th>
						<th>Experiment Count</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					<tr
						v-for="(curriculumSummary, index) in curriculumsList"
						:key="curriculumSummary._id"
						:class="isSelectedCurriculum(curriculumSummary) && 'selected'"
					>
						<td>{{ index + 1 }}</td>
						<td>{{ makeTitleDisplay(curriculumSummary) }}</td>
						<td>{{ makeIsSequentialDisplay(curriculumSummary) }}</td>
						<td>{{ makeLogTypeDisplay(curriculumSummary) }}</td>
						<td>{{ makeExperimentsCountDisplay(curriculumSummary) }}</td>
						<td class="widget-table-actions-buttons">
							<button
								v-on:click="handleSelection(curriculumSummary)"
								class="widget-button small blue"
								:class="isSelectedCurriculum(curriculumSummary) ? 'turquoise' : 'blue'"
							>
								{{ makeSelectButtonText(curriculumSummary) }}
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

export default {
	components: {
		loader: LoaderCircular,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('curriculums', ['isFetchingCurriculumsList', 'curriculumsList', 'curriculumSelectedId']),
		isListLoading() {
			return this.isFetchingUsersSummaryList;
		},
	},
	methods: {
		...mapActions('curriculums', ['fetchAllCurriculumHeaders', 'setSelectedCurriculum', 'unsetSelectedCurriculum']),
		handleRefresh() {
			this.fetchAllCurriculumHeaders();
		},
		handleSelection(curriculumSummary) {
			if (this.isSelectedCurriculum(curriculumSummary)) this.unsetSelectedCurriculum();
			else this.setSelectedCurriculum(curriculumSummary._id);
		},
		makeTitleDisplay(curriculumSummary) {
			return curriculumSummary.title;
		},
		makeIsSequentialDisplay(curriculumSummary) {
			return curriculumSummary.isSequential;
		},
		makeLogTypeDisplay(curriculumSummary) {
			return curriculumSummary.logType;
		},
		makeExperimentsCountDisplay(curriculumSummary) {
			return curriculumSummary.experiments ? curriculumSummary.experiments.length : 0;
		},
		makeSelectButtonText(curriculumSummary) {
			return this.isSelectedCurriculum(curriculumSummary) ? 'Unselect' : 'Select';
		},
		isSelectedCurriculum(curriculumSummary) {
			return curriculumSummary && curriculumSummary._id === this.curriculumSelectedId;
		},
	},
	mounted() {
		this.fetchAllCurriculumHeaders();
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
