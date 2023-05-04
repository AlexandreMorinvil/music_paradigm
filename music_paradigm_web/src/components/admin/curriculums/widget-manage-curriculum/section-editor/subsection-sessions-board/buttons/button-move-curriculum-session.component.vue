<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" :color="color" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" :text="text" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementCurriculums', ['isExecutingCurriculumCommand']),
        ...mapGetters('managementCurriculums/edition', [
            'isInCurriculumEditionSessionMoveMode',
            'hasMoreThanOneSessionInCurriculumEdition',
        ]),
        color() {
            return this.isModeActive ? "turquoise" : "blue";
        },
        isButtonFrozen() {
            return false;
        },
        isButtonActive() {
            return this.hasMoreThanOneSessionInCurriculumEdition ?? !this.isExecutingCurriculumCommand;
        },
        isButtonLoading() {
            return false;
        },
        isModeActive() {
            return this.isInCurriculumEditionSessionMoveMode;
        },
        text() {
            return this.isModeActive ? "Stop moving sessions" : "Move sessions";
        }
    },
    methods: {
        ...mapActions('managementCurriculums/edition', [
            'activateCurriculumEditionSessionMoveMode',
            'deactivateCurriculumEditionSessionMoveMode',
        ]),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            if (this.isModeActive) this.deactivateCurriculumEditionSessionMoveMode();
            else this.activateCurriculumEditionSessionMoveMode();
        },
    }
};
</script>

<style scoped></style>
