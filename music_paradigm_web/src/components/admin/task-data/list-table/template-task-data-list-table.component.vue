<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="refreshFunction" :saveBackupFunction="saveBackupFunction"
		:listTableSelection="listTableSelection" :downloadCsvFunction="downloadCsvFunction"
		:downloadJsonFunction="downloadJsonFunction">
		<div slot-scope="{ entity }">
			<ButtonSelectTaskDataEntryComponent isSmall :entity="entity" :isAdminData="isAdminData" />
		</div>
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { AdminTaskDataListTable, ListTableStateBackup, TaskDataListTable } from '@/modules/list-tables';
import { taskDataQueryHandler } from '@/modules/task-data';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

import ButtonSelectTaskDataEntryComponent from '../buttons/button-select-task-data-entry.component.vue';

export default {
	components: {
		ButtonSelectTaskDataEntryComponent,
		TemplateListTable,
	},
	props: {
		isAdminData: {
			type: Boolean,
			default: false,
		},
		listTableId: {
			type: String,
			default: 'task-data-list',
		},
		mustClear: {
			type: Boolean,
			default: false,
		},
		taskDataQueryCriteria: {
			type: Object,
			default: null,
		},
	},
	computed: {
		...mapGetters('pageStatus', ['listTableState']),
		...mapGetters('managementTaskData', [
			'adminTaskDataSummariesList',
			'isFetchingAdminTaskDataSummariesList',
			'isFetchingTaskDataSummariesList',
			'taskDataSummariesList',
		]),
		...mapGetters('managementTaskData/listTableSelection', [
			'hasTaskDataListTableSelection',
			'isAdminTaskDataListTableSelection',
			'taskDataListTableSelection',
			'taskDataListTableSelectionIdsList',
		]),
		apiParameters() {
			return {
				criteria: this.taskDataQueryCriteriaConsideringSelections,
				isAdminData: this.isAdminData,
			};
		},
		initialTableState() {
			return this.listTableState(this.listTableId);
		},
		isLoading() {
			return this.isAdminData ? this.isFetchingAdminTaskDataSummariesList : this.isFetchingTaskDataSummariesList;
		},
		isSelectionInSameContext() {
			return this.isAdminTaskDataListTableSelection === this.isAdminData;
		},
		list() {
			return this.isAdminData ? this.adminTaskDataSummariesList : this.taskDataSummariesList;
		},
		ListTableClass() {
			return this.isAdminData ? AdminTaskDataListTable : TaskDataListTable;
		},
		listTableSelection() {
			return this.taskDataListTableSelection;
		},
		taskDataQueryCriteriaConsideringSelections() {
			if (this.hasTaskDataListTableSelection && this.isSelectionInSameContext)
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
			this.downloadTaskDataCsv(this.apiParameters);
		},
		downloadJsonFunction() {
			this.downloadTaskDataJson(this.apiParameters);
		},
		refreshFunction() {
			if (this.mustClear) this.clearTaskDataSummariesList();
			else this.fetchTaskDataSummariesList({
				criteria: this.taskDataQueryCriteria,
				isAdminData: this.isAdminData,
			});
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
