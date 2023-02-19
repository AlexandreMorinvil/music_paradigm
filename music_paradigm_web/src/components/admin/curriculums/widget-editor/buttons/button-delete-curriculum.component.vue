<template>
    <button v-on:click="handleCurriculumDeletion" class="widget-button red" :class="isButtonActive || 'inactive'">
        Delete Curriculum
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/selection', ['curriculumSelectionId', 'hasSelectedCurriculum']),
        isButtonActive() {
            return this.hasSelectedCurriculum;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['deleteCurriculum']),
        handleCurriculumDeletion() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to delete the curriculum?');
            if (answer) this.deleteCurriculum(this.curriculumSelectionId);
        },
    }
};
</script>

<style scoped></style>
