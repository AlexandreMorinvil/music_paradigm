<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive"
        :isLoading="isButtonLoading" text="Create User With Curriculum" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', [
            'hasEditedUserUsername',
            'isCreatingUserWithCurriculum',
            'isExecutingUserCommand',
        ]),
        ...mapGetters('managementUsers/progressions/edition', [
            'userProgressionEditionCurriculumReference',
            'userProgressionEditionAssignedParameters',
        ]),
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (!this.isCreatingUserWithCurriculum && this.isExecutingUserCommand) return false; // Has other user command running
            if (this.hasSelectedUser && !this.hasEditedUserUsername) return false;
            return true;
        },
        isButtonLoading() {
            return this.isCreatingUserWithCurriculum;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['createUserWithCurriculum']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.createUserWithCurriculum({
                user: this.userEditionUser,
                curriculumId: this.userProgressionEditionCurriculumReference,
                assignedParameters: this.userProgressionEditionAssignedParameters,
            });
        },
    }
};
</script>

<style scoped></style>
