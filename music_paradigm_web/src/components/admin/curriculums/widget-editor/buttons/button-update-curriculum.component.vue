<template>
    <button v-on:click="handleCurriculumDeletion" class="widget-button blue" :class="isButtonActive || 'inactive'">
        Update Curriculum
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/edition', ['curriculumEditionCurriculum']),
        ...mapGetters('managementCurriculums/selection', ['curriculumSelectionId', 'hasSelectedCurriculum']),
        isButtonActive() {
            return this.hasSelectedCurriculum;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['updateCurriculum']),
        handleCurriculumDeletion() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to edit the curriculum?');
            if (answer) {
                this.updateCurriculum({
                    id: this.curriculumSelectionId,
                    curriculum: this.curriculumEditionCurriculum,
                });
            }
        },
    }
};
</script>

<style scoped></style>
