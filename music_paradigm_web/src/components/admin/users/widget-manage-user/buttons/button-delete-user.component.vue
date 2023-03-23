<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Delete User" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isDeletingUser', 'isExecutingUserCommand']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonFrozen() {
            return !this.isDeletingUser && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
            return this.hasSelectedUser;
        },
        isButtonLoading() {
            return this.isDeletingUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['deleteUser']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to delete the user?');
            if (answer) this.deleteUser(this.userSelectionId);
        },
    }
};
</script>

<style scoped></style>
