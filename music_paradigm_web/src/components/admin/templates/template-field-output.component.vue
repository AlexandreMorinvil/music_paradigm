<template>
	<div class="template-field-input-area">
		<span class="output-spacing" v-bind="ouputAttributes"> {{ displayedValue }} </span>
	</div>
</template>

<script>
import '@/styles/field-template.css';

import { FORMATTING_EMPTY_VALUE_PLACEHOLDER } from '@/modules/formatting';

export default {
	props: {
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
	},
	computed: {
		displayedValue() {
			return this.value === null ? this.noValuePLaceHolder : this.value;
		}
	}
};
</script>

<style scoped>
.template-field-input-area {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
}
</style>
