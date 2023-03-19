<template>
    <ProgressionOverviewBoardComponent v-show="hasHistory" :overWrittingProgressionHistory="history"
        :sessionToHightlight="session" v-on:sessionSelected="handleSessionSelection">
        <template slot-scope="{ session, index }">
            <ProgressionOverviewBoardSessionDetailsComponent :session="session" :index="index" />
        </template>
    </ProgressionOverviewBoardComponent>
</template>

<script>
import ProgressionOverviewBoardComponent from '@/components/user/home/overview-table.component.vue';
import ProgressionOverviewBoardSessionDetailsComponent from './overview-table-session-details.component.vue';

export default {
    components: {
        ProgressionOverviewBoardComponent,
        ProgressionOverviewBoardSessionDetailsComponent,
    },
};
</script>

<style scoped></style>
