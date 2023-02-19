<template>
    <WidgetSubsectionContainer title="Session settings">
        <div v-if="canEditorBeDisplayed" class="session-settings-area">
            <CurriculumSessionSettingsFormComponent />
            <ButtonDeleteCurriculumSessionComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';
import { mapGetters } from 'vuex';

import ButtonDeleteCurriculumSessionComponent from '../../buttons/button-delete-curriculum-session.component.vue';
import CurriculumSessionSettingsFormComponent from './curriculum-session-settings-form.component.vue';

export default {
    components: {
        ButtonDeleteCurriculumSessionComponent,
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
