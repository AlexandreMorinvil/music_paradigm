<template>
	<div id="users-editor" class="widget widget-bg">
		<CurriculumOverviewSection />
		<CurriculumEditorSection />
		<CurriculumCommandButtonsSection />
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import CurriculumCommandButtonsSection from './section-command-buttons/curriculum-command-buttons.section.vue';
import CurriculumEditorSection from './section-editor/curriculum-editor.section.vue';
import CurriculumOverviewSection from './section-overview/curriculum-overview.section.vue';

export default {
	components: {
		CurriculumCommandButtonsSection,
		CurriculumEditorSection,
		CurriculumOverviewSection,
	},
};
</script>

<style scoped></style>
