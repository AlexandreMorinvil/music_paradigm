<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive"
        :isLoading="isButtonLoading" text="Create User" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasEditedUserUsername', 'isCreatingUser', 'isExecutingUserCommand']),
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (!this.isCreatingUser && this.isExecutingUserCommand) return false; // Has other user command running
            if (this.hasSelectedUser && !this.hasEditedUserUsername) return false;
            return true;
        },
        isButtonLoading() {
            return this.isCreatingUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['createUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.createUser({
                user: this.userEditionUser,
                assignedParameters: {},
            });
        },
    }
};
</script>

<style scoped></style>
