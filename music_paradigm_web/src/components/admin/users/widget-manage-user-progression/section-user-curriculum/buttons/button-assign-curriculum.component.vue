<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" text="Assign Curriculum" />
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
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            if (!this.isAssigningCurriculum && this.isExecutingUserCommand) return false; // Has other user command running
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
            const answer = window.confirm('Are your sure you want to edit the curriculum of this user?');
            if (answer) {}
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
