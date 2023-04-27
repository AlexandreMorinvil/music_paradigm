<template>
    <WidgetSubsectionContainer title="General settings">
        <div class="centering">
            <CurriculumGeneralSettingsFormComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import CurriculumGeneralSettingsFormComponent from './curriculum-general-settings-form.component.vue';

export default {
    components: {
        CurriculumGeneralSettingsFormComponent,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>
.centering {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
