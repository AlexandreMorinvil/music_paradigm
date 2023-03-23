<template>
    <ProgressionOverviewBoardComponent :sessionsList="progressionSessionsDetailedList"
        :sessionToHightlight="progressionSessionSelection" v-on:sessionSelected="handleSessionSelection">
        <template slot-scope="{ session, index }">
            <ProgressionOverviewBoardSessionDetailsComponent :session="session" :index="index" />
        </template>
    </ProgressionOverviewBoardComponent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import ProgressionOverviewBoardComponent from '@/components/user/home/overview-table.component.vue';
import { ProgressionSessionIdentifier } from '@/modules/progressions';

import ProgressionOverviewBoardSessionDetailsComponent from './overview-board-session-details.component.vue';

export default {
    components: {
        ProgressionOverviewBoardComponent,
        ProgressionOverviewBoardSessionDetailsComponent,
    },
    computed: {
        ...mapGetters('managementUsers/progressions/sessions', ['progressionSessionsDetailedList']),
        ...mapGetters('managementUsers/progressions/sessions/selection', ['progressionSessionSelection']),
    },
    methods: {
        ...mapActions('managementUsers/progressions/sessions', [
            'setSelectedProgressionSession',
            'unsetSelectedProgressionSession',
        ]),
        handleSessionSelection(session) {
            if (ProgressionSessionIdentifier.isCorresponding(this.progressionSessionSelection, session))
                this.unsetSelectedProgressionSession();
            else 
                this.setSelectedProgressionSession(session);
        }
    }
};
</script>

<style scoped></style>
