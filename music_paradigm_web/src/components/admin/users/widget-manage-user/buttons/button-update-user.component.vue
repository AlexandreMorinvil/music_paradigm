<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Update User" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasEditedUser', 'isExecutingUserCommand', 'isUpdatingUser']),
        ...mapGetters('managementUsers/edition', ['userEdition']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonFrozen() {
            return !this.isUpdatingUser && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUser && this.hasEditedUser;
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
                    user: this.userEdition,
                });
            }
        },
    }
};
</script>

<style scoped></style>
