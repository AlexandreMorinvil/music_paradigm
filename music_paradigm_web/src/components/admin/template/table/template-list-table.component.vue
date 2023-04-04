<template>
	<div>
		<TemplateListTableTitleComponent :title="listTable.title" :hasEditorExpanded="hasEditorExpanded"
			:isExpanded="isExpanded" :isLoading="isLoading" :refreshFunction="refreshFunction" v-on:expand="toggleExpansion"
			v-on:editor="toggleEditor" />

		<TemplateListTableEditorComponent v-show="hasEditorExpanded" :listTable="listTable" v-on:update="updateTable" />

		<div class="table-area table-context list-table-template" :class="{ 'collapsed-size': !isExpanded }">
			<TemplateListTableCellsComponent :listTable="listTable" :selection="selection" ref="cells">
				<slot slot-scope="{ entity }" :entity="entity" />
			</TemplateListTableCellsComponent>
		</div>

		<TemplateListTableFooterComponent :listTable="listTable" :isLoading="isLoading" />
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable } from '@/modules/list-tables';

import TemplateListTableEditorComponent from './editor/template-list-table-editor.component.vue';
import TemplateListTableCellsComponent from './template-list-table-cells.component.vue';
import TemplateListTableFooterComponent from './template-list-table-footer.component.vue';
import TemplateListTableTitleComponent from './template-list-table-title.component.vue';

export default {
	components: {
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
		refreshFunction: {
			type: Function,
			default: () => { }
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
			isInitilized: false,
			listTable: new this.ListTableClass(this.list),
		};
	},
	methods: {
		toggleEditor() {
			this.hasEditorExpanded = !this.hasEditorExpanded;
		},
		toggleExpansion() {
			this.isExpanded = !this.isExpanded;
		},
		updateTable() {
			this.$refs.cells.$forceUpdate();
		},
	},
	watch: {
		list: {
			immediate: true,
			deep: true,
			handler: function () {
				this.listTable.setEntitiesListFromList(this.list);
			}
		}
	}
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
