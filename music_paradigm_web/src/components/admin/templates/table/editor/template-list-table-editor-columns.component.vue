<template>
	<div class="table-editor-columns-area">
		<h4>Columns</h4>
		<TemplateFieldsetComponent>
			<template v-for="(column, index) in selectedColumnsList">
				<TemplateFieldLabelComponent :for="`column-${index + 1}`" :text="`Column ${index + 1}`" />
				<TemplateFieldSelectComponent :value="column.key" v-on:edit="(value) => editColumn(index, value)"
					isEmptyAccepted :getDisplayedValueFromElement="(column) => column.title"
					:isForcedDisabled="column.isAlwaysPresent" :getOptionValueFromElement="(column) => column.key"
					:options="possibleColumnsList" placeholder="# No column" />
				<!-- <div v-for="(tag, index) in userEditionTags" :key="index" class="tag-input-area">
					<TemplateFieldInputComponent v-bind:value="userEditionTags[index]"
					v-on:edit="(editedTag) => editTag(editedTag, index)" :expectedValue="userSelectionTags[index] || ''"
					:inputAttributes="{
						type: 'text',
						name: `tag ${index + 1}`,
						autocomplete: 'off',
						placeholder: 'Insert tag'
					}" />
					<TemplateButtonComponent color="red" isSmall v-on:click="() => deleteTag(index)" text="Delete" />
					</div>
					<TemplateButtonComponent class="grid-right-align" color="blue" isSmall v-on:click="addTag" text="Add Tag" /> -->
			</template>
		</TemplateFieldsetComponent>
	</div>
</template>

<script>
import { ListTable } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/templates/template-field-select.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';

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
		editColumn(index, newColumnKey) {
			this.listTable.editSelectedColumn(index, newColumnKey);
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

h4 {
	text-align: center;
}
</style>
