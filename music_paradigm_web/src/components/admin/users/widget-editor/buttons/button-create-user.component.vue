<template>
    <button v-on:click="handleUserCreation" class="widget-button green" :class="isButtonActive || 'inactive'">
        Create User
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementUsers/edition', ['userEditionUser', 'userEditionUsername']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser', 'userSelectionUsername']),
        isButtonActive() {
            return !(this.hasSelectedUser && this.userEditionUsername === this.userSelectionUsername);
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
