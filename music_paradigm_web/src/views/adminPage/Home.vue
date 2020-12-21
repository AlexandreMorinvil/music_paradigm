<template>
	<admin-page-context title="Home">
		<widget-context title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">
				Admin Home page
				<br /><br />
				Recent activity on the server and important information from the users
			</div>
		</widget-context>
	</admin-page-context>
</template>

<script>
import AdminPageContext from '@/components/admin/AdminPageContext.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

import '@/styles/widgetTemplate.css';

export default {
	name: 'AdminHome',
	components: {
		AdminPageContext: AdminPageContext,
		WidgetContext: WidgetContext,
	},
};
</script>

<style scoped></style>
