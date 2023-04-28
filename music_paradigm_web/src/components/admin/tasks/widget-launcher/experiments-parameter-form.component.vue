<template>
	<form class="parameter-form form-area">
		<div>
			<h3>Parameter : Value</h3>
		</div>
		<div v-for="(variable, index) in parameters" :key="index" class="inner-inner-widget parameter-grid">
			<label for="completion-limit"> {{ variable.name }} : </label>
			<select name="parameter-value" v-model="variable.assignedValue" v-on:change="updateImposedParameters">
				<option v-for="(option, index) in variable.optionValues || []" :key="index" :value="option">
					{{ option }}
				</option>
			</select>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
	components: {},
	computed: {
		...mapGetters('experiments', ['experimentSelectedParameters']),
		parameters() {
			return JSON.parse(JSON.stringify(this.experimentSelectedParameters));
		},
	},
	methods: {
		...mapActions('experiments', ['setImposedParameterValues']),
		updateImposedParameters() {
			this.setImposedParameterValues(this.parameters);
		},
	},
	watch: {
		experimentSelectedParameters: {
			deep: true,
			immediate: true,
			handler: function () {
				this.setImposedParameterValues(this.parameters);
			},
		},
	},
};
</script>

<style scoped>
.parameter-grid {
	display: grid;
	grid-template-columns: 1fr 3fr;
}

label {
	text-align: center;
}
</style>
