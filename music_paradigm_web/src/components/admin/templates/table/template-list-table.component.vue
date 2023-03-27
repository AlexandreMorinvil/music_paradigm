<template>
	<div>
		<TemplateListTableTitleComponent :title="listTable.title" :isLoading="isLoading" />
		<div class="table-area table-context list-table-template">
			<table class="table-template">

				<thead>
					<tr>
						<th class="count-column">#</th>
						<th v-for="column in listTable.selectedColumnsList">{{ column.title }}</th>
						<th v-if="hasActionButtons">Actions</th>
					</tr>
				</thead>

				<LoaderSuspensionPointsComponent v-if="isLoading && !hasData" class="loader" />
				<tbody v-else>
					<tr v-for="(entity, index) in listTable.entitiesList" :key="entity._id"
						:class="{ selected: isSelected(entity) }">
						<td>{{ index + 1 }}</td>
						<td v-for="column in listTable.selectedColumnsList">
							<TemplateFieldCheckboxInputComponent :value="entity.getValueToDisplay(column)" />
						</td>
						<td class="action-cells">
							<slot :entity="entity" :isSelected="isSelected(entity)" />
						</td>
					</tr>
				</tbody>

			</table>
		</div>
		<TemplateListTableFooterComponent :entitiesCount="listTable.entitiesCount" />
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable } from '@/modules/list-tables';
import LoaderSuspensionPointsComponent from '@/components/visual-helpers/loader-suspension-points.vue';
import TemplateFieldCheckboxInputComponent from '@/components/admin/templates/template-field-output.component.vue';

import TemplateListTableFooterComponent from './template-list-table-footer.component.vue';
import TemplateListTableTitleComponent from './template-list-table-title.component.vue';


export default {
	emits: ['select'],
	components: {
		LoaderSuspensionPointsComponent,
		TemplateFieldCheckboxInputComponent,
		TemplateListTableFooterComponent,
		TemplateListTableTitleComponent,
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
		hasData() {
			return this.listTable.entitiesCount > 0;
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
			return !!this.selectedEntitiesList.find((selection) => {
				return entity.isEqual(selection) || false;
			});
		},
	},
};
</script>

<style scoped>
.table-area {
	white-space: pre-line;
	display: flex;
	justify-content: center;
}

.table-template {
	text-align: center;
}

.count-column {
	width: 75px;
}

.action-cells {
	white-space: normal;
}

.loader {
	margin: 30px;
}
</style>
