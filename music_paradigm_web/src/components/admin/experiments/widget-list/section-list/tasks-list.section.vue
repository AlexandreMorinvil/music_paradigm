<template>
    <WidgetSectionContainer title="Tasks List">
        <TasksListComponent />
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import TasksListComponent from './tasks-list.component.vue';

export default {
    components: {
        TasksListComponent,
        WidgetSectionContainer
    },
};
</script>

<style scoped>

</style>
