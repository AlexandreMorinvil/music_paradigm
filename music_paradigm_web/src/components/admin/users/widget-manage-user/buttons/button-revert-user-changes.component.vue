<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" isSmall color="turquoise" :isActive="isButtonActive"
        :text="text" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasEditedUser', 'isExecutingUserCommand']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (this.isExecutingUserCommand) return false;
            return this.hasEditedUser;
        },
        text() {
            return this.hasSelectedUser ? 'Revert Changes' : 'Clear';
        }
    },
    methods: {
        ...mapActions('managementUsers', ['revertUserEditions']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            this.revertUserEditions();
        },
    }
};
</script>

<style scoped></style>
