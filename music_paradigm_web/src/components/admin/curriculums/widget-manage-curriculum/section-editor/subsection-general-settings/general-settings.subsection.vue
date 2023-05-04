<template>
    <WidgetSubsectionContainer title="General settings">
        <div class="centering">
            <CurriculumGeneralSettingsFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import CurriculumGeneralSettingsFieldsetComponent from './curriculum-general-settings-fieldset.component.vue';

export default {
    components: {
        CurriculumGeneralSettingsFieldsetComponent,
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
