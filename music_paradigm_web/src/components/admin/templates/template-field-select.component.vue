<template>
	<select class="input-spacing" :class="{ 'edited-text': isEdited }" :value="value"
		v-on:input="(event) => edit(event.target.value)" v-bind="selectAttributes">
		<option :value="null"> {{ placeholder }} </option>
		<option v-for="(option, index) in options" :key="index" :value="option">
			{{ getDisplayFromValue(option) }}
		</option>
	</select>
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
		getDisplayFromValue: {
			type: Function,
			default() {
				return (value) => value;
			}
		},
		isEmptyAccepted: {
			type: Boolean,
			default: true,
		},
		options: {
			type: Array,
			default() {
				return [];
			}
		},
		placeholder: {
			type: String,
			default: '',
		},
		selectAttributes: {
			type: Object,
			default() {
				return {
					name: 'select',
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
