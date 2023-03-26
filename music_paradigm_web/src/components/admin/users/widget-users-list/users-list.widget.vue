<template>
	<WidgetContentFrameComponent title="Users List">
		<div class="widget widget-bg">
			<UsersListSection />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import UsersListSection from './section-users-list/users-list.section.vue';

export default {
	components: {
		UsersListSection,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
