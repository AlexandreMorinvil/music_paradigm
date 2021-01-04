<template>
	<admin-page-content-frame title="Experiments Ressources">
		<widget-content-frame title="File Browser">
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
		AdminPageContentFrame,
		WidgetContentFrame,
		FileBrowserWidget,
	},
};
</script>

<style scoped></style>
