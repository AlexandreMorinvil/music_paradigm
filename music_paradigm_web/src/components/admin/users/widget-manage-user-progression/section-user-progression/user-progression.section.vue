<template>
    <WidgetSectionContainer title="Progression in Curriculum">
        <template v-slot:topRight>
            <!-- REFRESH BUTTON -->
        </template>
        <UserProgressionDetailsSubsection />
        <UserProgressionOverviewBoardSubsection />
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
import UserProgressionOverviewBoardSubsection from './subsection-overview-board/user-progression-overview-board.subsection.vue';

export default {
    components: {
        UserProgressionDetailsSubsection,
        UserProgressionOverviewBoardSubsection,
        WidgetSectionContainer,
    },
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
