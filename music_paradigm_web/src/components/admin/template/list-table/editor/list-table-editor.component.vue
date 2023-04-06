<template>
	<div class="table-editor-area">
		<ListTableEditorColumnsComponent :listTable="listTable" v-on:update="updateTable" />
		<ListTableEditorFiltersComponent :listTable="listTable" v-on:update="updateTable" />
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import ListTableEditorColumnsComponent from './list-table-editor-columns.component.vue';
import ListTableEditorFiltersComponent from './list-table-editor-filters.component.vue';

export default {
	emits: ['update'],
	components: {
		ListTableEditorColumnsComponent,
		ListTableEditorFiltersComponent,
	},
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	methods: {
		updateTable() {
			this.$emit('update');
		}
	},
};
</script>

<style scoped>
.table-editor-area {
	background-color: rgb(195, 195, 200);
	border: solid rgb(190, 190, 195) 3px;
	color: rgb(25, 25, 25);
	padding: 15px;
}
</style>
