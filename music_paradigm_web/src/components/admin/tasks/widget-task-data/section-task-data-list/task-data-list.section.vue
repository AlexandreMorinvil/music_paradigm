<template>
    <WidgetSectionContainer title="Task Data Entries List">
        <TaskDataListTableComponent />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import TaskDataListTableComponent from './task-data-list-table/task-data-list-table.component.vue';

export default {
    components: {
        TaskDataListTableComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped></style>
