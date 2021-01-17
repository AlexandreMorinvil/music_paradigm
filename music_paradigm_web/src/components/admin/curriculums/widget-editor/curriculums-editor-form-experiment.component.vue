<template>
	<div class="experiment-input">
		<div class="delete-area centered-input">
			<button v-on:click="removeExperiment(index)" class="widget-button red">Remove #{{ index + 1 }}</button>
		</div>

		<div class="id-area">
			<label for="experiment-id">
				ID:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).associativeId }}</span>
			</label>
			<input
				type="text"
				v-on:change="updateExperiment"
				v-model="experimentData.associativeId"
				name="experiment-id"
				autocomplete="new-experiment-id"
				placeholder="Insert associative id"
			/>
		</div>

		<div class="experiment-area input">
			<label for="completion-limit">
				Experiment:
				<span class="selected-element-text">{{ getExperimentFullNameFromList(curriculumSelectedExperimentAtIndex(index).experimentReference) }}</span>
			</label>
			<select name="experiment-reference" v-on:change="updateExperiment" v-model="experimentData.experimentReference">
				<option v-for="(reference, index) in experimentsReferences" :key="index" :value="experimentsReferences[index].id">
					{{ experimentsReferences[index].fullName }}
				</option>
			</select>
		</div>

		<div class="title-area input">
			<label for="experiment-title">
				Experiment Title :
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).title }}</span>
			</label>
			<input
				type="text"
				v-on:change="updateExperiment"
				v-model="experimentData.title"
				name="experiment-title"
				autocomplete="new-experiment-title"
				placeholder="Insert new experiment title"
			/>
		</div>

		<div class="delay-area input">
			<label for="delay-in-days">
				Delay (Days):
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).delayInDays }}</span>
			</label>
			<input
				type="number"
				v-on:change="updateExperiment"
				min="0"
				v-model="experimentData.delayInDays"
				name="delay-in-days"
				autocomplete="new-delay"
				placeholder="Insert new delay in days"
			/>
		</div>

		<div class="time-area input">
			<label for="time-availability">
				Release Time:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).releaseTime }}</span>
			</label>
			<input type="time" v-on:change="updateExperiment" v-model="experimentData.releaseTime" name="time-available" value="00:00" />
		</div>

		<div class="limit-area centered-input">
			<input type="checkbox" v-on:change="updateExperiment" class="checkbox" v-model="experimentData.isCompletionLimited" name="completion-limit" />
			<label for="completion-limit">
				Completion Limited
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).isCompletionLimited }}</span>
			</label>
		</div>

		<div class="unique-area centered-input">
			<input type="checkbox" v-on:change="updateExperiment" class="checkbox" v-model="experimentData.isUniqueIndDay" name="is-unique-in-day" />
			<label for="is-unique-in-day" class="inline-label">
				Unique in Day
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).isUniqueIndDay }}</span>
			</label>
		</div>

		<div class="text-area">
			<label for="text">
				Text:
				<span class="selected-element-text">{{ curriculumSelectedExperimentAtIndex(index).text }}</span>
			</label>
			<textarea v-model="experimentData.text" v-on:change="updateExperiment" name="text" row="1" placeholder="Insert a text to display to the user" />
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
		updateExperiment() {
			this.$emit('change-experiment', { index: this.index, experiment: this.experimentData });
		},
	},
	beforeMount() {
		this.experimentData = this.experiment;
	},
	updated() {
		this.experimentData = this.experiment;
	},
};
</script>

<style scoped>
.experiment-input {
	display: grid;
	grid-template-columns: auto 1fr 1fr;
	grid-template-areas:
		'delete experiment title'
		'delete delay time'
		'id unique limit'
		'id text text';
	grid-gap: 15px;
}

.delete-area {
	grid-area: delete;
}

.experiment-area {
	grid-area: experiment;
}

.title-area {
	grid-area: title;
}

.id-area {
	grid-area: id;
}

.delay-area {
	grid-area: delay;
}

.time-area {
	grid-area: time;
}

.unique-area {
	grid-area: unique;
}

.limit-area {
	grid-area: limit;
}

.text-area {
	grid-area: text;
}

.input {
	display: grid;
	grid-template-rows: 1fr 1fr;
}

.centered-input {
	display: flex;
	justify-items: center;
	align-items: center;
}

.input > * {
	width: 100%;
}

.id-area > input {
	width: 150px;
}

.id-area > label {
	display: block;
}

.text-area > textarea {
	display: block;
	width: 100%;
}
</style>
