<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="fetchUserSummariesList" :saveBackupFunction="saveBackupFunction"
		:selection="selection">
		<div slot-scope="{ entity }">
			<ButtonSelectUserComponent isSmall :entity="entity" hideIfInactive />
			<ButtonDeselectUserComponent isSmall :entity="entity" hideIfInactive />
		</div>
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { ListTableStateBackup, UsersListTable } from '@/modules/list-tables';
import ButtonDeselectUserComponent from '@/components/admin/users/buttons/button-deselect-user.component.vue';
import ButtonSelectUserComponent from '@/components/admin/users/buttons/button-select-user.component.vue';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

export default {
	components: {
		ButtonDeselectUserComponent,
		ButtonSelectUserComponent,
		TemplateListTable,
	},
	props: {
		listTableId: {
			type: String,
			default: 'user-managment-list',
		},
	},
	computed: {
		...mapGetters('pageStatus', ['listTableState']),
		...mapGetters('managementUsers', ['isFetchingUsersSummaryList', 'usersSummaryList']),
		...mapGetters('managementUsers/selection', ['userSelection']),
		initialTableState() {
			return this.listTableState(this.listTableId);
		},
		isLoading() {
			return this.isFetchingUsersSummaryList;
		},
		list() {
			return this.usersSummaryList;
		},
		ListTableClass() {
			return UsersListTable;
		},
		selection() {
			return this.userSelection;
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
