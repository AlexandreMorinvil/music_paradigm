<template>
    <WidgetSectionContainer title="User Curriculum">
        <template v-slot:topRight>
            <!-- <ButtonRevertUserCurriculumChangesComponent class="small"/> -->
        </template>
        <UserCurriculumSubsection />
        <!-- <UserCurriculumParametersSubsection /> -->
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import UserCurriculumSubsection from './curriculum-subsection/user-curriculum.subsection.vue';

export default {
    components: {
        UserCurriculumSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped></style>
