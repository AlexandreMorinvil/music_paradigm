<template>
	<WidgetContentFrameComponent title="Manage User's Curriculum Progression">
		<div class="widget widget-bg">
			<UserCurriculumSection />
			<UserProgressionSection v-if="hasSelectedUserProgression" />
		</div>
	</WidgetContentFrameComponent>
</template>

<script>
import { mapGetters } from 'vuex';

import '@/styles/widget-template.css';
import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import UserCurriculumSection from './section-user-curriculum/user-curriculum.section.vue';
import UserProgressionSection from './section-user-progression/user-progression.section.vue';

export default {
	components: {
		UserCurriculumSection,
		UserProgressionSection,
		WidgetContentFrameComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression'])
	}
};
</script>

<style scoped></style>
