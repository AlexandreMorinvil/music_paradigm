<template>
	<div class="table-editor-columns-area">
		<h4>Filters</h4>
		<div> {{ resultMessage }} </div>

		<ListTableEditorFilterComponent v-for="(filter, index) in filtersList" :key="index" v-on:update="update"
			:isInEditionMode="isSelected(index)" :listTable="listTable" :index="index"
			v-on:delete="(index) => deleteFilter(index)" v-on:moveFilterDown="(index) => moveFilterDown(index)"
			v-on:moveFilterUp="(index) => moveFilterUp(index)" v-on:requestEdit="(index) => handleFilterSelection(index)"
			v-on:requestEditStop="(index) => handleFilterDeselection(index)" />

		<TemplateButtonComponent color="blue" isSmall v-on:click="addFilter" text="Add Filter" class="button-width" />
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

import ListTableEditorFilterComponent from './list-table-editor-filter.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateButtonComponent,
		ListTableEditorFilterComponent,
	},
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	data() {
		return {
			selectedFilterIndex: null,
		};
	},
	computed: {
		filtersList() {
			return this.listTable.filtersList;
		},
		possibleColumnsList() {
			return this.listTable.possibleColumnsList;
		},
		entitiesCount() {
			return this.listTable.entitiesCount;
		},
		keptEnitiesCount() {
			return this.listTable.keptEnitiesCount;
		},
		filteredEntitiesCount() {
			return this.entitiesCount - this.keptEnitiesCount;
		},
		resultMessage() {
			if (this.entitiesCount === 0) return 'There are no elements';
			else if (this.entitiesCount === this.keptEnitiesCount) return 'No elements are filtered out';
			else if (this.entitiesCount !== this.keptEnitiesCount)
				return `${this.keptEnitiesCount}/${this.entitiesCount} elements displayed (${this.filteredEntitiesCount} filtered out)`;
		},
	},
	methods: {
		addFilter() {
			this.listTable.addFilter();
			this.update();
		},
		deleteFilter(index) {
			this.listTable.deleteFilter(index);
			this.update();
		},
		isSelected(index) {
			return this.selectedFilterIndex === index;
		},
		handleFilterSelection(index) {
			this.selectedFilterIndex = index;
		},
		handleFilterDeselection(index) {
			if (index === this.selectedFilterIndex) this.selectedFilterIndex = null;
			else if (index === null || index === undefined) this.selectedFilterIndex = null;
		},
		moveFilterDown(index) {
			const newIndex = this.listTable.moveFilterDown(index);
			if (newIndex === this.selectedFilterIndex) this.selectedFilterIndex = null;
			if (this.selectedFilterIndex === index) this.selectedFilterIndex = newIndex;
			this.update();
		},
		moveFilterUp(index) {
			const newIndex = this.listTable.moveFilterUp(index);
			if (newIndex === this.selectedFilterIndex) this.selectedFilterIndex = null;
			if (this.selectedFilterIndex === index) this.selectedFilterIndex = newIndex;
			this.update();
		},
		update() {
			this.$emit('update');
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
	gap: 5px;
}

.litst-table-filter-box {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	padding: 15px;
	background-color: rgb(215, 215, 220);
	border: solid rgb(200, 200, 205) 2px;
	border-radius: 10px;
	gap: 5px;
}

.button-width {
	width: 150px;
}

h4 {
	text-align: center;
}
</style>
