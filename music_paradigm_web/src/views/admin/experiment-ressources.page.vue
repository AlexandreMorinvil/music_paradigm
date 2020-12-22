<template>
	<admin-page-content-frame title="Experiments Ressources">
		<widget-context title="Not Implemented Yet">
			<div class="widget widget-box widget-bg">
				Interface to upload files
				<br />
				<br />Interface to visualize the files on the server, delete, move files from the server
				<br />
				<br />Ability to hear the midi files, see the images, see the videos, see txt files
				<br />
				<br />Ability to download files.
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
