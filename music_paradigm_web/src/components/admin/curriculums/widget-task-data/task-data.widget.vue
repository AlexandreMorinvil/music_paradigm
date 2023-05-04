<template>
	<WidgetContentFrameComponent title="Curriculum's Task Data">
		<div class="widget widget-bg">
			<TaskDataListSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import TaskDataListSection from './section-task-data-list/task-data-list.section.vue';

export default {
	components: {
		TaskDataListSection,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
