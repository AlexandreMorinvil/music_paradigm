<template>
	<div id="users-editor" class="widget widget-bg">
		<UserDetailsSection />
		<UserCommandButtonsSection />
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import UserCommandButtonsSection from './section-command-buttons/user-command-buttons.section.vue';
import UserDetailsSection from './section-details/user-details.section.vue';

export default {
	components: {
		UserCommandButtonsSection,
		UserDetailsSection,
	},
	
};
</script>

<style scoped>
</style>
