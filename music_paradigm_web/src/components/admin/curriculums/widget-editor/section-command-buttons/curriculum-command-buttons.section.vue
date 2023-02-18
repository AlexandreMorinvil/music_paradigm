<template>
    <WidgetSectionContainer title="Commands">
        <div class="spaced-buttons">
            <ButtonCreateCurriculumComponent />
            <ButtonUpdateCurriculumComponent />
            <ButtonDeleteCurriculumComponent />
        </div>
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonCreateCurriculumComponent from './button-create-curriculum.component.vue';
import ButtonDeleteCurriculumComponent from './button-delete-curriculum.component.vue';
import ButtonUpdateCurriculumComponent from './button-update-curriculum.component.vue'

export default {
    components: {
        ButtonCreateCurriculumComponent,
        ButtonDeleteCurriculumComponent,
        ButtonUpdateCurriculumComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped>
.spaced-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
</style>
