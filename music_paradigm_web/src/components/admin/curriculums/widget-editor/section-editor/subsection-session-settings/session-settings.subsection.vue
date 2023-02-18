<template>
    <WidgetSubsectionContainer title="Session settings">
        <CurriculumSessionSettingsFormComponent />
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

</style>
