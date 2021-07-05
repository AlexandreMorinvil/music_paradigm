<template>
	<form class="parameter-form form-area">
		<div>
			<h3>Parameter(s) :</h3>
		</div>

		<div v-for="(options, parameter) in parameterOptions" :key="parameter" class="inner-inner-widget parameter-grid">
			<label for="parameter-value"> {{ parameter }} : </label>
			<select name="parameter-value" v-model="selectedParameters[parameter]">
				<option v-for="(option, index) in options" :key="index" :value="option">
					{{ option }}
				</option>
			</select>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { AdminUsersEventBus, adminUsersEvents } from '@/event-bus/admin-users.event-bus.js';
import { mapGetters } from 'vuex';

export default {
	components: {},
	data() {
		return {
			curriculumId: null,
			selectedParameters: {},
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedId', 'userSelectedImposedParameters']),
		...mapGetters('curriculums', ['curriculumsList']),
		currentlyAssignedValues() {
			return Object.assign({}, this.parameterDefaultValues, this.userSelectedImposedParameters);
		},
		selectedCurriculum() {
			const filteredCurriculum = this.curriculumsList.filter((curriculum) => curriculum._id === this.curriculumId);
			return filteredCurriculum[0];
		},
		parameterDefaultValues() {
			return this.selectedCurriculum ? this.selectedCurriculum.defaultVariableAssignation : {};
		},
		parameterOptions() {
			return this.selectedCurriculum ? this.selectedCurriculum.optionVariableValues : {};
		},
		wasParametersModified() {
			let wasModified = false;
			for (const name in this.selectedParameters) if (this.selectedParameters[name] !== this.currentlyAssignedValues[name]) wasModified = true;
			return wasModified;
		},
	},
	methods: {
		bundleParametersForm() {
			return { assignedParameters: this.selectedParameters };
		},
		changeCurriculum(curriculum) {
			this.curriculumId = curriculum;
			this.assignSelectedToForm();
		},
		assignSelectedToForm() {
			this.selectedParameters = JSON.parse(JSON.stringify(this.currentlyAssignedValues)) || {};
		},
	},
	mounted() {
		AdminUsersEventBus.$on(adminUsersEvents.SELECTED_USER_CURRICULUM_CHANGED, this.changeCurriculum);
	},
	beforeDestroy() {
		AdminUsersEventBus.$off(adminUsersEvents.SELECTED_USER_CURRICULUM_CHANGED, this.changeCurriculum);
	},
	watch: {
		userSelectedId: {
			deep: true,
			immediate: true,
			handler: function () {
				this.assignSelectedToForm();
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
