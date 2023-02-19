<template>
	<div class="form-area">
		<div class="label-input-spacing">
			<label for="title">Title </label>
			<input type="text" v-model="title" name="title" autocomplete="new-username" placeholder="Insert new title" />

			<label for="log-type">Log type </label>
			<select name="log-type" v-model="logType">
				<option v-for="(type, index) in logTypeOptions" :key="index" :value="setValidLogType(type)">
					{{ type }}
				</option>
			</select>

			<label for="isSequential"> Delays in sequence </label>
			<input class="checkbox" v-model="isSequential" name="isSequential" type="checkbox" />
		</div>
	</div>
</template>

<script>
import '@/styles/form-template.css';

import { mapGetters, mapMutations } from 'vuex';
import { log } from '@/_helpers';


export default {
	computed: {
		...mapGetters('experiments', ['experimentsHeadersList']),
		...mapGetters('managementCurriculums/edition', [
			'curriculumEditionIsSequential',
			'curriculumEditionLogType',
			'curriculumEditionTitle',
		]),
		isSequential: {
			get() {
				return this.curriculumEditionIsSequential;
			},
			set(value) {
				this.editCurriculumEditionIsSequential(value);
			},
		},
		logType: {
			get() {
				return this.curriculumEditionLogType;
			},
			set(value) {
				this.editCurriculumEditionLogType(value);
			},
		},
		title: {
			get() {
				return this.curriculumEditionTitle;
			},
			set(value) {
				this.editCurriculumEditionTitle(value);
			},
		},
		logTypeOptions() {
			return log.logTypeOptions;
		},
	},
	methods: {
		...mapMutations('managementCurriculums/edition', [
			'editCurriculumEditionIsSequential',
			'editCurriculumEditionLogType',
			'editCurriculumEditionTitle',
		]),
		setValidLogType(logType) {
			return log.returnValidLogType(logType);
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

label {
	min-width: 250px;
	white-space: nowrap;
}
</style>
