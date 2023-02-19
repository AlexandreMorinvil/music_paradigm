<template>
    <WidgetSectionContainer title="Curriculum Overview">
        <CurriculumBoardComponent />
        <div class="buttons-area"> 
            <ButtonAddCurriculumSessionComponent />
        </div>
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonAddCurriculumSessionComponent from './button-add-curriculum-session.component.vue';
import CurriculumBoardComponent from './curriculum-board.component.vue';

export default {
    components: {
        ButtonAddCurriculumSessionComponent,
        CurriculumBoardComponent,
        WidgetSectionContainer
    },
};
</script>

<style scoped>
.buttons-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
}
</style>
