<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Assign Adjustments" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/progressions/selection', [
            'hasSelectedUserProgression',
            'userProgressionSelectionId',
        ]),
        ...mapGetters('managementUsers/progressions/sessions', [
            'hasEditedProgressionSessionAdjustments',
            'isAssigningSessionAdjustments'
        ]),
        ...mapGetters('managementUsers/progressions/sessions/edition', [
            'progressionSessionEditionAdjustments',
        ]),
        ...mapGetters('managementUsers/progressions/sessions/selection', [
            'hasSelectedProgressionSession',
            'progressionSessionSelectionIdentifier',
        ]),
        isButtonFrozen() {
            return !this.isAssigningSessionAdjustments && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUserProgression &&
                this.hasSelectedProgressionSession &&
                this.hasEditedProgressionSessionAdjustments;
        },
        isButtonLoading() {
            return this.isAssigningSessionAdjustments;
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions/sessions', ['assignSessionAdjustments']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.assignSessionAdjustments({
                progressionId: this.userProgressionSelectionId,
                sessionIdentifier: this.progressionSessionSelectionIdentifier,
                adjustments: this.progressionSessionEditionAdjustments,
            });
        },
    }
};
</script>

<style scoped></style>
