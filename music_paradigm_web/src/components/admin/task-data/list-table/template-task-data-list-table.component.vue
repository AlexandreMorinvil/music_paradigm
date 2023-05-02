<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="refreshFunction" :saveBackupFunction="saveBackupFunction"
		:listTableSelection="listTableSelection" :downloadCsvFunction="downloadCsvFunction"
		:downloadJsonFunction="downloadJsonFunction">
		<div slot-scope="{ entity }">
			<ButtonSelectTaskDataEntryComponent isSmall :entity="entity" hideIfInactive />
			<!-- <ButtonDeselectUserComponent isSmall :entity="entity" hideIfInactive /> -->
		</div>
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { ListTableStateBackup, TaskDataListTable } from '@/modules/list-tables';
import { taskDataQueryHandler } from '@/modules/task-data';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

import ButtonSelectTaskDataEntryComponent from './buttons/button-select-task-data-entry.component.vue';

export default {
	components: {
		ButtonSelectTaskDataEntryComponent,
		TemplateListTable,
	},
	props: {
		listTableId: {
			type: String,
			default: 'task-management-task-data-list',
		},
		mustClear: {
			type: Boolean,
			default: false,
		},
		taskDataQueryCriteria: {
			type: Object,
			default: 'task-management-task-data-list',
		},
	},
	computed: {
		...mapGetters('pageStatus', ['listTableState']),
		...mapGetters('managementTaskData', [
			'isFetchingTaskDataSummariesList',
			'taskDataSummariesList',
		]),
		...mapGetters('managementTaskData/listTableSelection', [
			'hasTaskDataListTableSelection',
			'taskDataListTableSelection',
			'taskDataListTableSelectionIdsList',
		]),
		initialTableState() {
			return this.listTableState(this.listTableId);
		},
		isLoading() {
			return this.isFetchingTaskDataSummariesList;
		},
		list() {
			return this.taskDataSummariesList;
		},
		ListTableClass() {
			return TaskDataListTable;
		},
		listTableSelection() {
			return this.taskDataListTableSelection;
		},
		selectedTaskDataQueryCriteria() {
			if (this.hasTaskDataListTableSelection)
				return taskDataQueryHandler.makeTaskDataQueryCriteriaList({
					selectedEntriesId: this.taskDataListTableSelectionIdsList
				});
			else return this.taskDataQueryCriteria;
		},
	},
	methods: {
		...mapActions('pageStatus', ['saveListTableState']),
		...mapActions('managementTaskData/listTableSelection', ['clearTaskDataListTableSelection']),
		...mapActions('managementTaskData', [
			'clearTaskDataSummariesList',
			'downloadTaskDataCsv',
			'downloadTaskDataJson',
			'fetchTaskDataSummariesList',
		]),
		downloadCsvFunction() {
			this.downloadTaskDataCsv(this.selectedTaskDataQueryCriteria);
		},
		downloadJsonFunction() {
			this.downloadTaskDataJson(this.selectedTaskDataQueryCriteria);
		},
		refreshFunction() {
			if (this.mustClear) this.clearTaskDataSummariesList();
			else this.fetchTaskDataSummariesList(this.taskDataQueryCriteria);
		},
		saveBackupFunction(listTableStateBackup) {
			this.saveListTableState({
				listTableId: this.listTableId,
				listTableStateBackup: new ListTableStateBackup(listTableStateBackup),
			});
		},
	},
	beforeMount() {
		this.refreshFunction();
	},
	beforeDestroy() {
		this.clearTaskDataListTableSelection();
	},
	watch: {
		mustClear: {
			handler: function () {
				this.refreshFunction();
			},
		},
		taskDataQueryCriteria: {
			deep: true,
			handler: function () {
				this.refreshFunction();
			},
		},
	},
};
</script>

<style scoped></style>
