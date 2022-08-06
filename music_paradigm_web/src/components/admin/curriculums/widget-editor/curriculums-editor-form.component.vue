<template>
	<div class="form-grid">
		<div class="title-area input">
			<label for="title">
				Title : <span class="selected-element-text">{{ curriculumSelectedTitleDisplay }}</span>
			</label>
			<input type="text" v-model="title" name="title" autocomplete="new-username" placeholder="Insert new title" />
		</div>

		<div class="log-type-area input">
			<label for="log-type">
				Log type : <span class="selected-element-text">{{ curriculumSelectedLogTypeDisplay }}</span>
			</label>
			<select name="log-type" v-model="logType">
				<option v-for="(type, index) in logTypeOptions" :key="index" :value="setValidLogType(type)">
					{{ type }}
				</option>
			</select>
		</div>

		<div class="sequential-area">
			<input class="checkbox" v-model="isSequential" name="isSequential" type="checkbox" />
			<label for="isSequential">
				Sequential <span class="selected-element-text">{{ curriculumSelectedIsSequentialDisplay }}</span>
			</label>
		</div>

		<div class="experiments-area">
			<div>
				<button v-on:click="addExperiment()" class="widget-button small blue">Add</button>
				<label style="display: inline"> Experiment(s): </label>
			</div>
			<curriculums-editor-form-experiment-component
				class="inner-inner-widget"
				v-for="(experiment, index) in experiments"
				:key="index"
				:experiment="experiment"
				:index="index"
				:lastIndex="lastIndex"
				v-on:remove-experiment="removeExperiment"
				v-on:change-experiment="updateExperiment"
				v-on:move-up="moveUp"
				v-on:move-down="moveDown"
			/>
			<div v-if="hasManyExperiments">
				<button v-on:click="addExperiment()" class="widget-button small blue">Add</button>
				<label style="display: inline"> Experiment(s) </label>
			</div>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import { mapActions, mapGetters } from 'vuex';
import { log } from '@/_helpers';

import CurriculumsEditorFormExperimentComponent from './curriculums-editor-form-experiment.component.vue';

export default {
	components: {
		CurriculumsEditorFormExperimentComponent,
	},
	data() {
		return {
			id: '',
			title: '',
			logType: '',
			isSequential: false,
			experiments: [],
		};
	},
	computed: {
		...mapGetters('management/tasks', ['experimentsHeadersList']),
		...mapGetters('curriculums', [
			'hasSelectedCurriculum',
			'getBlankCurriculumExperiment',
			'curriculumSelectedId',
			'curriculumSelectedTitle',
			'curriculumSelectedLogType',
			'curriculumSelectedIsSequential',
			'curriculumSelectedExperiments',
		]),
		logTypeOptions() {
			return log.logTypeOptions;
		},
		curriculumSelectedTitleDisplay() {
			return this.hasSelectedCurriculum ? this.curriculumSelectedTitle || '---' : '';
		},
		curriculumSelectedLogTypeDisplay() {
			return this.hasSelectedCurriculum ? this.curriculumSelectedLogType : '';
		},
		curriculumSelectedIsSequentialDisplay() {
			return this.hasSelectedCurriculum ? this.curriculumSelectedIsSequential : '';
		},
		lastIndex() {
			return Math.max(0, this.experiments.length - 1);
		},
		hasManyExperiments() {
			return this.experiments.length;
		},
	},
	methods: {
		...mapActions('management/tasks', ['fetchAllExperimentsHeaders']),
		setValidLogType(logType) {
			return log.returnValidLogType(logType);
		},
		bundleCurrirulumForm() {
			return {
				id: this.id,
				title: this.title,
				logType: this.setValidLogType(this.logType),
				isSequential: this.isSequential,
				experiments: this.experiments,
			};
		},
		updateExperiment(mutation) {
			this.experiments[mutation.index] = mutation.experiment;
		},
		addExperiment() {
			this.experiments.push(this.getBlankCurriculumExperiment(this.experiments.length));
			this.jumpToExperiment(this.lastIndex);
		},
		removeExperiment(index) {
			this.experiments.splice(index, 1);
			if (this.hasManyExperiments) this.jumpToExperiment(index - 1);
		},
		moveUp(index) {
			const elementMovedUp = this.experiments[index];
			const elementMovedDown = this.experiments[index - 1];

			this.experiments.splice(index - 1, 2);

			const elementsAfter = [];
			const countRestElements = this.experiments.length;
			for (let i = index - 1; i < countRestElements; i++) elementsAfter.push(this.experiments.pop());

			setTimeout(() => {
				this.experiments.push(elementMovedUp);
				this.experiments.push(elementMovedDown);
				for (const elementAfter of elementsAfter) this.experiments.push(elementAfter);
			}, 0);
			this.jumpToExperiment(index - 1);
		},
		moveDown(index) {
			// This (more complicated) approach is used to ensure the Vue rendering is reactive
			// The use of 'push', 'pop' and 'setTimemout' forces reactivity
			const elementMovedUp = this.experiments[index + 1];
			const elementMovedDown = this.experiments[index];

			this.experiments.splice(index, 2);

			const elementsAfter = [];
			const countRestElements = this.experiments.length;
			for (let i = index; i < countRestElements; i++) elementsAfter.push(this.experiments.pop());

			setTimeout(() => {
				this.experiments.push(elementMovedUp);
				this.experiments.push(elementMovedDown);
				for (const elementAfter of elementsAfter) this.experiments.push(elementAfter);
			}, 0);
			this.jumpToExperiment(index + 1);
		},
		jumpToExperiment(index) {
			setTimeout(() => {
				const anchorId = 'curriculum-experiment-' + index;
				const offset = 80;
				const top = document.getElementById(anchorId).offsetTop - offset;
				window.scrollTo(0, top);
			}, 0);
		},
		assignFormId(id) {
			this.id = id;
		},
		assignFormTitle(title) {
			this.title = title;
		},
		assignFormLogType(logType) {
			this.logType = logType;
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
			this.assignFormLogType(this.curriculumSelectedLogType);
			this.assignFormIsSequential(this.curriculumSelectedIsSequential);
			this.assignFormExperiments(this.curriculumSelectedExperiments);
		},
		clearForm() {
			this.assignFormId('');
			this.assignFormTitle('');
			this.assignFormLogType('');
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
.form-grid {
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-areas:
		'title title log-type .'
		'title title log-type sequential'
		'experiments experiments experiments experiments';
}

.title-area {
	grid-area: title;
}

.log-type-area {
	grid-area: log-type;
}

.sequential-area {
	grid-area: sequential;
	display: flex;
	justify-content: center;
	align-items: center;
}

.experiments-area {
	grid-area: experiments;
	display: grid;
	grid-gap: 10px;
	grid-template-columns: 1fr;
}

.input {
	display: grid;
	grid-template-rows: 1fr 1fr;
}

.input > * {
	width: 100%;
}
</style>
