<template>
    <WidgetSectionContainer title="Progression in Curriculum">
        <template v-slot:topLeft>
            <ButtonRefreshUserProgressionComponent :isSmall="true" :hideIfInactive="true" />
        </template>

        <UserProgressionDetailsSubsection />
        <UserProgressionOverviewBoardSubsection />
        <ProgressionSessionDetailsSubsection />
        <ProgressionSessionAdjustmentsSubsection />

    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonRefreshUserProgressionComponent from '../buttons/button-refresh-user-progression.component.vue';
import ProgressionSessionAdjustmentsSubsection from './subsection-session-adjustments/progression-session-adjustments.subsection.vue';
import ProgressionSessionDetailsSubsection from './subsection-session-details/progression-session-details.subsection.vue';
import UserProgressionDetailsSubsection from './subsection-details/user-progression-details.subsection.vue';
import UserProgressionOverviewBoardSubsection from './subsection-overview-board/user-progression-overview-board.subsection.vue';

export default {
    components: {
        ButtonRefreshUserProgressionComponent,
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
