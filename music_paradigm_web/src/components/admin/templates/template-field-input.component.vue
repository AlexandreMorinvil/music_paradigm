<template>
	<div class="template-field-input-area">
		<input 
			class="input-spacing" 
			:list="hasDataList ? datalistReference : ''"
			:value="value" v-on:input="(event) => edit(event.target.value)" 
			v-bind="inputAttributes" 
		/>
		<datalist :id="datalistReference">
			<option v-for="(data, index) in datalist" :key="index" :value="data" />
		</datalist>
	</div>
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
	computed: {
		hasDataList() {
			return this.datalist.length > 0;
		},
		datalistReference() {
			return 'datalist-input-' + this.inputAttributes.name;
		}
	},
	methods: {
		edit(value) {
			this.$emit('edit', value);
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
