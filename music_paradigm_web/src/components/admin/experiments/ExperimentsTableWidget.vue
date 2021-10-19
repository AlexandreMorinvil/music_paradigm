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
						<th>Group</th>
						<th>Name</th>
						<th>Version</th>
						<th>Resource Folder</th>
						<th>Actions</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(header, index) in experimentsHeadersList" :key="header._id" :class="header._id === selectedId && 'selected'">
						<td>{{ index + 1 }}</td>
						<td>{{ header.group }}</td>
						<td>{{ header.name }}</td>
						<td>{{ header.version }}</td>
						<td>{{ header.folder }}</td>
						<td class="widget-table-actions-buttons">
							<button v-on:click="handleSelectExperiment(header._id)" class="widget-button small blue">Select</button>
							<button v-on:click="handleeSelectToEditor(header._id)" class="widget-button small orange">Edit</button>
							<button v-on:click="handleStart(header._id)" class="widget-button small green">Run</button>
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
		...mapGetters('experiments', ['isFetchingExperimentHeadersList', 'experimentsHeadersList', 'selectedId']),
		isListLoading() {
			return this.isFetchingExperimentHeadersList;
		},
	},
	methods: {
		...mapActions('experiments', ['fetchAllExperimentsHeaders', 'setEditorExperiment', 'setSelectionExperiment', 'startExperimentQuick']),
		handleRefresh() {
			this.fetchAllExperimentsHeaders();
		},
		handleeSelectToEditor(id) {
			this.setEditorExperiment(id);
		},
		handleSelectExperiment(id) {
			this.setSelectionExperiment(id);
		},
		handleStart(id) {
			this.startExperimentQuick(id);
		},
	},
	mounted() {
		this.fetchAllExperimentsHeaders();
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
