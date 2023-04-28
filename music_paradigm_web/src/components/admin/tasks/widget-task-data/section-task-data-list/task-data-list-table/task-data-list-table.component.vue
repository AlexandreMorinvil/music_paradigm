<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="fetchUserSummariesList" :saveBackupFunction="saveBackupFunction"
		:listTableSelection="listTableSelection">
		<!-- <div slot-scope="{ entity }">
			<ButtonSelectUserComponent isSmall :entity="entity" hideIfInactive />
			<ButtonDeselectUserComponent isSmall :entity="entity" hideIfInactive />
		</div> -->
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { ListTableStateBackup, UsersListTable } from '@/modules/list-tables';
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
	},
	computed: {
		...mapGetters('pageStatus', ['listTableState']),
		...mapGetters('managementUsers', ['isFetchingUsersSummaryList', 'userSummariesList']),
		...mapGetters('managementUsers/listTableSelection', ['usersListTableSelection']),
		initialTableState() {
			return this.listTableState(this.listTableId);
		},
		isLoading() {
			return this.isFetchingUsersSummaryList;
		},
		list() {
			return this.userSummariesList;
		},
		ListTableClass() {
			return UsersListTable;
		},
		listTableSelection() {
			return this.usersListTableSelection;
		},
	},
	methods: {
		...mapActions('pageStatus', ['saveListTableState']),
		...mapActions('managementUsers', ['fetchUserSummariesList']),
		saveBackupFunction(listTableStateBackup) {
			this.saveListTableState({
				listTableId: this.listTableId,
				listTableStateBackup: new ListTableStateBackup(listTableStateBackup),
			});
		},
	},
	beforeMount() {
		this.fetchUserSummariesList();
	},
};
</script>

<style scoped></style>
