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
					<tr v-for="(curriculum, index) in curriculumsList" :key="curriculum._id" :class="curriculum._id === curriculumSelectedId && 'selected'">
						<td>{{ index + 1 }}</td>
						<td>{{ makeTitleDisplay(curriculum) }}</td>
						<td>{{ makeIsSequentialDisplay(curriculum) }}</td>
						<td>{{ makeLogTypeDisplay(curriculum) }}</td>
						<td>{{ makeExperimentsCountDisplay(curriculum) }}</td>
						<td class="widget-table-actions-buttons">
							<button v-on:click="handleSelection(curriculum._id)" class="widget-button small blue">Select</button>
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
		...mapActions('curriculums', ['fetchAllCurriculumHeaders', 'setSelectedCurriculum']),
		handleRefresh() {
			this.fetchAllCurriculumHeaders();
		},
		handleSelection(id) {
			this.setSelectedCurriculum(id);
		},
		makeTitleDisplay(curriculum) {
			return curriculum.title;
		},
		makeIsSequentialDisplay(curriculum) {
			return curriculum.isSequential;
		},
		makeLogTypeDisplay(curriculum) {
			return curriculum.logType;
		},
		makeExperimentsCountDisplay(curriculum) {
			return curriculum.experiments.length;
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
