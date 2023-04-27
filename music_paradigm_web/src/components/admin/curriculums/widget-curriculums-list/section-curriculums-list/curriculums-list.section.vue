<template>
    <WidgetSectionContainer title="Curriculums List">
        <!-- <CurriculumsBatchCommandSubsection /> -->
        <CurriculumsListTableComponent />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

// import CurriculumsBatchCommandSubsection from './subsection-batch-commands/users-batch-command.subsection.vue';
import CurriculumsListTableComponent from './curriculums-list-table/curriculums-list-table.component.vue';

export default {
    components: {
        // CurriculumsBatchCommandSubsection,
        CurriculumsListTableComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped></style>
