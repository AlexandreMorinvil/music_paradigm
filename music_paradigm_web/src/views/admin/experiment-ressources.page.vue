<template>
	<admin-page-content-frame title="Experiments Ressources">
		<widget-content-frame title="File Browser">
			<!-- <div class="widget widget-bg">
				Interface to upload files
				<br />
				<br />Interface to visualize the files on the server, delete, move files from the server
				<br />
				<br />Ability to hear the midi files, see the images, see the videos, see txt files
				<br />
				<br />Ability to download files.
			</div> -->
			<file-browser-widget />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import '@/styles/widget-template.css';

import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

import FileBrowserWidget from '@/components/admin/ressources/widget-file-browser/file-browser.widget.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		FileBrowserWidget,
	},
};
</script>

<style scoped></style>
