<template>
    <WidgetSubsectionContainer title="Task Data Entry Viewer">
        <template v-slot:topRight>
            <ButtonDeselectTaskDataEntryComponent isSmall />
        </template>
        <div class="centering">
            <TaskDataEntryViewer class="fill-space"/>
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import ButtonDeselectTaskDataEntryComponent from '@/components/admin/task-data/buttons/button-deselect-task-data-entry.component.vue';
import TaskDataEntryViewer from '@/components/admin/task-data/entry-viewer/task-data-entry-viewer.component.vue';
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

export default {
    components: {
        ButtonDeselectTaskDataEntryComponent,
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

.fill-space {
    width: 100%;
}
</style>
