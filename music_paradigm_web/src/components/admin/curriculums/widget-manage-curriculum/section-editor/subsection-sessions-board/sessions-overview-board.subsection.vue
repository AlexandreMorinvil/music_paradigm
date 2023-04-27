<template>
    <WidgetSubsectionContainer title="Curriculum Sessions Overview">
        <CurriculumBoardComponent />
        <template v-slot:buttons>
            <ButtonMoveCurriculumSessionComponent />
            <ButtonAddCurriculumSessionComponent />
            <ButtonDeleteCurriculumSessionComponent />
        </template>
    </WidgetSubsectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import ButtonAddCurriculumSessionComponent from './buttons/button-add-curriculum-session.component.vue';
import ButtonMoveCurriculumSessionComponent from './buttons/button-move-curriculum-session.component.vue';
import ButtonDeleteCurriculumSessionComponent from './buttons/button-delete-curriculum-session.component.vue';
import CurriculumBoardComponent from './board/curriculum-board.component.vue';

export default {
    components: {
        ButtonAddCurriculumSessionComponent,
        ButtonMoveCurriculumSessionComponent,
        ButtonDeleteCurriculumSessionComponent,
        CurriculumBoardComponent,
        WidgetSubsectionContainer
    },
};
</script>

<style scoped></style>
