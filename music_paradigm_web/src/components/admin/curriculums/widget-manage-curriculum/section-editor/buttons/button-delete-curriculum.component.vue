<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Delete Curriculum" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementCurriculums', [
            'isDeletingCurriculum',
            'isExecutingCurriculumCommand',
        ]),
        ...mapGetters('managementCurriculums/selection', [
            'curriculumSelectionId',
            'hasSelectedCurriculum',
        ]),
        isButtonFrozen() {
            return !this.isDeletingCurriculum && this.isExecutingCurriculumCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedCurriculum;
        },
        isButtonLoading() {
            return this.isDeletingCurriculum;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['deleteCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm('Are you sure you want to delete the curriculum? \nThis cannot be undone.');
            if (!answer) return;
            window.confirm(
                'Have you made sure that no user was currently completing this curriculum?\n' +
                'Are you sure you want to go ahead with the deletion of this curriculum?'
            );
            if (answer) this.deleteCurriculum(this.curriculumSelectionId);
        },
    }
};
</script>

<style scoped></style>
