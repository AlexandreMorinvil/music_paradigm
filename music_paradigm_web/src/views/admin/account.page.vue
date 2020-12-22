<template>
	<admin-page-content-frame title="Account">
		<widget-content-frame title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">
				Admin Account page
				<br />
				<br />
				Hability to change : First name, Middle name, Last Name, Password, Email, and username of oneself (The current
				account, this page is not to manipulate other accounts).
			</div>
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

import '@/styles/widgetTemplate.css';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
	},
};
</script>

<style scoped></style>
