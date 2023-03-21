<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive"
        :isLoading="isButtonLoading" v-bind="$attrs" text="Reset Task Progress" />
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
            'hasProgressionSessionsLinkedForSession',
            'isDeletingTaskStateMarker',
            'progressionSessionsLinkedForSession',
        ]),
        ...mapGetters('managementUsers/progressions/sessions/selection', [
            'hasSelectedProgressionSession',
            'hasProgressionSessionSelectionTaskStateMarker',
            'progressionSessionSelection',
            'progressionSessionSelectionAssociativeId',
        ]),
        hasLinkedSessions() {
            return this.hasProgressionSessionsLinkedForSession(this.progressionSessionSelection);
        },
        isButtonActive() {
            if (!this.isDeletingTaskStateMarker && this.isExecutingUserCommand) return false; // Has other user command running
            return this.hasSelectedUserProgression &&
                this.hasSelectedProgressionSession &&
                this.hasProgressionSessionSelectionTaskStateMarker;
        },
        isButtonLoading() {
            return this.isDeletingTaskStateMarker;
        },
        linkedSessions() {
            return this.progressionSessionsLinkedForSession(this.progressionSessionSelection);
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions/sessions', ['deleteTaskStateMarker']),
        handleButtonPress() {
            if (!this.isButtonActive) return;

            let answer = window.confirm('Are you - really - sure you want to restart the progress for this session?\nThis cannot be undone.');
            if (!answer) return;
            if (this.hasLinkedSessions) {
                const linkedSessionsTitles = this.linkedSessions
                    .map((session) => {
                        return '   - ' + session.title;
                    })
                    .join('\n');
                answer = window.confirm(`This will affect the sessions:\n${linkedSessionsTitles}\nThis cannot be undone.\n\nAre you still sure?`);
            }
            if (answer) this.deleteTaskStateMarker({
                progressionId: this.userProgressionSelectionId,
                associativeId: this.progressionSessionSelectionAssociativeId,
            });
        },
    }
};
</script>

<style scoped></style>
