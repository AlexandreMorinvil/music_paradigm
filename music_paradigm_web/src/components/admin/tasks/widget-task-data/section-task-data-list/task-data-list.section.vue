<template>
    <WidgetSectionContainer title="Task Data Entries List">
        <TaskDataEntryViewSubsection class="spacing" />
        <TaskDataListTableComponent :mustClear="!hasSelectedTask" :taskId="selectedId"
            listTableId="task-management-task-data-list" class="spacing" />
        <TaskDataListTableComponent isAdminData :mustClear="!hasSelectedTask" :taskId="selectedId"
            listTableId="admin-task-management-task-data-list" />
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
        ...mapGetters('experiments', ['selectedId']), // TODO : Rename when the task logic will be adjusted.
        hasSelectedTask() {
            return Boolean(this.selectedId); // TODO : Move to the vuex store when the task logic will be adjusted.
        },
    },
};
</script>

<style scoped>
.spacing {
    margin-bottom: 30px;
}
</style>
