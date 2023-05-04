<template>
    <WidgetSectionContainer title="Task Data Entries List">
        <TaskDataEntryViewSubsection v-if="hasSelectedTaskDataEntry" class="spacing" />
        <TaskDataListTableComponent :mustClear="!hasSelectedUser" :userId="userSelectionId"
            :associativeId="progressionSessionSelectionAssociativeId" :completionCount="sessionCompletionCountSelection"
            listTableId="users-management-task-data-list" />
    </WidgetSectionContainer>
</template>

<script>
import { mapGetters } from 'vuex';

import TaskDataEntryViewSubsection from './subsection-task-data-entry-view/task-data-entry-view.subsection.vue';
import TaskDataListTableComponent from '@/components/admin/task-data/list-table/task-data-list-table.component';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

export default {
    components: {
        TaskDataEntryViewSubsection,
        TaskDataListTableComponent,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser', 'userSelectionId']),
        ...mapGetters('managementUsers/progressions/sessions/selection', [
            'progressionSessionSelectionAssociativeId',
            'sessionCompletionCountSelection',
        ]),
        ...mapGetters('managementTaskData/selection', ['hasSelectedTaskDataEntry']),
    },
};
</script>

<style scoped>
.spacing {
    margin-bottom: 30px;
}
</style>
