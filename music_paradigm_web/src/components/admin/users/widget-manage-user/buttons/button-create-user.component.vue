<template>
    <TemplateButtonComponent v-on:click="handleUserCreation" color="green" :isActive="isButtonActive"
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
        ...mapGetters('managementUsers', ['isCreatingUser']),
        ...mapGetters('managementUsers/edition', ['userEditionUser', 'userEditionUsername']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser', 'userSelectionUsername']),
        isButtonActive() {
            return !(this.hasSelectedUser && this.userEditionUsername === this.userSelectionUsername);
        },
        isButtonLoading() {
            return this.isCreatingUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['createUser']),
        handleUserCreation() {
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
