<template>
	<div id="experiments-workshop" class="widget widget-box widget-bg">
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
						<th>Experiment Count</th>
						<th>Action</th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="(header, index) in curriculumsHeadersList" :key="header._id" :class="header._id === curriculumSelectedId && 'selected'">
						<td>{{ index + 1 }}</td>
						<td>{{ header.title }}</td>
						<td>{{ header.isSequential }}</td>
						<td>{{ header.experimentsCount }}</td>
						<td class="widget-table-actions-buttons">
							<button v-on:click="handleSelection(header._id)" class="widget-button small blue">Select</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import '@/styles/widgetTemplate.css';
import { mapActions, mapGetters } from 'vuex';
import LoaderCircular from '@/components/LoaderCircular.vue';

export default {
	components: {
		loader: LoaderCircular,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('curriculums', ['isFetchingCurriculumsHeadersList', 'curriculumsHeadersList', 'curriculumSelectedId']),
		isListLoading() {
			return this.isFetchingUserHeadersList;
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
		makeEmailDisplay(email) {
			if (!email) return 'None';
			else return email;
		},
		makeFullNameDisplay(firstName, middleName, lastName) {
			return firstName + ' ' + middleName + ' ' + lastName;
		},
		makeGroupsDisplay(groupList) {
			if (groupList.length === 0) {
				return 'None';
			} else {
				let display = '';
				for (const i in groupList) {
					if (i > 1) display += '\n';
					display += groupList[i];
				}
				return display;
			}
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
