<template>
	<div>
		<ListTableTitleComponent :listTable="listTable" :hasEditorExpanded="hasEditorExpanded" :isExpanded="isExpanded"
			:isLoading="isLoading" :refreshFunction="refreshFunction" v-on:expand="toggleExpansion"
			v-on:editor="toggleEditor" :downloadCsvFunction="downloadCsvFunction"
			:downloadJsonFunction="downloadJsonFunction" />

		<ListTableEditorComponent v-show="hasEditorExpanded" :listTable="listTable" v-on:update="updateTable" />

		<div class="table-area table-context list-table-template" :class="{ 'collapsed-size': !isExpanded }">
			<ListTableCellsComponent :listTable="listTable" :listTableSelection="listTableSelection" ref="cells">
				<slot slot-scope="{ entity }" :entity="entity" />
			</ListTableCellsComponent>
		</div>

		<ListTableFooterComponent :listTable="listTable" :isLoading="isLoading" :listTableSelection="listTableSelection" />
	</div>
</template>

<script>
import '@/styles/table-template.css';

import { ListTable, ListTableSelection, ListTableStateBackup } from '@/modules/list-tables';

import ListTableCellsComponent from './list-table-cells.component.vue';
import ListTableEditorComponent from './editor/list-table-editor.component.vue';
import ListTableFooterComponent from './list-table-footer.component.vue';
import ListTableTitleComponent from './list-table-title.component.vue';

export default {
	components: {
		ListTableCellsComponent,
		ListTableEditorComponent,
		ListTableFooterComponent,
		ListTableTitleComponent,
	},
	props: {
		downloadCsvFunction: {
			type: Function,
			default: null,
		},
		downloadJsonFunction: {
			type: Function,
			default: null,
		},
		initialTableState: {
			type: ListTableStateBackup,
			default: null,
		},
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
		listTableSelection: {
			type: ListTableSelection,
			default: null,
		},
		refreshFunction: {
			type: Function,
			default: () => { },
		},
		saveBackupFunction: {
			type: Function,
			default: () => { },
		},
	},
	data() {
		return {
			hasEditorExpanded: false,
			isExpanded: false,
			isInitilized: false,
			listTable: new this.ListTableClass(this.list, this.initialTableState),
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
			this.saveBackupFunction(this.listTable.getStatusBackup());
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
