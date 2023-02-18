<template>
    <WidgetSectionContainer title="Curriculum Overview">
        <CurriculumBoardComponent />
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import CurriculumBoardComponent from './curriculum-board.component.vue';

export default {
    components: {
        CurriculumBoardComponent,
        WidgetSectionContainer
    },
};
</script>

<style scoped>

</style>
