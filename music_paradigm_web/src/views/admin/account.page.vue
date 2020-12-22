<template>
	<admin-page-content-frame title="Account">
		<widget-context title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">
				Admin Account page
				<br />
				<br />
				Hability to change : First name, Middle name, Last Name, Password, Email, and username of oneself (The current
				account, this page is not to manipulate other accounts).
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
