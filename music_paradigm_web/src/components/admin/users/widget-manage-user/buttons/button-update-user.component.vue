<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" text="Update User" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasUserEditionChange', 'isExecutingUserCommand', 'isUpdatingUser']),
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            if (!this.isUpdatingUser && this.isExecutingUserCommand) return false; // Has other user command running
            return this.hasSelectedUser && this.hasUserEditionChange;
        },
        isButtonLoading() {
            return this.isUpdatingUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['updateUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to edit the user?');
            if (answer) {
                this.updateUser({
                    id: this.userSelectionId,
                    user: this.userEditionUser,
                });
            }
        },
    }
};
</script>

<style scoped></style>
