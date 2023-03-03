<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" isSmall color="turquoise" :isActive="isButtonActive"
        text="Revert Changes" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['hasUserEditionChange', 'isExecutingUserCommand']),
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        isButtonActive() {
            if (this.isExecutingUserCommand) return false;
            return this.hasSelectedUser && this.hasUserEditionChange;
        },
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
