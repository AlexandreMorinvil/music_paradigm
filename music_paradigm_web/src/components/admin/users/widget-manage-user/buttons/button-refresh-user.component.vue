<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" v-bind="$attrs" text="Refresh" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand', 'isFetchingUser']),
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            if (!this.isFetchingUser && this.isExecutingUserCommand) return false; // Has other user command running
            return this.hasSelectedUser;
        },
        isButtonLoading() {
            return this.isFetchingUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['refreshSelectedUserProfile']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.refreshSelectedUserProfile();
        },
    }
};
</script>

<style scoped></style>
