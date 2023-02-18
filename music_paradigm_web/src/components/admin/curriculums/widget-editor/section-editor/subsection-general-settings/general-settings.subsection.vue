<template>
    <WidgetSubsectionContainer title="General settings">
        <CurriculumGeneralSettingsFormComponent />
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

</style>
