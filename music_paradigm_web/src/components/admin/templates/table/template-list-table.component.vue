<template>
	<div>
		<TemplateListTableTitleComponent :title="listTable.title" :hasEditorExpanded="hasEditorExpanded"
			:isExpanded="isExpanded" :isLoading="isLoading" v-on:expand="toggleExpansion" v-on:editor="toggleEditor" />

		<TemplateListTableEditorComponent v-show="hasEditorExpanded" />

		<div class="table-area table-context list-table-template" :class="{ 'collapsed-size': !isExpanded }">
			<TemplateListTableCellsComponent :listTable="listTable">
				<slot slot-scope="{ entity }" :entity="entity" />
			</TemplateListTableCellsComponent>
		</div>

		<TemplateListTableFooterComponent :entitiesCount="listTable.entitiesCount" />
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable } from '@/modules/list-tables';
import LoaderSuspensionPointsComponent from '@/components/visual-helpers/loader-suspension-points.vue';

import TemplateListTableCellsComponent from './template-list-table-cells.component.vue';
import TemplateListTableEditorComponent from './template-list-table-editor.component.vue';
import TemplateListTableFooterComponent from './template-list-table-footer.component.vue';
import TemplateListTableTitleComponent from './template-list-table-title.component.vue';


export default {
	components: {
		LoaderSuspensionPointsComponent,
		TemplateListTableCellsComponent,
		TemplateListTableEditorComponent,
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
	data() {
		return {
			hasEditorExpanded: false,
			isExpanded: false,
		};
	},
	computed: {
		listTable() {
			return new this.ListTableClass(this.list);
		},
	},
	methods: {
		toggleEditor() {
			this.hasEditorExpanded = !this.hasEditorExpanded;
		},
		toggleExpansion() {
			this.isExpanded = !this.isExpanded;
		}
	},
};
</script>

<style scoped>
.collapsed-size {
	max-height: 700px;
}

.table-area {
	white-space: pre-line;
	display: flex;
	justify-content: center;
}
</style>
