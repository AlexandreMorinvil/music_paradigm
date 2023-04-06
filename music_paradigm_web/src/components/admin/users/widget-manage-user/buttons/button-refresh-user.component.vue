<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive"
        :isLoading="isButtonLoading" :isFrozen="isButtonFrozen" v-bind="$attrs" text="Refresh" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand', 'isFetchingUser']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonFrozen() {
            return !this.isFetchingUser && this.isExecutingUserCommand; // Has other user command running
        },
        isButtonActive() {
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
