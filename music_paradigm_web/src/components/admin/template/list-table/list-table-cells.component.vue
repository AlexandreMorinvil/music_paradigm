<template>
	<table class="table-template">

		<thead>
			<tr>
				<th v-on:mouseover="indicateCheckboxColumnBeingHovered"
					v-on:mouseleave="indicateCheckboxColumnNotBeingHovered" class="count-column">
					<input type="checkbox" v-if="isListTableSelectionActivated" :checked="areAllEntitesInListTableSelection"
						v-on:click="toggleAllEntitiesInListTableSelection" />
					<span v-else>#</span>
				</th>
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
			<tr v-for="(entity, index) in entitiesList" :key="entity._id"
				:class="{ selected: isInListTableSelection(entity) }" :style="getImposedColorStyle(entity)">
				<td v-on:mouseover="indicateCheckboxColumnBeingHovered"
					v-on:mouseleave="indicateCheckboxColumnNotBeingHovered">
					<input type="checkbox" v-if="isListTableSelectionActivated" :checked="isInListTableSelection(entity)"
						v-on:click="() => toggleEntityInListTableSelection(entity)" />
					<span v-else>{{ index + 1 }}</span>
				</td>
				<td v-for="column in selectedColumnsList">
					<TemplateFieldOutputComponent :value="entity.getValueToDisplay(column)" />
				</td>
				<td class="action-cells">
					<slot :entity="entity" />
				</td>
			</tr>
		</tbody>

	</table>
</template>

<script>
import '@/styles/table-template.css';

import { colorHandler } from '@/_helpers';
import { ListTable, ListTableSelection } from '@/modules/list-tables';
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
		listTableSelection: {
			type: ListTableSelection,
			default: null,
		},
	},
	data() {
		return {
			hasEditorExpanded: false,
			isExpanded: false,
			isCheckboxColumnBeingHovered: false,
		};
	},
	computed: {
		areAllEntitesInListTableSelection() {
			return this.entitiesList.length === this.listTableSelection?.elementsCount;
		},
		entitiesList() {
			return this.listTable.filteredSortedEntitiesList;
		},
		hasActionButtons() {
			return true || Boolean(this.$slots.actionButtons);
		},
		hasEntityInListTableSelection() {
			return this.listTableSelection?.hasElements || false;
		},
		isListTableSelectionActivated() {
			return (this.listTableSelection && this.isCheckboxColumnBeingHovered) || this.hasEntityInListTableSelection;
		},
		selectedColumnsList() {
			return this.listTable.selectedColumnsList;
		},
	},
	methods: {
		getImposedColorStyle(entity) {
			const imposedColor = this.listTable.getFilterImposedColorOfEntity(entity);
			return imposedColor ? {
				'background-color': imposedColor,
				color: colorHandler.generateColorForTextOnBackgroundColor(imposedColor),
			} : null;
		},
		indicateCheckboxColumnBeingHovered() {
			this.isCheckboxColumnBeingHovered = true;
		},
		indicateCheckboxColumnNotBeingHovered() {
			this.isCheckboxColumnBeingHovered = false;
		},
		isColumnUsedForSorting(column) {
			return this.listTable.isColumnUsedForSorting(column);
		},
		isInListTableSelection: function (entity) {
			return this.listTableSelection.includes(entity);
		},
		toggleAllEntitiesInListTableSelection() {
			if (this.areAllEntitesInListTableSelection) this.listTableSelection.empty();
			else this.listTableSelection.addList(this.entitiesList);
		},
		toggleEntityInListTableSelection(entity) {
			this.listTableSelection.toggleSelection(entity);
		},
		toggleSortForColumn(column) {
			this.listTable.toggleSortForColumn(column);
		},
	},
	watch: {
		entitiesList: {
			deep: true,
			handler: function () {
				this.listTableSelection.removeIfNotIn(this.entitiesList);
			}
		}
	}
};
</script>

<style scoped>
.table-template {
	text-align: center;
}

.count-column {
	width: 65px;
	min-width: 65px;
}

.action-cells {
	white-space: normal;
}

.clickable-sort-icon {
	cursor: pointer;
}

input[type="checkbox"] {
	width: 1.25em;
	height: 1.25em;
}
</style>
