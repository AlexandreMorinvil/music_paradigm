<template>
	<WidgetContentFrameComponent title="Manage User">
		<div class="widget widget-bg">
			<UserProfileSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import UserProfileSection from './section-profile/user-profile.section.vue';

export default {
	components: {
		UserProfileSection,
		WidgetContentFrameComponent,
	},

};
</script>

<style scoped></style>
