<template>
	<input :class="{ 'edited-input': isEdited }" :value="value" :checked="value"
		v-on:input="(event) => edit(event.target.value)" type="checkbox" />
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
		name: {
			type: String,
			default: 'checkbox-input',
		},
		value: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		hasExpectedValue() {
			return this.expectedValue !== null && this.expectedValue !== undefined;
		},
		isEdited() {
			return this.hasExpectedValue && this.value !== this.expectedValue;
		},
	},
	methods: {
		edit(value) {
			this.$emit('edit', !Boolean(JSON.parse(value || false)));
		}
	}
};
</script>

<style scoped>
input {
	height: 30px;
	width: 30px;
}
</style>
