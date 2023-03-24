<template>
	<div class="table-area widget-table-context">
		<LoaderCircularComponent v-if="isLoading" class="loader" />
		<table v-else class="widget-table">

			<thead>
				<tr>
					<th class="count-column">#</th>
					<th v-for="column in listTable.selectedColumnsList">{{ column.title }}</th>
					<th v-if="hasActionButtons" class="action-column-title">Actions</th>
				</tr>
			</thead>

			<tbody>
				<tr v-for="(entity, index) in listTable.entitiesList" :key="entity._id"
					:class="{ selected: isSelected(entity) }">
					<td>{{ index + 1 }}</td>
					<td v-for="column in listTable.selectedColumnsList">
						<TemplateFieldCheckboxInputComponent :value="entity.getValueToDisplay(column)" />
					</td>
					<td v-if="hasActionButtons" class="action-cells">
						<slot name="actionButtons" :entity="entity" />
						<slot :entity="entity" />
					</td>
				</tr>
			</tbody>

		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';
import { ListTable } from '@/modules/list-tables';

import TemplateFieldCheckboxInputComponent from '@/components/admin/templates/template-field-output.component.vue';

export default {
	emits: ['select'],
	components: {
		LoaderCircularComponent,
		TemplateFieldCheckboxInputComponent,
	},
	props: {
		isLoading: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Array,
			default() {
				return [];
			},
		},
		ListTableClass: {
			type: null,
			default() {
				return ListTable;
			},
		},
		selection: {
			type: null,
			default: null,
		},
	},
	computed: {
		hasActionButtons() {
			return true || Boolean(this.$slots.actionButtons);
		},
		listTable() {
			return new this.ListTableClass(this.list);
		},
		selectedEntitiesList() {
			return this.listTable.convertToTableEntitiesList(this.selection);
		}
	},
	methods: {
		isSelected(entity) {
			return this.selectedEntitiesList.find((selection) => {
				return entity.isEqual(selection) || false;
			});
		},
	},
};
</script>

<style scoped>
.table-area {
	display: flex;
	justify-content: center;
	white-space: pre-line;
}

.count-column {
	width: 50px;
}

.action-column-title {
	z-index: 1;
}

.action-cells {
	white-space: normal;
}

.loader {
	width: 250px;
	height: 250px;
}
</style>
