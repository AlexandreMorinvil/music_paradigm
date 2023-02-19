<template>
    <WidgetSectionContainer title="Tasks List Management">
        <ButtonTasksListRefreshComponent />
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonTasksListRefreshComponent from './button-tasks-list-refresh.component.vue';

export default {
    components: {
        ButtonTasksListRefreshComponent,
        WidgetSectionContainer
    },
};
</script>

<style scoped>

</style>
