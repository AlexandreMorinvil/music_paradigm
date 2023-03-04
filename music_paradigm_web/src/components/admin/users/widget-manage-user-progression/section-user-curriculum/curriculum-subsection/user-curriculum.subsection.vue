<template>
    <WidgetSubsectionContainer title="Curriculum">
        <div class="centering">
            <UserCurriculumFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserCurriculumFieldsetComponent from './user-curriculum-fieldset.component.vue';

export default {
    components: {
        UserCurriculumFieldsetComponent,
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
