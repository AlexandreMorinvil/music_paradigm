<template>
    <WidgetSubsectionContainer title="Task Data Entry Viewer">
        <div class="centering">
            <TaskDataEntryViewer />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import TaskDataEntryViewer from '@/components/admin/task-data/entry-viewer/task-data-entry-viewer.component.vue';
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

export default {
    components: {
        TaskDataEntryViewer,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>
.centering {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
