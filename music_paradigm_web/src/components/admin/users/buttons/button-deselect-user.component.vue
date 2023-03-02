<template>
    <button v-on:click="handleUserDeletion" class="widget-button turquoise" :class="isButtonActive || 'inactive'">
        Deselect User
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            return this.hasSelectedUser;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['unsetSelectedUser']),
        handleUserDeletion() {
            if (!this.isButtonActive) return;
            this.unsetSelectedUser();
        },
    }
};
</script>

<style scoped></style>
