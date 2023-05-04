<template>
	<WidgetContentFrameComponent title="Manage Curriculum">
		<div class="widget widget-bg">
			<ManageCurriculumSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import ManageCurriculumSection from './section-editor/manage-curriculum.section.vue';

export default {
	components: {
		ManageCurriculumSection,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
