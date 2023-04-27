<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Create curriculum" />
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
            'hasEditedCurriculumTitle',
            'isCreatingCurriculum',
            'isExecutingCurriculumCommand',
        ]),
        ...mapGetters('managementCurriculums/edition', [
            'curriculumEditionCurriculum', 
            'curriculumEditionTitle',
        ]),
        ...mapGetters('managementCurriculums/selection', ['hasSelectedCurriculum']),
        isButtonFrozen() {
            return !this.isCreatingCurriculum && this.isExecutingCurriculumCommand; // Has other user command running
        },
        isButtonActive() {
            if (this.hasSelectedCurriculum && !this.hasEditedCurriculumTitle) return false;
            return Boolean(this.curriculumEditionTitle);
        },
        isButtonLoading() {
            return this.isCreatingCurriculum;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['createCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.createCurriculum(this.curriculumEditionCurriculum);
        },
    }
};
</script>

<style scoped></style>
