<template>
	<admin-page-content-frame title="Data">
		<widget-context title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">Interface to visualize the data and log files from the experiments</div>
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
