<template>
    <WidgetSubsectionContainer title="Session settings">
        <div v-if="canEditorBeDisplayed" class="session-settings-area">
            <CurriculumSessionSettingsFormComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';
import { mapGetters } from 'vuex';

import CurriculumSessionSettingsFormComponent from './curriculum-session-settings-form.component.vue';

export default {
    components: {
        CurriculumSessionSettingsFormComponent,
        WidgetSubsectionContainer,
    },
    computed: {
        ...mapGetters('managementCurriculums/edition', ['hasCurriculumEditionSelectedSession']),
        canEditorBeDisplayed() {
			return this.hasCurriculumEditionSelectedSession;
		},
    }
};
</script>

<style scoped>
.session-settings-area {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
    gap: 20px;
}
</style>
