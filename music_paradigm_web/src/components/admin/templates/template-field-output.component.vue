<template>
	<div class="template-field-input-area">
		<span class="output-spacing" v-bind="ouputAttributes"> {{ displayedValue }}
			<span v-if="hasComplementaryValue" class="complementary-value">{{ displayedComplementaryValue }}</span>
		</span>
	</div>
</template>

<script>
import '@/styles/field-template.css';

import { FORMATTING_EMPTY_VALUE_PLACEHOLDER } from '@/modules/formatting';

export default {
	props: {
		allowLoneComplementaryValue: {
			type: Boolean,
			default: false,
		},
		formatComplementaryValueFunction: {
			type: Function,
			default: (value) => value,
		},
		formatValueFunction: {
			type: Function,
			default: (value) => value,
		},
		noValuePLaceHolder: {
			type: String,
			default: FORMATTING_EMPTY_VALUE_PLACEHOLDER,
		},
		ouputAttributes: {
			type: Object,
			default() {
				return {}
			}
		},
		value: null,
		complementaryValue: null,
	},
	computed: {
		displayedValue() {
			return this.hasValue ? this.formatValueFunction(this.value) : this.noValuePLaceHolder;
		},
		displayedComplementaryValue() {
			return this.hasComplementaryValue ? this.formatComplementaryValueFunction(this.complementaryValue) : "";
		},
		hasValue() {
			return this.value !== null && this.value !== undefined;
		},
		hasComplementaryValue() {
			return (this.hasValue || this.allowLoneComplementaryValue) &&
				this.complementaryValue !== null &&
				this.complementaryValue !== undefined;
		},
	}
};
</script>

<style scoped>
.template-field-input-area {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
}

.complementary-value {
	float: right;
}
</style>
