<template>
	<select class="input-spacing" :class="{
		'edited-text': isEdited,
		'placeholder-option': !isEdited && value === null
	}" :value="value" v-on:change="(event) => edit(event.target.value)" v-bind="selectAttributes">
		<option v-if="isEmptyAccepted" class='placeholder-option' :value="placeholderValue"> {{ placeholder }} </option>
		<option v-for="(element, index) in options" :key="index" :value="getOptionValueFromElement(element)" class='valid-option'>
			{{ getDisplayedValueFromElement(element) }}
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
			default: undefined,
		},
		getDisplayedValueFromElement: {
			type: Function,
			default: (value) => value,
		},
		getOptionValueFromElement: {
			type: Function,
			default: (value) => value,
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
		placeholderValue: {
			type: String,
			default: null,
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
			return this.expectedValue !== undefined;
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
.placeholder-option {
	color: grey;
}

.valid-option {
	color: black;
}
</style>
