<template>
	<TemplateListTable :ListTableClass="ListTableClass" :isLoading="isLoading" :list="list" :selection="selection">
		<template v-slot:actionButtons>
			<ButtonSelectUserComponent slot-scope="{ entity }" isSmall />
		</template>
		<ButtonSelectUserComponent slot-scope="{ entity }" isSmall />
	</TemplateListTable>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { UsersListTable } from '@/modules/list-tables';
import TemplateListTable from '@/components/admin/templates/table/template-list-table.component.vue';
import ButtonSelectUserComponent from '@/components/admin/users/buttons/button-select-user.component.vue';

export default {
	components: {
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
	mounted() {
		this.fetchUserSummariesList();
	},
};
</script>

<style scoped></style>
