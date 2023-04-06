<template>
	<div class="table-editor-columns-area">
		<div class="table-editor-columns-header">
			<div />
			<h4>Columns</h4>
			<div class="table-editor-buttons-area">
				<i class="bi bi-arrow-counterclockwise" v-on:click="setColumnsToDefault" />
			</div>
		</div>
		<TemplateFieldsetComponent>
			<template v-for="(column, index) in selectedColumnsList">

				<TemplateFieldLabelComponent :for="`column-${index + 1}`" :text="`Column ${index + 1}`" />

				<div class="column-input-area">
					<TemplateFieldSelectComponent :value="column.key" v-on:edit="(value) => editColumn(index, value)"
						isEmptyAccepted :getDisplayedValueFromElement="(column) => column.title"
						:isForcedDisabled="isMandatoryColumnIndex(index)"
						:getOptionValueFromElement="(column) => column.key" :options="possibleColumnsList"
						placeholder="# No column" />

					<TemplateButtonComponent v-if="!isMandatoryColumnIndex(index)" color="red" isSmall
						v-on:click="() => deleteColumn(index)" text="Delete" />
				</div>

			</template>

			<TemplateButtonComponent class="grid-right-align" color="blue" isSmall v-on:click="addColumn"
				text="Add Column" />

		</TemplateFieldsetComponent>
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateButtonComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldSelectComponent,
		TemplateFieldsetComponent,
	},
	props: {
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	computed: {
		possibleColumnsList() {
			return this.listTable.possibleColumnsList;
		},
		selectedColumnsList() {
			return this.listTable.selectedColumnsList;
		},
	},
	methods: {
		addColumn() {
			this.listTable.addColumn();
			this.update();
		},
		deleteColumn(index) {
			this.listTable.deleteColumn(index);
			this.update();
		},
		editColumn(index, newColumnKey) {
			this.listTable.editSelectedColumns(index, newColumnKey);
			this.update();
		},
		isMandatoryColumnIndex(index) {
			return index < this.listTable.alwaysPresentColumnsCount;
		},
		setColumnsToDefault() {
			this.listTable.setSelectedColumnsToDefault();
			this.update();
		},
		update() {
			this.$emit('update');
		},
	}
};
</script>

<style scoped>
.table-editor-columns-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: rgb(225, 225, 230);
	border: solid rgb(210, 210, 215) 2px;
	border-radius: 10px;
	color: rgb(25, 25, 25);
	padding: 10px;
}

.column-input-area {
	display: grid;
	grid-template-columns: 4fr 1fr;
}

.grid-right-align {
	grid-column: 2;
}

.table-editor-columns-header {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-self: stretch;
}

.table-editor-buttons-area {
	display: flex;
	justify-content: right;
}

h4 {
	text-align: center;
}

i {
	margin-left: auto;
	-webkit-text-stroke: 1px;
}

i:hover {
	filter: opacity(75%);
}

i:active {
	filter: opacity(50%);
}
</style>
