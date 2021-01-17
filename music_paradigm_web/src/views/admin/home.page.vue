<template>
	<admin-page-content-frame title="Home">
		<widget-content-frame title="Main information">
			<div class="widget widget-bg">
				Admin Home page
				<br /><br />
				Recent activity on the server and important information from the users
			</div>
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

import '@/styles/widget-template.css';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
	},
};
</script>

<style scoped></style>
