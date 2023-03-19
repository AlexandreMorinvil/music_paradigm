<template>
    <WidgetSectionContainer title="Progression in Curriculum">
        <template v-slot:topRight>
            <!-- REFRESH BUTTON -->
        </template>
        <UserProgressionDetailsSubsection />
        <!-- PROBRESSION SESSIONS STATUS BOARD v-if = Has a sessions status object -->
        <!-- PROBRESSION SESSIONS DETAILS SUBSECTION v-if = A session is selected -->
        <!-- PROBRESSION SESSIONS ADJUSTMENTS SUBSECTION v-if = A session is selected -->
        <template v-slot:buttons>
        <!--  -->
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import UserProgressionDetailsSubsection from './subsection-details/user-progression-details.subsection.vue';

export default {
    components: {
        UserProgressionDetailsSubsection,
        WidgetSectionContainer,
    },
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
