<template>
	<input class="form-input" :value="value" v-on:input="(event) => edit(event.target.value)" v-bind="inputAttributes" />
</template>

<script>
export default {
	emits: ['edit'],
	props: {
		inputAttributes: {
			type: Object,
			default() {
				return {
					type: 'text',
					name: 'input',
					autocomplete: 'off',
					placeholder: ''
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
.form-input {
	padding: 2.5px 10px;
}
</style>
