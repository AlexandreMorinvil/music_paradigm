<template>
	<div class="table-results-footer">
		<span>
			{{ entitiesCountMessage }}
		</span>
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable } from '@/modules/list-tables';

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
	},
	computed: {
		entitiesCount() {
			return this.listTable.entitiesCount;
		},
		keptEnitiesCount() {
			return this.listTable.keptEnitiesCount;
		},
		entitiesCountMessage() {
			if (this.entitiesCount === 0) {
				if (this.isLoading) return 'Loading items...';
				else return 'No items';
			}
			else {
				if (this.keptEnitiesCount === this.entitiesCount)
					return `Showing all ${this.entitiesCount} item(s)`;
				else return `Showing ${this.keptEnitiesCount} out of ${this.entitiesCount} item(s)`;
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
