<template>
	<div class="table-editor-area">

	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

export default {
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
};
</script>

<style scoped>
.table-editor-area {
	background-color: rgb(200, 200, 205);
	border: solid rgb(190, 190, 195) 3px;
	color: rgb(25, 25, 25);
	height: 70px;
	padding: 30px;
}
</style>
