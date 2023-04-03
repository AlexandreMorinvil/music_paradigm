<template>
	<div class="table-editor-columns-area">
		<h4>Filters</h4>

		<div v-for="(filter, index) in filtersList" :key="index" class="litst-table-filter-box">
			<TemplateListTableEditorFilterConditionsComponent v-on:update="update" :listTable="listTable"
				:filter="filter" />
			<TemplateListTableEditorFilterEffectComponent v-on:update="update" :listTable="listTable" :filter="filter"/>
		</div>

		<TemplateButtonComponent color="blue" isSmall v-on:click="addFilter" text="Add Filter" />
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

import TemplateListTableEditorFilterConditionsComponent from './template-list-table-editor-filter-conditions.component.vue';
import TemplateListTableEditorFilterEffectComponent from './template-list-table-editor-filter-effect.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateButtonComponent,
		TemplateListTableEditorFilterConditionsComponent,
		TemplateListTableEditorFilterEffectComponent,
	},
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	computed: {
		filtersList() {
			return this.listTable.filtersList;
		},
		possibleColumnsList() {
			return this.listTable.possibleColumnsList;
		},
	},
	methods: {
		addFilter() {
			this.listTable.addFilter();
			this.update();
		},
		editFilter(filter, index, columnKey) {
			filter.setFilters(index, columnKey);
		},
		update() {
			this.$emit('update');
			this.$forceUpdate();
		},
	}
};
</script>

<style scoped>
.table-editor-columns-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgb(225, 225, 230);
	border: solid rgb(210, 210, 215) 2px;
	border-radius: 10px;
	color: rgb(25, 25, 25);
	padding: 10px;
}

.litst-table-filter-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 20px;
	background-color: rgb(215, 215, 220);
	border: solid rgb(200, 200, 205) 2px;
	border-radius: 10px;
	gap: 10px;
}

h4 {
	text-align: center;
}
</style>
