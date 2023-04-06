<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Assign Parameters" />
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
        ...mapGetters('managementUsers/progressions', [
            'isAssigningParameters',
            'hasEditedUserProgressionAssignedParameters'
        ]),
        ...mapGetters('managementUsers/progressions/edition', [
            'userProgressionEditionAssignedParameters',
        ]),
        ...mapGetters('managementUsers/progressions/selection', [
            'hasSelectedUserProgression',
            'userProgressionSelectionId',
        ]),
        isButtonFrozen() {
            return !this.isAssigningParameters && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUserProgression && this.hasEditedUserProgressionAssignedParameters;
        },
        isButtonLoading() {
            return this.isAssigningParameters;
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions', ['assignParameters']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const isConfirmed = window.confirm('Are your sure you want to edit the assigned parameters?');
            if (isConfirmed) {
                this.assignParameters({
                    progressionId: this.userProgressionSelectionId,
                    assignedParameters: this.userProgressionEditionAssignedParameters,
                });
            }
        },
    }
};
</script>

<style scoped></style>
