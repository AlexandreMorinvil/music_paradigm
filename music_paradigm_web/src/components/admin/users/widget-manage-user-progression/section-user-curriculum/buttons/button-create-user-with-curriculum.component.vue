<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Create User with Curriculum" />
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
            'hasUserProgressionEditionCurriculumReference',
            'userProgressionEditionCurriculumReference',
            'userProgressionEditionAssignedParameters',
        ]),
        ...mapGetters('managementUsers/edition', ['userEdition']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonFrozen() {
            return !this.isCreatingUserWithCurriculum && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            if (this.hasSelectedUser && !this.hasEditedUserUsername) return false;
            return this.hasUserProgressionEditionCurriculumReference;
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
                user: this.userEdition,
                curriculumId: this.userProgressionEditionCurriculumReference,
                assignedParameters: this.userProgressionEditionAssignedParameters,
            });
        },
    }
};
</script>

<style scoped></style>
