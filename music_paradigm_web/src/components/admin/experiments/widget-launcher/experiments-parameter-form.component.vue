<template>
	<form class="experiment-position">
		<div>
			<h3>Parameter : Value</h3>
		</div>
		<div v-for="(variable, index) in parameters" :key="index" class="inner-inner-widget">
			<label for="completion-limit"> {{ variable.name }} : </label>
			<select name="parameter-value" v-model="variable.assignedValue">
				<option v-for="(option, index) in variable.optionValues || []" :key="index" :value="option">
					{{ option }}
				</option>
			</select>
		</div>
		{{ parameters }}
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: {},
	data() {
		return {
			editableParameters: [],
		};
	},
	computed: {
		...mapGetters('experiments', ['experimentSelectedParameters']),
		parameters() {
			return this.experimentSelectedParameters;
		},
	},
	methods: {
		...mapActions('experiments', ['fetchAllExperimentsHeaders']),
	},
	watch: {
		parameters(parameters) {
			this.editableParameters = JSON.parse(JSON.stringify(parameters));
		},
	},
};
</script>

<style scoped>
/* .widget form {
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 15px;
}

.general-parameters-section {
	display: grid;
	grid-template-columns: 2fr auto;
	grid-gap: 15px;
}

.general-parameters-section div {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-gap: 15px;
}

.general-parameters-section label {
	display: inline-block;
}

.general-parameters-section input {
	display: inline;
	margin: auto;
}  */
</style>
