<template>
    <button v-on:click="handleCurriculumDeletion" class="widget-button green" :class="isButtonActive || 'inactive'">
        Create Curriculum
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/edition', ['curriculumEditionCurriculum']),
        isButtonActive() {
            return true;
        },
    },
    methods: {
        ...mapActions('managementCurriculums', ['createCurriculum']),
        handleCurriculumDeletion() {
            if (!this.isButtonActive) return;
            this.createCurriculum(this.curriculumEditionCurriculum);
        },
    }
};
</script>

<style scoped></style>
