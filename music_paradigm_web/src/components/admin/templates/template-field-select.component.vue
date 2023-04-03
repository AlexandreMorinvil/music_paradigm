<template>
	<div class="template-field-input-area">
		<select class="input-spacing" :class="{
			'edited-text': isEdited,
			'placeholder-option': !isEdited && value === null,
			'dissabled-text': isDissabled
		}" :value="valueConsideringEmpties" v-on:change="(event) => edit(event.target.value)" v-bind="selectAttributes"
			:disabled="isDissabled">
			<option v-if="isEmptyAccepted" class='placeholder-option' :value="NO_VALUE"> {{ placeholder }} </option>
			<option v-for="(element, index) in options" :key="index" :value="getOptionValueFromElement(element)"
				class='valid-option'>
				{{ getDisplayedValueFromElement(element) }}
			</option>
		</select>
		<LoaderSuspensionPoints v-if="isLoading" class="select-loader" />
	</div>
</template>

<script>
import '@/styles/field-template.css';

import LoaderSuspensionPoints from '../../visual-helpers/loader-suspension-points.vue'

export default {
	components: {
		LoaderSuspensionPoints
	},
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
		isEveryValueNew: {
			type: Boolean,
			default: false,
		},
		isForcedDisabled: {
			type: Boolean,
			default: false,
		},
		isLoading: {
			type: Boolean,
			default: false,
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
	data() {
		return {
			NO_VALUE: '#NO_VALUE'
		}
	},
	computed: {
		hasExpectedValue() {
			return this.expectedValue !== undefined;
		},
		isDissabled() {
			return this.isForcedDisabled || this.isLoading;
		},
		isEdited() {
			if (this.isEveryValueNew) return true;
			return this.hasExpectedValue && this.value !== this.expectedValue;
		},
		valueConsideringEmpties() {
			// This manipulation on the value is necessary to properly handle the "null" values with the select element.
			// Otherwise, the HTML select element alone can only asign string and empty string values, so we add this 
			// NO_VALUE string to represent the "null" and "undefined" values.
			if (this.value === null || this.value === undefined) return this.NO_VALUE;
			return this.value;
		},
	},
	methods: {
		edit(value) {
			if (value === this.NO_VALUE) this.$emit('edit', null);
			else this.$emit('edit', value);
		}
	}
};
</script>

<style scoped>
select {
	text-overflow: ellipsis;
	width: 100%;
}

.template-field-input-area {
	position: relative;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
}

.placeholder-option {
	color: grey;
}

.valid-option {
	color: black;
}

.dissabled-text {
	color: grey;
}

/* Loader */
.select-loader {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>
