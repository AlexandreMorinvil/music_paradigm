<template>
	<admin-page-context title="Experiments Ressources">
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
	</admin-page-context>
</template>

<script>
import AdminPageContext from '@/components/admin/AdminPageContext.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

import '@/styles/widgetTemplate.css';

export default {
	name: 'AdminExperimentRessources',
	components: {
		AdminPageContext: AdminPageContext,
		WidgetContext: WidgetContext,
	},
};
</script>

<style scoped></style>
