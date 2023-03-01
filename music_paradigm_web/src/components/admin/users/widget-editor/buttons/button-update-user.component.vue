<template>
    <button v-on:click="handleUserDeletion" class="widget-button blue" :class="isButtonActive || 'inactive'">
        Update User
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementUsers/edition', ['userEditionUser']),
        ...mapGetters('managementUsers/selection', ['userSelectionId', 'hasSelectedUser']),
        isButtonActive() {
            return this.hasSelectedUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['updateUser']),
        handleUserDeletion() {
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
