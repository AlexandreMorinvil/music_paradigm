<template>
	<textarea class="input-spacing" :class="{ 'edited-text': mustHighlightIfChanged && isEdited }" :value="value"
		v-on:input="(event) => edit(event.target.value)" v-bind="textAreaAttributes" />
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['edit'],
	props: {
		expectedValue: {
			type: null,
			default: null,
		},
		mustHighlightIfChanged: {
			type: Boolean,
			default: true,
		},
		textAreaAttributes: {
			type: Object,
			default() {
				return {
					type: 'text',
					maxlength: undefined,
					name: 'input',
					autocomplete: 'off',
					placeholder: '',
					rows: 2,
				}
			}
		},
		value: {
			type: null,
			default: null,
		},
	},
	computed: {
		hasExpectedValue() {
			return this.expectedValue !== null;
		},
		isEdited() {
			return this.hasExpectedValue && this.value !== this.expectedValue;
		},
	},
	methods: {
		edit(value) {
			this.$emit('edit', value);
		}
	}
};
</script>

<style scoped></style>
