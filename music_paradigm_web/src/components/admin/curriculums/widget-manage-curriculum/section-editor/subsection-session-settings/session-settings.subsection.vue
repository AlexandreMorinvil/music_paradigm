<template>
    <WidgetSubsectionContainer title="Session settings">
        <div class="session-settings-area">
            <CurriculumSessionSettingsFormComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import CurriculumSessionSettingsFormComponent from './curriculum-session-settings-form.component.vue';

export default {
    components: {
        CurriculumSessionSettingsFormComponent,
        WidgetSubsectionContainer,
    },
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
