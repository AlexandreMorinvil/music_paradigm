<template>
	<div class="form-area">
		<div class="label-input-spacing" v-if="canFormBeDisplayed">

			<label for="title">Associative ID </label>
			<input type="text" v-model="associativeId" name="title" autocomplete="new-associative-id"
				placeholder="Insert an associative Id" />

			<label for="log-type">Task </label>
			<select :class="!taskReference && 'placeholder-option'" name="experiment-reference" v-model="taskReference">
				<option value="">Select the task of this session</option>
				<option v-for="(referenceAndName, index) in tasksReferenceAndNameList" :key="index"
					:value="tasksReferenceAndNameList[index].reference">
					{{ referenceAndName.fullName }}
				</option>
			</select>

			<label for="title">Title </label>
			<input type="text" v-model="title" name="title" autocomplete="new-title"
				placeholder="Insert the session title" />

			<label for="delay-in-days"> Delay in days </label>
			<input type="number" v-model="delayInDays" min="0" name="delay-in-days" autocomplete="new-delay"
				placeholder="Insert the delay before availability" />

			<label for="isUniqueInDay"> Once done, wait next day </label>
			<input class="checkbox" v-model="isUniqueInDay" name="isUniqueInDay" type="checkbox" />

			<label for="isCompletionLimited"> Only one completion </label>
			<input class="checkbox" v-model="isCompletionLimited" name="isCompletionLimited" type="checkbox" />

			<label for="text">Text</label>
			<textarea v-model="text" name="text" row="2" placeholder="Insert a text to display to the user" />

		</div>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { mapGetters, mapMutations } from 'vuex';

export default {
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('managementCurriculums/edition', [
			'curriculumEditionSessionAssociativeId',
			'curriculumEditionSessionDelayInDays',
			'curriculumEditionSessionIsCompletionLimited',
			'curriculumEditionSessionIsUniqueInDay',
			'curriculumEditionSessionTaskReference',
			'curriculumEditionSessionText',
			'curriculumEditionSessionTitle',
			'hasCurriculumEditionSelectedSession',
			'hasAtLeastOneSessionInEditionCurriculum'
		]),
		associativeId: {
			get() {
				return this.curriculumEditionSessionAssociativeId;
			},
			set(value) {
				this.editCurriculumEditionSessionAssociativeId(value);
			},
		},
		delayInDays: {
			get() {
				return this.curriculumEditionSessionDelayInDays;
			},
			set(value) {
				this.editCurriculumEditionSessionDelayInDays(value);
			},
		},
		isCompletionLimited: {
			get() {
				return this.curriculumEditionSessionIsCompletionLimited;
			},
			set(value) {
				this.editCurriculumEditionSessionIsCompletionLimited(value);
			},
		},
		isUniqueInDay: {
			get() {
				return this.curriculumEditionSessionIsUniqueInDay;
			},
			set(value) {
				this.editCurriculumEditionSessionIsUniqueInDay(value);
			},
		},
		taskReference: {
			get() {
				return this.curriculumEditionSessionTaskReference;
			},
			set(value) {
				this.editCurriculumEditionSessionTaskReference(value);
			},
		},
		text: {
			get() {
				return this.curriculumEditionSessionText;
			},
			set(value) {
				this.editCurriculumEditionSessionText(value);
			},
		},
		title: {
			get() {
				return this.curriculumEditionSessionTitle;
			},
			set(value) {
				this.editCurriculumEditionSessionTitle(value);
			},
		},
		canFormBeDisplayed() {
			return this.hasCurriculumEditionSelectedSession;
		},
		tasksReferenceAndNameList() {
			const tasksReferenceAndNameList = [];
			this.experimentsHeadersList.forEach((taskHeader) => {
				tasksReferenceAndNameList.push({
					reference: taskHeader._id,
					fullName: this.formatTaskUniqueName(taskHeader),
				});
			});
			return tasksReferenceAndNameList;
		},

	},
	methods: {
		...mapMutations('managementCurriculums/edition', [
			'editCurriculumEditionSessionAssociativeId',
			'editCurriculumEditionSessionDelayInDays',
			'editCurriculumEditionSessionIsCompletionLimited',
			'editCurriculumEditionSessionIsUniqueInDay',
			'editCurriculumEditionSessionTaskReference',
			'editCurriculumEditionSessionText',
			'editCurriculumEditionSessionTitle',
		]),
		formatTaskUniqueName(task) {
			if (task) return String(task.group) + '/' + task.name + '/[v]' + task.version;
			else return '';
		},

	},
};
</script>

<style scoped>
.form-area {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.label-input-spacing {
	display: grid;
	gap: 4px;
	grid-template-columns: 2fr 3fr;
}

.placeholder-option {
	color: grey;
}

label {
	min-width: 250px;
	white-space: nowrap;
}

option {
	color: black;
}
</style>
