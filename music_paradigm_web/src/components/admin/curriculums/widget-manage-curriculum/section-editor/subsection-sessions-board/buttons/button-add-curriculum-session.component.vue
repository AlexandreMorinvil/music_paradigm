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
        ...mapGetters('managementCurriculums/edition', ['isInCurriculumEditionSessionAdditionMode']),
        color() {
            return this.isModeActive ? "turquoise" : "blue";
        },
        isButtonFrozen() {
            return false;
        },
        isButtonActive() {
            return !this.isExecutingCurriculumCommand;
        },
        isButtonLoading() {
            return false;
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
        handleButtonPress() {
            if (this.isModeActive) this.deactivateCurriculumEditionSessionAdditionMode();
            else this.activateCurriculumEditionSessionAdditionMode();
        },
    }
};
</script>

<style scoped></style>
