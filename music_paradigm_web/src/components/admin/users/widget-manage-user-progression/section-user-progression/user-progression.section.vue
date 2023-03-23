<template>
    <WidgetSectionContainer title="Progression in Curriculum">
        <template v-slot:topLeft>
            <ButtonRefreshUserProgressionComponent :isSmall="true" :hideIfInactive="true" />
        </template>

        <UserProgressionDetailsSubsection />
        <UserProgressionOverviewBoardSubsection />
        <ProgressionSessionDetailsSubsection v-if="hasSelectedProgressionSession"/>
        <ProgressionSessionAdjustmentsSubsection v-if="hasSelectedProgressionSession"/>

    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonRefreshUserProgressionComponent from '../buttons/button-refresh-user-progression.component.vue';
import ProgressionSessionAdjustmentsSubsection from './subsection-session-adjustments/progression-session-adjustments.subsection.vue';
import ProgressionSessionDetailsSubsection from './subsection-session-details/progression-session-details.subsection.vue';
import UserProgressionDetailsSubsection from './subsection-details/user-progression-details.subsection.vue';
import UserProgressionOverviewBoardSubsection from './subsection-overview-board/user-progression-overview-board.subsection.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        ButtonRefreshUserProgressionComponent,
        ProgressionSessionAdjustmentsSubsection,
        ProgressionSessionDetailsSubsection,
        UserProgressionDetailsSubsection,
        UserProgressionOverviewBoardSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/progressions/sessions/selection', ['hasSelectedProgressionSession'])
    },
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
