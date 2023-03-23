<template>
    <WidgetSubsectionContainer title="Parameters">
        <div class="centering">
            <UserCurriculumParametersFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserCurriculumParametersFieldsetComponent from './user-curriculum-parameters-fieldset.component.vue';

export default {
    components: {
        UserCurriculumParametersFieldsetComponent,
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
