<template>
	<div class="comparison-value-input">
		<!-- For boolean input (Is not used) -->
		<TemplateFieldSelectComponent v-if="isBooleanType" v-bind:value="condition.comparativeValue"
			v-on:edit="(value) => setComparativeValue(value)" :options="[true, false]" :isNullValid="false"
			:isEmptyAccepted="false" />

		<!-- For text input -->
		<TemplateFieldInputComponent v-if="isStringType" v-bind:value="condition.comparativeValue"
			v-on:edit="(value) => setComparativeValue(value)" :inputAttributes="{
				type: 'text',
				autocomplete: 'off',
				placeholder: 'Comparison text value',
			}" :isNullValid="false" />

		<!-- For number input -->
		<TemplateFieldInputComponent v-if="isNumberType" v-bind:value="condition.comparativeValue"
			v-on:edit="(value) => setComparativeValue(value)" :inputAttributes="{
				type: 'number',
				autocomplete: 'off',
				placeholder: 'Comparison number value',
			}" :isNullValid="false" />

		<!-- For date input -->
		<TemplateFieldInputComponent v-if="isDateType" v-bind:value="condition.comparativeValue"
			v-on:edit="(value) => setComparativeValue(value)" :inputAttributes="{
				type: 'datetime-local',
				autocomplete: 'off',
				placeholder: 'Comparison date value',
			}" :isNullValid="false" />

		<!-- For duration input -->
		<TemplateFieldInputDurationComponent v-if="isDurationType" v-bind:value="condition.comparativeValue"
			v-on:edit="(value) => setComparativeValue(value)" :inputAttributes="{
				autocomplete: 'off',
				placeholder: 'Comparison duration value',
			}" :isNullValid="false" />
	</div>
</template>

<script>
import { ColumnType, ListTableFilterCondition } from '@/modules/list-tables';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldInputDurationComponent from '@/components/admin/template/template-field-input-duration.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';

export default {
	emits: ['update'],
	components: {
		TemplateFieldInputComponent,
		TemplateFieldInputDurationComponent,
		TemplateFieldSelectComponent,
	},
	props: {
		condition: {
			type: ListTableFilterCondition,
			default() {
				return new ListTableFilterCondition();
			},
		},
	},
	computed: {
		column() {
			return this.condition.column ?? new ListTableColumn();
		},
		isBooleanType() {
			return [ColumnType.boolean].includes(this.column.type);
		},
		isDateType() {
			return [ColumnType.date].includes(this.column.type);
		},
		isDurationType() {
			return [ColumnType.duration].includes(this.column.type);
		},
		isNumberType() {
			return [ColumnType.number].includes(this.column.type);
		},
		isStringType() {
			return [ColumnType.string, ColumnType.arrayOfStrings].includes(this.column.type);
		},
		type() {
			return this.column.type;
		},
	},
	methods: {
		setComparativeValue(comparativeValue) {
			this.condition.setComparativeValue(comparativeValue);
			this.update();
		},
		update() {
			this.$emit('update');
		}
	},
	watch: {
		type: {
			handler: function (currentValue, previousValue) {
				if (currentValue === previousValue) return;
				else if (this.isBooleanType) this.setComparativeValue(true);
				else if (this.isDateType) this.setComparativeValue(new Date());
				else if (this.isDurationType) this.setComparativeValue(0);
				else if (this.isNumberType) this.setComparativeValue(0);
				else if (this.isStringType) this.setComparativeValue('');
				else this.setComparativeValue(null);
			}
		}
	}
};
</script>

<style scoped>
.comparison-value-input {
	display: flex;
	align-items: stretch;
	justify-content: stretch;
}

.comparison-value-input>* {
	flex: 1;
}
</style>
