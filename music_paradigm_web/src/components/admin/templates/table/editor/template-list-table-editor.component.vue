<template>
	<div class="table-editor-area">
		<TemplateListTableEditorColumnsComponent :listTable="listTable" v-on:update="updateTable" />
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import TemplateListTableEditorColumnsComponent from './template-list-table-editor-columns.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateListTableEditorColumnsComponent
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
