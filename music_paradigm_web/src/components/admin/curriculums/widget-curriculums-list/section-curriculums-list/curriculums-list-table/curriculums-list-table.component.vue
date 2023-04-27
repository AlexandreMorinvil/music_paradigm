<template>
	<TemplateListTable :ListTableClass="ListTableClass" :initialTableState="initialTableState" :isLoading="isLoading"
		:list="list" :refreshFunction="fetchCurriculumSummariesList" :saveBackupFunction="saveBackupFunction">
		<!-- :listTableSelection="listTableSelection"> -->
		<div slot-scope="{ entity }">
			<ButtonSelectCurriculumComponent isSmall :entity="entity" hideIfInactive />
			<ButtonDeselectCurriculumComponent isSmall :entity="entity" hideIfInactive />
		</div>
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { ListTableStateBackup, CurriculumsListTable } from '@/modules/list-tables';
import ButtonDeselectCurriculumComponent from '@/components/admin/curriculums/buttons/button-deselect-curriculum.component.vue';
import ButtonSelectCurriculumComponent from '@/components/admin/curriculums/buttons/button-select-curriculum.component.vue';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

export default {
	components: {
		ButtonDeselectCurriculumComponent,
		ButtonSelectCurriculumComponent,
		TemplateListTable,
	},
	props: {
		listTableId: {
			type: String,
			default: 'curriculums-managment-list',
		},
	},
	computed: {
		...mapGetters('pageStatus', ['listTableState']),
		...mapGetters('managementCurriculums', ['isFetchingCurriculumSummariesList', 'curriculumSummariesList']),
		// ...mapGetters('managementUsers/listTableSelection', ['usersListTableSelection']),
		initialTableState() {
			return this.listTableState(this.listTableId);
		},
		isLoading() {
			return this.isFetchingCurriculumSummariesList;
		},
		list() {
			return this.curriculumSummariesList;
		},
		ListTableClass() {
			return CurriculumsListTable;
		},
		// listTableSelection() {
		// 	return this.usersListTableSelection;
		// },
	},
	methods: {
		...mapActions('pageStatus', ['saveListTableState']),
		...mapActions('managementCurriculums', ['fetchCurriculumSummariesList']),
		saveBackupFunction(listTableStateBackup) {
			this.saveListTableState({
				listTableId: this.listTableId,
				listTableStateBackup: new ListTableStateBackup(listTableStateBackup),
			});
		},
	},
	beforeMount() {
		this.fetchCurriculumSummariesList();
	},
};
</script>

<style scoped></style>
