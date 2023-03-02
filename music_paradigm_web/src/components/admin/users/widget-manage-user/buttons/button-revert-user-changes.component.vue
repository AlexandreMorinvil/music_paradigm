<template>
    <button v-on:click="handleUserDeletion" class="widget-button turquoise" :class="isButtonActive || 'inactive'">
        Revert Changes
    </button>
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('managementUsers', ['hasUserEditionChange']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            return this.hasSelectedUser && this.hasUserEditionChange;
        },
    },
    methods: {
        ...mapActions('managementUsers', ['revertUserEditions']),
        handleUserDeletion() {
            if (!this.isButtonActive) return;
            this.revertUserEditions();
        },
    }
};
</script>

<style scoped></style>
