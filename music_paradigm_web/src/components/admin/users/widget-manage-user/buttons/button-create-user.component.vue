<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="green" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Create User" />
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
        ...mapGetters('managementUsers/edition', ['userEdition']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonFrozen() {
            return !this.isCreatingUser && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
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
                user: this.userEdition,
                assignedParameters: {},
            });
        },
    }
};
</script>

<style scoped></style>
