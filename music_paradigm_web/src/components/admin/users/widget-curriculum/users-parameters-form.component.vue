<template>
	<form class="parameter-form form-area">
		<div>
			<h3>Parameter : Value</h3>
		</div>

		<div v-for="(imposedValue, parameter) in parameters" :key="parameter" class="inner-inner-widget parameter-grid">
			<label for="parameter-value"> {{ parameter }} : </label>
			<select name="parameter-value" v-model="selectedParameters[parameter]">
				<option v-for="(option, index) in parameterOptions[parameter] || []" :key="index" :value="option">
					{{ option }}
				</option>
			</select>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

export default {
	components: {},
	data() {
		return {
			selectedParameters: {},
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedId', 'userSelectedOptionParameters', 'userSelectedImposedParameters']),
		parameters() {
			return this.userSelectedImposedParameters;
		},
		parameterOptions() {
			return this.userSelectedOptionParameters;
		},
		wasParametersModified() {
			let wasModified = false;
			for (const name in this.selectedParameters) if (this.selectedParameters[name] !== this.userSelectedImposedParameters[name]) wasModified = true;
			return wasModified;
		},
	},
	methods: {
		bundleParametersForm() {
			return { assignedParameters: this.selectedParameters };
		},
	},
	watch: {
		userSelectedId: {
			deep: true,
			immediate: true,
			handler: function () {
				this.selectedParameters = JSON.parse(JSON.stringify(this.userSelectedImposedParameters)) || {};
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
