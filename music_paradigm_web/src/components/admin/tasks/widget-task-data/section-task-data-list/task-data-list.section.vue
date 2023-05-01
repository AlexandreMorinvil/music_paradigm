<template>
    <WidgetSectionContainer title="Task Data Entries List">
        <TaskSpecificTaskDataListTableComponent :taskReference="selectedId" />
    </WidgetSectionContainer>
</template>

<script>
import { mapGetters } from 'vuex';

import TaskSpecificTaskDataListTableComponent from '@/components/admin/task-data/list-table/task-specific-task-data-list-table.component';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

export default {
    components: {
        TaskSpecificTaskDataListTableComponent,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('experiments', ['selectedId']), // TODO : Rename when the task logic will be adjusted.
    },
};
</script>

<style scoped></style>
