<template>
	<div class="filter-conditions-area">
		<div v-for="(condition, index) in filter.conditionsList" :key=index class="filter-condition-grid">

			<TemplateFieldSelectComponent :value="condition.columnKey" v-on:edit="(value) => setColumnKey(condition, value)"
				isEmptyAccepted :getDisplayedValueFromElement="(column) => column.title"
				:getOptionValueFromElement="(column) => column.key" :options="possibleColumnsList"
				placeholder="# No column" />

			<TemplateFieldSelectComponent :value="condition.operatorNegator"
				v-on:edit="(value) => setOperatorNegator(condition, value)" :isEmptyAccepted="false"
				:getDisplayedValueFromElement="(negator) => negator.text"
				:getOptionValueFromElement="(negator) => negator.value" :options="conditionNegatorValues" />

			<TemplateFieldSelectComponent :value="condition.operator" v-on:edit="(value) => setOperator(condition, value)"
				:isEmptyAccepted="false" :options="operatorsList" />

			<TemplateFieldInputComponent v-bind:value="condition.comparativeValue"
				v-on:edit="(value) => setComparativeValue(condition, value)" :inputAttributes="{
					type: 'text',
					autocomplete: 'off',
					placeholder: 'Comparation value',
				}" />

			<TemplateFieldSelectComponent :value="condition.chainingOperator"
				v-on:edit="(value) => setChainingOperator(condition, value)" isEmptyAccepted
				:options="chainingOperatorsList" placeholder="DO" />
		</div>
	</div>
</template>

<script>
import { ListTable, ListTableFilter, ChainingOperator, ConditionOperator } from '@/modules/list-tables';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/templates/template-field-select.component.vue';

export default {
	emits: ['update'],
	components: {
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
		editFilter(filter, index, columnKey) {
			filter.setFilters(index, columnKey);
			this.update();
		},
		setColumnKey(condition, columnKey) {
			condition.setColumnKey(columnKey);
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
		setComparativeValue(condition, comparativeValue) {
			condition.setComparativeValue(comparativeValue);
			this.update();
		},
		setChainingOperator(condition, chainingOperator) {
			condition.setChainingOperator(chainingOperator);
			this.filter.adjustChainedConditions();
			this.update();
		},
		update() {
			this.$emit('update');
			this.$forceUpdate();
		},
	}
};
</script>

<style scoped>
.filter-condition-grid {
	display: grid;
	grid-template-columns: 300px auto auto 300px auto;
}
</style>
