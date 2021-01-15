<template>
	<form class="form-grid" @submit.prevent>
		<div class="curriculum-area input">
			<label for="curriculum">
				Curriculum : <span class="selected-element-text">{{ userSelectedCurriculumDisplay }}</span>
			</label>
			<select name="curriculum-reference" v-model="curriculum">
				<option :value="null">-- No curriculum is assigned --</option>
				<option v-for="(reference, index) in curriculumsReferences" :key="index" :value="curriculumsReferences[index]._id">
					{{ curriculumsReferences[index].title }}
				</option>
			</select>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			curriculum: null,
		};
	},
	computed: {
		...mapGetters('curriculums', ['curriculumsHeadersList']),
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId', 'userSelectedCurriculum']),
		wasCurriculumModified() {
			return this.curriculum !== this.userSelectedCurriculum;
		},
		curriculumsReferences() {
			return this.curriculumsHeadersList;
		},
		userSelectedCurriculumDisplay() {
			return this.hasSelectedUser ? this.getCurriculumTitleFromList(this.userSelectedCurriculum) || '---' : '';
		},
	},
	methods: {
		bundleCurriculumForm() {
			return { curriculum: this.curriculum };
		},
		getCurriculumTitleFromList(id) {
			const curriculum = this.curriculumsHeadersList.filter((obj) => {
				return obj._id === id;
			});
			if (curriculum[0]) return curriculum[0].title;
			else return '';
		},
		assignFormCurriculum(curriculum) {
			this.curriculum = curriculum;
		},
		assignSelectedToForm() {
			this.assignUserId(this.userSelectedId);
			this.assignFormCurriculum(this.userSelectedCurriculum);
		},
		clearForm() {
			this.assignUserId('');
			this.assignFormCurriculum(null);
		},
	},
	watch: {
		userSelectedId: {
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
	grid-template-columns: 1fr;
	grid-template-areas: 'curriculum';
}

.curriculum-area {
	grid-area: curriculum;
}

.input {
	display: grid;
	grid-template-rows: 1fr 1fr;
}

.input > * {
	width: 100%;
}
</style>
