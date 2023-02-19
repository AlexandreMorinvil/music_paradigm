<template>
    <button v-on:click="toggleMode" 
        class="widget-button"
     :class="{
        'turquoise': isModeActive, 
        'blue': !isModeActive,
        'inactive': !isButtonActive,
     }">
        {{ text }}
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/edition', [
            'isInCurriculumEditionSessionMoveMode',
            'hasMoreThanOneSessionInCurriculumEdition',
        ]),
        isButtonActive() {
            return this.hasMoreThanOneSessionInCurriculumEdition;
        },
        isModeActive() {
            return this.isInCurriculumEditionSessionMoveMode;
        },
        text() {
            return this.isModeActive ? "Stop Moving Sessions" : "Move Sessions";
        }
    },
    methods: {
        ...mapActions('managementCurriculums/edition', [
            'activateCurriculumEditionSessionMoveMode',
            'deactivateCurriculumEditionSessionMoveMode',
        ]),
        toggleMode() {
            if (!this.isButtonActive) return;
            if (this.isModeActive) this.deactivateCurriculumEditionSessionMoveMode();
            else this.activateCurriculumEditionSessionMoveMode();
        },
    }
};
</script>

<style scoped></style>
