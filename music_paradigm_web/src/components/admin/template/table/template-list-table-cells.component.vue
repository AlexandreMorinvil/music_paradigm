<template>
	<table class="table-template">

		<thead>
			<tr>
				<th class="count-column">#</th>
				<th v-for="(column, index) in selectedColumnsList" :key="index">
					<TemplateFieldOutputComponent :value="column.columnTitle" />
					<i v-if="isColumnUsedForSorting(column)" class="clickable-sort-icon bi"
						:class="listTable.isReverSort ? 'bi-caret-up-fill' : 'bi-caret-down-fill'"
						v-on:click="() => toggleSortForColumn(column)" />
					<i v-else class="clickable-sort-icon bi bi-dot" v-on:click="() => toggleSortForColumn(column)" />
				</th>
				<th v-if="hasActionButtons">Actions</th>
			</tr>
		</thead>

		<tbody>
			<tr v-for="(entity, index) in entitiesList" :key="entity._id" :class="{ selected: isSelected(entity) }"
				:style="getImposedColorStyle(entity)">
				<td>{{ index + 1 }}</td>
				<td v-for="column in selectedColumnsList">
					<TemplateFieldOutputComponent :value="entity.getValueToDisplay(column)" />
				</td>
				<td class="action-cells">
					<slot :entity="entity" :isSelected="isSelected(entity)" />
				</td>
			</tr>
		</tbody>

	</table>
</template>

<script>
import '@/styles/table-template.css';

import { colorHandler } from '@/_helpers';
import { ListTable } from '@/modules/list-tables';
import TemplateFieldOutputComponent from '@/components/admin/template/template-field-output.component.vue';

export default {
	emits: ['select'],
	components: {
		TemplateFieldOutputComponent,
	},
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
		selection: {
			type: null,
			default: null,
		},
	},
	data() {
		return {
			hasEditorExpanded: false,
			isExpanded: false,
		};
	},
	computed: {
		entitiesList() {
			return this.listTable.filteredSortedEntitiesList;
		},
		hasActionButtons() {
			return true || Boolean(this.$slots.actionButtons);
		},
		selectedColumnsList() {
			return this.listTable.selectedColumnsList;
		},
		selectedEntitiesList() {
			return this.listTable.convertToTableEntitiesList(this.selection);
		},
	},
	methods: {
		getImposedColorStyle(entity) {
			const imposedColor = this.listTable.getFilterImposedColorOfEntity(entity);
			return imposedColor ? {
				'background-color': imposedColor,
				color: colorHandler.invertHexadecimalFormatColor(imposedColor),
			} : null;
		},
		isColumnUsedForSorting(column) {
			return this.listTable.isColumnUsedForSorting(column);
		},
		isSelected(entity) {
			return !!this.selectedEntitiesList.find((selection) => {
				return entity.isEqual(selection) || false;
			});
		},
		toggleSortForColumn(column) {
			this.listTable.toggleSortForColumn(column);
		}
	},
};
</script>

<style scoped>
.table-template {
	text-align: center;
}

.count-column {
	width: 75px;
}

.action-cells {
	white-space: normal;
}

.clickable-sort-icon {
	cursor: pointer;
}
</style>
