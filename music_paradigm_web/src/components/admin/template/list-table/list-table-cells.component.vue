<template>
	<table class="table-template">

		<thead>
			<tr>
				<th v-on:mouseover="indicateCheckboxColumnBeingHovered"
					v-on:mouseleave="indicateCheckboxColumnNotBeingHovered" class="count-column">
					<input type="checkbox" v-if="isShallowSelectionActivated" :checked="allEntitesAreShallowSelected"
						v-on:click="toggleShallowSelectAll" />
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
			<tr v-for="(entity, index) in entitiesList" :key="entity._id" :class="{ selected: isSelected(entity) }"
				:style="getImposedColorStyle(entity)">
				<td v-on:mouseover="indicateCheckboxColumnBeingHovered"
					v-on:mouseleave="indicateCheckboxColumnNotBeingHovered">
					<input type="checkbox" v-if="isShallowSelectionActivated" :checked="isEntityShallowSelected(entity)"
						v-on:click="() => toggleEntityInShallowSelection(entity)" />
					<span v-else>{{ index + 1 }}</span>
				</td>
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
		shallowSelection: {
			type: ListTableSelection,
			default: null,
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
			isCheckboxColumnBeingHovered: false,
		};
	},
	computed: {
		allEntitesAreShallowSelected() {
			return this.entitiesList.length === this.shallowSelection?.elementsCount;
		},
		entitiesList() {
			return this.listTable.filteredSortedEntitiesList;
		},
		hasActionButtons() {
			return true || Boolean(this.$slots.actionButtons);
		},
		hasShallowSelectedEntity() {
			return this.shallowSelection?.hasElements || false;
		},
		isShallowSelectionActivated() {
			return (this.shallowSelection && this.isCheckboxColumnBeingHovered) || this.hasShallowSelectedEntity;
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
		isEntityShallowSelected: function (entity) {
			return this.shallowSelection.includes(entity);
		},
		isSelected(entity) {
			return !!this.selectedEntitiesList.find((selection) => {
				return entity.isEqual(selection) || false;
			});
		},
		toggleEntityInShallowSelection(entity) {
			this.shallowSelection.toggleSelection(entity);
		},
		toggleShallowSelectAll() {
			if (this.allEntitesAreShallowSelected) this.shallowSelection.empty();
			else this.shallowSelection.addList(this.entitiesList);
			this.$forceUpdate(); // Used to force the checkboxes to update;
		},
		toggleSortForColumn(column) {
			this.listTable.toggleSortForColumn(column);
		},
	},
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
	width: 1em;
	height: 1em;
}
</style>
