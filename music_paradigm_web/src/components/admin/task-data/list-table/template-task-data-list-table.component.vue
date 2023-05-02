<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="refreshFunction" :saveBackupFunction="saveBackupFunction"
		:listTableSelection="listTableSelection" :downloadCsvFunction="downloadTaskDataCsv">
		<!-- <div slot-scope="{ entity }">
			<ButtonSelectUserComponent isSmall :entity="entity" hideIfInactive />
			<ButtonDeselectUserComponent isSmall :entity="entity" hideIfInactive />
		</div> -->
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { ListTableStateBackup, TaskDataListTable } from '@/modules/list-tables';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

export default {
	components: {
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
		...mapGetters('managementTaskData/listTableSelection', ['taskDataListTableSelection']),
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
	},
	methods: {
		...mapActions('pageStatus', ['saveListTableState']),
		...mapActions('managementTaskData/listTableSelection', ['clearTaskDataListTableSelection']),
		...mapActions('managementTaskData', [
			'clearTaskDataSummariesList',
			'downloadTaskDataCsv',
			'fetchTaskDataSummariesList',
		]),
		downloadCsv() {
			this.downloadTaskDataCsv();
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
