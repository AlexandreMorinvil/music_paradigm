<template>
	<TemplateFieldsetComponent>

		<TemplateFieldLabelComponent for="task" text="Task" />
		<TemplateFieldSelectComponent :value="curriculumEditionSessionTaskReference"
			v-on:edit="editCurriculumEditionSessionTaskReference" isEmptyAccepted
			:getDisplayedValueFromElement="(tasksReferenceAndName) => tasksReferenceAndName.title"
			:getOptionValueFromElement="(tasksReferenceAndName) => tasksReferenceAndName.reference"
			:options="tasksReferenceAndNameList" placeholder="Select the task of this session" />

		<TemplateFieldLabelComponent for="session-title" text="Session title" />
		<TemplateFieldInputComponent v-bind:value="curriculumEditionSessionTitle"
			v-on:edit="editCurriculumEditionSessionTitle" :inputAttributes="{
					type: 'text',
					name: 'session-title',
					autocomplete: 'off',
					placeholder: 'Insert the session title',
				}" />

		<TemplateFieldLabelComponent for="delay-in-days" text="Delay preavailability (in days)" />
		<TemplateFieldInputComponent v-bind:value="curriculumEditionSessionDelayInDays"
			v-on:edit="editCurriculumEditionSessionDelayInDays" :inputAttributes="{
					type: 'number',
					name: 'delay-in-days',
					autocomplete: 'off',
					placeholder: 'Insert the delay before availability',
					min: 0,
				}" />

		<TemplateFieldLabelComponent for="wait-next-day" text="Once done, wait next day" />
		<TemplateFieldCheckboxInputComponent v-bind:value="curriculumEditionSessionIsUniqueInDay"
			v-on:edit="editCurriculumEditionSessionIsUniqueInDay" name="wait-next-day" />

		<TemplateFieldLabelComponent for="is-completion-limited" text="Only one completion" />
		<TemplateFieldCheckboxInputComponent v-bind:value="curriculumEditionSessionIsCompletionLimited"
			v-on:edit="editCurriculumEditionSessionIsCompletionLimited" name="is-completion-limited" />

		<TemplateFieldLabelComponent for="pre-start-text" text="Text to show before starting" />
		<TemplateFieldTextareaComponent v-bind:value="curriculumEditionSessionText"
			v-on:edit="editCurriculumEditionSessionText" :textAreaAttributes="{
					name: 'pre-start-text',
					placeholder: 'Insert a text to display to the user',
					rows: 4
				}" />

		<TemplateFieldLabelComponent for="associative-id" text="Associative ID (Id of the session)" />
		<div class="associative-id-input-area">
			<TemplateFieldInputComponent v-bind:value="associativeIdInput"
				v-on:edit="(value) => { associativeIdInput = value }" :inputAttributes="{
						type: 'text',
						name: 'associative-id',
						autocomplete: 'off',
						placeholder: 'Insert an identifier',
					}" />
			<button class="widget-button small blue" :class="isAssociativeIdEdited || 'inactive'"
				v-on:click="commitAssociativeIdEdition">Edit</button>
		</div>
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import TemplateFieldCheckboxInputComponent from '@/components/admin/template/template-field-checkbox-input.component.vue';
import TemplateFieldInputComponent from '@/components/admin/template/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldTextareaComponent from '@/components/admin/template/template-field-textarea.component.vue';

export default {
	components: {
		TemplateFieldCheckboxInputComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldSelectComponent,
		TemplateFieldsetComponent,
		TemplateFieldTextareaComponent,
	},
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
			'hasAtLeastOneSessionInEditionCurriculum',
		]),
		// TODO: Replace once I will have implemented the task summaries list
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
	grid-template-columns: 250px 400px;
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

select {
	min-width: fit-content;
}
</style>
