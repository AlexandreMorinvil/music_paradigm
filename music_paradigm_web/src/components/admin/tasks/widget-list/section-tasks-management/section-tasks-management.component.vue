<template>
	<WidgetSectionContainer title="Tasks Management">
		<ButtonTasksZipDownloadComponent />
	</WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonTasksZipDownloadComponent from './button-tasks-zip-download.component.vue';

export default {
	components: {
		ButtonTasksZipDownloadComponent,
		WidgetSectionContainer
	}
};
</script>

<style scoped>

</style>
