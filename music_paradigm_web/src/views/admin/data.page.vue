<template>
	<admin-page-content-frame title="Data">
		<widget-content-frame title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">Interface to visualize the data and log files from the experiments</div>
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
