<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive"
        :isLoading="isButtonLoading" v-bind="$attrs" text="Reset Timer" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

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
            'isResettingSessionTimer'
        ]),
        ...mapGetters('managementUsers/progressions/sessions/selection', [
            'hasSelectedProgressionSession',
            'progressionSessionSelectionAssociativeId',
            'progressionSessionSelectionTaskStateMarkerTimeIndicated',
        ]),


        isButtonActive() {
            if (!this.isResettingSessionTimer && this.isExecutingUserCommand) return false; // Has other user command running
            return this.hasSelectedUserProgression &&
                this.hasSelectedProgressionSession &&
                Boolean(this.progressionSessionSelectionTaskStateMarkerTimeIndicated);
        },
        isButtonLoading() {
            return this.isResettingSessionTimer;
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions/sessions', ['resetSessionTimer']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are you sure you want to reset the timer for this session?');
            if (answer) this.resetSessionTimer({
                progressionId: this.userProgressionSelectionId,
                associativeId: this.progressionSessionSelectionAssociativeId,
            });
        },
    }
};
</script>

<style scoped></style>
