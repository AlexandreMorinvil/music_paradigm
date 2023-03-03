<template>
	<textarea class="input-spacing" :value="value" v-on:input="(event) => edit(event.target.value)"
		v-bind="textAreaAttributes" />
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['edit'],
	props: {
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
		value: null,
	},
	methods: {
		edit(value) {
			this.$emit('edit', value);
		}
	}
};
</script>

<style scoped>
</style>
