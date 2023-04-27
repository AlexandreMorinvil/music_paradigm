<template>
	<div class="table-results-footer">
		<span>
			{{ entitiesCountMessage }} {{ selectedEntitiesCountMessage }}
		</span>
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable, ListTableSelection } from '@/modules/list-tables';

export default {
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		listTableSelection: {
			type: ListTableSelection,
			default: null,
		},
	},
	computed: {
		entitiesCount() {
			return this.listTable.entitiesCount;
		},
		keptEnitiesCount() {
			return this.listTable.keptEnitiesCount;
		},
		selectedEntitiesCount() {
			return this.listTableSelection?.elementsCount ?? 0;
		},
		entitiesCountMessage() {
			if (this.entitiesCount === 0) {
				if (this.isLoading)
					return 'Loading items...';
				else
					return 'No items.';
			}
			else {
				if (this.entitiesCount === this.keptEnitiesCount) {
					if (this.entitiesCount === 1)
						return `Showing the only items that exists.`;
					else
						return `Showing all ${this.entitiesCount} items.`;
				}
				else
					return `Showing ${this.keptEnitiesCount} out of ${this.entitiesCount} items.`;
			}
		},
		selectedEntitiesCountMessage() {
			if (this.selectedEntitiesCount === 0)
				return '';
			else if (this.selectedEntitiesCount === this.keptEnitiesCount) {
				if (this.selectedEntitiesCount === 1)
					return `The item is selected.`;
				else
					return `All ${this.selectedEntitiesCount} items are selected.`;
			}
			else {
				if (this.selectedEntitiesCount === 1)
					return `${this.selectedEntitiesCount} item is selected.`;
				else
					return `${this.selectedEntitiesCount} items are selected.`;
			}
		},
	}
};
</script>

<style scoped>
.table-results-footer {
	display: flex;
	align-items: center;
	background-color: rgb(225, 225, 230);
	border: solid rgb(210, 210, 215) 2px;
	border-radius: 0 0 10px 10px;
	color: rgb(25, 25, 25);
	height: 60px;
	padding: 30px;
	font-size: 0.85em;
}
</style>
