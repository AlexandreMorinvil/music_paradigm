<template>
    <WidgetSectionContainer title="Curriculum Overview">
        <CurriculumBoardComponent />
        <div class="buttons-area"> 
            <ButtonAddCurriculumSessionComponent />
            <ButtonDeleteCurriculumSessionComponent />
        </div>
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonAddCurriculumSessionComponent from './button-add-curriculum-session.component.vue';
import ButtonDeleteCurriculumSessionComponent from '../buttons/button-delete-curriculum-session.component.vue';
import CurriculumBoardComponent from './curriculum-board.component.vue';

export default {
    components: {
        ButtonAddCurriculumSessionComponent,
        ButtonDeleteCurriculumSessionComponent,
        CurriculumBoardComponent,
        WidgetSectionContainer
    },
};
</script>

<style scoped>
.buttons-area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
}
</style>
