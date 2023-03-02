<template>
	<WidgetContentFrameComponent title="Manage User">
		<div class="widget widget-bg">
			<UserDetailsSection />
			<UserCommandButtonsSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';
import UserCommandButtonsSection from './section-command-buttons/user-command-buttons.section.vue';
import UserDetailsSection from './section-details/user-details.section.vue';

export default {
	components: {
		UserCommandButtonsSection,
		UserDetailsSection,
		WidgetContentFrameComponent,
	},

};
</script>

<style scoped></style>
