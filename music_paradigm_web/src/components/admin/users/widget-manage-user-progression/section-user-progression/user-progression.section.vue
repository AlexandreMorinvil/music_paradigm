<template>
    <WidgetSectionContainer title="Progression in Curriculum">
        <template v-slot:topRight>
            <!-- REFRESH BUTTON -->
        </template>
        <UserProgressionDetailsSubsection />
        <UserProgressionOverviewBoardSubsection />
        <ProgressionSessionDetailsSubsection />
        <ProgressionSessionAdjustmentsSubsection />
        <template v-slot:buttons>
        <!--  -->
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ProgressionSessionAdjustmentsSubsection from './subsection-session-adjustments/progression-session-adjustments.subsection.vue';
import ProgressionSessionDetailsSubsection from './subsection-session-details/progression-session-details.subsection.vue';
import UserProgressionDetailsSubsection from './subsection-details/user-progression-details.subsection.vue';
import UserProgressionOverviewBoardSubsection from './subsection-overview-board/user-progression-overview-board.subsection.vue';

export default {
    components: {
        ProgressionSessionAdjustmentsSubsection,
        ProgressionSessionDetailsSubsection,
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
