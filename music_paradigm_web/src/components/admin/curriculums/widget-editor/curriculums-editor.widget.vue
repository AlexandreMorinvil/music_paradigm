<template>
	<div id="users-editor" class="widget widget-bg">
		<div class="edition-buttons-position">
			<button v-on:click="handleRevert" class="widget-button blue">Revert</button>
			<button v-on:click="handleUnselection" class="widget-button turquoise">Unselect</button>
		</div>

		<CurriculumOverviewSection />
		<CurriculumEditorSection />
		<CurriculumCommandButtonsSection />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import CurriculumCommandButtonsSection from './section-command-buttons/curriculum-command-buttons.section.vue';
import CurriculumEditorSection from './section-editor/curriculum-editor.section.vue';
import CurriculumOverviewSection from './section-overview/curriculum-overview.section.vue';

export default {
	components: {
		CurriculumCommandButtonsSection,
		CurriculumEditorSection,
		CurriculumOverviewSection,
	},
	computed: {
		...mapGetters('managementCurriculums', ['hasSelectedCurriculum', 'curriculumSelectedId']),
	},
	methods: {
		...mapActions('managementCurriculums', ['createCurriculum', 'updateCurriculum']),
		handleRevert() {
			// TODO
		},
		handleUnselection() {
			// TODO 
		},
	},
};
</script>

<style scoped>

</style>
