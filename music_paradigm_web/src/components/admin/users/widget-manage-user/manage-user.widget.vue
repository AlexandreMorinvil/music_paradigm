<template>
	<WidgetContentFrameComponent title="Manage User">
		<div class="widget widget-bg">
			<UserDetailsSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';
import UserDetailsSection from './section-details/user-details.section.vue';

export default {
	components: {
		UserDetailsSection,
		WidgetContentFrameComponent,
	},

};
</script>

<style scoped></style>
