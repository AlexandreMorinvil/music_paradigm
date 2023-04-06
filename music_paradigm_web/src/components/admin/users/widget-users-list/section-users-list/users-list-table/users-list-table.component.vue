<template>
	<TemplateListTable :ListTableClass="ListTableClass" :isLoading="isLoading" :list="list"
		:refreshFunction="fetchUserSummariesList" :selection="selection">
		<div slot-scope="{ entity }">
			<ButtonSelectUserComponent isSmall :entity="entity" hideIfInactive />
			<ButtonDeselectUserComponent isSmall :entity="entity" hideIfInactive />
		</div>
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { UsersListTable } from '@/modules/list-tables';
import ButtonDeselectUserComponent from '@/components/admin/users/buttons/button-deselect-user.component.vue';
import ButtonSelectUserComponent from '@/components/admin/users/buttons/button-select-user.component.vue';
import TemplateListTable from '@/components/admin/template/list-table/template-list-table.component.vue';

export default {
	components: {
		ButtonDeselectUserComponent,
		ButtonSelectUserComponent,
		TemplateListTable,
	},
	computed: {
		...mapGetters('managementUsers', ['isFetchingUsersSummaryList', 'usersSummaryList']),
		...mapGetters('managementUsers/selection', ['userSelection']),
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
			return this.userSelection
		},
	},
	methods: {
		...mapActions('managementUsers', ['fetchUserSummariesList']),
	},
	beforeMount() {
		this.fetchUserSummariesList();
	},
};
</script>

<style scoped></style>
