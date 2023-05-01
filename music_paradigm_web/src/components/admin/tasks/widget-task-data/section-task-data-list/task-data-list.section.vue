<template>
    <WidgetSectionContainer title="Task Data Entries List">
        <TaskDataListTableComponent :mustClear="!hasSelectedTask" :taskId="selectedId" />
    </WidgetSectionContainer>
</template>

<script>
import { mapGetters } from 'vuex';

import TaskDataListTableComponent from '@/components/admin/task-data/list-table/task-data-list-table.component';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

export default {
    components: {
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

<style scoped></style>
