<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Assign Curriculum" />
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
        ...mapGetters('managementUsers/progressions', [
            'hasEditedUserProgressionCurriculumReference',
            'isAssigningCurriculum',
        ]),
        ...mapGetters('managementUsers/progressions/edition', [
            'userProgressionEditionCurriculumReference',
            'userProgressionEditionAssignedParameters',
        ]),
        ...mapGetters('managementUsers/progressions/selection', [
            'hasUserProgressionSelectionCurriculumReference',
        ]),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonFrozen() {
            return !this.isAssigningCurriculum && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUser && this.hasEditedUserProgressionCurriculumReference;
        },
        isButtonLoading() {
            return this.isAssigningCurriculum;
        },
    },
    methods: {
        ...mapActions('managementUsers/progressions', ['assignCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            if (this.hasUserProgressionSelectionCurriculumReference) {
                const answer = window.confirm('Are your sure you want to edit the curriculum of this user?');
                if (!answer) return;
            }
            this.assignCurriculum({
                userId: this.userSelectionId,
                curriculumId: this.userProgressionEditionCurriculumReference,
                assignedParameters: this.userProgressionEditionAssignedParameters,
            });
        },
    }
};
</script>

<style scoped></style>
