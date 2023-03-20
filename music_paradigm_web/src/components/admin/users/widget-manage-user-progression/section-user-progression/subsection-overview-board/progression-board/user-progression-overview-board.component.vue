<template>
    <ProgressionOverviewBoardComponent :sessionsList="progressionSessionsDetailedList"
        :sessionToHightlight="progressionSessionSelection" v-on:sessionSelected="handleSessionSelection">
        <template slot-scope="{ session, index }">
            <ProgressionOverviewBoardSessionDetailsComponent :session="session" :index="index" />
        </template>
    </ProgressionOverviewBoardComponent>
</template>

<script>
import ProgressionOverviewBoardComponent from '@/components/user/home/overview-table.component.vue';
import { mapActions, mapGetters } from 'vuex';
import ProgressionOverviewBoardSessionDetailsComponent from './overview-board-session-details.component.vue';

export default {
    components: {
        ProgressionOverviewBoardComponent,
        ProgressionOverviewBoardSessionDetailsComponent,
    },
    computed: {
        ...mapGetters('managementUsers/progressions/sessions', ['progressionSessionsDetailedList'])
    },
    methods: {
        ...mapActions('managementUsers/progressions/sessions', ['setSelectedProgressionSession']),
        ...mapActions('managementUsers/progressions/sessions/selection', ['progressionSessionSelection']),
        handleSessionSelection(session) {
            this.setSelectedProgressionSession(session);
        }
    }
};
</script>

<style scoped></style>
