<template>
	<form class="parameter-form form-area">
		<div>
			<h3>Parameter(s) :</h3>
		</div>

		<div
			v-for="(parameterOptionValuesList, parameterName) in parameterOptionValuesListMap"
			:key="parameterName"
			class="inner-inner-widget parameter-grid"
		>
			<label for="parameter-value"> {{ parameterName }} : </label>
			<input
				name="parameter-value"
				v-if="parameterInputModeIsFreeTextMap[parameterName]"
				v-model="parameterValueMap[parameterName]"
			/>
			<select name="parameter-value" v-else v-model="parameterValueMap[parameterName]">
				<option v-for="(option, index) in parameterOptionValuesList" :key="index" :value="option">
					{{ option }}
				</option>
			</select>
			<div>
				<!-- TODO : Allow toggling from selection mode to free text mode.
				<button
					type="button"
					v-if="getAcceptsFreeTexValues(parameterName)"
					v-on:click="toggleInputMode(parameterName)"
					class="widget-button small blue"
				>
					{{ showInputModeSwitchButtonText(parameterName) }}
				</button> -->
			</div>
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
			parameterValueMap: {},
			parameterInputModeIsFreeTextMap: {},
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedId']),
		...mapGetters('users/progressions', ['progressionSelectedImposedParameters']),
		...mapGetters('managementCurriculums', ['curriculumsList']),
		currentlyAssignedValues() {
			return Object.assign({}, this.parameterDefaultValueMap, this.progressionSelectedImposedParameters);
		},
		selectedCurriculum() {
			const filteredCurriculum = this.curriculumsList.find((curriculum) => curriculum._id === this.curriculumId);
			return filteredCurriculum;
		},
		parameterDefaultValueMap() {
			return this.selectedCurriculum ? this.selectedCurriculum.parameterDefaultValueMap : {};
		},
		parameterOptionValuesListMap() {
			return this.selectedCurriculum ? this.selectedCurriculum.parameterOptionValuesListMap : {};
		},
		parameterAcceptsFreeTextValuesMap() {
			return this.selectedCurriculum ? this.selectedCurriculum.parameterAcceptsFreeTextValuesMap : {};
		},
		wasParametersModified() {
			let wasModified = false;
			for (const name in this.parameterValueMap)
				if (this.parameterValueMap[name] !== this.currentlyAssignedValues[name]) wasModified = true;
			return wasModified;
		},
	},
	methods: {
		bundleParametersForm() {
			return { assignedParameters: this.parameterValueMap };
		},
		changeCurriculum(curriculum) {
			this.curriculumId = curriculum;
			this.assignSelectedToForm();
			this.refreshParametersDefaultInputMode();
		},
		assignSelectedToForm() {
			this.parameterValueMap = JSON.parse(JSON.stringify(this.currentlyAssignedValues)) || {};
		},
		refreshParametersDefaultInputMode() {
			// Iterate over all the variables.
			for (const parameterName in this.parameterValueMap) {
				// Retreive the details associated to the current parameter.
				const optionValuesList = this.getOptionValuesList(parameterName);
				const acceptsFreeTextValues = this.getAcceptsFreeTexValues(parameterName);

				// If the parameter accepts free text answer and has no option value aside from its default value, by
				// default its input mode is free text. Otherwise, the default input method is a selection list.
				if (acceptsFreeTextValues && optionValuesList.length <= 1)
					this.parameterInputModeIsFreeTextMap[parameterName] = true;
				else this.parameterInputModeIsFreeTextMap[parameterName] = false;
			}
		},
		toggleInputMode(parameterName) {
			// TODO: Allow toggling from selection mode to free text mode.
			this.parameterInputModeIsFreeTextMap[parameterName] = !this.parameterInputModeIsFreeTextMap[parameterName];
		},
		showInputModeSwitchButtonText(parameterName) {
			// TODO: Allow toggling from selection mode to free text mode.
			const isCurrentInputModeFreeText = this.parameterInputModeIsFreeTextMap[parameterName];
			if (isCurrentInputModeFreeText) return 'Proposed value';
			else return 'Free text value';
		},
		getAcceptsFreeTexValues(parameterName) {
			return this.parameterAcceptsFreeTextValuesMap[parameterName] || false;
		},
		getOptionValuesList(parameterName) {
			return this.parameterOptionValuesListMap[parameterName] || [];
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
	grid-template-columns: 1fr 3fr 1fr;
}

label {
	text-align: center;
}
</style>
