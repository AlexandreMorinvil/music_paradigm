<template>
    <button v-on:click="toggleMode" 
        class="widget-button"
     :class="isModeActive ? 'turquoise' : 'blue'">
        {{ text }}
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementCurriculums/edition', ['isInCurriculumEditionSessionAdditionMode']),
        isButtonActive() {
            return true;
        },
        isModeActive() {
            return this.isInCurriculumEditionSessionAdditionMode;
        },
        text() {
            return this.isModeActive ? "Stop Adding Sessions" : "Add Sessions";
        }
    },
    methods: {
        ...mapActions('managementCurriculums/edition', [
            'activateCurriculumEditionSessionAdditionMode',
            'deactivateCurriculumEditionSessionAdditionMode',
        ]),
        toggleMode() {
            if (this.isModeActive) this.deactivateCurriculumEditionSessionAdditionMode();
            else this.activateCurriculumEditionSessionAdditionMode();
        },
    }
};
</script>

<style scoped></style>
