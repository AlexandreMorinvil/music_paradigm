<template>
	<admin-page-content-frame title="Experiments Ressources">
		<widget-content-frame title="Not Implemented Yet">
			<div class="widget widget-bg">
				Interface to upload files
				<br />
				<br />Interface to visualize the files on the server, delete, move files from the server
				<br />
				<br />Ability to hear the midi files, see the images, see the videos, see txt files
				<br />
				<br />Ability to download files.
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
