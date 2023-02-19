<template>
	<div class="form-area">
		<div class="label-input-spacing" v-if="canFormBeDisplayed">

			<label for="title">Associative ID </label>
			<div class="associative-id-input-area">
				<input type="text" v-model="associativeIdInput" name="title" autocomplete="new-associative-id"
					placeholder="Insert an associative Id" />
				<button class="widget-button small blue" :class="isAssociativeIdEdited || 'inactive'"
					v-on:click="commitAssociativeIdEdition">Edit</button>
			</div>

			<label for="title">Title </label>
			<input type="text" v-model="title" name="title" autocomplete="new-title"
				placeholder="Insert the session title" />

			<label for="log-type">Task </label>
			<select :class="!taskReference && 'placeholder-option'" name="experiment-reference" v-model="taskReference">
				<option value="">Select the task of this session</option>
				<option v-for="(referenceAndName, index) in tasksReferenceAndNameList" :key="index"
					:value="tasksReferenceAndNameList[index].reference">
					{{ referenceAndName.fullName }}
				</option>
			</select>

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
import '@/styles/widget-template.css';

import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
	data() {
		return {
			associativeIdInput: "",
		}
	},
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('managementCurriculums/edition', [
			'curriculumEditionSessionAssociativeId',
			'curriculumEditionSessionDelayInDays',
			'curriculumEditionSessionIsCompletionLimited',
			'curriculumEditionSessionIsUniqueInDay',
			'curriculumEditionSelectedSessionIndex',
			'curriculumEditionSessionTaskReference',
			'curriculumEditionSessionText',
			'curriculumEditionSessionTitle',
			'hasCurriculumEditionSelectedSession',
			'hasAtLeastOneSessionInEditionCurriculum',
		]),
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
		isAssociativeIdEdited() {
			return this.associativeIdInput !== this.curriculumEditionSessionAssociativeId;
		},
	},
	methods: {
		...mapActions('managementCurriculums/edition', ['editCurriculumEditionSessionAssociativeId']),
		...mapMutations('managementCurriculums/edition', [
			'editCurriculumEditionSessionDelayInDays',
			'editCurriculumEditionSessionIsCompletionLimited',
			'editCurriculumEditionSessionIsUniqueInDay',
			'editCurriculumEditionSessionTaskReference',
			'editCurriculumEditionSessionText',
			'editCurriculumEditionSessionTitle',
		]),
		commitAssociativeIdEdition() {
			this.editCurriculumEditionSessionAssociativeId(this.associativeIdInput);
		},
		formatTaskUniqueName(task) {
			if (task) return String(task.group) + '/' + task.name + '/[v]' + task.version;
			else return '';
		},
		resetInputAssociativeId() {
			this.associativeIdInput = this.curriculumEditionSessionAssociativeId;
		}

	},
	watch: {
		curriculumEditionSessionAssociativeId: {
			immediate: true,
			handler: function () {
				this.resetInputAssociativeId();
			}
		},
		curriculumEditionSelectedSessionIndex: {
			immediate: true,
			handler: function () {
				this.resetInputAssociativeId();
			}
		}
	}
};
</script>

<style scoped>
.associative-id-input-area {
	display: grid;
	grid-template-columns: 4fr 1fr;
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
