<template>
	<div class="experiment-input">
		<div class="delete-position">
			<button v-on:click="removeExperiment(index)" class="widget-button red">Remove #{{ index + 1 }}</button>
		</div>

		<div class="experiment-position">
			<label for="completion-limit">
				Experiment:
				<span class="selected-element-text">{{
					getExperimentFullNameFromList(curriculumSelectedExperimentAtIndex(index).experimentReference)
				}}</span>
			</label>
			<select name="experiment-reference" v-model="experimentData.experimentReference">
				<option v-for="(reference, index) in experimentsReferences" :key="index" :value="experimentsReferences[index].id">
					{{ experimentsReferences[index].fullName }}
				</option>
			</select>
		</div>

		<div class="title-position">
			<label for="experiment-title">
				Experiment Title :
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).title }}</span>
			</label>
			<input
				type="text"
				v-model="experimentData.title"
				name="experiment-title"
				autocomplete="new-experiment-title"
				placeholder="Insert new experiment title"
			/>
		</div>

		<div class="area1-position">
			<label for="is-unique-in-day" class="inline-label">
				Unique in Day:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).isUniqueIndDay }}</span>
			</label>
			<input type="checkbox" class="checkbox" v-model="experimentData.isUniqueIndDay" name="is-unique-in-day" />
		</div>

		<div>
			<label for="experiment-id">
				Associative ID:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).associativeId }}</span>
			</label>
			<input
				type="text"
				v-model="experimentData.associativeId"
				name="experiment-id"
				autocomplete="new-experiment-id"
				placeholder="Insert associative id"
			/>
		</div>

		<div>
			<label for="delay-in-days">
				Delay (Days):
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).delayInDays }}</span>
			</label>
			<input
				type="number"
				min="0"
				v-model="experimentData.delayInDays"
				name="delay"
				autocomplete="new-delay"
				placeholder="Insert new delay in days"
			/>
		</div>

		<div>
			<label for="completion-target">
				Completion Target:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).completionTarget }}</span>
			</label>
			<input
				type="number"
				min="0"
				v-model="experimentData.completionTarget"
				name="target"
				autocomplete="new-target"
				placeholder="Insert new completion target"
			/>
		</div>

		<div>
			<label for="completion-limit">
				Completion Limit:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).completionLimit }}</span>
			</label>
			<input
				type="number"
				min="0"
				v-model="experimentData.completionLimit"
				name="limit"
				autocomplete="new-limit"
				placeholder="Insert new completion limit"
			/>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

export default {
	props: {
		index: Number,
		experiment: Object,
	},
	data() {
		return {
			experimentData: {},
		};
	},
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('curriculums', ['getBlankCurriculumExperiment', 'curriculumSelectedExperimentAtIndex']),
		experimentsReferences() {
			const fullReference = [];
			this.experimentsHeadersList.forEach((element) => {
				fullReference.push({
					id: element._id,
					fullName: this.formatExperimentUniqueName(element),
				});
			});
			return fullReference;
		},
	},
	methods: {
		getExperimentFullNameFromList(id) {
			const experiment = this.experimentsReferences.filter((obj) => {
				return obj.id === id;
			});
			if (experiment[0]) return experiment[0].fullName;
			else return '';
		},
		formatExperimentUniqueName(experiment) {
			if (experiment) return String(experiment.group) + '/' + experiment.name + '/v' + experiment.version;
			else return '';
		},
		removeExperiment(index) {
			this.$emit('remove-experiment', index);
		},
	},
	beforeMount() {
		this.experimentData = this.experiment;
	},
};
</script>

<style scoped>
/* Form  */

.widget form {
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 15px;
}

/* Experiment list */

.experiments-parameters-section {
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 15px;
}

.delete-position {
	grid-area: delete;
	display: flex;
	justify-content: center;
	align-items: center;
}

.delete-position button {
	margin-top: auto;
}

.experiment-position {
	grid-area: experiment;
}

.title-position {
	grid-area: title;
}

.area1-position {
	grid-area: area1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.experiment-input {
	display: grid;
	grid-template-areas:
		'experiment experiment title title delete'
		'. . . . area1';
	grid-gap: 15px;

	background-color: var(--inner-form-background-color);
	padding: 5px 20px 20px;
}
</style>
