<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="fetchUserSummariesList" :saveBackupFunction="saveBackupFunction"
		:selection="selection" :shallowSelection="shallowSelection">
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
		...mapGetters('managementUsers', ['isFetchingUsersSummaryList', 'userSummariesList']),
		...mapGetters('managementUsers/selection', ['userSelection']),
		...mapGetters('managementUsers/shallowSelection', ['userShallowSelection']),
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
		selection() {
			return this.userSelection;
		},
		shallowSelection() {
			return this.userShallowSelection;
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
