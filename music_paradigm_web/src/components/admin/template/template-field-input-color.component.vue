<template>
	<input class="input-spacing" :class="{ 'edited-text': isEdited }" :value="value"
		v-on:input="(event) => edit(event.target.value)" v-bind="inputAttributes" type="color" />
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['edit'],
	props: {
		datalist: {
			type: Array,
			default() {
				return [];
			}
		},
		expectedValue: {
			type: null,
			default: null,
		},
		inputAttributes: {
			type: Object,
			default() {
				return {
					type: 'color',
					name: 'input',
					autocomplete: 'off',
					placeholder: ''
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

<style scoped>
input {
	width: 100%;
	height: 100%;
}
</style>
