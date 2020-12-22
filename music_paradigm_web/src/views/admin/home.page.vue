<template>
	<admin-page-content-frame title="Home">
		<widget-context title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">
				Admin Home page
				<br /><br />
				Recent activity on the server and important information from the users
			</div>
		</widget-context>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

import '@/styles/widgetTemplate.css';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContext: WidgetContext,
	},
};
</script>

<style scoped></style>
