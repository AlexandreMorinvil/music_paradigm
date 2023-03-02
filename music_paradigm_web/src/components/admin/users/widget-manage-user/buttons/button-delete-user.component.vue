<template>
    <button v-on:click="handleUserDeletion" class="widget-button red" :class="isButtonActive || 'inactive'">
        Delete User
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            return this.hasSelectedUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['deleteUser']),
        handleUserDeletion() {
            if (!this.isButtonActive) return;
            const answer = window.confirm('Are your sure you want to delete the user?');
            if (answer) this.deleteUser(this.userSelectionId);
        },
    }
};
</script>

<style scoped></style>
