<template>
    <button v-on:click="handleCurriculumSessionDeletion" class="widget-button red" :class="isButtonActive || 'inactive'">
        Delete Selected Session
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/edition', [
            'hasCurriculumEditionSelectedSession',
            'hasMoreThanOneSessionInCurriculumEdition',
        ]),
        isButtonActive() {
            return this.hasCurriculumEditionSelectedSession && this.hasMoreThanOneSessionInCurriculumEdition;
        },
    },
    methods: {
        ...mapActions('managementCurriculums/edition', ['removeCurriculumEditionSession']),
        handleCurriculumSessionDeletion() {
            if (!this.isButtonActive) return;
            this.removeCurriculumEditionSession();
        },
    }
};
</script>

<style scoped></style>
