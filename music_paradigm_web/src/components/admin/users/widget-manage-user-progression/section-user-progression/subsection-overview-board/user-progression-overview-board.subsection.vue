<template>
    <WidgetSubsectionContainer title="Sessions Overview">
        <div class="centering">
            <UserProgressionOverviewBoardComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserProgressionOverviewBoardComponent from './progression-board/user-progression-overview-board.component.vue';

export default {
    components: {
        UserProgressionOverviewBoardComponent,
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
