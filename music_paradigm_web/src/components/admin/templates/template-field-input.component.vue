<template>
	<div class="template-field-input-area">
		<input 
			class="input-spacing" 
			:class="{ 'edited-text': isEdited }"
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
		expectedValue: {
			type: null,
			default: null,
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
		value: {
			type: null,
			default: null,
		},
	},
	computed: {
		hasDataList() {
			return this.datalist.length > 0;
		},
		hasExpectedValue() {
			return this.expectedValue !== null;
		},
		isEdited() {
			return this.hasExpectedValue && this.value !== this.expectedValue;
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
