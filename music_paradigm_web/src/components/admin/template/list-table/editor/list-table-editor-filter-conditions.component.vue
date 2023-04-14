<template>
	<div class="filter-conditions-area">
		<div v-for="(condition, index) in filter.conditionsList" :key=index class="filter-condition-grid">

			<TemplateFieldSelectComponent :value="condition.columnKey" v-on:edit="(value) => setColumn(condition, value)"
				isEmptyAccepted :getDisplayedValueFromElement="(column) => column.title"
				:getOptionValueFromElement="(column) => column.key" :options="possibleColumnsList" :isNullValid="false"
				placeholder="# No column" />

			<TemplateFieldSelectComponent :value="condition.operatorNegator"
				v-on:edit="(value) => setOperatorNegator(condition, value)" :isEmptyAccepted="false"
				:getDisplayedValueFromElement="(negator) => negator.text"
				:getOptionValueFromElement="(negator) => negator.value" :options="conditionNegatorValues"
				:isNullValid="false" />

			<TemplateFieldSelectComponent :value="condition.operator" v-on:edit="(value) => setOperator(condition, value)"
				:isEmptyAccepted="false" :options="getValidConditionOperatorsForColumn(condition.column)"
				:isNullValid="false" />

			<ListTableEditorFilterConditionValueComponent v-if="condition.usesComparativeValue" :condition="condition"
				v-on:update="update" />
			<div v-else />

			<TemplateFieldSelectComponent :value="condition.chainingOperator"
				v-on:edit="(value) => setChainingOperator(condition, value)" isEmptyAccepted
				:options="chainingOperatorsList" placeholder="DO" />
		</div>
	</div>
</template>

<script>
import {
	ListTable,
	ListTableFilter,
	ChainingOperator,
	ConditionOperator,
	getConditionOperatorsByColumnType
} from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';
import ListTableEditorFilterConditionValueComponent from './list-table-editor-filter-condition-value.component.vue';

export default {
	emits: ['update'],
	components: {
		ListTableEditorFilterConditionValueComponent,
		TemplateButtonComponent,
		TemplateFieldInputComponent,
		TemplateFieldSelectComponent,
	},
	props: {
		filter: {
			type: ListTableFilter,
			default() {
				return new ListTableFilter();
			},
		},
		listTable: {
			type: ListTable,
			default() {
				return new ListTable();
			},
		},
	},
	computed: {
		chainingOperatorsList() {
			return Object.values(ChainingOperator);
		},
		conditionNegatorValues() {
			return [
				{ text: 'IS', value: false },
				{ text: 'NOT', value: true },
			];
		},
		operatorsList() {
			return Object.values(ConditionOperator);
		},
		filtersList() {
			return this.listTable.filtersList;
		},
		possibleColumnsList() {
			return this.listTable.possibleColumnsList;
		},
	},
	methods: {
		getValidConditionOperatorsForColumn(column) {
			return getConditionOperatorsByColumnType(column.type);
		},
		editFilter(filter, index, columnKey) {
			filter.setFilters(index, columnKey);
			this.update();
		},
		setColumn(condition, columnKey) {
			const column = this.possibleColumnsList.find(column => columnKey === column.key);
			condition.setColumn(column);
			this.update();
		},
		setOperatorNegator(condition, operatorNegator) {
			condition.setOperatorNegator(operatorNegator);
			this.update();
		},
		setOperator(condition, operator) {
			condition.setOperator(operator);
			this.update();
		},
		setChainingOperator(condition, chainingOperator) {
			condition.setChainingOperator(chainingOperator);
			this.filter.adjustChainedConditions();
			this.update();
		},
		update() {
			this.$emit('update');
		},
	}
};
</script>

<style scoped>
.filter-condition-grid {
	display: grid;
	grid-template-columns: 300px 70px 330px 300px 70px;
}
</style>
