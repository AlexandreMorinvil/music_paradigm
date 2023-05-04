<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Update curriculum" />
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
            'hasEditedCurriculum',
            'isExecutingCurriculumCommand',
            'isUpdatingCurriculum',
        ]),
        ...mapGetters('managementCurriculums/edition', ['curriculumEdition']),
        ...mapGetters('managementCurriculums/selection', [
            'curriculumSelectionId', 
            'hasSelectedCurriculum'
        ]),
        isButtonFrozen() {
            return !this.isUpdatingCurriculum && this.isExecutingCurriculumCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedCurriculum && this.hasEditedCurriculum;
        },
        isButtonLoading() {
            return this.isUpdatingCurriculum;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['updateCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to edit the curriculum?');
            if (answer) {
                this.updateCurriculum({
                    id: this.curriculumSelectionId,
                    curriculum: this.curriculumEdition,
                });
            }
        },
    }
};
</script>

<style scoped></style>
