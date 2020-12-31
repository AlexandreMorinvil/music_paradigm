<template>
	<div class="editor-box-form">
		<div class="general-parameters-section">
			<div>
				<label for="title">
					Title :
					<span class="selected-element-text-color">{{ curriculumSelectedTitleDisplay }}</span>
				</label>
				<input type="text" v-model="title" name="title" autocomplete="new-username" placeholder="Insert new title" />
			</div>
			<div>
				<label for="isSequential">
					Sequential:
					<span class="selected-element-text-color">{{ curriculumSelectedIsSequentialDisplay }}</span>
				</label>
				<input class="checkbox" v-model="isSequential" name="isSequential" type="checkbox" />
			</div>
		</div>

		<div class="experiments-parameters-section">
			<div>
				<button v-on:click="addExperiment()" class="widget-button blue">Add</button>
				<label class="inline-label"> Experiment(s): </label>
			</div>
			<curriculums-editor-form-experiment-component
				v-for="(experiment, index) in experiments"
				:key="index"
				:experiment="experiment"
				:index="index"
				v-on:remove-experiment="removeExperiment"
			/>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import CurriculumsEditorFormExperimentComponent from './curriculums-editor-form-experiment.component.vue';

export default {
	components: {
		CurriculumsEditorFormExperimentComponent,
	},
	data() {
		return {
			id: '',
			title: '',
			isSequential: false,
			experiments: [],
		};
	},
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('curriculums', [
			'hasSelectedCurriculum',
			'getBlankCurriculumExperiment',
			'curriculumSelectedId',
			'curriculumSelectedTitle',
			'curriculumSelectedIsSequential',
			'curriculumSelectedExperiments',
		]),
		curriculumSelectedTitleDisplay() {
			return this.hasSelectedCurriculum ? this.curriculumSelectedTitle || '---' : '';
		},
		curriculumSelectedIsSequentialDisplay() {
			return this.hasSelectedCurriculum ? this.curriculumSelectedIsSequential || '---' : '';
		},
	},
	methods: {
		...mapActions('experiments', ['fetchAllExperimentsHeaders']),
		bundleCurrirulumFromForm() {
			return {
				id: this.id,
				title: this.title,
				isSequential: this.isSequential,
				experiments: this.experiments,
			};
		},
		addExperiment() {
			this.experiments.push(this.getBlankCurriculumExperiment(this.experiments.length));
		},
		assignFormId(id) {
			this.id = id;
		},
		assignFormTitle(title) {
			this.title = title;
		},
		assignFormIsSequential(isSequential) {
			this.isSequential = isSequential;
		},
		assignFormExperiments(experiments) {
			this.experiments = Array.isArray(experiments) ? JSON.parse(JSON.stringify(experiments)) : [];
		},
		assignSelectedToForm() {
			this.assignFormId(this.curriculumSelectedId);
			this.assignFormTitle(this.curriculumSelectedTitle);
			this.assignFormIsSequential(this.curriculumSelectedIsSequential);
			this.assignFormExperiments(this.curriculumSelectedExperiments);
		},
		removeExperiment(index) {
			this.experiments.splice(index, 1);
		},
		clearForm() {
			this.assignFormId('');
			this.assignFormTitle('');
			this.assignFormIsSequential(false);
			this.assignFormExperiments([]);
		},
		handleRevert() {
			this.assignSelectedToForm();
		},
	},
	mounted() {
		this.fetchAllExperimentsHeaders();
	},
	watch: {
		curriculumSelectedId: {
			immediate: true,
			handler: function () {
				this.assignSelectedToForm();
			},
		},
	},
};
</script>

<style scoped>
.widget form {
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
}

.experiments-parameters-section {
	display: grid;
	grid-template-columns: 100%;
	grid-gap: 15px;
}

.inline-label {
	display: inline;
}
</style>
