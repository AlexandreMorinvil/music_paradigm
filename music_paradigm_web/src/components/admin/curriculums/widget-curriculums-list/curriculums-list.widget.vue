<template>
	<WidgetContentFrameComponent title="Curriculums List">
		<div class="widget widget-bg">
			<CurriculumsListSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import CurriculumsListSection from './section-curriculums-list/curriculums-list.section.vue';

export default {
	components: {
		CurriculumsListSection,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
